import { useState } from "react";

export default function FilterGenerator() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);

  const css = `filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) saturate(${saturate}%) sepia(${sepia}%);`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div
        className="w-full h-40 rounded-lg mb-6 bg-cover bg-center border border-slate-700"
        style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #ec4899)", filter: css.replace("filter: ", "").replace(";", "") }}
      />
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: "Blur", value: blur, set: setBlur, min: 0, max: 20, unit: "px" },
          { label: "Brightness", value: brightness, set: setBrightness, min: 0, max: 200, unit: "%" },
          { label: "Contrast", value: contrast, set: setContrast, min: 0, max: 200, unit: "%" },
          { label: "Grayscale", value: grayscale, set: setGrayscale, min: 0, max: 100, unit: "%" },
          { label: "Saturate", value: saturate, set: setSaturate, min: 0, max: 200, unit: "%" },
          { label: "Sepia", value: sepia, set: setSepia, min: 0, max: 100, unit: "%" },
        ].map((f) => (
          <label key={f.label} className="flex flex-col gap-1 text-sm text-slate-300">
            {f.label}: {f.value}{f.unit}
            <input type="range" min={f.min} max={f.max} value={f.value} onChange={(e) => f.set(Number(e.target.value))} className="accent-indigo-500" />
          </label>
        ))}
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-indigo-500">
        <code className="text-sm text-indigo-400 break-all">{css}</code>
      </div>
    </div>
  );
}
