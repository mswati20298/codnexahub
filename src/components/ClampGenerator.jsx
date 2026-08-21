import { useMemo, useState } from "react";

export default function ClampGenerator() {
  const [minPx, setMinPx] = useState(16);
  const [maxPx, setMaxPx] = useState(32);
  const [minVw, setMinVw] = useState(320);
  const [maxVw, setMaxVw] = useState(1200);

  const clampValue = useMemo(() => {
    const slope = (maxPx - minPx) / (maxVw - minVw);
    const yIntersect = minPx - slope * minVw;
    const preferred = `${yIntersect.toFixed(4)}px + ${(slope * 100).toFixed(4)}vw`;
    return `clamp(${minPx}px, ${preferred}, ${maxPx}px)`;
  }, [minPx, maxPx, minVw, maxVw]);

  const copy = () => navigator.clipboard.writeText(`font-size: ${clampValue};`);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Min size (px)
          <input type="number" value={minPx} onChange={(e) => setMinPx(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Max size (px)
          <input type="number" value={maxPx} onChange={(e) => setMaxPx(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Min viewport width (px)
          <input type="number" value={minVw} onChange={(e) => setMinVw(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Max viewport width (px)
          <input type="number" value={maxVw} onChange={(e) => setMaxVw(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <code className="text-sm text-indigo-400 break-all">font-size: {clampValue};</code>
      </div>
      <p className="text-xs text-slate-500 mt-4">Produces fluid typography that scales smoothly between viewport widths without needing media query breakpoints.</p>
    </div>
  );
}
