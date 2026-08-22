import { useState } from "react";

function escapeHtml(str) {
  const div = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
  return str.replace(/[&<>"'/]/g, (c) => div[c]);
}

function unescapeHtml(str) {
  const div = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x2F;": "/" };
  return str.replace(/&(amp|lt|gt|quot|#39|#x2F);/g, (m) => div[m]);
}

export default function HtmlEscapeTool() {
  const [input, setInput] = useState('<script>alert("xss")</script>');
  const [mode, setMode] = useState("escape");

  const output = mode === "escape" ? escapeHtml(input) : unescapeHtml(input);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["escape", "unescape"].map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`text-sm px-3 py-1.5 rounded-lg border capitalize ${mode === m ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{m}</button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all">
        <code>{output}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Escaping user input before rendering as HTML is a core defense against XSS — this covers the standard 6-character escape set.</p>
    </div>
  );
}
