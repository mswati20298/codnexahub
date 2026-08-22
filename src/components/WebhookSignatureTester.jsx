import { useEffect, useState } from "react";

async function computeHmac(payload, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function WebhookSignatureTester() {
  const [payload, setPayload] = useState('{"event":"payment.succeeded","id":"evt_123"}');
  const [secret, setSecret] = useState("whsec_test_secret");
  const [receivedSig, setReceivedSig] = useState("");
  const [computedSig, setComputedSig] = useState("");

  useEffect(() => {
    let cancelled = false;
    computeHmac(payload, secret).then((sig) => {
      if (!cancelled) setComputedSig(sig);
    });
    return () => { cancelled = true; };
  }, [payload, secret]);

  const matches = receivedSig.trim().toLowerCase() === computedSig.toLowerCase();

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Raw payload (exact bytes as received)
        <textarea value={payload} onChange={(e) => setPayload(e.target.value)} rows={4} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Webhook secret
        <input value={secret} onChange={(e) => setSecret(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Signature received in header
        <input value={receivedSig} onChange={(e) => setReceivedSig(e.target.value)} placeholder="paste the signature to verify" className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
      </label>

      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Computed HMAC-SHA256</p>
        <code className="text-xs text-slate-800 dark:text-slate-200 break-all">{computedSig}</code>
      </div>

      {receivedSig && (
        <div className={`text-sm px-4 py-3 rounded-lg border ${matches ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" : "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300"}`}>
          {matches ? "✓ Signature matches" : "✗ Signature does not match"}
        </div>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Assumes plain HMAC-SHA256 over the raw payload — some providers (e.g. Stripe) use a specific signed-payload format with timestamp prefixes, check their docs for exact construction.</p>
    </div>
  );
}
