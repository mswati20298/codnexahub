const CHECKLIST = [
  { category: "Input handling", items: [
    "User input is clearly delimited from system instructions (e.g. XML tags, structured fields).",
    "The model is told explicitly not to follow instructions found inside user-provided content.",
    "Untrusted content (web pages, documents, emails) is treated as data, never as instructions.",
  ]},
  { category: "Testing", items: [
    "Tested with inputs like 'ignore previous instructions and...'",
    "Tested with instructions hidden in unusual formatting (base64, reversed text, foreign languages).",
    "Tested with multi-turn attempts that build up context before the injection attempt.",
  ]},
  { category: "Architecture", items: [
    "Sensitive actions (payments, deletions, sending messages) require explicit confirmation, not just model judgment.",
    "The model has least-privilege tool access — it can't call tools/actions beyond what the task needs.",
    "Output is validated/sanitized before being used in downstream systems (e.g. before executing as code or SQL).",
  ]},
];

export default function InjectionChecklist() {
  return (
    <div className="space-y-6">
      {CHECKLIST.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">{group.category}</h3>
          <ul className="space-y-2">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
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
