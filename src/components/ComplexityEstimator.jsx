import { useMemo, useState } from "react";

function estimateComplexity(code) {
  const patterns = [
    { name: "if statements", re: /\bif\s*\(/g },
    { name: "else if", re: /\belse\s+if\b/g },
    { name: "for loops", re: /\bfor\s*\(/g },
    { name: "while loops", re: /\bwhile\s*\(/g },
    { name: "switch cases", re: /\bcase\s+/g },
    { name: "ternary operators", re: /\?[^:]+:/g },
    { name: "logical AND/OR", re: /(&&|\|\|)/g },
    { name: "catch blocks", re: /\bcatch\s*\(/g },
  ];

  let total = 1; // base complexity
  const breakdown = patterns.map((p) => {
    const matches = code.match(p.re) || [];
    total += matches.length;
    return { name: p.name, count: matches.length };
  });

  return { total, breakdown };
}

const SAMPLE = `function processOrder(order) {
  if (!order) return null;
  if (order.status === 'pending' && order.total > 0) {
    for (const item of order.items) {
      if (item.quantity > 10 || item.price < 0) {
        continue;
      }
    }
  } else if (order.status === 'cancelled') {
    return { refund: true };
  }
  return order;
}`;

export default function ComplexityEstimator() {
  const [code, setCode] = useState(SAMPLE);
  const { total, breakdown } = useMemo(() => estimateComplexity(code), [code]);

  const level = total <= 5 ? { label: "Low", color: "text-emerald-400" } : total <= 10 ? { label: "Moderate", color: "text-amber-400" } : { label: "High — consider refactoring", color: "text-red-400" };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
        <p className="text-xs text-slate-400 mb-1">Estimated cyclomatic complexity</p>
        <p className={`text-2xl font-semibold ${level.color}`}>{total} — {level.label}</p>
      </div>
      <div className="space-y-1">
        {breakdown.filter((b) => b.count > 0).map((b) => (
          <div key={b.name} className="flex justify-between text-sm bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5">
            <span className="text-slate-300">{b.name}</span>
            <span className="text-indigo-400">{b.count}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">A simplified approximation of cyclomatic complexity based on branching keywords — not a substitute for a proper static analysis tool.</p>
    </div>
  );
}
