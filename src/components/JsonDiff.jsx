import { useMemo, useState } from "react";

const SAMPLE_A = '{\n  "name": "Alice",\n  "age": 30,\n  "city": "Mumbai"\n}';
const SAMPLE_B = '{\n  "name": "Alice",\n  "age": 31,\n  "country": "India"\n}';

function diff(a, b, path = "") {
  const results = [];
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  for (const key of keys) {
    const fullPath = path ? `${path}.${key}` : key;
    const inA = a && key in a;
    const inB = b && key in b;
    if (!inA) {
      results.push({ path: fullPath, type: "added", value: b[key] });
    } else if (!inB) {
      results.push({ path: fullPath, type: "removed", value: a[key] });
    } else if (
      typeof a[key] === "object" &&
      typeof b[key] === "object" &&
      a[key] !== null &&
      b[key] !== null &&
      !Array.isArray(a[key])
    ) {
      results.push(...diff(a[key], b[key], fullPath));
    } else if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
      results.push({ path: fullPath, type: "changed", from: a[key], to: b[key] });
    }
  }
  return results;
}

export default function JsonDiff() {
  const [a, setA] = useState(SAMPLE_A);
  const [b, setB] = useState(SAMPLE_B);

  const { results, error } = useMemo(() => {
    try {
      const objA = JSON.parse(a);
      const objB = JSON.parse(b);
      return { results: diff(objA, objB), error: null };
    } catch (e) {
      return { results: [], error: "Invalid JSON in one of the fields." };
    }
  }, [a, b]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <textarea value={a} onChange={(e) => setA(e.target.value)} rows={8} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} rows={8} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
      {error ? (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      ) : results.length === 0 ? (
        <p className="text-emerald-600 dark:text-emerald-400 text-sm">No differences found.</p>
      ) : (
        <ul className="space-y-1">
          {results.map((r, i) => (
            <li key={i} className="text-sm font-mono bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2">
              {r.type === "added" && <span className="text-emerald-600 dark:text-emerald-400">+ {r.path}: {JSON.stringify(r.value)}</span>}
              {r.type === "removed" && <span className="text-red-600 dark:text-red-400">- {r.path}: {JSON.stringify(r.value)}</span>}
              {r.type === "changed" && <span className="text-amber-600 dark:text-amber-400">~ {r.path}: {JSON.stringify(r.from)} → {JSON.stringify(r.to)}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
