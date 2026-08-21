import { useState } from "react";

const FORMATS = [
  { label: "One line per commit", cmd: "git log --oneline" },
  { label: "Graph view of all branches", cmd: "git log --oneline --graph --all" },
  { label: "Show commits by author", cmd: 'git log --author="name"' },
  { label: "Show commits touching a file", cmd: "git log -- <file>" },
  { label: "Show commits in date range", cmd: 'git log --since="2 weeks ago" --until="yesterday"' },
  { label: "Custom pretty format", cmd: 'git log --pretty=format:"%h - %an, %ar : %s"' },
  { label: "Show stats per commit", cmd: "git log --stat" },
];

export default function LogFormatReference() {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  return (
    <div className="space-y-1">
      {FORMATS.map((c) => (
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
