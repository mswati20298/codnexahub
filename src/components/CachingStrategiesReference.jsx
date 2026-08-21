const PATTERNS = [
  { name: "Cache-Aside (Lazy Loading)", desc: "App checks cache first; on a miss, reads from the database and populates the cache. Simple and widely used, but the first request after expiry is always slow." },
  { name: "Write-Through", desc: "Every write goes to the cache and the database together. Keeps cache always fresh, but adds latency to writes." },
  { name: "Write-Behind (Write-Back)", desc: "Writes go to the cache immediately and are flushed to the database asynchronously. Fast writes, but risks data loss if the cache fails before flushing." },
  { name: "Read-Through", desc: "The cache itself is responsible for loading from the database on a miss, rather than the application handling it explicitly." },
  { name: "Refresh-Ahead", desc: "Proactively refreshes cache entries before they expire, based on access patterns — avoids the latency spike of cache-aside's cold miss." },
];

export default function CachingStrategiesReference() {
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
