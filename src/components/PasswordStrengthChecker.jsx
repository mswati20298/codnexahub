import { useMemo, useState } from "react";

function checkStrength(pw) {
  const checks = {
    length: pw.length >= 12,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
    symbol: /[^a-zA-Z0-9]/.test(pw),
    noCommon: !["password", "123456", "qwerty", "letmein"].some((c) => pw.toLowerCase().includes(c)),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score };
}

const LABELS = {
  length: "At least 12 characters",
  lower: "Contains lowercase letter",
  upper: "Contains uppercase letter",
  number: "Contains number",
  symbol: "Contains symbol",
  noCommon: "Not a common password",
};

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const { checks, score } = useMemo(() => checkStrength(password), [password]);
  const strength = score <= 2 ? { label: "Weak", color: "bg-red-500" } : score <= 4 ? { label: "Okay", color: "bg-amber-500" } : { label: "Strong", color: "bg-emerald-500" };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password to check..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={() => setShow((s) => !s)} className="text-xs px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">{show ? "Hide" : "Show"}</button>
      </div>

      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
        <div className={`h-full ${strength.color}`} style={{ width: `${(score / 6) * 100}%` }} />
      </div>
      <p className="text-sm text-slate-300 mb-4">{strength.label}</p>

      <ul className="space-y-1">
        {Object.entries(LABELS).map(([key, label]) => (
          <li key={key} className={`text-sm flex items-center gap-2 ${checks[key] ? "text-emerald-400" : "text-slate-500"}`}>
            {checks[key] ? "✓" : "○"} {label}
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mt-4">Checked entirely in your browser — your password is never sent anywhere.</p>
    </div>
  );
}
