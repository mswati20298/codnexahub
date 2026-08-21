import { useMemo, useState } from "react";

export default function CssUnitConverter() {
  const [rootSize, setRootSize] = useState(16);
  const [px, setPx] = useState(24);

  const rem = useMemo(() => (px / rootSize).toFixed(4).replace(/\.?0+$/, ""), [px, rootSize]);
  const em = rem; // 1em == 1rem when relative to root; note below clarifies nested em

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4 max-w-xs">
        Root font size (px)
        <input type="number" min="1" value={rootSize} onChange={(e) => setRootSize(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6 max-w-xs">
        Pixels
        <input type="number" value={px} onChange={(e) => setPx(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">REM (relative to root)</p>
          <p className="text-xl font-semibold text-indigo-400">{rem}rem</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">EM (if parent = root size)</p>
          <p className="text-xl font-semibold text-indigo-400">{em}em</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        EM is relative to the parent element's font size, which can differ
        from the root — this assumes no nested font-size overrides. REM is
        always relative to the root (usually 16px by default).
      </p>
    </div>
  );
}
