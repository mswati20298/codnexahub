const CHECKLIST = [
  { category: "Reproduce", items: [
    "Bug is reliably reproducible with clear steps.",
    "Confirmed which environment(s) it happens in (local, staging, prod).",
    "Checked if it's a regression — did this work before a recent change?",
  ]},
  { category: "Isolate", items: [
    "Narrowed down to the smallest code path that triggers it.",
    "Checked logs/error messages for the actual error, not just symptoms.",
    "Verified assumptions with print/log statements or a debugger, not just reading code.",
  ]},
  { category: "Fix & verify", items: [
    "Root cause identified, not just a symptom patched over.",
    "Fix is tested against the original reproduction steps.",
    "Checked for similar bugs elsewhere in the codebase with the same root cause.",
  ]},
];

export default function DebuggingChecklist() {
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
