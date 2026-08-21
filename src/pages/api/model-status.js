export const prerender = false;

// Public status page summary endpoints (Statuspage.io format, widely used).
const PROVIDERS = [
  { id: "openai", name: "OpenAI", url: "https://status.openai.com/api/v2/status.json" },
  { id: "anthropic", name: "Anthropic", url: "https://status.anthropic.com/api/v2/status.json" },
  { id: "google-cloud", name: "Google Cloud AI", url: "https://status.cloud.google.com/incidents.json" },
];

async function checkProvider(provider) {
  try {
    const res = await fetch(provider.url, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      return { ...provider, status: "unknown", detail: `HTTP ${res.status}` };
    }
    const data = await res.json();

    // Statuspage.io format
    if (data.status) {
      return {
        ...provider,
        status: data.status.indicator === "none" ? "operational" : data.status.indicator,
        detail: data.status.description,
      };
    }

    // Google Cloud incidents format — no active incidents implies operational
    if (Array.isArray(data)) {
      const active = data.filter((i) => !i.end);
      return {
        ...provider,
        status: active.length === 0 ? "operational" : "degraded",
        detail: active.length === 0 ? "No active incidents" : `${active.length} active incident(s)`,
      };
    }

    return { ...provider, status: "unknown", detail: "Unrecognized response format" };
  } catch (err) {
    return { ...provider, status: "unknown", detail: "Could not reach status page" };
  }
}

export async function GET() {
  const results = await Promise.all(PROVIDERS.map(checkProvider));
  return new Response(JSON.stringify({ checkedAt: new Date().toISOString(), providers: results }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" },
  });
}
