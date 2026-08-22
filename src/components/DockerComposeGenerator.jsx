import { useMemo, useState } from "react";

export default function DockerComposeGenerator() {
  const [serviceName, setServiceName] = useState("web");
  const [image, setImage] = useState("node:20-alpine");
  const [port, setPort] = useState("3000:3000");
  const [includeDb, setIncludeDb] = useState(true);
  const [dbType, setDbType] = useState("postgres");

  const yaml = useMemo(() => {
    let out = `services:\n  ${serviceName}:\n    image: ${image}\n    ports:\n      - "${port}"\n    environment:\n      - NODE_ENV=production`;
    if (includeDb) {
      out += `\n    depends_on:\n      - db`;
      out += `\n\n  db:`;
      if (dbType === "postgres") {
        out += `\n    image: postgres:16-alpine\n    environment:\n      - POSTGRES_USER=admin\n      - POSTGRES_PASSWORD=password\n      - POSTGRES_DB=app\n    ports:\n      - "5432:5432"\n    volumes:\n      - db_data:/var/lib/postgresql/data`;
      } else {
        out += `\n    image: mysql:8\n    environment:\n      - MYSQL_ROOT_PASSWORD=password\n      - MYSQL_DATABASE=app\n    ports:\n      - "3306:3306"\n    volumes:\n      - db_data:/var/lib/mysql`;
      }
    }
    if (includeDb) out += `\n\nvolumes:\n  db_data:`;
    return out;
  }, [serviceName, image, port, includeDb, dbType]);

  const copy = () => navigator.clipboard.writeText(yaml);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Service name
          <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Image
          <input value={image} onChange={(e) => setImage(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Port mapping
          <input value={port} onChange={(e) => setPort(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mt-6">
          <input type="checkbox" checked={includeDb} onChange={(e) => setIncludeDb(e.target.checked)} />
          Include database service
        </label>
      </div>
      {includeDb && (
        <div className="flex gap-2 mb-4">
          {["postgres", "mysql"].map((t) => (
            <button key={t} onClick={() => setDbType(t)} className={`text-sm px-3 py-1.5 rounded-lg border ${dbType === t ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{yaml}</code>
      </pre>
    </div>
  );
}
