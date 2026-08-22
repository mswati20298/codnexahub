const CHECKLIST = [
  { category: "Before promoting", items: [
    "All tests pass in the current environment, including integration tests.",
    "Changes have been code-reviewed and approved.",
    "Database migrations (if any) are backward-compatible or a rollback plan exists.",
    "Feature flags are set correctly for the target environment.",
  ]},
  { category: "During promotion", items: [
    "Deployment is monitored in real time (logs, error rates, latency).",
    "Smoke tests run against the newly deployed environment.",
    "Rollback procedure is ready and tested, not just documented.",
  ]},
  { category: "After promoting", items: [
    "Key metrics are compared against baseline for at least one full traffic cycle.",
    "Stakeholders are notified of the successful deployment.",
    "Deployment is logged/tagged for traceability (git tag, changelog entry).",
  ]},
];

export default function PromotionChecklist() {
  return (
    <div className="space-y-6">
      {CHECKLIST.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">{group.category}</h3>
          <ul className="space-y-2">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" className="mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
