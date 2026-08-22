import { useState } from "react";

function generateUuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState(() =>
    Array.from({ length: 5 }, generateUuidV4)
  );
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const regenerate = () => {
    setUuids(Array.from({ length: Math.max(1, count) }, generateUuidV4));
  };

  const copyOne = (uuid, idx) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1200);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Count
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-20 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <button
          onClick={regenerate}
          className="text-sm px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          Generate
        </button>
        <button
          onClick={copyAll}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 ml-auto"
        >
          {copiedAll ? "Copied all!" : "Copy all"}
        </button>
      </div>

      <ul className="space-y-1 max-h-80 overflow-y-auto">
        {uuids.map((uuid, idx) => (
          <li
            key={idx}
            onClick={() => copyOne(uuid, idx)}
            className="font-mono text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 cursor-pointer hover:border-emerald-500 flex justify-between items-center"
          >
            <span>{uuid}</span>
            <span className="text-xs text-slate-500 dark:text-slate-500">
              {copiedIndex === idx ? "Copied!" : "Click to copy"}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
        UUIDs are generated using your browser's random number generator —
        nothing is sent to a server.
      </p>
    </div>
  );
}
