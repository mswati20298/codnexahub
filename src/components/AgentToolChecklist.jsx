const CHECKLIST = [
  { category: "Tool design", items: [
    "Each tool has a single, clear purpose — not an overloaded do-everything function.",
    "Tool descriptions are specific enough that the model can pick the right one without ambiguity.",
    "Parameter names and types are unambiguous (avoid generic names like 'data' or 'value').",
  ]},
  { category: "Safety", items: [
    "Destructive actions (delete, payment, send) require explicit confirmation, not just model discretion.",
    "The agent has least-privilege access — it can't call tools beyond what the task needs.",
    "Rate limits or usage caps exist to prevent runaway tool-calling loops.",
  ]},
  { category: "Reliability", items: [
    "Tool errors are returned to the model in a way it can reason about and recover from.",
    "There's a maximum iteration/step limit to prevent infinite agent loops.",
    "Agent behavior is logged for debugging unexpected tool-call sequences.",
  ]},
];

export default function AgentToolChecklist() {
  return (
    <div className="space-y-6">
      {CHECKLIST.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">{group.category}</h3>
          <ul className="space-y-2">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <input type="checkbox" className="mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
