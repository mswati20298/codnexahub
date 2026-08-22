import { useMemo, useState } from "react";

// Minimal YAML serializer (handles objects, arrays, primitives — not anchors/multi-doc).
function toYaml(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => `${pad}- ${toYamlValue(item, indent)}`).join("\n");
  }
  if (typeof obj === "object") {
    return Object.entries(obj)
      .map(([k, v]) => {
        if (v && typeof v === "object") {
          return `${pad}${k}:\n${toYaml(v, indent + 1)}`;
        }
        return `${pad}${k}: ${toYamlValue(v, indent)}`;
      })
      .join("\n");
  }
  return String(obj);
}
function toYamlValue(v) {
  if (typeof v === "string") return /[:#\n]/.test(v) ? `"${v}"` : v;
  if (v === null) return "null";
  if (typeof v === "object") return "\n" + toYaml(v, 1);
  return String(v);
}

// Minimal YAML parser (handles simple key: value and nested indentation, no anchors).
function parseYaml(text) {
  const lines = text.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
  const root = {};
  const stack = [{ indent: -1, obj: root }];

  lines.forEach((line) => {
    const indent = line.match(/^\s*/)[0].length;
    const trimmed = line.trim();
    const isListItem = trimmed.startsWith("- ");
    const content = isListItem ? trimmed.slice(2) : trimmed;
    const [key, ...rest] = content.split(":");
    const value = rest.join(":").trim();

    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    const parent = stack[stack.length - 1].obj;

    if (value === "") {
      const child = {};
      parent[key.trim()] = child;
      stack.push({ indent, obj: child });
    } else {
      let parsed = value;
      if (value === "true") parsed = true;
      else if (value === "false") parsed = false;
      else if (!isNaN(value) && value !== "") parsed = Number(value);
      else parsed = value.replace(/^"|"$/g, "");
      parent[key.trim()] = parsed;
    }
  });
  return root;
}

const SAMPLE_JSON = `{
  "name": "my-app",
  "version": "1.0.0",
  "config": { "port": 3000, "debug": true }
}`;

export default function YamlJsonConverter() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [mode, setMode] = useState("json-to-yaml");

  const { output, error } = useMemo(() => {
    try {
      if (mode === "json-to-yaml") {
        return { output: toYaml(JSON.parse(input)), error: null };
      } else {
        return { output: JSON.stringify(parseYaml(input), null, 2), error: null };
      }
    } catch (e) {
      return { output: "", error: "Couldn't parse input — " + e.message };
    }
  }, [input, mode]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("json-to-yaml")} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === "json-to-yaml" ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>JSON → YAML</button>
        <button onClick={() => setMode("yaml-to-json")} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === "yaml-to-json" ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>YAML → JSON</button>
      </div>
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
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Handles common cases (objects, arrays, strings, numbers, booleans) — not the full YAML spec (anchors, multi-doc, etc.).</p>
    </div>
  );
}
