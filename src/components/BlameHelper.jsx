import { useState } from "react";

const COMMANDS = [
  { label: "Blame a file (who changed each line)", cmd: "git blame <file>" },
  { label: "Blame specific line range", cmd: "git blame -L 10,20 <file>" },
  { label: "Ignore whitespace-only changes", cmd: "git blame -w <file>" },
  { label: "Blame, following file renames", cmd: "git blame -M -C <file>" },
  { label: "Show blame as of a specific commit", cmd: "git blame <commit> -- <file>" },
  { label: "Ignore a specific commit (e.g. formatting-only)", cmd: "git blame --ignore-rev <commit> <file>" },
];

export default function BlameHelper() {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  return (
    <div className="space-y-1">
      {COMMANDS.map((c) => (
        <div key={c.cmd} onClick={() => copy(c.cmd)} className="cursor-pointer flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 hover:border-emerald-500">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{c.label}</p>
            <code className="text-sm text-emerald-600 dark:text-emerald-400">{c.cmd}</code>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-500">{copiedCmd === c.cmd ? "Copied!" : "Copy"}</span>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">--ignore-rev is useful after a large reformatting commit — it skips that commit and attributes lines to whoever changed them before the reformat.</p>
    </div>
  );
}
