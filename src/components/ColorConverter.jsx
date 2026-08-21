import { useMemo, useState } from "react";

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="color"
          value={rgb ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value)}
          className="w-14 h-14 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
        />
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {!rgb ? (
        <p className="text-red-400 text-sm">Enter a valid hex color, e.g. #6366f1</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">HEX</p>
            <p className="font-mono text-sm text-slate-100">{hex}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">RGB</p>
            <p className="font-mono text-sm text-slate-100">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">HSL</p>
            <p className="font-mono text-sm text-slate-100">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
          </div>
        </div>
      )}
    </div>
  );
}
