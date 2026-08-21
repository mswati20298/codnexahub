import { useMemo, useState } from "react";

function flatten(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function unflatten(flat) {
  const result = {};
  for (const key in flat) {
    const parts = key.split(".");
    let current = result;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        current[part] = flat[key];
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  }
  return result;
}

const SAMPLE = `{
  "user": {
    "name": "Alice",
    "address": { "city": "Mumbai", "zip": "400001" }
  }
}`;

export default function JsonFlattenTool() {
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState("flatten");

  const { output, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const result = mode === "flatten" ? flatten(parsed) : unflatten(parsed);
      return { output: JSON.stringify(result, null, 2), error: null };
    } catch (e) {
      return { output: "", error: "Invalid JSON — " + e.message };
    }
  }, [input, mode]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["flatten", "unflatten"].map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`text-sm px-3 py-1.5 rounded-lg border capitalize ${mode === m ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            {m}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={7} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 max-h-72">
            <code>{output}</code>
          </pre>
        </>
      )}
    </div>
  );
}
