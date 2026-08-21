import { useMemo, useState } from "react";

export default function VersionBumper() {
  const [version, setVersion] = useState("1.4.2");

  const parsed = useMemo(() => {
    const m = version.trim().match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!m) return null;
    return { major: +m[1], minor: +m[2], patch: +m[3] };
  }, [version]);

  const bumps = parsed
    ? {
        major: `${parsed.major + 1}.0.0`,
        minor: `${parsed.major}.${parsed.minor + 1}.0`,
        patch: `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`,
      }
    : null;

  return (
    <div>
      <input
        type="text"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {!bumps ? (
        <p className="text-red-400 text-sm">Enter a valid version like 1.2.3</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Patch bump (bug fix)</p>
            <p className="text-lg font-semibold text-slate-100">{bumps.patch}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Minor bump (new feature)</p>
            <p className="text-lg font-semibold text-indigo-400">{bumps.minor}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Major bump (breaking change)</p>
            <p className="text-lg font-semibold text-amber-400">{bumps.major}</p>
          </div>
        </div>
      )}
    </div>
  );
}
