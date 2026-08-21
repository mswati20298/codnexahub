const MODELS = [
  { name: "text-embedding-3-small", dims: 1536, provider: "OpenAI" },
  { name: "text-embedding-3-large", dims: 3072, provider: "OpenAI" },
  { name: "text-embedding-ada-002", dims: 1536, provider: "OpenAI" },
  { name: "voyage-2", dims: 1024, provider: "Voyage AI" },
  { name: "embed-english-v3.0", dims: 1024, provider: "Cohere" },
  { name: "gemini-embedding-001", dims: 768, provider: "Google" },
];

function storagePerMillion(dims) {
  // float32 = 4 bytes per dimension
  const bytes = dims * 4 * 1_000_000;
  return bytes / 1024 ** 3;
}

export default function EmbeddingDimensionCalculator() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">Dimensions</th>
              <th className="py-2 pr-4">Storage / 1M vectors</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => (
              <tr key={m.name} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 font-medium text-slate-100">{m.name}</td>
                <td className="py-2 pr-4 text-slate-400">{m.provider}</td>
                <td className="py-2 pr-4">{m.dims}</td>
                <td className="py-2 pr-4 text-indigo-400">{storagePerMillion(m.dims).toFixed(2)} GB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-4">Storage estimate assumes 4 bytes/dimension (float32), raw vector data only — doesn't include index overhead, which most vector DBs add on top.</p>
    </div>
  );
}
