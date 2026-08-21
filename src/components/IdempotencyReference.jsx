import { useMemo, useState } from "react";

const OPERATIONS = [
  { op: "GET /users/1", idempotent: true, note: "Reading data never changes state." },
  { op: "PUT /users/1", idempotent: true, note: "Replacing a resource with the same data repeatedly leaves the same end state." },
  { op: "DELETE /users/1", idempotent: true, note: "Deleting an already-deleted resource still results in it being gone — same end state." },
  { op: "POST /users", idempotent: false, note: "Each call typically creates a new resource — calling twice creates two records." },
  { op: "PATCH /users/1 {\"balance\": balance + 10}", idempotent: false, note: "A relative update (increment) changes result every time it's called — retries cause double-counting." },
  { op: "PATCH /users/1 {\"balance\": 110}", idempotent: true, note: "An absolute update (set exact value) is idempotent — retries have no additional effect." },
];

export default function IdempotencyReference() {
  const [checked, setChecked] = useState({});

  return (
    <div className="space-y-2">
      {OPERATIONS.map((o, i) => (
        <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex justify-between items-start gap-3">
            <code className="text-sm text-indigo-400 break-all">{o.op}</code>
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${o.idempotent ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900" : "bg-red-950/50 text-red-400 border border-red-900"}`}>
              {o.idempotent ? "Idempotent" : "Not idempotent"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{o.note}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4">Idempotency matters most for retry logic: it's safe to blindly retry an idempotent operation on a timeout, but a non-idempotent one needs an idempotency key or other safeguard to avoid duplicate effects.</p>
    </div>
  );
}
