export default function CteReference() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">Basic CTE</p>
        <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
          <code>{`WITH recent_orders AS (
  SELECT * FROM orders
  WHERE created_at > NOW() - INTERVAL '30 days'
)
SELECT customer_id, COUNT(*)
FROM recent_orders
GROUP BY customer_id;`}</code>
        </pre>
      </div>
      <div>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">Recursive CTE (e.g. org chart traversal)</p>
        <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
          <code>{`WITH RECURSIVE org_chart AS (
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;`}</code>
        </pre>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500">CTEs improve readability over nested subqueries and, in a recursive form, let you query hierarchical/tree-structured data that would be very awkward with plain JOINs.</p>
    </div>
  );
}
