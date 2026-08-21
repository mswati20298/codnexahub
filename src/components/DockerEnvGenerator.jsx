import { useMemo, useState } from "react";

const SAMPLE = `POSTGRES_USER: admin
POSTGRES_PASSWORD: changeme
POSTGRES_DB: myapp
REDIS_URL: redis://redis:6379`;

export default function DockerEnvGenerator() {
  const [input, setInput] = useState(SAMPLE);

  const envFile = useMemo(() => {
    return input.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
      const [key, ...rest] = line.split(":");
      return `${key.trim()}=${rest.join(":").trim()}`;
    }).join("\n");
  }, [input]);

  const composeSnippet = useMemo(() => {
    const keys = input.split("\n").map((l) => l.trim().split(":")[0]).filter(Boolean);
    return `env_file:\n  - .env\n\n# or inline:\nenvironment:\n${keys.map((k) => `  - ${k}=\${${k}}`).join("\n")}`;
  }, [input]);

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Variables (name: value, one per line)
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </label>
      <div className="space-y-3">
        <div onClick={() => copy(envFile)} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-3 hover:border-indigo-500">
          <p className="text-xs text-slate-400 mb-1">.env file</p>
          <pre className="text-xs text-indigo-400 whitespace-pre-wrap">{envFile}</pre>
        </div>
        <div onClick={() => copy(composeSnippet)} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-3 hover:border-indigo-500">
          <p className="text-xs text-slate-400 mb-1">docker-compose.yml reference</p>
          <pre className="text-xs text-indigo-400 whitespace-pre-wrap">{composeSnippet}</pre>
        </div>
      </div>
    </div>
  );
}
