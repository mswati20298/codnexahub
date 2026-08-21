import { useState } from "react";

function generateToken(bytes, format) {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  if (format === "hex") {
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  // base64url
  const binary = String.fromCharCode(...array);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default function TokenGenerator() {
  const [bytes, setBytes] = useState(32);
  const [format, setFormat] = useState("hex");
  const [token, setToken] = useState(() => generateToken(32, "hex"));
  const [copied, setCopied] = useState(false);

  const regenerate = () => setToken(generateToken(bytes, format));
  const copy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Length (bytes)
          <input type="number" min="8" max="128" value={bytes} onChange={(e) => setBytes(Number(e.target.value) || 8)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Format
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            <option value="hex">Hex</option>
            <option value="base64">Base64URL</option>
          </select>
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-3 hover:border-indigo-500 flex justify-between items-center">
        <code className="text-sm text-indigo-400 break-all">{token}</code>
        <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">{copied ? "Copied!" : "Click to copy"}</span>
      </div>
      <button onClick={regenerate} className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">Regenerate</button>
      <p className="text-xs text-slate-500 mt-4">Generated with crypto.getRandomValues — suitable for session tokens, API secrets, and CSRF tokens.</p>
    </div>
  );
}
