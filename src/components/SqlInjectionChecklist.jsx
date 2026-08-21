const CHECKLIST = [
  { category: "Prevention", items: [
    "All queries use parameterized statements / prepared statements — no string concatenation of user input.",
    "ORM query builders are used correctly (raw query escapes are avoided unless absolutely necessary).",
    "Database user account for the app has least-privilege permissions, not admin/root.",
  ]},
  { category: "Testing", items: [
    "Tested common payloads like ' OR '1'='1 in every input field, including search and filter fields.",
    "Tested with SQL comment sequences (-- , /* */) to see if they break query logic.",
    "Tested numeric fields with non-numeric SQL payloads, not just string fields.",
  ]},
  { category: "Defense in depth", items: [
    "Error messages don't leak SQL syntax or schema details to the client.",
    "Web application firewall (WAF) rules are in place as a secondary layer, not the only defense.",
    "Database logs are monitored for unusual query patterns.",
  ]},
];

export default function SqlInjectionChecklist() {
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
