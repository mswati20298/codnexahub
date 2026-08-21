const HEADERS = [
  { header: "Authorization", desc: "Credentials for authenticating the request (Bearer token, Basic auth, etc.)" },
  { header: "Content-Type", desc: "Media type of the request body (application/json, multipart/form-data, etc.)" },
  { header: "Accept", desc: "Media types the client can handle in the response" },
  { header: "User-Agent", desc: "Identifies the client application making the request" },
  { header: "X-Request-ID", desc: "A unique ID for tracing this request through logs/systems (not standardized, but widely used)" },
  { header: "If-None-Match", desc: "Sends an ETag back for conditional requests — server returns 304 if unchanged" },
  { header: "Origin", desc: "The origin of the request, used in CORS checks" },
  { header: "X-Forwarded-For", desc: "Original client IP when the request passed through a proxy/load balancer" },
];

export default function RequestHeadersReference() {
  return (
    <div className="space-y-2">
      {HEADERS.map((h) => (
        <div key={h.header} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
          <code className="text-sm text-indigo-400">{h.header}</code>
          <p className="text-xs text-slate-400 mt-1">{h.desc}</p>
        </div>
      ))}
    </div>
  );
}
