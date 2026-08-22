import { useMemo, useState } from "react";

function checkEndpoint(path) {
  const issues = [];
  if (/[A-Z]/.test(path)) issues.push("Contains uppercase letters — REST paths conventionally use lowercase.");
  if (/_/.test(path)) issues.push("Contains underscores — hyphens are more conventional in URLs (kebab-case).");
  const segments = path.split("/").filter(Boolean);
  segments.forEach((seg) => {
    if (/^(get|create|update|delete|fetch)/i.test(seg)) {
      issues.push(`Segment "${seg}" starts with a verb — REST paths should be noun-based; use the HTTP method to express the action instead.`);
    }
  });
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && !/^[:{]/.test(lastSegment) && /s$/.test(lastSegment) === false && !/\{.*\}|:\w+/.test(path)) {
    issues.push(`Collection endpoint "${lastSegment}" isn't plural — conventionally, collections use plural nouns (e.g. /users not /user).`);
  }
  if (!path.startsWith("/")) issues.push("Path should start with /");
  return issues;
}

export default function EndpointNamingChecker() {
  const [path, setPath] = useState("/api/get_UserProfile");

  const issues = useMemo(() => checkEndpoint(path), [path]);

  return (
    <div>
      <input
        type="text"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {issues.length === 0 ? (
        <p className="text-emerald-600 dark:text-emerald-400 text-sm">Looks conventional — no issues found.</p>
      ) : (
        <ul className="space-y-1">
          {issues.map((issue, i) => (
            <li key={i} className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">{issue}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Based on common REST conventions — these are guidelines, not hard rules, and some APIs intentionally deviate.</p>
    </div>
  );
}
