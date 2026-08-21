import { useMemo, useState } from "react";

function analyze(text) {
  const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim());
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const avgWordLength = words.length > 0 ? charsNoSpaces / words.length : 0;
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
  const readingTimeMin = words.length / 200;
  return { wordCount: words.length, sentenceCount: sentences.length, chars, charsNoSpaces, avgWordLength, avgWordsPerSentence, readingTimeMin };
}

const SAMPLE = "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.";

export default function TextStats() {
  const [text, setText] = useState(SAMPLE);
  const stats = useMemo(() => analyze(text), [text]);

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm mb-4" />
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { label: "Words", value: stats.wordCount },
          { label: "Sentences", value: stats.sentenceCount },
          { label: "Characters", value: stats.chars },
          { label: "Chars (no spaces)", value: stats.charsNoSpaces },
          { label: "Avg word length", value: stats.avgWordLength.toFixed(1) },
          { label: "Avg words/sentence", value: stats.avgWordsPerSentence.toFixed(1) },
        ].map((s) => (
          <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className="text-lg font-semibold text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">Estimated reading time: {stats.readingTimeMin < 1 ? "under a minute" : `${Math.ceil(stats.readingTimeMin)} min`} (at 200 words/minute).</p>
    </div>
  );
}
