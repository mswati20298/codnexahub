import { useMemo, useState } from "react";
import { promptTemplates, categories } from "../data/promptTemplates.js";

export default function PromptTemplateLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(promptTemplates[0].id);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? promptTemplates
      : promptTemplates.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const selected =
    promptTemplates.find((t) => t.id === selectedId) || filtered[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selected.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              activeCategory === cat
                ? "bg-emerald-600 border-emerald-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <ul className="sm:col-span-1 space-y-1 max-h-80 overflow-y-auto pr-1">
          {filtered.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  selected?.id === t.id
                    ? "bg-emerald-100 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 border border-transparent"
                }`}
              >
                {t.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="sm:col-span-2">
          {selected && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">{selected.title}</h3>
                <button
                  onClick={handleCopy}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                <code>{selected.template}</code>
              </pre>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Replace the <code>{"{placeholders}"}</code> with your actual content before sending.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
