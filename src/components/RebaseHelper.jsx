import { useState } from "react";

const COMMANDS = [
  { label: "Interactive rebase last N commits", cmd: "git rebase -i HEAD~N" },
  { label: "Rebase current branch onto main", cmd: "git rebase main" },
  { label: "Continue after resolving conflicts", cmd: "git rebase --continue" },
  { label: "Abort a rebase in progress", cmd: "git rebase --abort" },
  { label: "Skip the current commit during rebase", cmd: "git rebase --skip" },
  { label: "Squash last 3 commits interactively", cmd: "git rebase -i HEAD~3" },
];

export default function RebaseHelper() {
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
      <p className="text-xs text-amber-400 mt-4">Never rebase commits that have already been pushed and shared with others — it rewrites history and breaks collaborators' local branches.</p>
    </div>
  );
}
