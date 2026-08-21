import { useState } from "react";

export default function SamplingExplainer() {
  const [temperature, setTemperature] = useState(0.7);

  const behavior = temperature < 0.3
    ? "Very focused and deterministic — good for factual Q&A, code generation, or structured extraction."
    : temperature < 0.7
    ? "Balanced — reasonable creativity while staying coherent. Good default for most tasks."
    : temperature < 1.0
    ? "More creative and varied — good for brainstorming or creative writing, at some cost to consistency."
    : "Highly random — outputs may be less coherent, useful mainly for exploring unusual outputs.";

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-6">
        Temperature: {temperature}
        <input type="range" min="0" max="1.5" step="0.05" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="accent-indigo-500" />
      </label>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
        <p className="text-sm text-slate-300">{behavior}</p>
      </div>

      <div className="space-y-4 text-sm text-slate-300">
        <div>
          <p className="font-medium text-slate-100 mb-1">Temperature</p>
          <p>Controls randomness in token selection. 0 = always pick the most likely token (deterministic). Higher values flatten the probability distribution, making less-likely tokens more probable.</p>
        </div>
        <div>
          <p className="font-medium text-slate-100 mb-1">Top-p (nucleus sampling)</p>
          <p>Instead of considering all tokens, only samples from the smallest set of tokens whose cumulative probability exceeds p. top_p=0.9 means "consider tokens until we've covered 90% of probability mass."</p>
        </div>
        <div>
          <p className="font-medium text-slate-100 mb-1">Using both together</p>
          <p>Most guidance suggests adjusting one, not both — combining aggressive settings on both can produce unpredictable results.</p>
        </div>
      </div>
    </div>
  );
}
