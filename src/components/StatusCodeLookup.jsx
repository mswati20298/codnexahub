import { useMemo, useState } from "react";
import { statusCodes } from "../data/statusCodes.js";

const CATEGORY_COLORS = {
  Success: "text-emerald-400 border-emerald-900 bg-emerald-950/40",
  Redirection: "text-sky-400 border-sky-900 bg-sky-950/40",
  "Client Error": "text-amber-400 border-amber-900 bg-amber-950/40",
  "Server Error": "text-red-400 border-red-900 bg-red-950/40",
};

export default function StatusCodeLookup() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return statusCodes;
    return statusCodes.filter(
      (s) =>
        String(s.code).includes(q) ||
        s.text.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by code or keyword (e.g. 404, rate limit, unauthorized)"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-slate-500 text-sm">No matching status codes.</p>
        )}
        {filtered.map((s) => (
          <div
            key={s.code}
            className={`rounded-lg border px-4 py-3 ${CATEGORY_COLORS[s.category]}`}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold">{s.code}</span>
              <span className="font-medium">{s.text}</span>
              <span className="text-xs opacity-70 ml-auto">{s.category}</span>
            </div>
            <p className="text-slate-300 text-sm mt-1">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
