const STRATEGIES = [
  { css: "font-display: swap;", desc: "Show fallback font immediately, swap to web font once loaded. Avoids invisible text, but causes layout shift (FOIT → FOUT)." },
  { css: "font-display: optional;", desc: "Use the web font only if it loads very quickly; otherwise stick with the fallback for this page load. Best for avoiding layout shift, at the cost of some users never seeing the custom font." },
  { css: "font-display: fallback;", desc: "Brief invisible period, then fallback font, then swap if the web font arrives quickly. A middle ground between swap and optional." },
  { css: '<link rel="preload" as="font" ...>', desc: "Tells the browser to fetch the font file early, in parallel with other critical resources — reduces the delay before it can be used." },
];

export default function FontLoadingReference() {
  return (
    <div className="space-y-2">
      {STRATEGIES.map((s) => (
        <div key={s.css} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
          <code className="text-sm text-indigo-400">{s.css}</code>
          <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4">For most sites, font-display: swap combined with font preloading is a solid default — visible text quickly, acceptable layout shift.</p>
    </div>
  );
}
