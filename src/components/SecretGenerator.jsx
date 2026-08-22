import { useMemo, useState } from "react";

const SAMPLE = `DATABASE_PASSWORD: changeme
API_KEY: your-key-here`;

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export default function SecretGenerator() {
  const [name, setName] = useState("app-secrets");
  const [data, setData] = useState(SAMPLE);

  const yaml = useMemo(() => {
    const lines = data
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [key, ...rest] = l.split(":");
        const value = rest.join(":").trim();
        return `  ${key.trim()}: ${toBase64(value)}`;
      });
    return `apiVersion: v1\nkind: Secret\nmetadata:\n  name: ${name}\ntype: Opaque\ndata:\n${lines.join("\n")}`;
  }, [name, data]);

  const copy = () => navigator.clipboard.writeText(yaml);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4 max-w-xs">
        Secret name
        <input value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Key: value pairs (plain text — will be base64 encoded)
        <textarea value={data} onChange={(e) => setData(e.target.value)} rows={5} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy YAML</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{yaml}</code>
      </pre>
      <p className="text-xs text-amber-600 dark:text-amber-400 mt-4">Base64 is encoding, not encryption — this template is for local dev use. Use a proper secrets manager (Vault, Sealed Secrets, SOPS) for real credentials.</p>
    </div>
  );
}
