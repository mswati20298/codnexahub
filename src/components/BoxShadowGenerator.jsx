import { useMemo, useState } from "react";

export default function BoxShadowGenerator() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(30);

  const rgba = useMemo(() => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  }, [color, opacity]);

  const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${rgba};`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="w-full h-40 flex items-center justify-center bg-slate-800 rounded-lg mb-6">
        <div className="w-32 h-32 bg-slate-100 rounded-lg" style={{ boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${rgba}` }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: "X offset", value: x, set: setX, min: -50, max: 50 },
          { label: "Y offset", value: y, set: setY, min: -50, max: 50 },
          { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
          { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
        ].map((f) => (
          <label key={f.label} className="flex flex-col gap-1 text-sm text-slate-300">
            {f.label}: {f.value}px
            <input type="range" min={f.min} max={f.max} value={f.value} onChange={(e) => f.set(Number(e.target.value))} className="accent-indigo-500" />
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded border border-slate-700 bg-transparent" />
          Shadow color
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Opacity: {opacity}%
          <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="accent-indigo-500" />
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 hover:border-indigo-500 flex justify-between items-center">
        <code className="text-sm text-indigo-400">{css}</code>
        <span className="text-xs text-slate-500 ml-2">Click to copy</span>
      </div>
    </div>
  );
}
