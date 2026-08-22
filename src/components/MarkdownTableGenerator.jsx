import { useMemo, useState } from "react";

export default function MarkdownTableGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState(() =>
    Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) => (r === 0 ? `Header ${c + 1}` : `Cell ${r},${c + 1}`))
    )
  );

  const updateCell = (r, c, value) => {
    setData((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = value;
      return next;
    });
  };

  const resize = (newRows, newCols) => {
    setRows(newRows);
    setCols(newCols);
    setData((prev) => {
      const next = Array.from({ length: newRows }, (_, r) =>
        Array.from({ length: newCols }, (_, c) => prev[r]?.[c] ?? (r === 0 ? `Header ${c + 1}` : ""))
      );
      return next;
    });
  };

  const markdown = useMemo(() => {
    const header = `| ${data[0].join(" | ")} |`;
    const separator = `| ${data[0].map(() => "---").join(" | ")} |`;
    const body = data.slice(1).map((row) => `| ${row.join(" | ")} |`).join("\n");
    return [header, separator, body].filter(Boolean).join("\n");
  }, [data]);

  const copy = () => navigator.clipboard.writeText(markdown);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Rows
          <input type="number" min="2" max="10" value={rows} onChange={(e) => resize(Number(e.target.value) || 2, cols)} className="w-16 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Columns
          <input type="number" min="1" max="8" value={cols} onChange={(e) => resize(rows, Number(e.target.value) || 1)} className="w-16 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="border-collapse">
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="p-1">
                    <input
                      value={cell}
                      onChange={(e) => updateCell(r, c, e.target.value)}
                      className={`w-28 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs ${r === 0 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-800 dark:text-slate-200"}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy Markdown</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre">
        <code>{markdown}</code>
      </pre>
    </div>
  );
}
