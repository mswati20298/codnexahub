import { useMemo, useState } from "react";

export default function BaseConverter() {
  const [decimal, setDecimal] = useState("255");

  const values = useMemo(() => {
    const n = parseInt(decimal, 10);
    if (Number.isNaN(n)) return null;
    return {
      binary: n.toString(2),
      octal: n.toString(8),
      decimal: n.toString(10),
      hex: n.toString(16).toUpperCase(),
    };
  }, [decimal]);

  const updateFromBase = (value, base) => {
    const n = parseInt(value, base);
    if (!Number.isNaN(n)) setDecimal(String(n));
  };

  return (
    <div className="space-y-3">
      {[
        { label: "Decimal", base: 10, value: values?.decimal ?? "" },
        { label: "Binary", base: 2, value: values?.binary ?? "" },
        { label: "Octal", base: 8, value: values?.octal ?? "" },
        { label: "Hexadecimal", base: 16, value: values?.hex ?? "" },
      ].map((f) => (
        <label key={f.label} className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          {f.label}
          <input
            value={f.value}
            onChange={(e) => (f.base === 10 ? setDecimal(e.target.value) : updateFromBase(e.target.value, f.base))}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
      ))}
      {!values && <p className="text-red-600 dark:text-red-400 text-sm">Invalid number.</p>}
    </div>
  );
}
