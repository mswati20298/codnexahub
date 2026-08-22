const CHECKLIST = [
  { category: "Choosing a strategy", items: [
    "Versioning approach decided: URL path (/v1/), header, or query param — and documented consistently.",
    "Breaking vs non-breaking changes are clearly defined for your team.",
  ]},
  { category: "Deprecation process", items: [
    "Deprecated versions get a clear sunset date communicated in advance.",
    "Deprecation warnings are surfaced in API responses (e.g. a header or field), not just docs.",
    "Migration guide exists for moving from old version to new.",
  ]},
  { category: "Backward compatibility", items: [
    "Adding new optional fields doesn't require a version bump.",
    "Removing or renaming fields is treated as a breaking change requiring a new version.",
    "Old versions remain functional during the deprecation window, not immediately disabled.",
  ]},
];

export default function VersioningChecklist() {
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
