import { useState } from "react";

export default function PricingTierBuilder() {
  const [tiers, setTiers] = useState([
    { name: "Starter", price: 999, users: "1 user", features: "Basic features" },
    { name: "Pro", price: 2999, users: "5 users", features: "Advanced features + priority support" },
    { name: "Enterprise", price: 9999, users: "Unlimited", features: "All features + dedicated support" },
  ]);

  const update = (i, field, value) => {
    setTiers((prev) => prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  };
  const add = () => setTiers((prev) => [...prev, { name: "", price: 0, users: "", features: "" }]);
  const remove = (i) => setTiers((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="space-y-4 mb-4">
        {tiers.map((t, i) => (
          <div key={i} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-2">
              <input value={t.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Tier name" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
              <input type="number" value={t.price} onChange={(e) => update(i, "price", Number(e.target.value) || 0)} placeholder="Price/month" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={t.users} onChange={(e) => update(i, "users", e.target.value)} placeholder="User limit" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
              <input value={t.features} onChange={(e) => update(i, "features", e.target.value)} placeholder="Key features" className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-slate-100 text-sm" />
            </div>
            <button onClick={() => remove(i)} className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:text-red-300 mt-2">Remove tier</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 mb-6">+ Add tier</button>

      <div className="grid sm:grid-cols-3 gap-3">
        {tiers.map((t, i) => (
          <div key={i} className="border border-indigo-800 bg-indigo-950/20 rounded-lg p-4 text-center">
            <p className="font-semibold text-slate-900 dark:text-slate-100">{t.name || "Unnamed"}</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 my-2">₹{t.price.toLocaleString()}<span className="text-sm text-slate-500 dark:text-slate-500">/mo</span></p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.users}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.features}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
