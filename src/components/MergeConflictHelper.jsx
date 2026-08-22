const STEPS = [
  "Run `git status` to see which files have conflicts.",
  "Open each conflicted file and look for <<<<<<<, =======, >>>>>>> markers.",
  "Decide which changes to keep — yours, theirs, or a combination.",
  "Remove the conflict markers after resolving.",
  "Run `git add <file>` for each resolved file.",
  "Run the test suite to confirm nothing broke.",
  "Run `git commit` to complete the merge (or `git rebase --continue` if rebasing).",
];

const COMMANDS = [
  { label: "See conflicted files", cmd: "git status" },
  { label: "Show diff for a conflicted file", cmd: "git diff <file>" },
  { label: "Keep your version entirely", cmd: "git checkout --ours <file>" },
  { label: "Keep their version entirely", cmd: "git checkout --theirs <file>" },
  { label: "Abort the merge", cmd: "git merge --abort" },
];

import { useState } from "react";

export default function MergeConflictHelper() {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  return (
    <div>
      <ol className="space-y-2 mb-6 list-decimal list-inside">
        {STEPS.map((step, i) => (
          <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{step}</li>
        ))}
      </ol>
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
      </div>
    </div>
  );
}
