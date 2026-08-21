import { useMemo, useState } from "react";

const TYPES = ["feature", "fix", "chore", "refactor", "hotfix", "release"];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BranchNameGenerator() {
  const [type, setType] = useState("feature");
  const [ticket, setTicket] = useState("PROJ-123");
  const [description, setDescription] = useState("add dark mode toggle");

  const branchName = useMemo(() => {
    const parts = [type];
    if (ticket.trim()) parts.push(ticket.trim());
    parts.push(slugify(description));
    return parts.filter(Boolean).join("/");
  }, [type, ticket, description]);

  const copy = () => navigator.clipboard.writeText(branchName);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Type
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Ticket ID (optional)
          <input type="text" value={ticket} onChange={(e) => setTicket(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 sm:col-span-1">
          Description
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      <div onClick={copy} className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 hover:border-indigo-500 flex justify-between items-center">
        <span className="font-mono text-indigo-400 break-all">{branchName}</span>
        <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">Click to copy</span>
      </div>
    </div>
  );
}
