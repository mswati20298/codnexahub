const ALGORITHMS = [
  { name: "Round Robin", desc: "Requests distributed sequentially across servers in order. Simple, works well when servers have equal capacity." },
  { name: "Weighted Round Robin", desc: "Like round robin, but servers with higher weight get proportionally more requests — useful for mixed-capacity servers." },
  { name: "Least Connections", desc: "Sends the next request to the server with the fewest active connections. Good for long-lived connections with variable duration." },
  { name: "IP Hash", desc: "Routes based on a hash of the client IP, ensuring the same client consistently hits the same server (session affinity)." },
  { name: "Least Response Time", desc: "Sends requests to the server with the lowest latency and fewest active connections." },
  { name: "Random", desc: "Requests distributed randomly — simple and works reasonably well at scale, similar statistically to round robin." },
];

export default function LoadBalancerReference() {
  return (
    <div className="space-y-2">
      {ALGORITHMS.map((a) => (
        <div key={a.name} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{a.name}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}
