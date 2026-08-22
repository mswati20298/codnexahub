import { useMemo, useState } from "react";

const ISO_RE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;

export default function Iso8601Validator() {
  const [input, setInput] = useState(new Date().toISOString());

  const result = useMemo(() => {
    const isValidFormat = ISO_RE.test(input.trim());
    const date = new Date(input);
    const isValidDate = !Number.isNaN(date.getTime());
    return { isValidFormat, isValidDate, date: isValidDate ? date : null };
  }, [input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
      />
      <div className={`text-sm px-4 py-3 rounded-lg border ${result.isValidFormat && result.isValidDate ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" : "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300"}`}>
        {result.isValidFormat && result.isValidDate ? "Valid ISO 8601 date" : "Not a valid ISO 8601 string"}
      </div>
      {result.date && (
        <div className="mt-4 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <p>UTC: {result.date.toUTCString()}</p>
          <p>Local: {result.date.toLocaleString()}</p>
          <p>Unix timestamp: {Math.floor(result.date.getTime() / 1000)}</p>
        </div>
      )}
    </div>
  );
}
