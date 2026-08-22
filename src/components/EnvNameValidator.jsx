import { useMemo, useState } from "react";

function validateName(name) {
  const issues = [];
  if (!/^[A-Z][A-Z0-9_]*$/.test(name)) {
    if (/[a-z]/.test(name)) issues.push("Contains lowercase letters — convention is SCREAMING_SNAKE_CASE.");
    if (/^[0-9]/.test(name)) issues.push("Starts with a number — invalid in most shells.");
    if (/-/.test(name)) issues.push("Contains hyphens — not valid in environment variable names (use underscores).");
    if (/\s/.test(name)) issues.push("Contains spaces — not valid in environment variable names.");
  }
  return issues;
}

const SAMPLE = `DATABASE_URL
api-key
2FA_ENABLED
My Setting
PORT`;

export default function EnvNameValidator() {
  const [input, setInput] = useState(SAMPLE);

  const results = useMemo(() => {
    return input.split("\n").map((l) => l.trim()).filter(Boolean).map((name) => ({ name, issues: validateName(name) }));
  }, [input]);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm mb-4" />
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className={`rounded-lg border px-4 py-2 ${r.issues.length === 0 ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40" : "border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40"}`}>
            <p className="font-mono text-sm text-slate-900 dark:text-slate-100">{r.name}</p>
            {r.issues.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Valid</p>
            ) : (
              r.issues.map((issue, j) => <p key={j} className="text-xs text-amber-700 dark:text-amber-300">{issue}</p>)
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
