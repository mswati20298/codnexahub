import { useMemo, useState } from "react";

function diffLines(a, b) {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const maxLen = Math.max(linesA.length, linesB.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    const lineA = linesA[i];
    const lineB = linesB[i];
    if (lineA === lineB) {
      result.push({ type: "same", text: lineA ?? "" });
    } else {
      if (lineA !== undefined) result.push({ type: "removed", text: lineA });
      if (lineB !== undefined) result.push({ type: "added", text: lineB });
    }
  }
  return result;
}

const SAMPLE_A = "function greet(name) {\n  console.log('Hello ' + name);\n}";
const SAMPLE_B = "function greet(name) {\n  console.log(`Hello ${name}!`);\n}";

export default function DiffViewer() {
  const [a, setA] = useState(SAMPLE_A);
  const [b, setB] = useState(SAMPLE_B);

  const diff = useMemo(() => diffLines(a, b), [a, b]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <textarea value={a} onChange={(e) => setA(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </div>
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono overflow-x-auto">
        {diff.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "added" ? "text-emerald-300 bg-emerald-950/40 px-2" :
              line.type === "removed" ? "text-red-300 bg-red-950/40 px-2" :
              "text-slate-400 px-2"
            }
          >
            {line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  "}{line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
