import { useState } from "react";

const COMMANDS = [
  { category: "Undo changes", cmds: [
    { label: "Discard unstaged changes in a file", cmd: "git checkout -- <file>" },
    { label: "Unstage a file", cmd: "git reset HEAD <file>" },
    { label: "Undo last commit, keep changes", cmd: "git reset --soft HEAD~1" },
    { label: "Undo last commit, discard changes", cmd: "git reset --hard HEAD~1" },
  ]},
  { category: "Branching", cmds: [
    { label: "Create and switch to new branch", cmd: "git checkout -b <branch>" },
    { label: "Delete local branch", cmd: "git branch -d <branch>" },
    { label: "Delete remote branch", cmd: "git push origin --delete <branch>" },
    { label: "Rename current branch", cmd: "git branch -m <new-name>" },
  ]},
  { category: "History", cmds: [
    { label: "View commit history (one line)", cmd: "git log --oneline" },
    { label: "View changes in last commit", cmd: "git show HEAD" },
    { label: "Find who changed a line", cmd: "git blame <file>" },
  ]},
  { category: "Stashing", cmds: [
    { label: "Stash current changes", cmd: "git stash" },
    { label: "Apply latest stash", cmd: "git stash pop" },
    { label: "List all stashes", cmd: "git stash list" },
  ]},
];

export default function GitCommandBuilder() {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  return (
    <div className="space-y-6">
      {COMMANDS.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-slate-200 mb-2">{group.category}</h3>
          <div className="space-y-1">
            {group.cmds.map((c) => (
              <div
                key={c.cmd}
                onClick={() => copy(c.cmd)}
                className="cursor-pointer flex justify-between items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 hover:border-indigo-500"
              >
                <div>
                  <p className="text-xs text-slate-400">{c.label}</p>
                  <code className="text-sm text-indigo-400">{c.cmd}</code>
                </div>
                <span className="text-xs text-slate-500">{copiedCmd === c.cmd ? "Copied!" : "Copy"}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
