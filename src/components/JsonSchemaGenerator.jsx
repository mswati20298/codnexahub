import { useMemo, useState } from "react";

const SAMPLE_JSON = `{
  "name": "Alice",
  "age": 30,
  "isActive": true,
  "tags": ["admin", "user"],
  "address": {
    "city": "Mumbai",
    "zip": "400001"
  }
}`;

function inferSchema(value) {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    return {
      type: "array",
      items: value.length > 0 ? inferSchema(value[0]) : {},
    };
  }
  switch (typeof value) {
    case "string":
      return { type: "string" };
    case "number":
      return { type: Number.isInteger(value) ? "integer" : "number" };
    case "boolean":
      return { type: "boolean" };
    case "object": {
      const properties = {};
      const required = [];
      for (const key of Object.keys(value)) {
        properties[key] = inferSchema(value[key]);
        required.push(key);
      }
      return { type: "object", properties, required };
    }
    default:
      return {};
  }
}

export default function JsonSchemaGenerator() {
  const [input, setInput] = useState(SAMPLE_JSON);

  const { schema, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const inferred = inferSchema(parsed);
      return {
        schema: JSON.stringify(
          { $schema: "http://json-schema.org/draft-07/schema#", ...inferred },
          null,
          2
        ),
        error: null,
      };
    } catch (e) {
      return { schema: "", error: "Invalid JSON — check for missing quotes, commas, or brackets." };
    }
  }, [input]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Paste a sample JSON object
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200">
          <code>{schema}</code>
        </pre>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Schema is inferred from your sample's structure and types — review
        it and adjust constraints (min/max, patterns, enums) manually as
        needed.
      </p>
    </div>
  );
}
