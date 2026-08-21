import { useMemo, useState } from "react";

const SAMPLE = `{
  "openapi": "3.0.0",
  "info": { "title": "My API", "version": "1.0.0" },
  "paths": {
    "/users": {
      "get": { "summary": "List users", "responses": { "200": { "description": "OK" } } }
    }
  }
}`;

function validate(spec) {
  const issues = [];
  if (!spec.openapi && !spec.swagger) issues.push("Missing 'openapi' (or 'swagger') version field.");
  if (!spec.info) issues.push("Missing required 'info' object.");
  else {
    if (!spec.info.title) issues.push("'info.title' is required.");
    if (!spec.info.version) issues.push("'info.version' is required.");
  }
  if (!spec.paths || Object.keys(spec.paths).length === 0) issues.push("'paths' object is missing or empty.");
  else {
    Object.entries(spec.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, def]) => {
        if (!def.responses) issues.push(`${method.toUpperCase()} ${path} is missing 'responses'.`);
      });
    });
  }
  return issues;
}

export default function OpenApiValidator() {
  const [input, setInput] = useState(SAMPLE);

  const { issues, error } = useMemo(() => {
    try {
      const spec = JSON.parse(input);
      return { issues: validate(spec), error: null };
    } catch (e) {
      return { issues: [], error: "Invalid JSON — " + e.message };
    }
  }, [input]);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : issues.length === 0 ? (
        <p className="text-emerald-400 text-sm">No structural issues found.</p>
      ) : (
        <ul className="space-y-1">
          {issues.map((issue, i) => (
            <li key={i} className="text-sm text-red-300 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">{issue}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500 mt-4">Checks basic structural requirements only — not a full OpenAPI schema validator.</p>
    </div>
  );
}
