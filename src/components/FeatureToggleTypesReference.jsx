const TYPES = [
  { name: "Release Toggle", desc: "Hides in-progress features from users while allowing code to merge to main continuously. Typically short-lived, removed after full release." },
  { name: "Experiment Toggle (A/B)", desc: "Routes different users to different variants to measure impact — removed once the experiment concludes and a winner is chosen." },
  { name: "Ops Toggle", desc: "Lets operators control system behavior in production — kill switches, circuit breakers, degrading gracefully under load." },
  { name: "Permission Toggle", desc: "Long-lived flag controlling access based on user attributes — plan tier, beta group, internal staff." },
];

export default function FeatureToggleTypesReference() {
  return (
    <div className="space-y-3">
      {TYPES.map((t) => (
        <div key={t.name} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-indigo-400">{t.name}</p>
          <p className="text-sm text-slate-300 mt-1">{t.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500">Release and experiment toggles should be actively cleaned up after their purpose is served — stale flags are a common source of confusing, hard-to-maintain code.</p>
    </div>
  );
}
