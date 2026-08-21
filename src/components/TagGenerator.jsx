import { useMemo, useState } from "react";

export default function TagGenerator() {
  const [major, setMajor] = useState(1);
  const [minor, setMinor] = useState(2);
  const [patch, setPatch] = useState(0);
  const [prefix, setPrefix] = useState("v");
  const [message, setMessage] = useState("Release version 1.2.0");

  const tag = `${prefix}${major}.${minor}.${patch}`;
  const commands = useMemo(
    () => `git tag -a ${tag} -m "${message}"\ngit push origin ${tag}`,
    [tag, message]
  );
  const copy = () => navigator.clipboard.writeText(commands);

  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Prefix
          <input value={prefix} onChange={(e) => setPrefix(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Major
          <input type="number" min="0" value={major} onChange={(e) => setMajor(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Minor
          <input type="number" min="0" value={minor} onChange={(e) => setMinor(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Patch
          <input type="number" min="0" value={patch} onChange={(e) => setPatch(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Tag message
        <input value={message} onChange={(e) => setMessage(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{commands}</code>
      </pre>
    </div>
  );
}
