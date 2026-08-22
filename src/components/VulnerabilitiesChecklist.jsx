const CHECKLIST = [
  { category: "Injection & input", items: [
    "All database queries use parameterized statements (SQL injection).",
    "User input is validated and sanitized before use in commands, file paths, or templates.",
    "Output is properly escaped before rendering as HTML (XSS).",
  ]},
  { category: "Access control", items: [
    "Authorization is checked on every request, not just at login (broken access control).",
    "Object references are validated — users can't access others' data by changing an ID (IDOR).",
    "Admin/privileged endpoints require explicit role checks, not just authentication.",
  ]},
  { category: "Configuration", items: [
    "No default credentials or debug endpoints exposed in production.",
    "Security headers are set (CSP, X-Frame-Options, HSTS).",
    "Dependencies are kept up to date and scanned for known vulnerabilities.",
  ]},
  { category: "Data protection", items: [
    "Sensitive data is encrypted at rest and in transit.",
    "Passwords are hashed with a proper algorithm (bcrypt/argon2), never plain text or weak hashes.",
    "Secrets aren't hardcoded or committed to version control.",
  ]},
];

export default function VulnerabilitiesChecklist() {
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
      <p className="text-xs text-slate-500 dark:text-slate-500">Based on common categories from the OWASP Top 10 — a starting point for review, not a complete security audit.</p>
    </div>
  );
}
