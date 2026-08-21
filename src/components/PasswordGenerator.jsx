import { useMemo, useState } from "react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

function generate(length, options) {
  const pool = Object.entries(options)
    .filter(([, on]) => on)
    .map(([key]) => SETS[key])
    .join("");
  if (!pool) return "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => pool[n % pool.length]).join("");
}

function strengthLabel(length, optionCount) {
  const score = length * optionCount;
  if (score < 40) return { label: "Weak", color: "text-red-400" };
  if (score < 80) return { label: "Okay", color: "text-amber-400" };
  return { label: "Strong", color: "text-emerald-400" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lower: true, upper: true, numbers: true, symbols: true });
  const [nonce, setNonce] = useState(0);
  const [copied, setCopied] = useState(false);

  const password = useMemo(() => generate(length, options), [length, options, nonce]);
  const optionCount = Object.values(options).filter(Boolean).length;
  const strength = strengthLabel(length, optionCount);

  const toggle = (key) => setOptions((o) => ({ ...o, [key]: !o[key] }));
  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <div
        onClick={copy}
        className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-4 mb-4 flex justify-between items-center hover:border-indigo-500"
      >
        <span className="font-mono text-lg text-indigo-400 break-all">{password || "Select at least one option"}</span>
        <span className="text-xs text-slate-500 ml-3 whitespace-nowrap">{copied ? "Copied!" : "Click to copy"}</span>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Length: {length}
        <input type="range" min="6" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="accent-indigo-500" />
      </label>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.keys(SETS).map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={options[key]} onChange={() => toggle(key)} />
            {key === "lower" ? "Lowercase" : key === "upper" ? "Uppercase" : key === "numbers" ? "Numbers" : "Symbols"}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
        <button onClick={() => setNonce((n) => n + 1)} className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white ml-auto">
          Regenerate
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Generated using your browser's cryptographically secure random number generator (crypto.getRandomValues). Nothing is sent to a server.
      </p>
    </div>
  );
}
