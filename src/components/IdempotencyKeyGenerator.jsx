import { useState } from "react";

function generateKey() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function IdempotencyKeyGenerator() {
  const [key, setKey] = useState(generateKey());
  const [copied, setCopied] = useState(false);

  const regenerate = () => setKey(generateKey());
  const copy = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <div onClick={copy} className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-3 hover:border-indigo-500 flex justify-between items-center">
        <code className="text-sm text-indigo-400 break-all">{key}</code>
        <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">{copied ? "Copied!" : "Click to copy"}</span>
      </div>
      <button onClick={regenerate} className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">Generate new</button>
      <p className="text-xs text-slate-500 mt-4">Send this as an Idempotency-Key header on POST/PUT requests (e.g. payments) so retries of the same request don't create duplicate side effects. Generate a new key per unique operation, not per retry.</p>
    </div>
  );
}
