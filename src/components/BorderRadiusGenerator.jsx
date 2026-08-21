import { useState } from "react";

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(20);
  const [tr, setTr] = useState(20);
  const [br, setBr] = useState(20);
  const [bl, setBl] = useState(20);
  const [linked, setLinked] = useState(true);

  const setAll = (v) => {
    setTl(v); setTr(v); setBr(v); setBl(v);
  };

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="w-full h-40 flex items-center justify-center bg-slate-800 rounded-lg mb-6">
        <div className="w-32 h-32 bg-indigo-500" style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }} />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300 mb-4">
        <input type="checkbox" checked={linked} onChange={(e) => setLinked(e.target.checked)} />
        Link all corners
      </label>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: "Top-left", value: tl, set: linked ? setAll : setTl },
          { label: "Top-right", value: tr, set: linked ? setAll : setTr },
          { label: "Bottom-right", value: br, set: linked ? setAll : setBr },
          { label: "Bottom-left", value: bl, set: linked ? setAll : setBl },
        ].map((f) => (
          <label key={f.label} className="flex flex-col gap-1 text-sm text-slate-300">
            {f.label}: {f.value}px
            <input type="range" min="0" max="100" value={f.value} onChange={(e) => f.set(Number(e.target.value))} className="accent-indigo-500" />
          </label>
        ))}
      </div>

      <div onClick={copy} className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 hover:border-indigo-500 flex justify-between items-center">
        <code className="text-sm text-indigo-400">{css}</code>
        <span className="text-xs text-slate-500 ml-2">Click to copy</span>
      </div>
    </div>
  );
}
