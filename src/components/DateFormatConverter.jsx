import { useMemo, useState } from "react";

function pad(n) { return String(n).padStart(2, "0"); }

function formatDate(date, fmt) {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  switch (fmt) {
    case "ISO 8601": return date.toISOString();
    case "YYYY-MM-DD": return `${y}-${m}-${d}`;
    case "DD/MM/YYYY": return `${d}/${m}/${y}`;
    case "MM/DD/YYYY": return `${m}/${d}/${y}`;
    case "DD Mon YYYY": return `${d} ${monthNames[date.getMonth()]} ${y}`;
    case "YYYY-MM-DD HH:mm:ss": return `${y}-${m}-${d} ${h}:${min}:${s}`;
    case "RFC 2822": return date.toUTCString();
    case "Unix timestamp": return String(Math.floor(date.getTime() / 1000));
    default: return date.toString();
  }
}

const FORMATS = ["ISO 8601", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY", "DD Mon YYYY", "YYYY-MM-DD HH:mm:ss", "RFC 2822", "Unix timestamp"];

export default function DateFormatConverter() {
  const [input, setInput] = useState(new Date().toISOString());

  const date = useMemo(() => new Date(input), [input]);
  const isValid = !Number.isNaN(date.getTime());

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
      />
      {!isValid ? (
        <p className="text-red-600 dark:text-red-400 text-sm">Couldn't parse this as a date.</p>
      ) : (
        <div className="space-y-2">
          {FORMATS.map((fmt) => (
            <div key={fmt} className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">{fmt}</span>
              <code className="text-sm text-emerald-600 dark:text-emerald-400">{formatDate(date, fmt)}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
