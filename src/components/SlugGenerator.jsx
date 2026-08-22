import { useMemo, useState } from "react";

function slugify(text, separator, lowercase) {
  let s = text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-zA-Z0-9\s-_]/g, "") // strip special chars
    .trim()
    .replace(/[\s_-]+/g, separator);

  if (lowercase) s = s.toLowerCase();
  return s;
}

export default function SlugGenerator() {
  const [text, setText] = useState("Hello World! This is a Test Title — 2026");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(
    () => slugify(text, separator, lowercase),
    [text, separator, lowercase]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Text to slugify
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Separator
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />
          Lowercase
        </label>
      </div>

      <div
        onClick={handleCopy}
        className="cursor-pointer bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-3 hover:border-emerald-500 flex justify-between items-center"
      >
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400 break-all">{slug}</span>
        <span className="text-xs text-slate-500 dark:text-slate-500 ml-2 whitespace-nowrap">
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </div>
    </div>
  );
}
