const PATTERNS = [
  { name: "Orchestrator-Worker", desc: "One agent plans and delegates subtasks to specialized worker agents, then combines their results. Good for tasks that decompose cleanly." },
  { name: "Sequential Pipeline", desc: "Agents run in a fixed order, each processing the previous agent's output — like an assembly line. Predictable, but rigid." },
  { name: "Debate / Critique", desc: "Multiple agents propose and critique each other's answers before converging — can improve accuracy on reasoning tasks at higher cost." },
  { name: "Router", desc: "A lightweight agent classifies the request and routes it to the appropriate specialized agent or tool." },
  { name: "Hierarchical", desc: "A manager agent oversees sub-teams of agents, each with their own internal orchestration — used for very complex, multi-stage workflows." },
];

export default function MultiAgentReference() {
  return (
    <div className="space-y-3">
      {PATTERNS.map((p) => (
        <div key={p.name} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{p.name}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{p.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500">More agents and steps mean more cost and latency — start with the simplest pattern that solves the problem before reaching for complex multi-agent orchestration.</p>
    </div>
  );
}
