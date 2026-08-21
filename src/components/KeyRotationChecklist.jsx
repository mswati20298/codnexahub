const CHECKLIST = [
  { category: "Before rotating", items: [
    "Identify every service/environment currently using the key.",
    "Confirm the new key has been generated with equivalent (or intended) permissions.",
    "Schedule rotation during low-traffic hours if the service can't support zero-downtime rotation.",
  ]},
  { category: "During rotation", items: [
    "Deploy the new key alongside the old one where possible (dual-key support) rather than a hard cutover.",
    "Update the key in all environments — don't forget staging, CI/CD secrets, and third-party integrations.",
    "Monitor error rates and auth failures immediately after rotation.",
  ]},
  { category: "After rotation", items: [
    "Revoke the old key only after confirming the new key works everywhere.",
    "Update documentation/runbooks with rotation date and any relevant notes.",
    "Set a reminder for the next scheduled rotation.",
  ]},
];

export default function KeyRotationChecklist() {
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
