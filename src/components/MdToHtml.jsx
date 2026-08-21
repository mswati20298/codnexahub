import { useMemo, useState } from "react";

function mdToHtml(md) {
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\s*[-*]\s+(.*)$/gim, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`)
    .split("\n\n")
    .map((block) => (/^<(h\d|ul|li)/.test(block.trim()) ? block : `<p>${block.trim()}</p>`))
    .join("\n");
  return html.trim();
}

const SAMPLE = `# Hello World

This is **bold** and this is *italic*.

- Item one
- Item two

[A link](https://example.com)`;

export default function MdToHtml() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => mdToHtml(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy HTML</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
      <p className="text-xs text-slate-500 mt-4">Handles headers, bold/italic, inline code, links, and simple lists — not tables, nested lists, or blockquotes.</p>
    </div>
  );
}
