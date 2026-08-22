const FORMS = [
  { form: "1NF", rule: "Each column contains atomic (indivisible) values, and each row is unique.", example: "Split a 'phone_numbers' column with comma-separated values into separate rows or a related table." },
  { form: "2NF", rule: "Must be in 1NF, and every non-key column depends on the whole primary key (no partial dependency).", example: "In a table keyed by (order_id, product_id), move 'customer_name' (which depends only on order_id) to a separate orders table." },
  { form: "3NF", rule: "Must be in 2NF, and no non-key column depends on another non-key column (no transitive dependency).", example: "Move 'city' out of a table if it's derivable from 'zip_code', which is itself a non-key column." },
  { form: "BCNF", rule: "A stricter version of 3NF — every determinant must be a candidate key.", example: "Handles edge cases 3NF misses, typically with overlapping composite candidate keys." },
];

export default function NormalizationReference() {
  return (
    <div className="space-y-3">
      {FORMS.map((f) => (
        <div key={f.form} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{f.form}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{f.rule}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Example: {f.example}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">In practice, most production schemas target 3NF — full normalization to BCNF is less common outside specific edge cases, and some denormalization is often intentional for read performance.</p>
    </div>
  );
}
