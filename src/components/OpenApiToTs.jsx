import { useMemo, useState } from "react";

const TYPE_MAP = { string: "string", integer: "number", number: "number", boolean: "boolean" };

function schemaToInterface(name, schema) {
  const lines = Object.entries(schema.properties || {}).map(([key, def]) => {
    const required = (schema.required || []).includes(key);
    const type = def.type === "array" ? `${TYPE_MAP[def.items?.type] || "any"}[]` : TYPE_MAP[def.type] || "any";
    return `  ${key}${required ? "" : "?"}: ${type};`;
  });
  return `interface ${name} {\n${lines.join("\n")}\n}`;
}

const SAMPLE = `{
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "required": ["id", "name"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "age": { "type": "integer" },
          "tags": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}`;

export default function OpenApiToTs() {
  const [input, setInput] = useState(SAMPLE);

  const { output, error } = useMemo(() => {
    try {
      const spec = JSON.parse(input);
      const schemas = spec.components?.schemas || {};
      const names = Object.keys(schemas);
      if (names.length === 0) return { output: "", error: "No schemas found under components.schemas." };
      const interfaces = names.map((name) => schemaToInterface(name, schemas[name]));
      return { output: interfaces.join("\n\n"), error: null };
    } catch (e) {
      return { output: "", error: "Invalid JSON — " + e.message };
    }
  }, [input]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
            <code>{output}</code>
          </pre>
        </>
      )}
      <p className="text-xs text-slate-500 mt-4">Reads schemas from components.schemas — handles basic types and arrays, not $ref references or oneOf/allOf compositions.</p>
    </div>
  );
}
