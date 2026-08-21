import { useMemo, useState } from "react";

const SAMPLE_EXPECTED = `event: string
id: string
data.amount: number`;
const SAMPLE_PAYLOAD = `{
  "event": "payment.succeeded",
  "id": "evt_123",
  "data": { "amount": 2000 }
}`;

function getPath(obj, path) {
  return path.split(".").reduce((cur, key) => (cur == null ? undefined : cur[key]), obj);
}

function validate(expectedText, payload) {
  const rules = expectedText.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const [path, type] = l.split(":").map((s) => s.trim());
    return { path, type };
  });
  return rules.map((rule) => {
    const value = getPath(payload, rule.path);
    const actualType = Array.isArray(value) ? "array" : typeof value;
    const present = value !== undefined;
    const typeMatches = present && actualType === rule.type;
    return { ...rule, present, typeMatches, actualType };
  });
}

export default function WebhookValidator() {
  const [expected, setExpected] = useState(SAMPLE_EXPECTED);
  const [payloadText, setPayloadText] = useState(SAMPLE_PAYLOAD);

  const { results, error } = useMemo(() => {
    try {
      const payload = JSON.parse(payloadText);
      return { results: validate(expected, payload), error: null };
    } catch (e) {
      return { results: [], error: "Invalid JSON payload — " + e.message };
    }
  }, [expected, payloadText]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Expected fields (path: type, one per line — supports dot notation)
        <textarea value={expected} onChange={(e) => setExpected(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Webhook payload (JSON)
        <textarea value={payloadText} onChange={(e) => setPayloadText(e.target.value)} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </label>
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <ul className="space-y-1">
          {results.map((r, i) => (
            <li key={i} className={`text-sm px-3 py-2 rounded-lg border ${r.typeMatches ? "border-emerald-900 bg-emerald-950/40 text-emerald-300" : "border-red-900 bg-red-950/40 text-red-300"}`}>
              {r.typeMatches ? "✓" : "✗"} {r.path} — expected {r.type}{!r.present ? " (missing)" : r.typeMatches ? "" : ` (got ${r.actualType})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
