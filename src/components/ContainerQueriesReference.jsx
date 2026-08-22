export default function ContainerQueriesReference() {
  return (
    <div className="space-y-4">
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
        <code>{`.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-title {
    font-size: 1.5rem;
  }
}`}</code>
      </pre>
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <p><code className="text-emerald-600 dark:text-emerald-400">container-type: inline-size</code> — makes an element a query container based on its own width, independent of the viewport.</p>
        <p><code className="text-emerald-600 dark:text-emerald-400">@container</code> — styles apply based on the nearest ancestor container's size, not the browser window.</p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500">Container queries solve a problem media queries can't — a component styled based on the space it's actually given (e.g. in a sidebar vs. full width), regardless of overall viewport size.</p>
    </div>
  );
}
