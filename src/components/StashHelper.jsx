import { useState } from "react";

const COMMANDS = [
  { label: "Stash current changes", cmd: "git stash" },
  { label: "Stash with a descriptive message", cmd: 'git stash push -m "message"' },
  { label: "Stash including untracked files", cmd: "git stash -u" },
  { label: "List all stashes", cmd: "git stash list" },
  { label: "Apply latest stash (keep in list)", cmd: "git stash apply" },
  { label: "Apply and remove latest stash", cmd: "git stash pop" },
  { label: "Apply a specific stash", cmd: "git stash apply stash@{2}" },
  { label: "Show contents of a stash", cmd: "git stash show -p stash@{0}" },
  { label: "Delete a specific stash", cmd: "git stash drop stash@{0}" },
  { label: "Delete all stashes", cmd: "git stash clear" },
];

export default function StashHelper() {
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
    </div>
  );
}
