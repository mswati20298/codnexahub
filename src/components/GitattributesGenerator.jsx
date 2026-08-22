import { useMemo, useState } from "react";

export default function GitattributesGenerator() {
  const [normalizeLineEndings, setNormalizeLineEndings] = useState(true);
  const [markBinary, setMarkBinary] = useState(true);
  const [lfsImages, setLfsImages] = useState(false);
  const [hideFromDiff, setHideFromDiff] = useState("package-lock.json\nyarn.lock");

  const content = useMemo(() => {
    const lines = [];
    if (normalizeLineEndings) lines.push("* text=auto eol=lf");
    if (markBinary) lines.push("*.png binary\n*.jpg binary\n*.woff2 binary\n*.ico binary");
    if (lfsImages) lines.push("*.psd filter=lfs diff=lfs merge=lfs -text\n*.zip filter=lfs diff=lfs merge=lfs -text");
    if (hideFromDiff.trim()) {
      hideFromDiff.split("\n").filter(Boolean).forEach((f) => lines.push(`${f.trim()} -diff linguist-generated=true`));
    }
    return lines.join("\n\n");
  }, [normalizeLineEndings, markBinary, lfsImages, hideFromDiff]);

  const copy = () => navigator.clipboard.writeText(content);

  return (
    <div>
      <div className="space-y-2 mb-4">
        {[
          { label: "Normalize line endings to LF", value: normalizeLineEndings, set: setNormalizeLineEndings },
          { label: "Mark common binary file types", value: markBinary, set: setMarkBinary },
          { label: "Enable Git LFS for large binaries", value: lfsImages, set: setLfsImages },
        ].map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={f.value} onChange={(e) => f.set(e.target.checked)} />
            {f.label}
          </label>
        ))}
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Files to hide from diffs (generated files, one per line)
        <textarea value={hideFromDiff} onChange={(e) => setHideFromDiff(e.target.value)} rows={3} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{content}</code>
      </pre>
    </div>
  );
}
