import { useMemo, useState } from "react";

function inferType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "any[]";
    return `${inferType(value[0])}[]`;
  }
  switch (typeof value) {
    case "string": return "string";
    case "number": return "number";
    case "boolean": return "boolean";
    case "object": return "object"; // handled separately for nested interfaces
    default: return "any";
  }
}

function toInterface(obj, name, interfaces) {
  const lines = [];
  for (const key in obj) {
    const value = obj[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedName = name + key.charAt(0).toUpperCase() + key.slice(1);
      toInterface(value, nestedName, interfaces);
      lines.push(`  ${key}: ${nestedName};`);
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
      const nestedName = name + key.charAt(0).toUpperCase() + key.slice(1);
      toInterface(value[0], nestedName, interfaces);
      lines.push(`  ${key}: ${nestedName}[];`);
    } else {
      lines.push(`  ${key}: ${inferType(value)};`);
    }
  }
  interfaces.push(`interface ${name} {\n${lines.join("\n")}\n}`);
}

const SAMPLE = `{
  "id": 1,
  "name": "Alice",
  "active": true,
  "address": { "city": "Mumbai" }
}`;

export default function JsonToTypescript() {
  const [input, setInput] = useState(SAMPLE);
  const [rootName, setRootName] = useState("RootObject");

  const { output, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const interfaces = [];
      toInterface(parsed, rootName, interfaces);
      return { output: interfaces.reverse().join("\n\n"), error: null };
    } catch (e) {
      return { output: "", error: "Invalid JSON — " + e.message };
    }
  }, [input, rootName]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4 max-w-xs">
        Root interface name
        <input value={rootName} onChange={(e) => setRootName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono" />
      </label>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={7} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      {error ? (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
          </div>
          <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            <code>{output}</code>
          </pre>
        </>
      )}
    </div>
  );
}
