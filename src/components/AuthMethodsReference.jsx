const METHODS = [
  { name: "API Key", desc: "A static key sent in a header or query param. Simple, but keys don't expire unless manually rotated.", example: "Authorization: Bearer sk_live_..." },
  { name: "Basic Auth", desc: "Username:password base64-encoded in the header. Simple but should only be used over HTTPS.", example: "Authorization: Basic dXNlcjpwYXNz" },
  { name: "OAuth 2.0", desc: "Token-based delegation flow — the standard for third-party access without sharing passwords.", example: "Authorization: Bearer <access_token>" },
  { name: "JWT", desc: "Self-contained signed token carrying claims — no server-side session lookup needed to verify.", example: "Authorization: Bearer eyJhbGc..." },
  { name: "HMAC Signature", desc: "Request is signed with a secret; server recalculates and compares. Common for webhooks and server-to-server APIs.", example: "X-Signature: sha256=..." },
  { name: "mTLS", desc: "Mutual TLS — both client and server present certificates. Strongest option, common in high-security/internal APIs.", example: "Client certificate presented during TLS handshake" },
];

export default function AuthMethodsReference() {
  return (
    <div className="space-y-3">
      {METHODS.map((m) => (
        <div key={m.name} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{m.name}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{m.desc}</p>
          <code className="text-xs text-slate-500 dark:text-slate-500 block mt-2">{m.example}</code>
        </div>
      ))}
    </div>
  );
}
