import { useMemo, useState } from "react";

export default function RateLimitCalculator() {
  const [rpm, setRpm] = useState(500);
  const [avgLatencyMs, setAvgLatencyMs] = useState(2000);
  const [desiredRequests, setDesiredRequests] = useState(50000);

  const results = useMemo(() => {
    const requestsPerSecond = rpm / 60;
    const maxConcurrent = Math.ceil((rpm / 60) * (avgLatencyMs / 1000));
    const minutesNeeded = desiredRequests / rpm;
    const timeToComplete =
      minutesNeeded < 1
        ? `${Math.ceil(minutesNeeded * 60)} sec`
        : minutesNeeded < 60
        ? `${minutesNeeded.toFixed(1)} min`
        : `${(minutesNeeded / 60).toFixed(1)} hrs`;

    return { requestsPerSecond, maxConcurrent, timeToComplete };
  }, [rpm, avgLatencyMs, desiredRequests]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Rate limit (requests/min)
          <input
            type="number"
            min="1"
            value={rpm}
            onChange={(e) => setRpm(Number(e.target.value) || 1)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Avg response time (ms)
          <input
            type="number"
            min="1"
            value={avgLatencyMs}
            onChange={(e) => setAvgLatencyMs(Number(e.target.value) || 1)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Total requests needed
          <input
            type="number"
            min="1"
            value={desiredRequests}
            onChange={(e) => setDesiredRequests(Number(e.target.value) || 1)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm mb-1">Requests/second</p>
          <p className="text-2xl font-semibold text-indigo-400">
            {results.requestsPerSecond.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm mb-1">Min. concurrency needed</p>
          <p className="text-2xl font-semibold text-indigo-400">
            {results.maxConcurrent}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm mb-1">Time to complete batch</p>
          <p className="text-2xl font-semibold text-indigo-400">
            {results.timeToComplete}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Concurrency estimate assumes requests are evenly spaced (Little's
        Law: concurrency ≈ throughput × latency). Bursty traffic will need
        higher concurrency to stay under the rate limit.
      </p>
    </div>
  );
}
