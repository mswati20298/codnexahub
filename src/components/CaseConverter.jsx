import { useMemo, useState } from "react";

function toWords(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

const CONVERTERS = {
  "UPPERCASE": (s) => s.toUpperCase(),
  "lowercase": (s) => s.toLowerCase(),
  "Title Case": (s) => toWords(s).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" "),
  "camelCase": (s) => { const w = toWords(s); return w.map((word, i) => i === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()).join(""); },
  "PascalCase": (s) => toWords(s).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(""),
  "snake_case": (s) => toWords(s).map((w) => w.toLowerCase()).join("_"),
  "kebab-case": (s) => toWords(s).map((w) => w.toLowerCase()).join("-"),
  "CONSTANT_CASE": (s) => toWords(s).map((w) => w.toUpperCase()).join("_"),
};

export default function CaseConverter() {
  const [input, setInput] = useState("hello world example");

  const results = useMemo(() => {
    return Object.entries(CONVERTERS).map(([name, fn]) => ({ name, value: fn(input) }));
  }, [input]);

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.name} onClick={() => copy(r.value)} className="cursor-pointer flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 hover:border-emerald-500">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{r.name}</p>
              <code className="text-sm text-emerald-600 dark:text-emerald-400">{r.value}</code>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-500">Copy</span>
          </div>
        ))}
      </div>
    </div>
  );
}
