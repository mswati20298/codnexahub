import { useState } from "react";

export default function UrlEncoder() {
  const [input, setInput] = useState("https://example.com/search?q=hello world&lang=en");
  const [mode, setMode] = useState("encode");

  let output = "";
  try {
    output = mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    output = "Invalid input for decoding.";
  }

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
