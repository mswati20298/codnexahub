import { useMemo, useState } from "react";

const QUESTIONS = [
  { key: "multipleClients", label: "Multiple client types need different data shapes (web, mobile, etc.)", weight: "graphql" },
  { key: "overFetching", label: "Clients currently over-fetch or need many round-trips for related data", weight: "graphql" },
  { key: "simpleCrud", label: "Mostly simple CRUD operations on well-defined resources", weight: "rest" },
  { key: "caching", label: "HTTP caching (CDN, browser cache) is important for performance", weight: "rest" },
  { key: "publicApi", label: "Building a public API for third-party developers", weight: "rest" },
  { key: "rapidIteration", label: "Frontend requirements change frequently, need flexible queries", weight: "graphql" },
  { key: "fileUploads", label: "Heavy use of file uploads/downloads", weight: "rest" },
  { key: "realtimeSubs", label: "Need real-time subscriptions to data changes", weight: "graphql" },
];

export default function RestGraphqlHelper() {
  const [answers, setAnswers] = useState({});

  const toggle = (key) => setAnswers((prev) => ({ ...prev, [key]: !prev[key] }));

  const { restScore, graphqlScore } = useMemo(() => {
    let restScore = 0, graphqlScore = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.key]) {
        if (q.weight === "rest") restScore++;
        else graphqlScore++;
      }
    });
    return { restScore, graphqlScore };
  }, [answers]);

  const recommendation = restScore === 0 && graphqlScore === 0
    ? null
    : restScore > graphqlScore ? "REST" : graphqlScore > restScore ? "GraphQL" : "Either could work — consider team familiarity";

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
          <p className="text-xs text-slate-500 mt-2">REST signals: {restScore} · GraphQL signals: {graphqlScore}</p>
        </div>
      )}
    </div>
  );
}
