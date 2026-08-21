const METHODS = [
  { method: "GET", desc: "Retrieve a resource", safe: true, idempotent: true, body: false },
  { method: "POST", desc: "Create a new resource, or trigger an action", safe: false, idempotent: false, body: true },
  { method: "PUT", desc: "Replace a resource entirely", safe: false, idempotent: true, body: true },
  { method: "PATCH", desc: "Partially update a resource", safe: false, idempotent: false, body: true },
  { method: "DELETE", desc: "Remove a resource", safe: false, idempotent: true, body: false },
  { method: "HEAD", desc: "Like GET but returns headers only, no body", safe: true, idempotent: true, body: false },
  { method: "OPTIONS", desc: "Describes communication options (used in CORS preflight)", safe: true, idempotent: true, body: false },
];

export default function HttpMethodsReference() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400 border-b border-slate-800">
            <th className="py-2 pr-4">Method</th>
            <th className="py-2 pr-4">Purpose</th>
            <th className="py-2 pr-4">Safe</th>
            <th className="py-2 pr-4">Idempotent</th>
            <th className="py-2 pr-4">Has body</th>
          </tr>
        </thead>
        <tbody>
          {METHODS.map((m) => (
            <tr key={m.method} className="border-b border-slate-800/60">
              <td className="py-2 pr-4 font-mono text-indigo-400">{m.method}</td>
              <td className="py-2 pr-4 text-slate-300">{m.desc}</td>
              <td className="py-2 pr-4">{m.safe ? "✓" : "✗"}</td>
              <td className="py-2 pr-4">{m.idempotent ? "✓" : "✗"}</td>
              <td className="py-2 pr-4">{m.body ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-500 mt-4">"Safe" means it doesn't modify server state. "Idempotent" means repeating the same request produces the same result — important for retry logic.</p>
    </div>
  );
}
