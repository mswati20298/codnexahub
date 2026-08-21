const CHECKLIST = [
  { category: "Ingestion", items: [
    "Chunking strategy accounts for document structure (don't split mid-sentence or mid-table).",
    "Metadata (source, date, section) is preserved alongside each chunk for filtering and citation.",
    "Re-indexing pipeline exists for updated/deleted source documents.",
  ]},
  { category: "Retrieval", items: [
    "Retrieval is evaluated on relevance, not just implemented and assumed to work.",
    "Hybrid search (keyword + semantic) considered if pure vector search misses exact-match queries.",
    "Re-ranking step considered for improving top-k precision before sending to the model.",
  ]},
  { category: "Generation", items: [
    "Prompt clearly separates retrieved context from the user's question.",
    "Model is instructed to say when it doesn't have enough context, rather than guessing.",
    "Citations/sources are surfaced to the user when possible for verifiability.",
  ]},
];

export default function RagChecklist() {
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
