const PATTERNS = [
  { name: "Gateway Aggregation", desc: "Combine multiple backend calls into a single client-facing response, reducing round trips for the client." },
  { name: "Gateway Routing", desc: "Route requests to different backend services based on path/host — decouples client from internal service topology." },
  { name: "Gateway Offloading", desc: "Move cross-cutting concerns (auth, rate limiting, SSL termination, logging) out of individual services into the gateway." },
  { name: "Backend for Frontend (BFF)", desc: "Separate gateway instances tailored to each client type (web, mobile) instead of one generic gateway for all." },
  { name: "Circuit Breaker", desc: "Gateway stops forwarding requests to a failing backend temporarily, preventing cascading failures." },
];

export default function GatewayPatternsReference() {
  return (
    <div className="space-y-3">
      {PATTERNS.map((p) => (
        <div key={p.name} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-indigo-400">{p.name}</p>
          <p className="text-sm text-slate-300 mt-1">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
