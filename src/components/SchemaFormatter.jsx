import { useMemo, useState } from "react";

function formatSchema(schema) {
  let formatted = schema.replace(/\s+/g, " ").trim();
  let indent = 0;
  let output = "";
  for (let i = 0; i < formatted.length; i++) {
    const char = formatted[i];
    if (char === "{") {
      output += " {\n" + "  ".repeat(++indent);
    } else if (char === "}") {
      output += "\n" + "  ".repeat(--indent) + "}\n";
    } else if (char === " " && (formatted[i - 1] === "{" || formatted[i + 1] === "}")) {
      continue;
    } else {
      output += char;
    }
  }
  return output.replace(/\n{2,}/g, "\n").replace(/ +/g, " ").trim();
}

const SAMPLE = "type User { id: ID! name: String! email: String posts: [Post!]! } type Post { id: ID! title: String! author: User! }";

export default function SchemaFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => formatSchema(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
