import { useEffect, useState } from "react";

const STATUS_STYLES = {
  operational: "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40",
  degraded: "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40",
  major: "text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40",
  minor: "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40",
  unknown: "text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800",
};

export default function ModelStatusTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = () => {
    setLoading(true);
    fetch("/api/model-status")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch(() => setError("Couldn't fetch status right now."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-500">
          {data ? `Last checked: ${new Date(data.checkedAt).toLocaleTimeString()}` : "Checking..."}
        </p>
        <button
          onClick={fetchStatus}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300"
        >
          Refresh
        </button>
      </div>

      {loading && !data && <p className="text-slate-500 dark:text-slate-500 text-sm">Loading status...</p>}
      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

      {data && (
        <div className="space-y-2">
          {data.providers.map((p) => (
            <div
              key={p.id}
              className={`flex justify-between items-center rounded-lg border px-4 py-3 ${
                STATUS_STYLES[p.status] || STATUS_STYLES.unknown
              }`}
            >
              <span className="font-medium">{p.name}</span>
              <span className="text-sm capitalize">{p.status}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        Status auto-refreshes every 60 seconds. Data is pulled from each
        provider's public status page.
      </p>
    </div>
  );
}
