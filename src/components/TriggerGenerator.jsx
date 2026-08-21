import { useMemo, useState } from "react";

export default function TriggerGenerator() {
  const [triggerName, setTriggerName] = useState("update_timestamp");
  const [table, setTable] = useState("users");
  const [timing, setTiming] = useState("BEFORE");
  const [event, setEvent] = useState("UPDATE");
  const [body, setBody] = useState("NEW.updated_at = NOW();");

  const sql = useMemo(
    () => `CREATE TRIGGER ${triggerName}\n${timing} ${event} ON ${table}\nFOR EACH ROW\nBEGIN\n  ${body}\nEND;`,
    [triggerName, table, timing, event, body]
  );
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Trigger name
          <input value={triggerName} onChange={(e) => setTriggerName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Table
          <input value={table} onChange={(e) => setTable(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Timing
          <select value={timing} onChange={(e) => setTiming(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            <option>BEFORE</option>
            <option>AFTER</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Event
          <select value={event} onChange={(e) => setEvent(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            <option>INSERT</option>
            <option>UPDATE</option>
            <option>DELETE</option>
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Trigger body
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{sql}</code>
      </pre>
      <p className="text-xs text-slate-500 mt-4">Syntax shown is MySQL-style — PostgreSQL requires a separate function + trigger definition. Adjust for your specific database.</p>
    </div>
  );
}
