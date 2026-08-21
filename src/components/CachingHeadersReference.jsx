const HEADERS = [
  { header: "Cache-Control: no-store", desc: "Never cache this response, anywhere." },
  { header: "Cache-Control: no-cache", desc: "Cache it, but always revalidate with the server before using it." },
  { header: "Cache-Control: max-age=3600", desc: "Cache for 3600 seconds before revalidating." },
  { header: "Cache-Control: private", desc: "Only the browser can cache this, not shared caches/CDNs." },
  { header: "Cache-Control: public", desc: "Any cache (browser, CDN, proxy) can store this response." },
  { header: "ETag: \"abc123\"", desc: "A version identifier — client sends it back via If-None-Match to check if content changed." },
  { header: "Last-Modified", desc: "Timestamp of last change — used with If-Modified-Since for conditional requests." },
  { header: "Vary: Accept-Encoding", desc: "Cache separately based on this request header's value." },
];

export default function CachingHeadersReference() {
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
