import { useMemo, useState } from "react";

const SAMPLE_SCHEMA = `{
  "type": "object",
  "required": ["name", "age"],
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  }
}`;
const SAMPLE_DATA = `{
  "name": "Alice",
  "age": "thirty"
}`;

function validateBasic(schema, data) {
  const errors = [];
  if (schema.type === "object" && (typeof data !== "object" || data === null || Array.isArray(data))) {
    errors.push("Root value is not an object.");
    return errors;
  }
  (schema.required || []).forEach((key) => {
    if (!(key in data)) errors.push(`Missing required field "${key}".`);
  });
  Object.entries(schema.properties || {}).forEach(([key, def]) => {
    if (!(key in data)) return;
    const value = data[key];
    const actualType = Array.isArray(value) ? "array" : typeof value;
    if (def.type && actualType !== def.type) {
      errors.push(`Field "${key}" should be ${def.type} but got ${actualType}.`);
    }
  });
  return errors;
}

export default function StructuredOutputValidator() {
  const [schemaText, setSchemaText] = useState(SAMPLE_SCHEMA);
  const [dataText, setDataText] = useState(SAMPLE_DATA);

  const { errors, parseError } = useMemo(() => {
    try {
      const schema = JSON.parse(schemaText);
      const data = JSON.parse(dataText);
      return { errors: validateBasic(schema, data), parseError: null };
    } catch (e) {
      return { errors: [], parseError: "Invalid JSON — " + e.message };
    }
  }, [schemaText, dataText]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Expected schema
          <textarea value={schemaText} onChange={(e) => setSchemaText(e.target.value)} rows={8} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          AI output (actual JSON)
          <textarea value={dataText} onChange={(e) => setDataText(e.target.value)} rows={8} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
        </label>
      </div>
      {parseError ? (
        <p className="text-red-600 dark:text-red-400 text-sm">{parseError}</p>
      ) : errors.length === 0 ? (
        <p className="text-emerald-600 dark:text-emerald-400 text-sm">Output matches the schema.</p>
      ) : (
        <ul className="space-y-1">
          {errors.map((e, i) => (
            <li key={i} className="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2">{e}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Checks required fields and basic type matching — not the full JSON Schema spec (patterns, enums, nested arrays of objects, etc.).</p>
    </div>
  );
}
