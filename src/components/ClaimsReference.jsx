const CLAIMS = [
  { claim: "iss", name: "Issuer", desc: "Who issued the token" },
  { claim: "sub", name: "Subject", desc: "Who the token is about (usually user ID)" },
  { claim: "aud", name: "Audience", desc: "Who the token is intended for" },
  { claim: "exp", name: "Expiration", desc: "Unix timestamp after which the token is invalid" },
  { claim: "nbf", name: "Not Before", desc: "Unix timestamp before which the token is not valid" },
  { claim: "iat", name: "Issued At", desc: "Unix timestamp when the token was created" },
  { claim: "jti", name: "JWT ID", desc: "Unique identifier for this token, useful for revocation lists" },
];

export default function ClaimsReference() {
  return (
    <div className="space-y-1">
      {CLAIMS.map((c) => (
        <div key={c.claim} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
          <div className="flex items-center gap-2">
            <code className="text-sm text-indigo-400">{c.claim}</code>
            <span className="text-sm text-slate-200">{c.name}</span>
          </div>
          <p className="text-xs text-slate-400">{c.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4">These are the "registered claims" defined by the JWT spec (RFC 7519) — all optional, but widely used. You can also add custom claims specific to your application.</p>
    </div>
  );
}
