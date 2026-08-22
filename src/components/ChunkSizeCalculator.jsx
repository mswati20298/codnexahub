import { useMemo, useState } from "react";

export default function ChunkSizeCalculator() {
  const [documentChars, setDocumentChars] = useState(50000);
  const [chunkTokens, setChunkTokens] = useState(500);
  const [overlapPct, setOverlapPct] = useState(15);

  const results = useMemo(() => {
    const charsPerToken = 4;
    const chunkChars = chunkTokens * charsPerToken;
    const overlapChars = chunkChars * (overlapPct / 100);
    const effectiveChunkSize = chunkChars - overlapChars;
    const numChunks = Math.ceil(documentChars / effectiveChunkSize);
    const totalTokensWithOverlap = numChunks * chunkTokens;
    return { numChunks, totalTokensWithOverlap, chunkChars };
  }, [documentChars, chunkTokens, overlapPct]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Document length (characters)
          <input type="number" min="0" value={documentChars} onChange={(e) => setDocumentChars(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Chunk size (tokens)
          <input type="number" min="1" value={chunkTokens} onChange={(e) => setChunkTokens(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Overlap (%)
          <input type="number" min="0" max="90" value={overlapPct} onChange={(e) => setOverlapPct(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Estimated chunks</p>
          <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{results.numChunks}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total tokens to embed (with overlap)</p>
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{results.totalTokensWithOverlap.toLocaleString()}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Overlap helps preserve context across chunk boundaries but increases total tokens to embed — there's a real trade-off between retrieval quality and embedding cost.</p>
    </div>
  );
}
