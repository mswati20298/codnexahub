import { useMemo, useState } from "react";

const DIRECTIVES = ["default-src", "script-src", "style-src", "img-src", "font-src", "connect-src", "frame-src"];

export default function CspGenerator() {
  const [values, setValues] = useState({
    "default-src": "'self'",
    "script-src": "'self'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data:",
    "font-src": "",
    "connect-src": "",
    "frame-src": "",
  });

  const update = (key, value) => setValues((prev) => ({ ...prev, [key]: value }));

  const output = useMemo(() => {
    return Object.entries(values)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k} ${v.trim()}`)
      .join("; ") + ";";
  }, [values]);

  const copy = () => navigator.clipboard.writeText(`Content-Security-Policy: ${output}`);

  return (
    <div>
      <div className="space-y-3 mb-4">
        {DIRECTIVES.map((d) => (
          <label key={d} className="flex flex-col gap-1 text-sm text-slate-300">
            {d}
            <input value={values[d]} onChange={(e) => update(d, e.target.value)} placeholder="e.g. 'self' https://cdn.example.com" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
          </label>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap break-all">
        <code>Content-Security-Policy: {output}</code>
      </pre>
    </div>
  );
}
