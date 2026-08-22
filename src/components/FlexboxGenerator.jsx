import { useState } from "react";

export default function FlexboxGenerator() {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [gap, setGap] = useState(8);

  const css = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\ngap: ${gap}px;`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          flex-direction
          <select value={direction} onChange={(e) => setDirection(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            {["row", "row-reverse", "column", "column-reverse"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          justify-content
          <select value={justify} onChange={(e) => setJustify(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            {["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          align-items
          <select value={align} onChange={(e) => setAlign(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            {["stretch", "flex-start", "flex-end", "center", "baseline"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          gap: {gap}px
          <input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="accent-emerald-500" />
        </label>
      </div>

      <div
        className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4 mb-4 h-32"
        style={{ display: "flex", flexDirection: direction, justifyContent: justify, alignItems: align, gap: `${gap}px` }}
      >
        {[1, 2, 3].map((n) => (
          <div key={n} className="w-12 h-12 bg-indigo-500 rounded flex items-center justify-center text-white text-sm shrink-0">{n}</div>
        ))}
      </div>

      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <pre className="text-sm text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">{css}</pre>
      </div>
    </div>
  );
}
