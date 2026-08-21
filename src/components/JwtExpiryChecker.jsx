import { useMemo, useState } from "react";

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return decodeURIComponent(escape(atob(padded)));
}

export default function JwtExpiryChecker() {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    const parts = token.trim().split(".");
    if (parts.length !== 3) return null;
    try {
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const now = Date.now() / 1000;
      const exp = payload.exp;
      const iat = payload.iat;
      if (!exp) return { noExpiry: true };
      const secondsLeft = exp - now;
      return {
        expiresAt: new Date(exp * 1000),
        issuedAt: iat ? new Date(iat * 1000) : null,
        isExpired: secondsLeft <= 0,
        secondsLeft,
      };
    } catch {
      return null;
    }
  }, [token]);

  const formatDuration = (s) => {
    const abs = Math.abs(s);
    if (abs < 60) return `${abs.toFixed(0)}s`;
    if (abs < 3600) return `${(abs / 60).toFixed(0)}m`;
    if (abs < 86400) return `${(abs / 3600).toFixed(1)}h`;
    return `${(abs / 86400).toFixed(1)}d`;
  };

  return (
    <div>
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        rows={4}
        placeholder="Paste a JWT to check its expiry..."
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4"
      />
      {!token.trim() ? null : !result ? (
        <p className="text-red-400 text-sm">Couldn't decode this as a JWT.</p>
      ) : result.noExpiry ? (
        <p className="text-amber-400 text-sm">This token has no expiry claim (exp) — it doesn't expire.</p>
      ) : (
        <div className={`rounded-lg border px-4 py-3 ${result.isExpired ? "border-red-900 bg-red-950/40 text-red-300" : "border-emerald-900 bg-emerald-950/40 text-emerald-300"}`}>
          <p className="font-medium">{result.isExpired ? `Expired ${formatDuration(result.secondsLeft)} ago` : `Valid for ${formatDuration(result.secondsLeft)} more`}</p>
          <p className="text-xs text-slate-400 mt-1">Expires: {result.expiresAt.toLocaleString()}</p>
          {result.issuedAt && <p className="text-xs text-slate-400">Issued: {result.issuedAt.toLocaleString()}</p>}
        </div>
      )}
    </div>
  );
}
