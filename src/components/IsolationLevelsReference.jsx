const LEVELS = [
  { level: "Read Uncommitted", dirtyRead: true, nonRepeatableRead: true, phantomRead: true, desc: "Weakest isolation — can read uncommitted changes from other transactions." },
  { level: "Read Committed", dirtyRead: false, nonRepeatableRead: true, phantomRead: true, desc: "Default in PostgreSQL and SQL Server — only reads committed data." },
  { level: "Repeatable Read", dirtyRead: false, nonRepeatableRead: false, phantomRead: true, desc: "Default in MySQL InnoDB — same query returns same results within a transaction." },
  { level: "Serializable", dirtyRead: false, nonRepeatableRead: false, phantomRead: false, desc: "Strongest isolation — transactions behave as if executed one at a time." },
];

export default function IsolationLevelsReference() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-slate-800">
            <th className="py-2 pr-4">Level</th>
            <th className="py-2 pr-4">Dirty Read</th>
            <th className="py-2 pr-4">Non-repeatable Read</th>
            <th className="py-2 pr-4">Phantom Read</th>
          </tr>
        </thead>
        <tbody>
          {LEVELS.map((l) => (
            <tr key={l.level} className="border-b border-slate-800/60">
              <td className="py-2 pr-4 font-medium text-slate-100">{l.level}</td>
              <td className="py-2 pr-4">{l.dirtyRead ? <span className="text-red-400">Possible</span> : <span className="text-emerald-400">Prevented</span>}</td>
              <td className="py-2 pr-4">{l.nonRepeatableRead ? <span className="text-red-400">Possible</span> : <span className="text-emerald-400">Prevented</span>}</td>
              <td className="py-2 pr-4">{l.phantomRead ? <span className="text-red-400">Possible</span> : <span className="text-emerald-400">Prevented</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-y-2">
        {LEVELS.map((l) => (
          <p key={l.level} className="text-xs text-slate-500"><span className="text-slate-300">{l.level}:</span> {l.desc}</p>
        ))}
      </div>
    </div>
  );
}
