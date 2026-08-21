import { useMemo, useState } from "react";

const TEMPLATES = {
  postgres: (h, p, u, pw, db) => `postgresql://${u}:${pw}@${h}:${p || 5432}/${db}`,
  mysql: (h, p, u, pw, db) => `mysql://${u}:${pw}@${h}:${p || 3306}/${db}`,
  mongodb: (h, p, u, pw, db) => `mongodb://${u}:${pw}@${h}:${p || 27017}/${db}`,
  redis: (h, p, u, pw) => `redis://${u ? u + ":" + pw + "@" : ""}${h}:${p || 6379}`,
};

export default function ConnectionStringBuilder() {
  const [dbType, setDbType] = useState("postgres");
  const [host, setHost] = useState("localhost");
  const [port, setPort] = useState("");
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("password");
  const [database, setDatabase] = useState("mydb");

  const connStr = useMemo(
    () => TEMPLATES[dbType](host, port, user, password, database),
    [dbType, host, port, user, password, database]
  );

  const copy = () => navigator.clipboard.writeText(connStr);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Database
          <select value={dbType} onChange={(e) => setDbType(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            <option value="postgres">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="redis">Redis</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Host
          <input value={host} onChange={(e) => setHost(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Port (optional, default used if blank)
          <input value={port} onChange={(e) => setPort(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Database name
          <input value={database} onChange={(e) => setDatabase(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Username
          <input value={user} onChange={(e) => setUser(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      <div onClick={copy} className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 hover:border-indigo-500 flex justify-between items-center">
        <span className="font-mono text-sm text-indigo-400 break-all">{connStr}</span>
        <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">Click to copy</span>
      </div>
      <p className="text-xs text-slate-500 mt-4">Built entirely in your browser — nothing here is sent anywhere.</p>
    </div>
  );
}
