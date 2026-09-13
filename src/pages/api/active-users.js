export const prerender = false;

import { env } from "cloudflare:workers";

// In-memory cache, best-effort per Worker isolate — avoids re-authenticating
// and re-querying Google on every single page load across all visitors.
let cachedToken = null;
let cachedTokenExpiry = 0;
let cachedCount = null;
let cachedCountAt = 0;

function base64UrlEncode(input) {
  let base64;
  if (typeof input === "string") {
    base64 = btoa(input);
  } else {
    const bytes = new Uint8Array(input);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    base64 = btoa(binary);
  }
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem) {
  // Handles both real newlines and literal "\n" escape sequences (the shape a
  // JSON-exported service account key has when pasted as-is into an env var).
  const b64 = pem
    .replace(/\\n/g, "")
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function getAccessToken(clientEmail, privateKeyPem) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claimSet))}`;

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${base64UrlEncode(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(tokenData.error_description || "Failed to obtain access token");
  }
  return tokenData.access_token;
}

export async function GET() {
  try {
    const clientEmail = env.GA_SERVICE_ACCOUNT_EMAIL;
    const privateKey = env.GA_SERVICE_ACCOUNT_PRIVATE_KEY;
    const propertyId = env.GA_PROPERTY_ID;

    if (!clientEmail || !privateKey || !propertyId) {
      return new Response(JSON.stringify({ activeUsers: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const now = Date.now();

    if (cachedCount !== null && now - cachedCountAt < 30000) {
      return new Response(JSON.stringify({ activeUsers: cachedCount }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      });
    }

    if (!cachedToken || now >= cachedTokenExpiry) {
      cachedToken = await getAccessToken(clientEmail, privateKey);
      cachedTokenExpiry = now + 55 * 60 * 1000;
    }

    const reportRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cachedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metrics: [{ name: "activeUsers" }] }),
      }
    );

    const reportData = await reportRes.json();
    const activeUsers = Number(reportData?.rows?.[0]?.metricValues?.[0]?.value ?? 0);

    cachedCount = activeUsers;
    cachedCountAt = now;

    return new Response(JSON.stringify({ activeUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response(JSON.stringify({ activeUsers: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
