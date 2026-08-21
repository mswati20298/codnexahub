import { useState } from "react";

const ENTITY_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const REVERSE_MAP = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" };

function encode(str) {
  return str.replace(/[&<>"']/g, (c) => ENTITY_MAP[c]);
}
function decode(str) {
  return str.replace(/&(amp|lt|gt|quot|#39|apos);/g, (m) => REVERSE_MAP[m]);
}

export default function HtmlEntityTool() {
  const [input, setInput] = useState('<div class="box">Tom & Jerry\'s "great" day</div>');
  const [mode, setMode] = useState("encode");

  const output = mode === "encode" ? encode(input) : decode(input);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["encode", "decode"].map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === m ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            {m === "encode" ? "Encode" : "Decode"}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap break-all">
        <code>{output}</code>
      </pre>
    </div>
  );
}
