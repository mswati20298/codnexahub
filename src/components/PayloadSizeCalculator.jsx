import { useMemo, useState } from "react";

export default function PayloadSizeCalculator() {
  const [json, setJson] = useState('{\n  "id": 123,\n  "name": "Alice",\n  "email": "alice@example.com"\n}');

  const sizes = useMemo(() => {
    const bytes = new TextEncoder().encode(json).length;
    const minified = (() => {
      try {
        return new TextEncoder().encode(JSON.stringify(JSON.parse(json))).length;
      } catch {
        return null;
      }
    })();
    const gzipEstimate = Math.round((minified ?? bytes) * 0.3); // rough compression estimate
    return { bytes, minified, gzipEstimate };
  }, [json]);

  return (
    <div>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={8} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">As typed</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{sizes.bytes} B</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Minified</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{sizes.minified !== null ? `${sizes.minified} B` : "—"}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Est. gzipped</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">~{sizes.gzipEstimate} B</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Gzip estimate is a rough heuristic (~30% of minified size for typical JSON) — actual compression varies with content repetitiveness.</p>
    </div>
  );
}
