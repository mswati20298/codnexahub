import { useMemo, useState } from "react";

const STYLES = {
  "step-by-step": {
    label: "Step-by-step reasoning",
    wrap: (task) =>
      `${task}\n\nThink through this step by step before giving your final answer. Show your reasoning, then clearly label your final answer as "Answer:".`,
  },
  "xml-thinking": {
    label: "XML thinking tags",
    wrap: (task) =>
      `${task}\n\nFirst, work through your reasoning inside <thinking></thinking> tags. Then give your final answer inside <answer></answer> tags.`,
  },
  "pros-cons": {
    label: "Pros/cons before deciding",
    wrap: (task) =>
      `${task}\n\nBefore answering, list the key considerations for and against each option. Then state your recommendation and why it outweighs the alternatives.`,
  },
  "self-check": {
    label: "Self-check before answering",
    wrap: (task) =>
      `${task}\n\nDraft your answer, then review it for errors or missed edge cases before presenting your final response.`,
  },
};

export default function CotFormatter() {
  const [task, setTask] = useState("Should we migrate our database from Postgres to MongoDB?");
  const [style, setStyle] = useState("step-by-step");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => STYLES[style].wrap(task), [task, style]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Your task or question
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(STYLES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setStyle(key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              style === key
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-2">
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
