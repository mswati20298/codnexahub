import { useMemo, useState } from "react";

const SEMVER_RE = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

function parse(v) {
  const m = v.trim().match(SEMVER_RE);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], prerelease: m[4] || null, build: m[5] || null };
}

function compare(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  if (a.prerelease && !b.prerelease) return -1;
  if (!a.prerelease && b.prerelease) return 1;
  if (a.prerelease && b.prerelease) return a.prerelease.localeCompare(b.prerelease);
  return 0;
}

export default function SemverTool() {
  const [a, setA] = useState("1.2.3");
  const [b, setB] = useState("1.10.0");

  const parsedA = useMemo(() => parse(a), [a]);
  const parsedB = useMemo(() => parse(b), [b]);

  const result = useMemo(() => {
    if (!parsedA || !parsedB) return null;
    const c = compare(parsedA, parsedB);
    return c === 0 ? "Equal" : c < 0 ? `${a} is older than ${b}` : `${a} is newer than ${b}`;
  }, [parsedA, parsedB, a, b]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <input value={a} onChange={(e) => setA(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <p className={`text-xs mt-1 ${parsedA ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{parsedA ? "Valid SemVer" : "Invalid"}</p>
        </div>
        <div>
          <input value={b} onChange={(e) => setB(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <p className={`text-xs mt-1 ${parsedB ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{parsedB ? "Valid SemVer" : "Invalid"}</p>
        </div>
      </div>
      {result && <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3">{result}</p>}
    </div>
  );
}
