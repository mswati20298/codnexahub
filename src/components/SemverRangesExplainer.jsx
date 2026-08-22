import { useMemo, useState } from "react";

const EXAMPLES = [
  { range: "^1.2.3", desc: "Compatible with 1.2.3 — allows 1.x.x but not 2.0.0 (won't change the leftmost non-zero digit)" },
  { range: "~1.2.3", desc: "Approximately 1.2.3 — allows 1.2.x but not 1.3.0" },
  { range: "1.2.3", desc: "Exact version only" },
  { range: ">=1.2.3", desc: "Any version 1.2.3 or higher" },
  { range: "1.2.x", desc: "Any patch version within 1.2" },
  { range: "*", desc: "Any version" },
  { range: "1.2.3 - 2.3.4", desc: "Any version in this inclusive range" },
];

export default function SemverRangesExplainer() {
  return (
    <div className="space-y-1">
      {EXAMPLES.map((e) => (
        <div key={e.range} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
          <code className="text-sm text-emerald-600 dark:text-emerald-400">{e.range}</code>
          <p className="text-xs text-slate-500 dark:text-slate-400">{e.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">^ is the npm default when you run npm install — it allows minor and patch updates but not major (breaking) ones.</p>
    </div>
  );
}
