import { useMemo, useState } from "react";

const KNOWN_HEADERS = {
  "content-type": "Specifies the media type of the request/response body.",
  "cache-control": "Directives for caching mechanisms in both requests and responses.",
  "authorization": "Credentials for authenticating the client with the server.",
  "x-frame-options": "Controls whether the page can be embedded in an iframe (clickjacking protection).",
  "strict-transport-security": "Forces browsers to use HTTPS for future requests to this domain.",
  "access-control-allow-origin": "CORS header — which origins are allowed to access this resource.",
  "set-cookie": "Sends a cookie from server to client.",
  "content-security-policy": "Restricts which resources (scripts, styles, etc.) can be loaded.",
  "x-content-type-options": "Prevents MIME-sniffing (usually set to 'nosniff').",
  "etag": "A version identifier for a resource, used for caching/conditional requests.",
  "vary": "Tells caches which request headers affect the response.",
  "referrer-policy": "Controls how much referrer info is sent with requests.",
};

const SAMPLE = `Content-Type: application/json
Cache-Control: no-cache
X-Frame-Options: DENY
Access-Control-Allow-Origin: *`;

export default function HeaderAnalyzer() {
  const [input, setInput] = useState(SAMPLE);

  const parsed = useMemo(() => {
    return input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf(":");
        if (idx === -1) return null;
        const name = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim();
        const key = name.toLowerCase();
        return { name, value, description: KNOWN_HEADERS[key] || "No description available for this header." };
      })
      .filter(Boolean);
  }, [input]);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="space-y-2">
        {parsed.map((h, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
            <p className="font-mono text-sm text-indigo-400">{h.name}: <span className="text-slate-200">{h.value}</span></p>
            <p className="text-xs text-slate-400 mt-1">{h.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
