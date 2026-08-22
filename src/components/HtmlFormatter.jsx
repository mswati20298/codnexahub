import { useMemo, useState } from "react";

function formatHtml(html) {
  const VOID_TAGS = new Set(["br", "hr", "img", "input", "meta", "link", "area", "base", "col", "embed", "source", "track", "wbr"]);
  let formatted = "";
  let indent = 0;
  const tokens = html.match(/<[^>]+>|[^<]+/g) || [];

  tokens.forEach((token) => {
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      formatted += "  ".repeat(indent) + token.trim() + "\n";
    } else if (token.startsWith("<")) {
      const tagName = token.match(/<([a-zA-Z0-9]+)/)?.[1]?.toLowerCase();
      const isSelfClosing = token.endsWith("/>") || VOID_TAGS.has(tagName);
      formatted += "  ".repeat(indent) + token.trim() + "\n";
      if (!isSelfClosing) indent++;
    } else if (token.trim()) {
      formatted += "  ".repeat(indent) + token.trim() + "\n";
    }
  });
  return formatted.trim();
}

const SAMPLE = "<div class=\"card\"><h2>Title</h2><p>Some text here.</p></div>";

export default function HtmlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => formatHtml(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
