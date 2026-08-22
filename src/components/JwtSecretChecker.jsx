import { useMemo, useState } from "react";

function checkSecret(secret) {
  const byteLength = new TextEncoder().encode(secret).length;
  const bitLength = byteLength * 8;
  const checks = {
    minLength: byteLength >= 32,
    hasVariety: /[a-z]/.test(secret) && /[A-Z]/.test(secret) && /[0-9]/.test(secret),
    notCommon: !["secret", "password", "changeme", "your-secret-key"].includes(secret.toLowerCase()),
  };
  return { byteLength, bitLength, checks };
}

export default function JwtSecretChecker() {
  const [secret, setSecret] = useState("");
  const { byteLength, bitLength, checks } = useMemo(() => checkSecret(secret), [secret]);

  const strength = byteLength >= 32 && checks.notCommon ? { label: "Strong (HS256-safe)", color: "text-emerald-600 dark:text-emerald-400" }
    : byteLength >= 16 ? { label: "Weak — below recommended minimum", color: "text-amber-600 dark:text-amber-400" }
    : { label: "Too short — easily brute-forced", color: "text-red-600 dark:text-red-400" };

  return (
    <div>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Paste your JWT signing secret to check..."
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm mb-4"
      />
      {secret && (
        <>
          <p className={`text-sm font-medium mb-2 ${strength.color}`}>{strength.label}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{byteLength} bytes (~{bitLength} bits) of entropy assumed</p>
          <ul className="space-y-1">
            <li className={`text-sm ${checks.minLength ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{checks.minLength ? "✓" : "✗"} At least 32 bytes (256 bits) — recommended minimum for HS256</li>
            <li className={`text-sm ${checks.notCommon ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{checks.notCommon ? "✓" : "✗"} Not a common placeholder value</li>
          </ul>
        </>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">For production, generate secrets with a cryptographically secure random generator (like the Secure Random Token Generator tool), not a memorable phrase.</p>
    </div>
  );
}
