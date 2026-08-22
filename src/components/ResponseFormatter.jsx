import { useMemo, useState } from "react";

const SAMPLE = `HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache

{"id":1,"name":"Alice","active":true}`;

function parseResponse(raw) {
  const lines = raw.split("\n");
  const statusLine = lines[0] || "";
  const blankIdx = lines.findIndex((l, i) => i > 0 && l.trim() === "");
  const headerLines = blankIdx > 0 ? lines.slice(1, blankIdx) : lines.slice(1);
  const bodyLines = blankIdx > 0 ? lines.slice(blankIdx + 1) : [];

  const headers = headerLines
    .map((l) => l.split(":"))
    .filter((parts) => parts.length >= 2)
    .map(([k, ...rest]) => ({ key: k.trim(), value: rest.join(":").trim() }));

  let body = bodyLines.join("\n").trim();
  try {
    body = JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    // leave as-is if not JSON
  }

  return { statusLine, headers, body };
}

export default function ResponseFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const { statusLine, headers, body } = useMemo(() => parseResponse(input), [input]);

  const statusCode = statusLine.match(/\d{3}/)?.[0];
  const statusColor = statusCode?.startsWith("2") ? "text-emerald-600 dark:text-emerald-400" : statusCode?.startsWith("4") || statusCode?.startsWith("5") ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400";

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs mb-4" />
      <p className={`text-sm font-semibold mb-3 ${statusColor}`}>{statusLine}</p>
      {headers.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Headers</p>
          <div className="space-y-1">
            {headers.map((h, i) => (
              <div key={i} className="text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1">
                <span className="text-emerald-600 dark:text-emerald-400">{h.key}</span>: <span className="text-slate-700 dark:text-slate-300">{h.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Body</p>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{body}</code>
      </pre>
    </div>
  );
}
