import { useEffect, useMemo, useState } from "react";
import { Search, LayoutGrid, List } from "lucide-react";

export default function BlogDirectory({ posts }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("codnexahub_blog_view");
      if (saved === "grid" || saved === "list") setView(saved);
    } catch {}
  }, []);

  const setViewMode = (mode) => {
    setView(mode);
    try {
      localStorage.setItem("codnexahub_blog_view", mode);
    } catch {}
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => `${post.title} ${post.description}`.toLowerCase().includes(q));
  }, [query, posts]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-label="List view"
            aria-pressed={view === "list"}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors ${
              view === "list"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm font-medium"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <List size={15} />
            List
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md transition-colors ${
              view === "grid"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm font-medium"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <LayoutGrid size={15} />
            Grid
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-sm py-12 text-center">
          No posts match your search &mdash; try a different keyword.
        </p>
      ) : (
        <div className={view === "grid" ? "grid sm:grid-cols-2 gap-4" : "space-y-4"}>
          {filtered.map((post) => (
            <a
              key={post.href}
              href={post.href}
              className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md active:scale-[0.98] transition-all"
            >
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">{post.date}</p>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{post.title}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{post.description}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
