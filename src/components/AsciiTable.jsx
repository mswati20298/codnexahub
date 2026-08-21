import { useMemo, useState } from "react";

export default function AsciiTable() {
  const [query, setQuery] = useState("");

  const entries = useMemo(() => {
    const all = Array.from({ length: 95 }, (_, i) => {
      const code = i + 32;
      return { code, char: String.fromCharCode(code), hex: code.toString(16).toUpperCase() };
    });
    if (!query.trim()) return all;
    const q = query.trim().toLowerCase();
    return all.filter((e) => String(e.code).includes(q) || e.char.toLowerCase() === q || e.hex.toLowerCase() === q.replace(/^0x/, ""));
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by character, decimal, or hex..."
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-900">
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-1 pr-4">Char</th>
              <th className="py-1 pr-4">Decimal</th>
              <th className="py-1 pr-4">Hex</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.code} className="border-b border-slate-800/60">
                <td className="py-1 pr-4 font-mono text-indigo-400">{e.char === " " ? "(space)" : e.char}</td>
                <td className="py-1 pr-4 text-slate-300">{e.code}</td>
                <td className="py-1 pr-4 text-slate-400">0x{e.hex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
