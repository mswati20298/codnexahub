import { useMemo, useState } from "react";

const TYPES = [
  { key: "feat", label: "feat — new feature" },
  { key: "fix", label: "fix — bug fix" },
  { key: "docs", label: "docs — documentation" },
  { key: "style", label: "style — formatting" },
  { key: "refactor", label: "refactor — code change, no feature/fix" },
  { key: "test", label: "test — adding tests" },
  { key: "chore", label: "chore — maintenance" },
];

export default function ConventionalCommitBuilder() {
  const [type, setType] = useState("feat");
  const [scope, setScope] = useState("auth");
  const [description, setDescription] = useState("add password reset flow");
  const [breaking, setBreaking] = useState(false);
  const [body, setBody] = useState("");

  const message = useMemo(() => {
    const header = `${type}${scope ? `(${scope})` : ""}${breaking ? "!" : ""}: ${description}`;
    return body.trim() ? `${header}\n\n${body.trim()}` : header;
  }, [type, scope, description, breaking, body]);

  const copy = () => navigator.clipboard.writeText(message);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Type
        <select value={type} onChange={(e) => setType(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
          {TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
        </select>
      </label>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Scope (optional)
          <input value={scope} onChange={(e) => setScope(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Description
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
        <input type="checkbox" checked={breaking} onChange={(e) => setBreaking(e.target.checked)} />
        Breaking change
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Body (optional)
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
      </label>
      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <pre className="text-sm text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">{message}</pre>
      </div>
    </div>
  );
}
