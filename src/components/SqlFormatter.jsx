import { useMemo, useState } from "react";

const KEYWORDS = ["SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ON"];

function formatSql(sql) {
  let formatted = sql.replace(/\s+/g, " ").trim();
  KEYWORDS.forEach((kw) => {
    const re = new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi");
    formatted = formatted.replace(re, `\n${kw}`);
  });
  formatted = formatted.replace(/,\s*/g, ",\n  ");
  return formatted.trim();
}

const SAMPLE = "select id, name, email from users where status = 'active' and created_at > '2026-01-01' order by created_at desc limit 10";

export default function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const output = useMemo(() => formatSql(input), [input]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" />
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
