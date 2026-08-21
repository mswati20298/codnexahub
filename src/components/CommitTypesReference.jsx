const TYPES = [
  { type: "feat", desc: "A new feature for the user", semver: "minor" },
  { type: "fix", desc: "A bug fix", semver: "patch" },
  { type: "docs", desc: "Documentation only changes", semver: "none" },
  { type: "style", desc: "Formatting, missing semicolons, etc. — no code change", semver: "none" },
  { type: "refactor", desc: "Code change that neither fixes a bug nor adds a feature", semver: "none" },
  { type: "perf", desc: "A code change that improves performance", semver: "patch" },
  { type: "test", desc: "Adding or correcting tests", semver: "none" },
  { type: "build", desc: "Changes to build system or dependencies", semver: "none" },
  { type: "ci", desc: "Changes to CI configuration files/scripts", semver: "none" },
  { type: "chore", desc: "Other changes that don't modify src or test files", semver: "none" },
  { type: "revert", desc: "Reverts a previous commit", semver: "varies" },
];

const SEMVER_COLOR = { minor: "text-amber-400", patch: "text-emerald-400", none: "text-slate-500", varies: "text-slate-400" };

export default function CommitTypesReference() {
  return (
    <div className="space-y-1">
      {TYPES.map((t) => (
        <div key={t.type} className="flex justify-between items-center bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
          <div>
            <code className="text-sm text-indigo-400">{t.type}</code>
            <p className="text-xs text-slate-400">{t.desc}</p>
          </div>
          <span className={`text-xs ${SEMVER_COLOR[t.semver]}`}>{t.semver}</span>
        </div>
      ))}
      <p className="text-xs text-slate-500 mt-4">Adding "!" after the type (e.g. feat!:) or a BREAKING CHANGE footer signals a major version bump.</p>
    </div>
  );
}
