import { useMemo, useState } from "react";

const TYPES = [
  { type: "application/json", desc: "JSON data — the most common API format" },
  { type: "application/xml", desc: "XML data" },
  { type: "application/x-www-form-urlencoded", desc: "Form data, URL-encoded (key=value&key2=value2)" },
  { type: "multipart/form-data", desc: "Form data including file uploads" },
  { type: "text/plain", desc: "Plain text" },
  { type: "text/html", desc: "HTML document" },
  { type: "text/css", desc: "CSS stylesheet" },
  { type: "application/javascript", desc: "JavaScript file" },
  { type: "application/pdf", desc: "PDF document" },
  { type: "image/png", desc: "PNG image" },
  { type: "image/jpeg", desc: "JPEG image" },
  { type: "image/svg+xml", desc: "SVG vector image" },
  { type: "application/octet-stream", desc: "Generic binary data" },
  { type: "text/event-stream", desc: "Server-Sent Events stream" },
];

export default function ContentTypeReference() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return TYPES;
    const q = query.toLowerCase();
    return TYPES.filter((t) => t.type.includes(q) || t.desc.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search content types..." className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 mb-4" />
      <div className="space-y-1">
        {filtered.map((t) => (
          <div key={t.type} className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
            <code className="text-sm text-emerald-600 dark:text-emerald-400">{t.type}</code>
            <span className="text-xs text-slate-500 dark:text-slate-400">{t.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
