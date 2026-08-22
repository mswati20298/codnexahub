import { useMemo, useState } from "react";

const ENTITIES = [
  { char: "<", entity: "&lt;", name: "Less than" },
  { char: ">", entity: "&gt;", name: "Greater than" },
  { char: "&", entity: "&amp;", name: "Ampersand" },
  { char: '"', entity: "&quot;", name: "Quote" },
  { char: "'", entity: "&#39;", name: "Apostrophe" },
  { char: "©", entity: "&copy;", name: "Copyright" },
  { char: "®", entity: "&reg;", name: "Registered trademark" },
  { char: "™", entity: "&trade;", name: "Trademark" },
  { char: "€", entity: "&euro;", name: "Euro sign" },
  { char: "£", entity: "&pound;", name: "Pound sign" },
  { char: "¥", entity: "&yen;", name: "Yen sign" },
  { char: "°", entity: "&deg;", name: "Degree sign" },
  { char: "±", entity: "&plusmn;", name: "Plus-minus" },
  { char: "×", entity: "&times;", name: "Multiplication sign" },
  { char: "÷", entity: "&divide;", name: "Division sign" },
  { char: "\u00A0", entity: "&nbsp;", name: "Non-breaking space" },
  { char: "—", entity: "&mdash;", name: "Em dash" },
  { char: "–", entity: "&ndash;", name: "En dash" },
  { char: "…", entity: "&hellip;", name: "Ellipsis" },
];

export default function EntityReference() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return ENTITIES;
    const q = query.toLowerCase();
    return ENTITIES.filter((e) => e.name.toLowerCase().includes(q) || e.entity.includes(q));
  }, [query]);

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search entities..."
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 mb-4"
      />
      <div className="grid sm:grid-cols-2 gap-2">
        {filtered.map((e) => (
          <div key={e.entity} onClick={() => copy(e.entity)} className="cursor-pointer flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 hover:border-emerald-500">
            <div>
              <span className="text-lg text-slate-900 dark:text-slate-100 mr-2">{e.char}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{e.name}</span>
            </div>
            <code className="text-sm text-emerald-600 dark:text-emerald-400">{e.entity}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
