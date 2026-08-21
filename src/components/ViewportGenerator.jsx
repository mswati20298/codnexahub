import { useMemo, useState } from "react";

export default function ViewportGenerator() {
  const [width, setWidth] = useState("device-width");
  const [initialScale, setInitialScale] = useState(1);
  const [maxScale, setMaxScale] = useState("");
  const [userScalable, setUserScalable] = useState(true);

  const content = useMemo(() => {
    const parts = [`width=${width}`, `initial-scale=${initialScale}`];
    if (maxScale) parts.push(`maximum-scale=${maxScale}`);
    if (!userScalable) parts.push("user-scalable=no");
    return parts.join(", ");
  }, [width, initialScale, maxScale, userScalable]);

  const tag = `<meta name="viewport" content="${content}" />`;
  const copy = () => navigator.clipboard.writeText(tag);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Width
          <input value={width} onChange={(e) => setWidth(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Initial scale
          <input type="number" step="0.1" value={initialScale} onChange={(e) => setInitialScale(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Maximum scale (optional)
          <input value={maxScale} onChange={(e) => setMaxScale(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 mt-6">
          <input type="checkbox" checked={userScalable} onChange={(e) => setUserScalable(e.target.checked)} />
          Allow user zooming
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <code className="text-sm text-indigo-400 break-all">{tag}</code>
      </div>
      {!userScalable && <p className="text-xs text-amber-400 mt-4">Disabling zoom hurts accessibility for users with low vision — avoid unless there's a strong specific reason.</p>}
    </div>
  );
}
