import { useState } from "react";

export default function TransformGenerator() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skewX, setSkewX] = useState(0);

  const css = `transform: translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale}) skewX(${skewX}deg);`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="w-full h-40 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 overflow-hidden">
        <div
          className="w-16 h-16 bg-indigo-500 rounded"
          style={{ transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale}) skewX(${skewX}deg)` }}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: "Translate X", value: translateX, set: setTranslateX, min: -100, max: 100, unit: "px" },
          { label: "Translate Y", value: translateY, set: setTranslateY, min: -100, max: 100, unit: "px" },
          { label: "Rotate", value: rotate, set: setRotate, min: -180, max: 180, unit: "deg" },
          { label: "Scale", value: scale, set: setScale, min: 0.1, max: 2, step: 0.1, unit: "x" },
          { label: "Skew X", value: skewX, set: setSkewX, min: -45, max: 45, unit: "deg" },
        ].map((f) => (
          <label key={f.label} className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
            {f.label}: {f.value}{f.unit}
            <input type="range" min={f.min} max={f.max} step={f.step || 1} value={f.value} onChange={(e) => f.set(Number(e.target.value))} className="accent-emerald-500" />
          </label>
        ))}
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <code className="text-sm text-emerald-600 dark:text-emerald-400 break-all">{css}</code>
      </div>
    </div>
  );
}
