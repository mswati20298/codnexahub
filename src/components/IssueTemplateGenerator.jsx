import { useMemo, useState } from "react";

const TEMPLATES = {
  bug: `## Description
[Describe the bug clearly and concisely]

## Steps to Reproduce
1.
2.
3.

## Expected Behavior


## Actual Behavior


## Environment
- OS:
- Browser/Version:
- App Version:`,
  feature: `## Problem
[What problem does this solve?]

## Proposed Solution


## Alternatives Considered


## Additional Context`,
};

export default function IssueTemplateGenerator() {
  const [type, setType] = useState("bug");
  const output = useMemo(() => TEMPLATES[type], [type]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["bug", "feature"].map((t) => (
          <button key={t} onClick={() => setType(t)} className={`text-sm px-3 py-1.5 rounded-lg border capitalize ${type === t ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{t} report</button>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
