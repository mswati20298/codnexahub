const CHECKLIST = [
  { category: "State management", items: [
    "Terraform/IaC state is stored remotely (not local files) with locking enabled.",
    "State file access is restricted — it can contain sensitive values.",
  ]},
  { category: "Structure", items: [
    "Environments (dev/staging/prod) are cleanly separated, not sharing state.",
    "Modules are used for repeated infrastructure patterns instead of copy-pasted blocks.",
    "Variables have sensible defaults and clear descriptions.",
  ]},
  { category: "Safety", items: [
    "Plan output is reviewed before every apply, especially in production.",
    "Destructive changes (resource replacement/deletion) are flagged and require explicit approval.",
    "CI/CD pipeline runs plan on PR and apply only after merge/approval.",
  ]},
];

export default function IacChecklist() {
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
