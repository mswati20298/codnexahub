import { useMemo, useState } from "react";

const CHARSET_OPTIONS = {
  alphanumeric: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  hex: "0123456789abcdef",
};

function generate(length, charset) {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

export default function RandomStringGenerator() {
  const [length, setLength] = useState(24);
  const [charsetKey, setCharsetKey] = useState("alphanumeric");
  const [count, setCount] = useState(5);
  const [nonce, setNonce] = useState(0);

  const strings = useMemo(
    () => Array.from({ length: count }, () => generate(length, CHARSET_OPTIONS[charsetKey])),
    [length, charsetKey, count, nonce]
  );

  const copyAll = () => navigator.clipboard.writeText(strings.join("\n"));

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Length
          <input type="number" min="1" max="256" value={length} onChange={(e) => setLength(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Character set
          <select value={charsetKey} onChange={(e) => setCharsetKey(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
            <option value="alphanumeric">Alphanumeric</option>
            <option value="alpha">Letters only</option>
            <option value="numeric">Numbers only</option>
            <option value="hex">Hex</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Count
          <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="flex gap-2 mb-3">
        <button onClick={() => setNonce((n) => n + 1)} className="text-sm px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">Regenerate</button>
        <button onClick={copyAll} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 ml-auto">Copy all</button>
      </div>

      <ul className="space-y-1 max-h-64 overflow-y-auto">
        {strings.map((s, i) => (
          <li key={i} className="font-mono text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 break-all">{s}</li>
        ))}
      </ul>
    </div>
  );
}
