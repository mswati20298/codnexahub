import { useMemo, useState } from "react";

function formatGraphQL(query) {
  let formatted = query.replace(/\s+/g, " ").trim();
  let indent = 0;
  let output = "";
  for (let i = 0; i < formatted.length; i++) {
    const char = formatted[i];
    if (char === "{") {
      output += " {\n" + "  ".repeat(++indent);
    } else if (char === "}") {
      output += "\n" + "  ".repeat(--indent) + "}";
    } else if (char === " " && formatted[i - 1] === "{") {
      continue;
    } else {
      output += char;
    }
  }
  return output.replace(/\n\s*\n/g, "\n").replace(/ +/g, " ").trim();
}

const SAMPLE = "query { user(id: 1) { name email posts { title createdAt } } }";

export default function GraphqlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => formatGraphQL(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
