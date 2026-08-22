const TEMPLATE = `## What does this PR do?


## Why is this needed?


## How was this tested?


## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or noted below)

## Screenshots (if applicable)
`;

export default function PrTemplateGenerator() {
  const copy = () => navigator.clipboard.writeText(TEMPLATE);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{TEMPLATE}</code>
      </pre>
    </div>
  );
}
