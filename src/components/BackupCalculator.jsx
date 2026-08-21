import { useMemo, useState } from "react";

export default function BackupCalculator() {
  const [dbSizeGb, setDbSizeGb] = useState(50);
  const [compressionRatio, setCompressionRatio] = useState(3);
  const [uploadSpeedMbps, setUploadSpeedMbps] = useState(100);
  const [retentionDays, setRetentionDays] = useState(30);

  const results = useMemo(() => {
    const compressedSizeGb = dbSizeGb / compressionRatio;
    const uploadTimeSeconds = (compressedSizeGb * 1024 * 8) / uploadSpeedMbps;
    const totalStorageForRetention = compressedSizeGb * retentionDays;
    return { compressedSizeGb, uploadTimeSeconds, totalStorageForRetention };
  }, [dbSizeGb, compressionRatio, uploadSpeedMbps, retentionDays]);

  const formatTime = (s) => {
    if (s < 60) return `${s.toFixed(0)}s`;
    if (s < 3600) return `${(s / 60).toFixed(1)} min`;
    return `${(s / 3600).toFixed(1)} hrs`;
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Database size (GB)
          <input type="number" min="0" value={dbSizeGb} onChange={(e) => setDbSizeGb(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Compression ratio (x:1)
          <input type="number" min="1" value={compressionRatio} onChange={(e) => setCompressionRatio(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Upload speed (Mbps)
          <input type="number" min="1" value={uploadSpeedMbps} onChange={(e) => setUploadSpeedMbps(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Retention (days, daily backups)
          <input type="number" min="1" value={retentionDays} onChange={(e) => setRetentionDays(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Compressed backup size</p>
          <p className="text-lg font-semibold text-slate-100">{results.compressedSizeGb.toFixed(2)} GB</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Upload time/backup</p>
          <p className="text-lg font-semibold text-indigo-400">{formatTime(results.uploadTimeSeconds)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Storage for full retention</p>
          <p className="text-lg font-semibold text-slate-100">{results.totalStorageForRetention.toFixed(0)} GB</p>
        </div>
      </div>
    </div>
  );
}
