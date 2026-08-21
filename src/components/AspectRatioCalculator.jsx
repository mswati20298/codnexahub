import { useMemo, useState } from "react";

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [newWidth, setNewWidth] = useState(800);

  const ratio = useMemo(() => {
    const divisor = gcd(width, height);
    return { w: width / divisor, h: height / divisor };
  }, [width, height]);

  const calculatedHeight = useMemo(() => (newWidth * height) / width, [newWidth, width, height]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Original width
          <input type="number" min="1" value={width} onChange={(e) => setWidth(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Original height
          <input type="number" min="1" value={height} onChange={(e) => setHeight(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
        <p className="text-xs text-slate-400 mb-1">Aspect ratio</p>
        <p className="text-2xl font-semibold text-indigo-400">{ratio.w}:{ratio.h}</p>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        New width (calculate matching height)
        <input type="number" min="1" value={newWidth} onChange={(e) => setNewWidth(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <p className="text-xs text-slate-400 mb-1">Matching height</p>
        <p className="text-xl font-semibold text-slate-100">{calculatedHeight.toFixed(0)}px</p>
      </div>
    </div>
  );
}
