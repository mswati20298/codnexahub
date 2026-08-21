import { useState } from "react";

const COMMANDS = [
  { label: "Cherry-pick a single commit", cmd: "git cherry-pick <commit-hash>" },
  { label: "Cherry-pick without committing (staged only)", cmd: "git cherry-pick -n <commit-hash>" },
  { label: "Cherry-pick a range of commits", cmd: "git cherry-pick <start-hash>..<end-hash>" },
  { label: "Continue after resolving conflicts", cmd: "git cherry-pick --continue" },
  { label: "Abort a cherry-pick in progress", cmd: "git cherry-pick --abort" },
  { label: "Cherry-pick from another branch", cmd: "git cherry-pick <branch-name>~2" },
];

export default function CherryPickHelper() {
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
      <p className="text-xs text-slate-500 mt-4">Cherry-picking creates a new commit with a different hash — useful for applying a specific fix to another branch without merging everything.</p>
    </div>
  );
}
