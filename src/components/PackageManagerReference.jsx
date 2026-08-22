const COMMANDS = [
  { action: "Install all dependencies", npm: "npm install", yarn: "yarn", pnpm: "pnpm install" },
  { action: "Add a package", npm: "npm install <pkg>", yarn: "yarn add <pkg>", pnpm: "pnpm add <pkg>" },
  { action: "Add a dev dependency", npm: "npm install -D <pkg>", yarn: "yarn add -D <pkg>", pnpm: "pnpm add -D <pkg>" },
  { action: "Remove a package", npm: "npm uninstall <pkg>", yarn: "yarn remove <pkg>", pnpm: "pnpm remove <pkg>" },
  { action: "Run a script", npm: "npm run <script>", yarn: "yarn <script>", pnpm: "pnpm <script>" },
  { action: "Update packages", npm: "npm update", yarn: "yarn upgrade", pnpm: "pnpm update" },
  { action: "Clean install (CI)", npm: "npm ci", yarn: "yarn install --frozen-lockfile", pnpm: "pnpm install --frozen-lockfile" },
  { action: "List installed packages", npm: "npm list", yarn: "yarn list", pnpm: "pnpm list" },
];

export default function PackageManagerReference() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <th className="py-2 pr-4">Action</th>
            <th className="py-2 pr-4">npm</th>
            <th className="py-2 pr-4">yarn</th>
            <th className="py-2 pr-4">pnpm</th>
          </tr>
        </thead>
        <tbody>
          {COMMANDS.map((c) => (
            <tr key={c.action} className="border-b border-slate-200 dark:border-slate-800/60">
              <td className="py-2 pr-4 text-slate-700 dark:text-slate-300">{c.action}</td>
              <td className="py-2 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{c.npm}</td>
              <td className="py-2 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{c.yarn}</td>
              <td className="py-2 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{c.pnpm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
