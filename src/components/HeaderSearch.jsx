import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { tools } from "../data/tools.js";
import CategoryIcon from "./CategoryIcon.jsx";

export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const results = query.trim()
    ? tools
        .filter((t) => `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 7)
    : [];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md hidden sm:block">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search tools..."
          className="w-full text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-8 py-1.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 px-4 py-3">No tools match "{query}"</p>
          ) : (
            results.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <CategoryIcon category={tool.category} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{tool.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{tool.category}</p>
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
