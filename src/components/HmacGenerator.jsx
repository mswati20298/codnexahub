import { useEffect, useState } from "react";

async function hmac(message, secret, algo) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: algo }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HmacGenerator() {
  const [message, setMessage] = useState("Hello, world!");
  const [secret, setSecret] = useState("my-secret-key");
  const [algo, setAlgo] = useState("SHA-256");
  const [result, setResult] = useState("");

  useEffect(() => {
    let cancelled = false;
    hmac(message, secret, algo).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => { cancelled = true; };
  }, [message, secret, algo]);

  const copy = () => navigator.clipboard.writeText(result);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Secret key
        <input value={secret} onChange={(e) => setSecret(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      <div className="flex gap-2 mb-4">
        {["SHA-1", "SHA-256", "SHA-512"].map((a) => (
          <button key={a} onClick={() => setAlgo(a)} className={`text-sm px-3 py-1.5 rounded-lg border ${algo === a ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>{a}</button>
        ))}
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <code className="text-xs text-slate-200 break-all">{result}</code>
      </div>
      <p className="text-xs text-slate-500 mt-4">Computed using the Web Crypto API, entirely in your browser — your secret is never sent anywhere.</p>
    </div>
  );
}
