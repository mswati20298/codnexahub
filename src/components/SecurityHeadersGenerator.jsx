import { useMemo, useState } from "react";

export default function SecurityHeadersGenerator() {
  const [allowOrigin, setAllowOrigin] = useState("*");
  const [cspSources, setCspSources] = useState("'self'");
  const [hsts, setHsts] = useState(true);
  const [frameOptions, setFrameOptions] = useState(true);
  const [noSniff, setNoSniff] = useState(true);

  const output = useMemo(() => {
    const lines = [];
    lines.push(`Access-Control-Allow-Origin: ${allowOrigin}`);
    lines.push(`Content-Security-Policy: default-src ${cspSources};`);
    if (hsts) lines.push(`Strict-Transport-Security: max-age=31536000; includeSubDomains`);
    if (frameOptions) lines.push(`X-Frame-Options: DENY`);
    if (noSniff) lines.push(`X-Content-Type-Options: nosniff`);
    lines.push(`Referrer-Policy: strict-origin-when-cross-origin`);
    return lines.join("\n");
  }, [allowOrigin, cspSources, hsts, frameOptions, noSniff]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="space-y-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          CORS allow origin
          <input value={allowOrigin} onChange={(e) => setAllowOrigin(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          CSP default-src sources
          <input value={cspSources} onChange={(e) => setCspSources(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        {[
          { label: "HSTS (force HTTPS)", value: hsts, set: setHsts },
          { label: "X-Frame-Options (clickjacking protection)", value: frameOptions, set: setFrameOptions },
          { label: "X-Content-Type-Options (MIME sniffing protection)", value: noSniff, set: setNoSniff },
        ].map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={f.value} onChange={(e) => f.set(e.target.checked)} />
            {f.label}
          </label>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
