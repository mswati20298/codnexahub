import { useMemo, useState } from "react";

const SAMPLE_REQUIRED = `DATABASE_URL
API_KEY
JWT_SECRET
STRIPE_SECRET_KEY
NODE_ENV`;

const SAMPLE_PROVIDED = `DATABASE_URL=postgres://localhost/db
API_KEY=sk-abc123
NODE_ENV=production
PORT=3000`;

function extractKeys(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .map((line) => (line.includes("=") ? line.split("=")[0].trim() : line.trim()))
    .filter(Boolean);
}

export default function EnvChecker() {
  const [required, setRequired] = useState(SAMPLE_REQUIRED);
  const [provided, setProvided] = useState(SAMPLE_PROVIDED);

  const { missing, extra, matched } = useMemo(() => {
    const reqKeys = new Set(extractKeys(required).map((k) => k.toUpperCase()));
    const provKeys = new Set(extractKeys(provided).map((k) => k.toUpperCase()));

    const missing = [...reqKeys].filter((k) => !provKeys.has(k));
    const extra = [...provKeys].filter((k) => !reqKeys.has(k));
    const matched = [...reqKeys].filter((k) => provKeys.has(k));

    return { missing, extra, matched };
  }, [required, provided]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Required variables (one per line)
          <textarea
            value={required}
            onChange={(e) => setRequired(e.target.value)}
            rows={7}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Your .env content (KEY=value or just KEY)
          <textarea
            value={provided}
            onChange={(e) => setProvided(e.target.value)}
            rows={7}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <p className="text-sm font-medium text-red-400 mb-2">Missing ({missing.length})</p>
          <ul className="space-y-1">
            {missing.map((k) => (
              <li key={k} className="text-xs font-mono bg-red-950/40 border border-red-900 text-red-300 rounded px-2 py-1">
                {k}
              </li>
            ))}
            {missing.length === 0 && <p className="text-xs text-slate-500">None</p>}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-400 mb-2">Matched ({matched.length})</p>
          <ul className="space-y-1">
            {matched.map((k) => (
              <li key={k} className="text-xs font-mono bg-emerald-950/40 border border-emerald-900 text-emerald-300 rounded px-2 py-1">
                {k}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-400 mb-2">Extra / unused ({extra.length})</p>
          <ul className="space-y-1">
            {extra.map((k) => (
              <li key={k} className="text-xs font-mono bg-slate-800 border border-slate-700 text-slate-300 rounded px-2 py-1">
                {k}
              </li>
            ))}
            {extra.length === 0 && <p className="text-xs text-slate-500">None</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
