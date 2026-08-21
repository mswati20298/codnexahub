const PATTERNS = [
  { name: "Point-to-Point (Queue)", desc: "One message, one consumer — once processed, it's removed. Good for distributing work across a pool of workers." },
  { name: "Publish-Subscribe", desc: "One message broadcast to multiple independent subscribers — each gets its own copy. Good for event notification to multiple systems." },
  { name: "Dead Letter Queue", desc: "Messages that repeatedly fail processing are routed to a separate queue for inspection, instead of blocking or being silently dropped." },
  { name: "Priority Queue", desc: "Messages are processed in priority order rather than strict FIFO — useful when some tasks are more time-sensitive than others." },
  { name: "Delayed/Scheduled Messages", desc: "Messages become visible to consumers only after a specified delay — used for retries, reminders, or scheduled tasks." },
];

export default function QueuePatternsReference() {
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
