import { useMemo, useState } from "react";

export default function MigrationNameGenerator() {
  const [description, setDescription] = useState("add email verified column to users");
  const [style, setStyle] = useState("timestamp");

  const slug = description.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "_");

  const filename = useMemo(() => {
    if (style === "timestamp") {
      const now = new Date();
      const ts = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
      return `${ts}_${slug}.sql`;
    }
    if (style === "sequential") {
      return `0001_${slug}.sql`;
    }
    return `${Date.now()}_${slug}.js`;
  }, [slug, style]);

  const copy = () => navigator.clipboard.writeText(filename);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Migration description
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <div className="flex gap-2 mb-4">
        {[
          { key: "timestamp", label: "Timestamp (Rails/Django style)" },
          { key: "sequential", label: "Sequential number" },
          { key: "unix", label: "Unix timestamp (Node/Knex style)" },
        ].map((s) => (
          <button key={s.key} onClick={() => setStyle(s.key)} className={`text-sm px-3 py-1.5 rounded-lg border ${style === s.key ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{s.label}</button>
        ))}
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <code className="text-sm text-emerald-600 dark:text-emerald-400 break-all">{filename}</code>
      </div>
    </div>
  );
}
