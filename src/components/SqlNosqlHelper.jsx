import { useMemo, useState } from "react";

const QUESTIONS = [
  { key: "relationalData", label: "Data has clear relationships that benefit from JOINs", weight: "sql" },
  { key: "acidNeeded", label: "Strong transactional consistency (ACID) is critical", weight: "sql" },
  { key: "flexibleSchema", label: "Schema changes frequently or varies significantly between records", weight: "nosql" },
  { key: "massiveScale", label: "Need to scale writes horizontally across many servers", weight: "nosql" },
  { key: "complexQueries", label: "Need complex ad-hoc queries across multiple entities", weight: "sql" },
  { key: "keyValueAccess", label: "Access pattern is mostly simple key-based lookups", weight: "nosql" },
  { key: "reporting", label: "Heavy reporting/analytics with aggregations across tables", weight: "sql" },
  { key: "documentNature", label: "Data is naturally document-shaped (nested, varying structure)", weight: "nosql" },
];

export default function SqlNosqlHelper() {
  const [answers, setAnswers] = useState({});
  const toggle = (key) => setAnswers((prev) => ({ ...prev, [key]: !prev[key] }));

  const { sqlScore, nosqlScore } = useMemo(() => {
    let sqlScore = 0, nosqlScore = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.key]) {
        if (q.weight === "sql") sqlScore++;
        else nosqlScore++;
      }
    });
    return { sqlScore, nosqlScore };
  }, [answers]);

  const recommendation = sqlScore === 0 && nosqlScore === 0 ? null : sqlScore > nosqlScore ? "SQL (relational)" : nosqlScore > sqlScore ? "NoSQL" : "Either could work — consider team familiarity and existing infra";

  return (
    <div>
      <div className="space-y-2 mb-6">
        {QUESTIONS.map((q) => (
          <label key={q.key} className="flex items-start gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={!!answers[q.key]} onChange={() => toggle(q.key)} className="mt-1" />
            {q.label}
          </label>
        ))}
      </div>
      {recommendation && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Suggested direction</p>
          <p className="text-xl font-semibold text-indigo-400">{recommendation}</p>
          <p className="text-xs text-slate-500 mt-2">SQL signals: {sqlScore} · NoSQL signals: {nosqlScore}</p>
        </div>
      )}
    </div>
  );
}
