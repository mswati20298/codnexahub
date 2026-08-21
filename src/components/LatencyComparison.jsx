import { useState } from "react";

export default function LatencyComparison() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runCheck = () => {
    setLoading(true);
    fetch("/api/latency-check")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  };

  const sorted = data
    ? [...data.results].sort((a, b) => (a.latencyMs ?? 9999) - (b.latencyMs ?? 9999))
    : [];

  const maxLatency = Math.max(...sorted.map((r) => r.latencyMs || 0), 1);

  return (
    <div>
      <button
        onClick={runCheck}
        disabled={loading}
        className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white mb-6"
      >
        {loading ? "Checking..." : "Run latency check"}
      </button>

      {data && (
        <div className="space-y-3">
          {sorted.map((r) => (
            <div key={r.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-200">{r.name}</span>
                <span className="text-slate-400">
                  {r.ok ? `${r.latencyMs} ms` : "Unreachable"}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500"
                  style={{
                    width: r.ok ? `${(r.latencyMs / maxLatency) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500 mt-4">
        Measures round-trip time from our server to each provider's public
        endpoint. This reflects server-to-server latency, not necessarily
        what you'll see from your own location.
      </p>
    </div>
  );
}
