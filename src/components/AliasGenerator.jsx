import { useMemo, useState } from "react";

const COMMON_ALIASES = [
  { alias: "co", cmd: "checkout" },
  { alias: "br", cmd: "branch" },
  { alias: "ci", cmd: "commit" },
  { alias: "st", cmd: "status" },
  { alias: "unstage", cmd: "reset HEAD --" },
  { alias: "last", cmd: "log -1 HEAD" },
  { alias: "graph", cmd: "log --oneline --graph --all" },
];

export default function AliasGenerator() {
  const [selected, setSelected] = useState(COMMON_ALIASES.map((a) => a.alias));

  const toggle = (alias) => setSelected((prev) => (prev.includes(alias) ? prev.filter((a) => a !== alias) : [...prev, alias]));

  const commands = useMemo(() => {
    return COMMON_ALIASES.filter((a) => selected.includes(a.alias))
      .map((a) => `git config --global alias.${a.alias} "${a.cmd}"`)
      .join("\n");
  }, [selected]);

  const copy = () => navigator.clipboard.writeText(commands);

  return (
    <div>
      <div className="space-y-1 mb-4">
        {COMMON_ALIASES.map((a) => (
          <label key={a.alias} className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={selected.includes(a.alias)} onChange={() => toggle(a.alias)} />
            <code className="text-indigo-400">git {a.alias}</code> → <code className="text-slate-400">git {a.cmd}</code>
          </label>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{commands}</code>
      </pre>
    </div>
  );
}
