import { useMemo, useState } from "react";

export default function CurlBuilder() {
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("https://api.example.com/v1/users");
  const [headers, setHeaders] = useState("Content-Type: application/json\nAuthorization: Bearer YOUR_TOKEN");
  const [body, setBody] = useState('{\n  "name": "Alice"\n}');

  const curl = useMemo(() => {
    let cmd = `curl -X ${method} "${url}"`;
    headers.split("\n").map((l) => l.trim()).filter(Boolean).forEach((h) => {
      cmd += ` \\\n  -H "${h}"`;
    });
    if (body.trim() && method !== "GET") {
      cmd += ` \\\n  -d '${body.trim()}'`;
    }
    return cmd;
  }, [method, url, headers, body]);

  const copy = () => navigator.clipboard.writeText(curl);

  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Method
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 sm:col-span-3">
          URL
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Headers (one per line)
        <textarea value={headers} onChange={(e) => setHeaders(e.target.value)} rows={3} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      {method !== "GET" && (
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
          Body (JSON)
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
        </label>
      )}
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{curl}</code>
      </pre>
    </div>
  );
}
