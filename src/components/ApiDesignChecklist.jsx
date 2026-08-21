const CHECKLIST = [
  { category: "Resource design", items: [
    "URLs use nouns for resources, not verbs (/orders not /getOrders).",
    "Collection endpoints use plural nouns (/users not /user).",
    "Nested resources reflect genuine ownership (/users/:id/orders), not arbitrary grouping.",
  ]},
  { category: "Consistency", items: [
    "Response envelope structure is consistent across all endpoints.",
    "Error responses follow a consistent shape (error code, message, details).",
    "Date/time fields consistently use ISO 8601 format.",
  ]},
  { category: "Usability", items: [
    "Pagination is implemented for any endpoint that could return unbounded results.",
    "Filtering and sorting are supported via query params where useful.",
    "Meaningful HTTP status codes are used, not just 200 for everything.",
  ]},
  { category: "Documentation", items: [
    "An OpenAPI/Swagger spec exists and stays in sync with the actual implementation.",
    "Example requests and responses are provided for each endpoint.",
  ]},
];

export default function ApiDesignChecklist() {
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
