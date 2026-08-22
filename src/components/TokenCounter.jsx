import { useMemo, useState } from "react";

// Approximate tokenizer behavior per model family, based on published
// average characters-per-token ratios. Not exact — for exact counts, a
// real tokenizer library (e.g. tiktoken, @anthropic-ai/tokenizer) is needed.
const APPROX_RATIOS = [
  { id: "gpt", label: "GPT (OpenAI, cl100k-style)", charsPerToken: 4.0 },
  { id: "claude", label: "Claude (Anthropic)", charsPerToken: 3.7 },
  { id: "gemini", label: "Gemini (Google)", charsPerToken: 4.0 },
  { id: "llama", label: "Llama (Meta)", charsPerToken: 3.8 },
];

export default function TokenCounter() {
  const [text, setText] = useState(
    "Paste your prompt here to estimate its token count across models."
  );

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const estimates = useMemo(() => {
    return APPROX_RATIOS.map((r) => ({
      ...r,
      tokens: Math.ceil(charCount / r.charsPerToken),
    }));
  }, [charCount]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
        placeholder="Paste your text here..."
      />

      <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <span>{charCount.toLocaleString()} characters</span>
        <span>{wordCount.toLocaleString()} words</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {estimates.map((e) => (
          <div
            key={e.id}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{e.label}</p>
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
              ~{e.tokens.toLocaleString()} tokens
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        These are approximations based on average characters-per-token
        ratios, not exact tokenizer output. For billing-critical accuracy,
        use the provider's official tokenizer library.
      </p>
    </div>
  );
}
