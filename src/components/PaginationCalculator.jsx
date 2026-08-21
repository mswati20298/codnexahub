import { useMemo, useState } from "react";

export default function PaginationCalculator() {
  const [totalItems, setTotalItems] = useState(2450);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(3);

  const results = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const offset = (currentPage - 1) * pageSize;
    const startItem = offset + 1;
    const endItem = Math.min(offset + pageSize, totalItems);
    return { totalPages, offset, startItem, endItem };
  }, [totalItems, pageSize, currentPage]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Total items
          <input type="number" min="0" value={totalItems} onChange={(e) => setTotalItems(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Page size
          <input type="number" min="1" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Current page
          <input type="number" min="1" value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Total pages</p>
          <p className="text-xl font-semibold text-indigo-400">{results.totalPages}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">SQL OFFSET value</p>
          <p className="text-xl font-semibold text-indigo-400">{results.offset}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:col-span-2">
          <p className="text-xs text-slate-400 mb-1">Showing items</p>
          <p className="text-lg font-semibold text-slate-100">{results.startItem}–{results.endItem} of {totalItems}</p>
        </div>
      </div>
    </div>
  );
}
