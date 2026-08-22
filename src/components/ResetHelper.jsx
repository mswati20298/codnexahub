import { useState } from "react";

const COMMANDS = [
  { label: "Unstage files (keep changes)", cmd: "git reset HEAD <file>", risk: "safe" },
  { label: "Undo last commit, keep changes staged", cmd: "git reset --soft HEAD~1", risk: "safe" },
  { label: "Undo last commit, keep changes unstaged", cmd: "git reset --mixed HEAD~1", risk: "safe" },
  { label: "Undo last commit, discard all changes", cmd: "git reset --hard HEAD~1", risk: "danger" },
  { label: "Reset to a specific commit (discard everything after)", cmd: "git reset --hard <commit-hash>", risk: "danger" },
  { label: "Reset a single file to last commit", cmd: "git checkout HEAD -- <file>", risk: "safe" },
];

export default function ResetHelper() {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  return (
    <div className="space-y-1">
      {COMMANDS.map((c) => (
        <div key={c.cmd} onClick={() => copy(c.cmd)} className={`cursor-pointer flex justify-between items-center rounded-lg px-3 py-2 border hover:opacity-90 ${c.risk === "danger" ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"}`}>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.label} {c.risk === "danger" && <span className="text-red-600 dark:text-red-400">⚠ destructive</span>}</p>
            <code className="text-sm text-emerald-600 dark:text-emerald-400">{c.cmd}</code>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-500">{copiedCmd === c.cmd ? "Copied!" : "Copy"}</span>
        </div>
      ))}
      <p className="text-xs text-amber-600 dark:text-amber-400 mt-4">--hard resets permanently discard uncommitted changes — there's no undo unless you know the commit hash to recover via reflog.</p>
    </div>
  );
}
