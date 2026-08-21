const STRATEGIES = [
  { name: "Range-based sharding", desc: "Split data by value ranges (e.g. user IDs 1-1000 on shard A). Simple, but can create hot spots if data isn't evenly distributed." },
  { name: "Hash-based sharding", desc: "Hash a key (e.g. user ID) to determine the shard. Distributes load evenly but makes range queries across shards harder." },
  { name: "Geographic sharding", desc: "Split data by region/location — reduces latency for regional users, helps with data residency requirements." },
  { name: "Directory-based sharding", desc: "A lookup table maps keys to shards, giving flexibility to rebalance — but the lookup table itself becomes a critical dependency." },
];

export default function ShardingReference() {
  return (
    <div className="space-y-3">
      {STRATEGIES.map((s) => (
        <div key={s.name} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-indigo-400">{s.name}</p>
          <p className="text-sm text-slate-300 mt-1">{s.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-2">Sharding adds significant operational complexity — most applications should exhaust vertical scaling and read replicas before sharding.</p>
    </div>
  );
}
