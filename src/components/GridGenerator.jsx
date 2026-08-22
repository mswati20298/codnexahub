import { useState } from "react";

export default function GridGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(8);

  const css = `display: grid;\ngrid-template-columns: repeat(${columns}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ngap: ${gap}px;`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Columns: {columns}
          <input type="range" min="1" max="8" value={columns} onChange={(e) => setColumns(Number(e.target.value))} className="accent-emerald-500" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Rows: {rows}
          <input type="range" min="1" max="6" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="accent-emerald-500" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Gap: {gap}px
          <input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="accent-emerald-500" />
        </label>
      </div>

      <div
        className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 mb-4"
        style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: `${gap}px`, height: "160px" }}
      >
        {Array.from({ length: columns * rows }, (_, i) => (
          <div key={i} className="bg-indigo-500/70 rounded flex items-center justify-center text-white text-xs">{i + 1}</div>
        ))}
      </div>

      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <pre className="text-sm text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">{css}</pre>
      </div>
    </div>
  );
}
