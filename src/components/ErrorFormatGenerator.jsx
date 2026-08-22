import { useMemo, useState } from "react";

export default function ErrorFormatGenerator() {
  const [code, setCode] = useState("VALIDATION_ERROR");
  const [message, setMessage] = useState("The request payload failed validation.");
  const [field, setField] = useState("email");
  const [detail, setDetail] = useState("must be a valid email address");
  const [status, setStatus] = useState(400);

  const json = useMemo(() => JSON.stringify({
    error: {
      code,
      message,
      status,
      details: [{ field, issue: detail }],
    },
  }, null, 2), [code, message, field, detail, status]);

  const copy = () => navigator.clipboard.writeText(json);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Error code (machine-readable)
          <input value={code} onChange={(e) => setCode(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          HTTP status
          <input type="number" value={status} onChange={(e) => setStatus(Number(e.target.value) || 400)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 sm:col-span-2">
          Message (human-readable)
          <input value={message} onChange={(e) => setMessage(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Field with issue
          <input value={field} onChange={(e) => setField(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Issue detail
          <input value={detail} onChange={(e) => setDetail(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{json}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">A consistent error shape across your whole API makes client-side error handling far simpler — this is one reasonable convention among several valid ones.</p>
    </div>
  );
}
