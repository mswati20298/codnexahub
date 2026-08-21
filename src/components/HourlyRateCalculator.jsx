import { useMemo, useState } from "react";

export default function HourlyRateCalculator() {
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState(1200000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(25);
  const [weeksOffPerYear, setWeeksOffPerYear] = useState(4);
  const [businessExpensesPerYear, setBusinessExpensesPerYear] = useState(100000);

  const results = useMemo(() => {
    const workingWeeks = 52 - weeksOffPerYear;
    const totalBillableHours = billableHoursPerWeek * workingWeeks;
    const totalNeeded = desiredAnnualIncome + businessExpensesPerYear;
    const hourlyRate = totalBillableHours > 0 ? totalNeeded / totalBillableHours : 0;
    return { workingWeeks, totalBillableHours, hourlyRate };
  }, [desiredAnnualIncome, billableHoursPerWeek, weeksOffPerYear, businessExpensesPerYear]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Desired annual income
          <input type="number" min="0" value={desiredAnnualIncome} onChange={(e) => setDesiredAnnualIncome(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Billable hours/week
          <input type="number" min="1" max="80" value={billableHoursPerWeek} onChange={(e) => setBillableHoursPerWeek(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Weeks off per year
          <input type="number" min="0" max="52" value={weeksOffPerYear} onChange={(e) => setWeeksOffPerYear(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Annual business expenses
          <input type="number" min="0" value={businessExpensesPerYear} onChange={(e) => setBusinessExpensesPerYear(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3">
        <p className="text-xs text-slate-400 mb-1">Hourly rate to charge</p>
        <p className="text-3xl font-semibold text-indigo-400">₹{results.hourlyRate.toFixed(0)}/hr</p>
      </div>
      <p className="text-xs text-slate-500">
        Based on {results.totalBillableHours.toLocaleString()} billable hours across {results.workingWeeks} working weeks. Not every hour worked is billable — admin, sales, and learning time all eat into your week without being charged.
      </p>
    </div>
  );
}
