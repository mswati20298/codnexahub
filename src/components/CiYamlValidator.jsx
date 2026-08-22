import { useMemo, useState } from "react";

const SAMPLE = `name: CI
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test`;

function validateYamlStructure(text) {
  const issues = [];
  if (!/^name:/m.test(text)) issues.push("Missing 'name:' field at the top level.");
  if (!/^on:/m.test(text)) issues.push("Missing 'on:' trigger definition.");
  if (!/^jobs:/m.test(text)) issues.push("Missing 'jobs:' section.");
  if (!/runs-on:/.test(text)) issues.push("No job specifies 'runs-on:' — required for every job.");
  if (!/steps:/.test(text)) issues.push("No 'steps:' found under a job.");

  // Rough indentation consistency check (tabs mixed with spaces)
  if (/\t/.test(text)) issues.push("Contains tab characters — YAML requires consistent space indentation.");

  return issues;
}

export default function CiYamlValidator() {
  const [input, setInput] = useState(SAMPLE);
  const issues = useMemo(() => validateYamlStructure(input), [input]);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      {issues.length === 0 ? (
        <p className="text-emerald-600 dark:text-emerald-400 text-sm">Basic structure looks valid.</p>
      ) : (
        <ul className="space-y-1">
          {issues.map((issue, i) => (
            <li key={i} className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2">{issue}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Checks common GitHub Actions structural requirements only — not a full YAML syntax parser.</p>
    </div>
  );
}
