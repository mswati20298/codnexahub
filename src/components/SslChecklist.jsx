const CHECKLIST = [
  { category: "Certificate", items: [
    "Certificate is not expired and renews automatically (e.g. via Let's Encrypt/Certbot).",
    "Certificate chain includes intermediate certificates, not just the leaf cert.",
    "Certificate covers all needed domains/subdomains (check SAN entries).",
  ]},
  { category: "Protocol & Ciphers", items: [
    "TLS 1.0 and 1.1 are disabled — only TLS 1.2+ is enabled.",
    "Weak ciphers (RC4, DES, export-grade) are disabled.",
    "HTTP is redirected to HTTPS (301 redirect), not just available on both.",
  ]},
  { category: "Headers", items: [
    "Strict-Transport-Security (HSTS) header is set.",
    "Mixed content is avoided — all resources loaded over HTTPS.",
  ]},
  { category: "Ongoing", items: [
    "Certificate expiry monitoring/alerting is set up.",
    "SSL configuration is periodically tested (e.g. SSL Labs test).",
  ]},
];

export default function SslChecklist() {
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
