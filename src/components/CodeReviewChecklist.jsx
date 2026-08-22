const CHECKLIST = [
  { category: "Correctness", items: [
    "Code does what the PR description says it does.",
    "Edge cases are handled (empty input, null, zero, very large values).",
    "No obvious logic errors or off-by-one mistakes.",
  ]},
  { category: "Quality", items: [
    "Code is readable without needing the author to explain it.",
    "No duplicated logic that should be extracted into a shared function.",
    "Naming is clear and consistent with the rest of the codebase.",
  ]},
  { category: "Safety", items: [
    "No secrets, API keys, or credentials committed.",
    "User input is validated/sanitized where relevant.",
    "Error handling doesn't silently swallow failures.",
  ]},
  { category: "Testing & docs", items: [
    "Tests cover the new behavior, not just the happy path.",
    "Documentation/comments updated if public behavior changed.",
  ]},
];

export default function CodeReviewChecklist() {
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
