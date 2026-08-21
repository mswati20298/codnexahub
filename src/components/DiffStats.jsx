import { useMemo, useState } from "react";

const SAMPLE = `diff --git a/src/app.js b/src/app.js
index 123..456 100644
--- a/src/app.js
+++ b/src/app.js
@@ -1,5 +1,6 @@
+import { logger } from './logger';
 function start() {
-  console.log('starting');
+  logger.info('starting');
+  logger.debug('debug mode');
 }`;

export default function DiffStats() {
  const [diff, setDiff] = useState(SAMPLE);

  const stats = useMemo(() => {
    const lines = diff.split("\n");
    let additions = 0, deletions = 0;
    const filesChanged = new Set();
    lines.forEach((line) => {
      if (line.startsWith("+++") || line.startsWith("---")) return;
      if (line.startsWith("+")) additions++;
      else if (line.startsWith("-")) deletions++;
      const fileMatch = line.match(/^diff --git a\/(.+?) b\//);
      if (fileMatch) filesChanged.add(fileMatch[1]);
    });
    return { additions, deletions, filesChanged: filesChanged.size };
  }, [diff]);

  return (
    <div>
      <textarea value={diff} onChange={(e) => setDiff(e.target.value)} rows={10} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Files changed</p>
          <p className="text-xl font-semibold text-slate-100">{stats.filesChanged}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Additions</p>
          <p className="text-xl font-semibold text-emerald-400">+{stats.additions}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Deletions</p>
          <p className="text-xl font-semibold text-red-400">-{stats.deletions}</p>
        </div>
      </div>
    </div>
  );
}
