import { useMemo, useState } from "react";

const CONVENTIONAL_RE = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([\w-]+\))?(!)?: .{1,100}$/;
const VALID_TYPES = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"];

function validate(message) {
  const firstLine = message.split("\n")[0];
  const issues = [];

  if (firstLine.length > 72) issues.push("First line exceeds 72 characters — consider shortening.");
  if (!CONVENTIONAL_RE.test(firstLine)) {
    const typeMatch = firstLine.match(/^(\w+)/);
    if (typeMatch && !VALID_TYPES.includes(typeMatch[1])) {
      issues.push(`"${typeMatch[1]}" is not a standard type — expected one of: ${VALID_TYPES.join(", ")}.`);
    } else if (!firstLine.includes(":")) {
      issues.push("Missing colon separator after type/scope.");
    } else {
      issues.push("Doesn't match Conventional Commits format: type(scope): description");
    }
  }
  if (firstLine.endsWith(".")) issues.push("Description shouldn't end with a period, by convention.");

  return issues;
}

export default function CommitValidator() {
  const [message, setMessage] = useState("feat(auth): add password reset flow");

  const issues = useMemo(() => validate(message), [message]);

  return (
    <div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm mb-4" />
      {issues.length === 0 ? (
        <p className="text-emerald-400 text-sm">✓ Valid Conventional Commits format</p>
      ) : (
        <ul className="space-y-1">
          {issues.map((issue, i) => (
            <li key={i} className="text-sm text-amber-300 bg-amber-950/40 border border-amber-900 rounded-lg px-3 py-2">{issue}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
