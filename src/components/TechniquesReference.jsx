const TECHNIQUES = [
  { name: "Zero-shot", desc: "Ask directly with no examples. Works for simple, well-understood tasks." },
  { name: "Few-shot", desc: "Include 2-5 examples of input/output pairs before the actual task, to show the model the expected pattern." },
  { name: "Chain-of-thought", desc: "Ask the model to reason step-by-step before answering — improves accuracy on complex reasoning tasks." },
  { name: "Role prompting", desc: "Assign a persona ('You are an expert...') to steer tone and domain focus." },
  { name: "Structured output", desc: "Explicitly request JSON, XML, or a specific format to make output easier to parse programmatically." },
  { name: "Self-consistency", desc: "Generate multiple responses with the same prompt and take the majority/most consistent answer." },
  { name: "Prompt chaining", desc: "Break a complex task into multiple simpler prompts, feeding one's output into the next." },
  { name: "Negative instructions", desc: "Explicitly state what NOT to do — less reliable than positive instructions but useful as a backstop." },
];

export default function TechniquesReference() {
  return (
    <div className="space-y-2">
      {TECHNIQUES.map((t) => (
        <div key={t.name} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{t.name}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{t.desc}</p>
        </div>
      ))}
    </div>
  );
}
