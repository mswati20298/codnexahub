import { useMemo, useState } from "react";

const LIMITS = [
  { id: "tweet", label: "X / Twitter post", limit: 280, unit: "chars" },
  { id: "sms", label: "SMS (single segment)", limit: 160, unit: "chars" },
  { id: "meta-desc", label: "SEO meta description", limit: 160, unit: "chars" },
  { id: "title-tag", label: "SEO title tag", limit: 60, unit: "chars" },
  { id: "linkedin-post", label: "LinkedIn post (before 'see more')", limit: 210, unit: "chars" },
  { id: "gpt-system", label: "Typical short system prompt", limit: 2000, unit: "chars" },
  { id: "yt-title", label: "YouTube title", limit: 100, unit: "chars" },
];

export default function LimitChecker() {
  const [text, setText] = useState("");

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const results = useMemo(() => {
    return LIMITS.map((l) => ({
      ...l,
      over: charCount > l.limit,
      remaining: l.limit - charCount,
    }));
  }, [charCount]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your text here..."
        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
      />

      <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <span>{charCount.toLocaleString()} characters</span>
        <span>{wordCount.toLocaleString()} words</span>
      </div>

      <div className="space-y-2">
        {results.map((l) => (
          <div
            key={l.id}
            className={`flex justify-between items-center rounded-lg border px-3 py-2 text-sm ${
              l.over
                ? "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300"
                : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <span>{l.label} ({l.limit} chars)</span>
            <span className="font-mono">
              {l.over ? `${Math.abs(l.remaining)} over` : `${l.remaining} left`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
