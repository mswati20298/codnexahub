import { useMemo, useState } from "react";

// Approximate fine-tuning training prices ($/1M tokens) — verify against
// provider docs, these change often and vary by base model.
const FINE_TUNE_MODELS = [
  { id: "gpt-4o-mini-ft", name: "GPT-4o mini (fine-tuning)", trainPrice: 3.0, inferInputPrice: 0.3, inferOutputPrice: 1.2 },
  { id: "gpt-3.5-turbo-ft", name: "GPT-3.5 Turbo (fine-tuning)", trainPrice: 8.0, inferInputPrice: 3.0, inferOutputPrice: 6.0 },
  { id: "gemini-1-5-flash-ft", name: "Gemini 1.5 Flash (tuning)", trainPrice: 0, inferInputPrice: 0.075, inferOutputPrice: 0.3 },
];

export default function FineTuneCostEstimator() {
  const [trainingTokens, setTrainingTokens] = useState(1_000_000);
  const [epochs, setEpochs] = useState(3);

  const results = useMemo(() => {
    return FINE_TUNE_MODELS.map((m) => {
      const trainingCost = (trainingTokens * epochs / 1_000_000) * m.trainPrice;
      return { ...m, trainingCost };
    });
  }, [trainingTokens, epochs]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Training dataset size (tokens)
          <input
            type="number"
            min="0"
            value={trainingTokens}
            onChange={(e) => setTrainingTokens(Number(e.target.value) || 0)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Training epochs
          <input
            type="number"
            min="1"
            value={epochs}
            onChange={(e) => setEpochs(Number(e.target.value) || 1)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Training cost</th>
              <th className="py-2 pr-4">Inference $/1M in</th>
              <th className="py-2 pr-4">Inference $/1M out</th>
            </tr>
          </thead>
          <tbody>
            {results.map((m) => (
              <tr key={m.id} className="border-b border-slate-200 dark:border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">{m.name}</td>
                <td className="py-2 pr-4 font-semibold text-emerald-600 dark:text-emerald-400">
                  {m.trainingCost > 0 ? `$${m.trainingCost.toFixed(2)}` : "Free tier available"}
                </td>
                <td className="py-2 pr-4">${m.inferInputPrice.toFixed(3)}</td>
                <td className="py-2 pr-4">${m.inferOutputPrice.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        Fine-tuned models often cost more per token at inference time than
        the base model — factor that into your total cost, not just training.
        Verify current pricing on the provider's site.
      </p>
    </div>
  );
}
