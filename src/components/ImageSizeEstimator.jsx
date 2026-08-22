import { useMemo, useState } from "react";

const BASE_IMAGES = [
  { name: "scratch", sizeMb: 0 },
  { name: "alpine", sizeMb: 7 },
  { name: "debian-slim", sizeMb: 80 },
  { name: "ubuntu", sizeMb: 78 },
  { name: "node:alpine", sizeMb: 180 },
  { name: "node (full)", sizeMb: 1100 },
  { name: "python:slim", sizeMb: 150 },
  { name: "python (full)", sizeMb: 920 },
];

export default function ImageSizeEstimator() {
  const [baseIndex, setBaseIndex] = useState(1);
  const [appCodeMb, setAppCodeMb] = useState(20);
  const [dependenciesMb, setDependenciesMb] = useState(150);

  const total = useMemo(() => BASE_IMAGES[baseIndex].sizeMb + appCodeMb + dependenciesMb, [baseIndex, appCodeMb, dependenciesMb]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Base image
        <select value={baseIndex} onChange={(e) => setBaseIndex(Number(e.target.value))} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
          {BASE_IMAGES.map((b, i) => <option key={b.name} value={i}>{b.name} (~{b.sizeMb}MB)</option>)}
        </select>
      </label>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          App code size (MB)
          <input type="number" min="0" value={appCodeMb} onChange={(e) => setAppCodeMb(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Dependencies size (MB)
          <input type="number" min="0" value={dependenciesMb} onChange={(e) => setDependenciesMb(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Estimated final image size</p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">~{total.toLocaleString()} MB</p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Rough estimate — actual size depends on layer caching, multi-stage build effectiveness, and specific package choices.</p>
    </div>
  );
}
