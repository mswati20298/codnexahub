import { useMemo, useState } from "react";
import { Search, Zap, Shield, Code2, RefreshCw } from "lucide-react";
import { tools, categories } from "../data/tools.js";
import { getCategoryMeta } from "../data/categoryMeta.js";
import CategoryIcon from "./CategoryIcon.jsx";

const TYPE_FILTERS = [
  { key: "all", label: "All Tools" },
  { key: "free", label: "Free" },
  { key: "byok", label: "BYOK" },
];

const categoryCounts = categories.map((cat) => ({
  name: cat,
  count: tools.filter((t) => t.category === cat).length,
}));

export default function ToolDirectory() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tools");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (activeCategory !== "All Tools" && tool.category !== activeCategory) return false;
      if (typeFilter === "free" && tool.byok) return false;
      if (typeFilter === "byok" && !tool.byok) return false;
      if (q) {
        const haystack = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, activeCategory, typeFilter]);

  const isFiltering = query.trim() !== "" || activeCategory !== "All Tools" || typeFilter !== "all";
  const displayTools = isFiltering ? filtered : filtered.slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-2 px-1">Categories</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory("All Tools")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === "All Tools"
                      ? "bg-emerald-50 dark:bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-200 dark:border-emerald-900"
                      : "text-slate-600 dark:text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-100 dark:bg-slate-900 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Code2 size={16} />
                    All Tools
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{tools.length}</span>
                </button>
                {categoryCounts.map((cat) => {
                  const meta = getCategoryMeta(cat.name);
                  const Icon = meta.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat.name
                          ? "bg-emerald-50 dark:bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-200 dark:border-emerald-900"
                          : "text-slate-600 dark:text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-100 dark:bg-slate-900 border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={16} className={activeCategory === cat.name ? "" : meta.text} />
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div id="tools">
          <section className="text-center py-12 sm:py-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-200 dark:border-emerald-900 rounded-full px-3 py-1 mb-5">
              <Zap size={12} />
              100% Free &middot; No Signup &middot; Works in Your Browser
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-900 dark:text-slate-100">
              Free tools for <span className="text-emerald-500">developers</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
              Fast, accurate, no-signup tools for working with AI APIs, JSON, SQL, and more &mdash; {tools.length} tools and counting.
            </p>

            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools (e.g. token counter, json formatter, api cost...)"
                  className="w-full bg-white dark:bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                {TYPE_FILTERS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTypeFilter(t.key)}
                    className={`text-sm px-4 py-1.5 rounded-lg border transition-colors ${
                      typeFilter === t.key
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "bg-white dark:bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-500 dark:text-slate-400 hover:border-emerald-400"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Category quick links (mobile-visible too) */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 lg:hidden">
            {["All Tools", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border ${
                  activeCategory === cat
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white dark:bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-500 dark:text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-900 dark:text-slate-100">
              {isFiltering ? `${filtered.length} tool${filtered.length !== 1 ? "s" : ""} found` : "Popular Tools"}
            </h2>
            {!isFiltering && (
              <button onClick={() => setActiveCategory("All Tools")} className="text-sm text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 hover:underline">
                View all &rarr;
              </button>
            )}
          </div>

          {displayTools.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 text-sm py-12 text-center">No tools match your search &mdash; try a different keyword or filter.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
              {displayTools.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white dark:bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CategoryIcon category={tool.category} size="md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 dark:text-emerald-400 transition-colors leading-snug">
                        {tool.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{tool.description}</p>
                  {tool.byok && (
                    <span className="inline-block text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-200 dark:border-amber-900">
                      BYOK
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Features bar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
            {[
              { icon: Zap, title: "100% Free", desc: "Every tool is free to use, forever." },
              { icon: Shield, title: "Privacy First", desc: "Nothing is stored. Runs in your browser." },
              { icon: Code2, title: "Developer Focused", desc: "Built by a developer, for developers." },
              { icon: RefreshCw, title: "Always Updated", desc: "New tools added regularly." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
                  <f.icon size={18} className="text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-900 dark:text-slate-100">{f.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
