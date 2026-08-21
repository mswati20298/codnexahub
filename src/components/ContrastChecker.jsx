import { useMemo, useState } from "react";

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#4f46e5");

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

  const checks = ratio
    ? [
        { label: "AA — normal text (4.5:1)", pass: ratio >= 4.5 },
        { label: "AA — large text (3:1)", pass: ratio >= 3 },
        { label: "AAA — normal text (7:1)", pass: ratio >= 7 },
        { label: "AAA — large text (4.5:1)", pass: ratio >= 4.5 },
      ]
    : [];

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex items-center gap-3 text-sm text-slate-300">
          Text
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-10 h-10 rounded border border-slate-700 bg-transparent cursor-pointer" />
          <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-300">
          Background
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded border border-slate-700 bg-transparent cursor-pointer" />
          <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-sm" />
        </label>
      </div>

      <div className="rounded-lg p-6 mb-4 text-center" style={{ backgroundColor: bg, color: fg }}>
        <p className="text-lg font-medium">The quick brown fox jumps over the lazy dog</p>
      </div>

      {ratio ? (
        <>
          <p className="text-2xl font-semibold text-slate-100 mb-3">{ratio.toFixed(2)}:1</p>
          <div className="space-y-1">
            {checks.map((c) => (
              <div key={c.label} className={`text-sm px-3 py-1.5 rounded-lg border ${c.pass ? "border-emerald-900 bg-emerald-950/40 text-emerald-300" : "border-red-900 bg-red-950/40 text-red-300"}`}>
                {c.pass ? "✓" : "✗"} {c.label}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-red-400 text-sm">Enter valid hex colors.</p>
      )}
    </div>
  );
}
