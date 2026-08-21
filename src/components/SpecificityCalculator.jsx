import { useMemo, useState } from "react";

function calculateSpecificity(selector) {
  let ids = 0, classes = 0, elements = 0;

  const idMatches = selector.match(/#[\w-]+/g) || [];
  ids += idMatches.length;

  const classMatches = selector.match(/\.[\w-]+/g) || [];
  const attrMatches = selector.match(/\[[\w-]+.*?\]/g) || [];
  const pseudoClassMatches = selector.match(/:(?!:)[\w-]+(\([^)]*\))?/g) || [];
  classes += classMatches.length + attrMatches.length + pseudoClassMatches.length;

  const cleaned = selector
    .replace(/#[\w-]+/g, "")
    .replace(/\.[\w-]+/g, "")
    .replace(/\[[\w-]+.*?\]/g, "")
    .replace(/:(?!:)[\w-]+(\([^)]*\))?/g, "")
    .replace(/::[\w-]+/g, " PSEUDOEL ");
  const elementMatches = cleaned.match(/[a-zA-Z][\w-]*/g) || [];
  elements += elementMatches.filter((e) => e !== "PSEUDOEL").length + (cleaned.match(/::[\w-]+/g) || []).length;

  return { ids, classes, elements };
}

const SAMPLE = "#header .nav-item.active > a:hover";

export default function SpecificityCalculator() {
  const [selectorA, setSelectorA] = useState(SAMPLE);
  const [selectorB, setSelectorB] = useState("nav ul li a");

  const specA = useMemo(() => calculateSpecificity(selectorA), [selectorA]);
  const specB = useMemo(() => calculateSpecificity(selectorB), [selectorB]);

  const compare = (specA.ids - specB.ids) || (specA.classes - specB.classes) || (specA.elements - specB.elements);

  return (
    <div>
      <div className="space-y-4 mb-4">
        {[{ label: "Selector A", value: selectorA, set: setSelectorA, spec: specA }, { label: "Selector B", value: selectorB, set: setSelectorB, spec: specB }].map((s) => (
          <div key={s.label}>
            <label className="flex flex-col gap-1 text-sm text-slate-300">
              {s.label}
              <input value={s.value} onChange={(e) => s.set(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
            </label>
            <p className="text-xs text-indigo-400 mt-1">Specificity: ({s.spec.ids}, {s.spec.classes}, {s.spec.elements})</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
        {compare > 0 ? "Selector A wins" : compare < 0 ? "Selector B wins" : "Equal specificity — later rule in the stylesheet wins"}
      </p>
    </div>
  );
}
