import { useMemo, useState } from "react";

const PRESETS = {
  fadeIn: { name: "fadeIn", from: "opacity: 0;", to: "opacity: 1;" },
  slideInUp: { name: "slideInUp", from: "transform: translateY(20px); opacity: 0;", to: "transform: translateY(0); opacity: 1;" },
  pulse: { name: "pulse", from: "transform: scale(1);", to: "transform: scale(1.05);" },
  spin: { name: "spin", from: "transform: rotate(0deg);", to: "transform: rotate(360deg);" },
};

export default function AnimationGenerator() {
  const [preset, setPreset] = useState("fadeIn");
  const [duration, setDuration] = useState(0.4);
  const [timing, setTiming] = useState("ease-out");
  const [iteration, setIteration] = useState("1");

  const css = useMemo(() => {
    const p = PRESETS[preset];
    return `@keyframes ${p.name} {\n  from { ${p.from} }\n  to { ${p.to} }\n}\n\n.element {\n  animation: ${p.name} ${duration}s ${timing} ${iteration};\n}`;
  }, [preset, duration, timing, iteration]);

  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(PRESETS).map((key) => (
          <button key={key} onClick={() => setPreset(key)} className={`text-sm px-3 py-1.5 rounded-lg border ${preset === key ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{key}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Duration (s)
          <input type="number" min="0.1" step="0.1" value={duration} onChange={(e) => setDuration(Number(e.target.value) || 0.1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Timing function
          <select value={timing} onChange={(e) => setTiming(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            {["ease", "ease-in", "ease-out", "ease-in-out", "linear"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Iteration count
          <input value={iteration} onChange={(e) => setIteration(e.target.value)} placeholder="1 or infinite" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{css}</code>
      </pre>
    </div>
  );
}
