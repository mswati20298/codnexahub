import { useState } from "react";

function generateKey(prefix, length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  const key = Array.from(array, (n) => chars[n % chars.length]).join("");
  return prefix ? `${prefix}_${key}` : key;
}

export default function ApiKeyGenerator() {
  const [prefix, setPrefix] = useState("sk_live");
  const [length, setLength] = useState(32);
  const [key, setKey] = useState(() => generateKey("sk_live", 32));
  const [copied, setCopied] = useState(false);

  const regenerate = () => setKey(generateKey(prefix, length));
  const copy = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Prefix (optional)
          <input value={prefix} onChange={(e) => setPrefix(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Length
          <input type="number" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value) || 8)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-3 hover:border-emerald-500 flex justify-between items-center">
        <code className="text-sm text-emerald-600 dark:text-emerald-400 break-all">{key}</code>
        <span className="text-xs text-slate-500 dark:text-slate-500 ml-2 whitespace-nowrap">{copied ? "Copied!" : "Click to copy"}</span>
      </div>
      <button onClick={regenerate} className="text-sm px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">Regenerate</button>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Generated using your browser's cryptographically secure random number generator.</p>
    </div>
  );
}
