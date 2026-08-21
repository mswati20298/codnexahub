import { useMemo, useState } from "react";

const SAMPLE_JSON = `{
  "user": {
    "name": "Alice",
    "roles": ["admin", "editor"],
    "address": { "city": "Mumbai" }
  }
}`;

function getPath(obj, path) {
  const cleaned = path.replace(/^\$\.?/, "").replace(/\[(\d+)\]/g, ".$1");
  if (!cleaned) return obj;
  const parts = cleaned.split(".").filter(Boolean);
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

export default function JsonPathTester() {
  const [json, setJson] = useState(SAMPLE_JSON);
  const [path, setPath] = useState("$.user.roles[0]");

  const { result, error } = useMemo(() => {
    try {
      const obj = JSON.parse(json);
      const value = getPath(obj, path);
      return { result: value === undefined ? "undefined (path not found)" : JSON.stringify(value, null, 2), error: null };
    } catch (e) {
      return { result: "", error: "Invalid JSON — " + e.message };
    }
  }, [json, path]);

  return (
    <div>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={7} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <input
        type="text"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="$.user.name"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200">
          <code>{result}</code>
        </pre>
      )}
      <p className="text-xs text-slate-500 mt-4">Supports simple dot notation and array indices, e.g. $.user.roles[0] — not the full JSONPath spec.</p>
    </div>
  );
}
