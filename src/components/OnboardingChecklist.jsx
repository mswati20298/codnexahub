const CHECKLIST = [
  { category: "Access", items: [
    "Repository access granted (read/write as appropriate).",
    "Access to necessary internal tools (ticketing, docs, communication channels).",
    "Credentials for shared dev/staging environments provided securely (not over chat).",
  ]},
  { category: "Local setup", items: [
    "Correct language/runtime version installed (matches project requirements).",
    "Project builds and runs locally following the README.",
    "Environment variables configured from a template (.env.example).",
    "Pre-commit hooks / linters installed and passing.",
  ]},
  { category: "Verify", items: [
    "Test suite runs and passes locally.",
    "Can successfully make a small change and see it reflected (hot reload or rebuild).",
    "First small PR opened and merged to confirm the full workflow works end to end.",
  ]},
];

export default function OnboardingChecklist() {
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
