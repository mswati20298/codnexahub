const STRATEGIES = [
  { name: "Blue-Green Deployment", desc: "Two identical environments — one live (blue), one idle (green). Deploy to green, test, then switch traffic entirely. Rollback is instant (switch back).", tradeoff: "Requires double the infrastructure during deployment; all-or-nothing traffic switch." },
  { name: "Canary Deployment", desc: "Route a small percentage of traffic to the new version, gradually increasing if metrics look healthy.", tradeoff: "Slower rollout, but catches issues before they affect all users. Needs good monitoring to know when to proceed/rollback." },
  { name: "Rolling Deployment", desc: "Gradually replace instances of the old version with the new one, one at a time or in batches.", tradeoff: "No extra infrastructure needed, but rollback is slower since you're rolling forward again rather than an instant switch." },
  { name: "Feature Flags", desc: "Deploy the new code to everyone, but keep it inactive behind a flag — enable it separately from deployment.", tradeoff: "Decouples deploy from release, but requires flag management discipline and eventual cleanup of stale flags." },
];

export default function DeploymentStrategiesReference() {
  return (
    <div className="space-y-3">
      {STRATEGIES.map((s) => (
        <div key={s.name} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-indigo-400">{s.name}</p>
          <p className="text-sm text-slate-300 mt-1">{s.desc}</p>
          <p className="text-xs text-slate-500 mt-2">Trade-off: {s.tradeoff}</p>
        </div>
      ))}
    </div>
  );
}
