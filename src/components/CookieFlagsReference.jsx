const FLAGS = [
  { flag: "Secure", desc: "Cookie only sent over HTTPS — never over plain HTTP." },
  { flag: "HttpOnly", desc: "Cookie inaccessible to JavaScript (document.cookie) — mitigates XSS-based cookie theft." },
  { flag: "SameSite=Strict", desc: "Cookie never sent on cross-site requests — strongest CSRF protection, but can break legitimate cross-site flows." },
  { flag: "SameSite=Lax", desc: "Cookie sent on top-level navigation (clicking a link) but not on cross-site subrequests — good default balance." },
  { flag: "SameSite=None", desc: "Cookie sent on all requests including cross-site — requires Secure flag, used for legitimate cross-site embeds." },
  { flag: "Max-Age / Expires", desc: "Controls cookie lifetime — session cookies (no expiry) are cleared when the browser closes." },
];

export default function CookieFlagsReference() {
  return (
    <div className="space-y-2">
      {FLAGS.map((f) => (
        <div key={f.flag} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
          <code className="text-sm text-emerald-600 dark:text-emerald-400">{f.flag}</code>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{f.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">A typical secure session cookie: Set-Cookie: session=abc123; Secure; HttpOnly; SameSite=Lax</p>
    </div>
  );
}
