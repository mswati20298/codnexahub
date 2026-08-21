const CHECKLIST = [
  { category: "Indexes", items: [
    "Columns used in WHERE, JOIN, and ORDER BY clauses are indexed.",
    "No redundant or unused indexes bloating write performance.",
    "Composite indexes are ordered to match common query patterns (most selective column first).",
  ]},
  { category: "Query structure", items: [
    "SELECT * is avoided — only needed columns are selected.",
    "N+1 query patterns are avoided (use JOINs or batch loading instead of per-row queries).",
    "Subqueries are checked against equivalent JOIN performance.",
  ]},
  { category: "Data volume", items: [
    "Large result sets use pagination (LIMIT/OFFSET or keyset pagination) rather than loading everything.",
    "Aggregations on large tables use appropriate indexes or materialized views.",
  ]},
  { category: "Verification", items: [
    "EXPLAIN/EXPLAIN ANALYZE has been run on slow queries to check the execution plan.",
    "Query performance is tested against production-scale data, not just a small dev dataset.",
  ]},
];

export default function QueryChecklist() {
  return (
    <div className="space-y-6">
      {CHECKLIST.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">{group.category}</h3>
          <ul className="space-y-2">
            {group.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <input type="checkbox" className="mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
