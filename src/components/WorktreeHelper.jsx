import { useState } from "react";

const COMMANDS = [
  { label: "Create a new worktree for a branch", cmd: "git worktree add ../branch-folder branch-name" },
  { label: "Create a worktree with a new branch", cmd: "git worktree add -b new-branch ../new-folder" },
  { label: "List all worktrees", cmd: "git worktree list" },
  { label: "Remove a worktree", cmd: "git worktree remove ../branch-folder" },
  { label: "Clean up stale worktree references", cmd: "git worktree prune" },
];

export default function WorktreeHelper() {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  return (
    <div className="space-y-1">
      {COMMANDS.map((c) => (
        <div key={c.cmd} onClick={() => copy(c.cmd)} className="cursor-pointer flex justify-between items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 hover:border-indigo-500">
          <div>
            <p className="text-xs text-slate-400">{c.label}</p>
            <code className="text-sm text-indigo-400">{c.cmd}</code>
          </div>
          <span className="text-xs text-slate-500">{copiedCmd === c.cmd ? "Copied!" : "Copy"}</span>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4">Worktrees let you check out multiple branches simultaneously in separate folders, sharing the same repository — useful for working on a hotfix without stashing your current feature work.</p>
    </div>
  );
}
