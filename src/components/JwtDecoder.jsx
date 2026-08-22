import { useMemo, useState } from "react";

const SAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzUwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return decodeURIComponent(escape(atob(padded)));
}

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE);

  const { header, payload, error, expiry } = useMemo(() => {
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "A JWT should have 3 parts separated by dots." };
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const expiry = payload.exp ? new Date(payload.exp * 1000) : null;
      return { header, payload, error: null, expiry };
    } catch {
      return { error: "Couldn't decode this token — check it's a valid JWT." };
    }
  }, [token]);

  const isExpired = expiry && expiry.getTime() < Date.now();

  return (
    <div>
      <textarea value={token} onChange={(e) => setToken(e.target.value)} rows={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4" />

      {error ? (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      ) : (
        <div className="space-y-4">
          {expiry && (
            <p className={`text-sm ${isExpired ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
              {isExpired ? "Expired" : "Valid until"} {expiry.toLocaleString()}
            </p>
          )}
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase">Header</p>
            <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 overflow-x-auto text-xs text-slate-800 dark:text-slate-200">
              <code>{JSON.stringify(header, null, 2)}</code>
            </pre>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase">Payload</p>
            <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 overflow-x-auto text-xs text-slate-800 dark:text-slate-200">
              <code>{JSON.stringify(payload, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        This decodes the header and payload only — it does not verify the
        signature. Decoding happens entirely in your browser.
      </p>
    </div>
  );
}
