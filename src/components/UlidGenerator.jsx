import { useState } from "react";

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function generateUlid() {
  const time = Date.now();
  let timeChars = "";
  let t = time;
  for (let i = 0; i < 10; i++) {
    timeChars = ENCODING[t % 32] + timeChars;
    t = Math.floor(t / 32);
  }
  let randomChars = "";
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < 16; i++) {
    randomChars += ENCODING[randomBytes[i] % 32];
  }
  return timeChars + randomChars;
}

export default function UlidGenerator() {
  const [ulids, setUlids] = useState(() => Array.from({ length: 5 }, generateUlid));
  const [copiedIndex, setCopiedIndex] = useState(null);

  const regenerate = () => setUlids(Array.from({ length: 5 }, generateUlid));
  const copy = (u, i) => {
    navigator.clipboard.writeText(u);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  return (
    <div>
      <button onClick={regenerate} className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white mb-4">Generate new</button>
      <ul className="space-y-1">
        {ulids.map((u, i) => (
          <li key={i} onClick={() => copy(u, i)} className="cursor-pointer font-mono text-sm bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 hover:border-indigo-500 flex justify-between items-center">
            <span>{u}</span>
            <span className="text-xs text-slate-500">{copiedIndex === i ? "Copied!" : "Click to copy"}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mt-4">ULIDs are lexicographically sortable by creation time, unlike random UUIDs — useful as database primary keys where insertion order matters.</p>
    </div>
  );
}
