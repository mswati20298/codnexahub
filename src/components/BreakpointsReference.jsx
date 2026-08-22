const FRAMEWORKS = {
  "Tailwind CSS": [
    { name: "sm", width: "640px" }, { name: "md", width: "768px" },
    { name: "lg", width: "1024px" }, { name: "xl", width: "1280px" }, { name: "2xl", width: "1536px" },
  ],
  Bootstrap: [
    { name: "sm", width: "576px" }, { name: "md", width: "768px" },
    { name: "lg", width: "992px" }, { name: "xl", width: "1200px" }, { name: "xxl", width: "1400px" },
  ],
  "Common device sizes": [
    { name: "Mobile", width: "375px" }, { name: "Tablet", width: "768px" },
    { name: "Laptop", width: "1366px" }, { name: "Desktop", width: "1920px" },
  ],
};

import { useState } from "react";

export default function BreakpointsReference() {
  const [framework, setFramework] = useState("Tailwind CSS");

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {Object.keys(FRAMEWORKS).map((f) => (
          <button key={f} onClick={() => setFramework(f)} className={`text-sm px-3 py-1.5 rounded-lg border ${framework === f ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-1">
        {FRAMEWORKS[framework].map((bp) => (
          <div key={bp.name} className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
            <span className="text-sm text-slate-900 dark:text-slate-100">{bp.name}</span>
            <code className="text-sm text-emerald-600 dark:text-emerald-400">{bp.width}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
