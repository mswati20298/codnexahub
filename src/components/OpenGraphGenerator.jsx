import { useMemo, useState } from "react";

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState("My Page Title");
  const [description, setDescription] = useState("A short description for social previews.");
  const [image, setImage] = useState("https://example.com/og-image.jpg");
  const [url, setUrl] = useState("https://example.com");
  const [type, setType] = useState("website");

  const output = useMemo(() => {
    return [
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:type" content="${type}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${image}" />`,
    ].join("\n");
  }, [title, description, image, url, type]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="space-y-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Image URL
          <input value={image} onChange={(e) => setImage(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Page URL
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
