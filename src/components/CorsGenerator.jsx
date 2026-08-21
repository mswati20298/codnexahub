import { useMemo, useState } from "react";

export default function CorsGenerator() {
  const [origin, setOrigin] = useState("https://example.com");
  const [methods, setMethods] = useState(["GET", "POST"]);
  const [headers, setHeaders] = useState("Content-Type, Authorization");
  const [credentials, setCredentials] = useState(true);
  const [maxAge, setMaxAge] = useState(86400);

  const toggleMethod = (m) => setMethods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  const output = useMemo(() => {
    const lines = [
      `Access-Control-Allow-Origin: ${origin}`,
      `Access-Control-Allow-Methods: ${methods.join(", ")}`,
      `Access-Control-Allow-Headers: ${headers}`,
    ];
    if (credentials) lines.push(`Access-Control-Allow-Credentials: true`);
    lines.push(`Access-Control-Max-Age: ${maxAge}`);
    return lines.join("\n");
  }, [origin, methods, headers, credentials, maxAge]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Allowed origin
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].map((m) => (
          <button key={m} onClick={() => toggleMethod(m)} className={`text-sm px-3 py-1.5 rounded-lg border ${methods.includes(m) ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>{m}</button>
        ))}
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Allowed headers
        <input value={headers} onChange={(e) => setHeaders(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={credentials} onChange={(e) => setCredentials(e.target.checked)} />
          Allow credentials
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Max age (seconds)
          <input type="number" value={maxAge} onChange={(e) => setMaxAge(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
      {origin === "*" && credentials && (
        <p className="text-xs text-amber-400 mt-4">Note: browsers reject the combination of Allow-Origin: * with Allow-Credentials: true — use a specific origin if credentials are needed.</p>
      )}
    </div>
  );
}
