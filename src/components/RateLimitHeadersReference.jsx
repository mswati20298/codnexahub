const HEADERS = [
  { header: "X-RateLimit-Limit", desc: "The maximum number of requests allowed in the current window." },
  { header: "X-RateLimit-Remaining", desc: "How many requests you have left in the current window." },
  { header: "X-RateLimit-Reset", desc: "Unix timestamp (or seconds) until the rate limit window resets." },
  { header: "Retry-After", desc: "Seconds to wait before retrying — sent with a 429 response." },
  { header: "RateLimit-Limit / RateLimit-Remaining / RateLimit-Reset", desc: "The newer standardized header names (RFC draft), without the X- prefix, increasingly used by APIs." },
];

export default function RateLimitHeadersReference() {
  return (
    <div className="space-y-2">
      {HEADERS.map((h) => (
        <div key={h.header} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
          <code className="text-sm text-indigo-400">{h.header}</code>
          <p className="text-xs text-slate-400 mt-1">{h.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4">Not every API uses all of these, and naming varies by provider — always check the specific API's documentation, but these cover the common conventions.</p>
    </div>
  );
}
