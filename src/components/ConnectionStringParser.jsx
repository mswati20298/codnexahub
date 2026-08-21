import { useMemo, useState } from "react";

function parse(connStr) {
  try {
    const url = new URL(connStr);
    return {
      protocol: url.protocol.replace(":", ""),
      user: url.username || "—",
      password: url.password ? "•".repeat(url.password.length) : "—",
      host: url.hostname,
      port: url.port || "(default)",
      database: url.pathname.replace("/", "") || "—",
    };
  } catch {
    return null;
  }
}

export default function ConnectionStringParser() {
  const [input, setInput] = useState("postgresql://admin:password@localhost:5432/mydb");
  const parsed = useMemo(() => parse(input), [input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />
      {!parsed ? (
        <p className="text-red-400 text-sm">Couldn't parse this — check the format (e.g. protocol://user:pass@host:port/db).</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {Object.entries(parsed).map(([key, value]) => (
            <div key={key} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1 capitalize">{key}</p>
              <p className="font-mono text-sm text-slate-100 break-all">{value}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-500 mt-4">Password is masked for display. Parsing happens entirely in your browser.</p>
    </div>
  );
}
