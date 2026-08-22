const TYPES = [
  { category: "Text", postgres: "VARCHAR(n) / TEXT", mysql: "VARCHAR(n) / TEXT", sqlserver: "NVARCHAR(n)" },
  { category: "Integer", postgres: "INTEGER / BIGINT", mysql: "INT / BIGINT", sqlserver: "INT / BIGINT" },
  { category: "Decimal", postgres: "NUMERIC(p,s)", mysql: "DECIMAL(p,s)", sqlserver: "DECIMAL(p,s)" },
  { category: "Boolean", postgres: "BOOLEAN", mysql: "TINYINT(1) / BOOLEAN", sqlserver: "BIT" },
  { category: "Date/time", postgres: "TIMESTAMP / TIMESTAMPTZ", mysql: "DATETIME / TIMESTAMP", sqlserver: "DATETIME2" },
  { category: "UUID", postgres: "UUID", mysql: "CHAR(36) / BINARY(16)", sqlserver: "UNIQUEIDENTIFIER" },
  { category: "JSON", postgres: "JSON / JSONB", mysql: "JSON", sqlserver: "NVARCHAR(MAX) + validation" },
  { category: "Binary", postgres: "BYTEA", mysql: "BLOB", sqlserver: "VARBINARY(MAX)" },
];

export default function DataTypeReference() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="py-2 pr-4">Category</th>
            <th className="py-2 pr-4">PostgreSQL</th>
            <th className="py-2 pr-4">MySQL</th>
            <th className="py-2 pr-4">SQL Server</th>
          </tr>
        </thead>
        <tbody>
          {TYPES.map((t) => (
            <tr key={t.category} className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="py-2 pr-4 font-medium text-slate-900 dark:text-slate-100">{t.category}</td>
              <td className="py-2 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{t.postgres}</td>
              <td className="py-2 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{t.mysql}</td>
              <td className="py-2 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{t.sqlserver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
