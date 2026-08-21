import { useMemo, useState } from "react";

const SAMPLE_ENV = `API_KEY=sk-abc123
PORT = 3000
DEBUG=true
# comment line
DATABASE URL=postgres://localhost
EMPTY_VALUE=
DUPLICATE_KEY=1
DUPLICATE_KEY=2`;

function validateEnv(content) {
  const lines = content.split("\n");
  const issues = [];
  const seenKeys = new Set();

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const line = rawLine.trim();

    if (line === "" || line.startsWith("#")) return;

    if (!line.includes("=")) {
      issues.push({ line: lineNum, type: "error", message: `No "=" found — not a valid KEY=VALUE line.` });
      return;
    }

    const eqIndex = line.indexOf("=");
    const key = line.slice(0, eqIndex);
    const value = line.slice(eqIndex + 1);

    if (/\s/.test(key.trim()) === false && / /.test(key)) {
      issues.push({ line: lineNum, type: "error", message: `Key "${key}" contains a space — env keys can't have spaces.` });
    }

    if (key !== key.trim()) {
      issues.push({ line: lineNum, type: "warning", message: `Key has leading/trailing whitespace.` });
    }

    if (!/^[A-Z_][A-Z0-9_]*$/i.test(key.trim())) {
      issues.push({ line: lineNum, type: "warning", message: `Key "${key.trim()}" uses non-standard characters (recommended: letters, numbers, underscores).` });
    }

    if (value.trim() === "") {
      issues.push({ line: lineNum, type: "warning", message: `Key "${key.trim()}" has an empty value.` });
    }

    const normalizedKey = key.trim().toUpperCase();
    if (seenKeys.has(normalizedKey)) {
      issues.push({ line: lineNum, type: "error", message: `Duplicate key "${key.trim()}" — later value will silently override earlier one.` });
    }
    seenKeys.add(normalizedKey);
  });

  return issues;
}

export default function EnvValidator() {
  const [content, setContent] = useState(SAMPLE_ENV);

  const issues = useMemo(() => validateEnv(content), [content]);
  const errorCount = issues.filter((i) => i.type === "error").length;
  const warningCount = issues.filter((i) => i.type === "warning").length;

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        spellCheck={false}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />

      <div className="flex gap-4 text-sm mb-4">
        <span className={errorCount > 0 ? "text-red-400" : "text-slate-500"}>
          {errorCount} error{errorCount !== 1 ? "s" : ""}
        </span>
        <span className={warningCount > 0 ? "text-amber-400" : "text-slate-500"}>
          {warningCount} warning{warningCount !== 1 ? "s" : ""}
        </span>
      </div>

      {issues.length === 0 ? (
        <p className="text-emerald-400 text-sm">No issues found.</p>
      ) : (
        <ul className="space-y-2">
          {issues.map((issue, i) => (
            <li
              key={i}
              className={`text-sm rounded-lg px-3 py-2 border ${
                issue.type === "error"
                  ? "border-red-900 bg-red-950/40 text-red-300"
                  : "border-amber-900 bg-amber-950/40 text-amber-300"
              }`}
            >
              Line {issue.line}: {issue.message}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-slate-500 mt-4">
        This checks syntax only — nothing is sent anywhere. Paste your
        .env file with confidence; validation runs entirely in your browser.
      </p>
    </div>
  );
}
