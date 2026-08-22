import { useMemo, useState } from "react";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("My Page Title");
  const [description, setDescription] = useState("A short, compelling description of the page.");
  const [author, setAuthor] = useState("");
  const [viewport, setViewport] = useState(true);

  const output = useMemo(() => {
    const lines = [
      `<title>${title}</title>`,
      `<meta name="description" content="${description}" />`,
    ];
    if (author) lines.push(`<meta name="author" content="${author}" />`);
    if (viewport) lines.push(`<meta name="viewport" content="width=device-width, initial-scale=1" />`);
    return lines.join("\n");
  }, [title, description, author, viewport]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="space-y-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Author (optional)
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={viewport} onChange={(e) => setViewport(e.target.checked)} />
          Include mobile viewport tag
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
