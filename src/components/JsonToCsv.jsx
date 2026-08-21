import { useMemo, useState } from "react";

const SAMPLE = `[
  {"name": "Alice", "age": 30, "city": "Mumbai"},
  {"name": "Bob", "age": 25, "city": "Delhi"}
]`;

function toCsv(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  const headers = [...new Set(arr.flatMap((row) => Object.keys(row)))];
  const escape = (val) => {
    const s = val === undefined || val === null ? "" : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(",")];
  arr.forEach((row) => {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  });
  return lines.join("\n");
}

export default function JsonToCsv() {
  const [input, setInput] = useState(SAMPLE);

  const { output, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) return { output: "", error: "Input must be a JSON array of objects." };
      return { output: toCsv(parsed), error: null };
    } catch (e) {
      return { output: "", error: "Invalid JSON — " + e.message };
    }
  }, [input]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy CSV</button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
            <code>{output}</code>
          </pre>
        </>
      )}
    </div>
  );
}
