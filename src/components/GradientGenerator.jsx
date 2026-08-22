import { useMemo, useState } from "react";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState("linear");

  const css = useMemo(() => {
    return type === "linear"
      ? `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
      : `background: radial-gradient(circle, ${color1}, ${color2});`;
  }, [color1, color2, angle, type]);

  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div
        className="w-full h-40 rounded-lg mb-4 border border-slate-300 dark:border-slate-700"
        style={{ background: type === "linear" ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})` }}
      />
      <div className="flex gap-2 mb-4">
        {["linear", "radial"].map((t) => (
          <button key={t} onClick={() => setType(t)} className={`text-sm px-3 py-1.5 rounded-lg border capitalize ${type === t ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{t}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-10 h-10 rounded border border-slate-300 dark:border-slate-700 bg-transparent" />
          Color 1
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-10 h-10 rounded border border-slate-300 dark:border-slate-700 bg-transparent" />
          Color 2
        </label>
        {type === "linear" && (
          <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
            Angle: {angle}°
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="accent-emerald-500" />
          </label>
        )}
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 hover:border-emerald-500 flex justify-between items-center">
        <code className="text-sm text-emerald-600 dark:text-emerald-400">{css}</code>
        <span className="text-xs text-slate-500 dark:text-slate-500 ml-2">Click to copy</span>
      </div>
    </div>
  );
}
