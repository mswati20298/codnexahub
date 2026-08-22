const CODES = [
  { code: 0, meaning: "Success" },
  { code: 1, meaning: "General error / catch-all" },
  { code: 2, meaning: "Misuse of shell builtin (e.g. bad command syntax)" },
  { code: 126, meaning: "Command found but not executable (permissions issue)" },
  { code: 127, meaning: "Command not found" },
  { code: 128, meaning: "Invalid argument to exit" },
  { code: 130, meaning: "Terminated by Ctrl+C (SIGINT)" },
  { code: 137, meaning: "Killed — often out of memory (SIGKILL, 128+9)" },
  { code: 139, meaning: "Segmentation fault (SIGSEGV, 128+11)" },
  { code: 143, meaning: "Terminated (SIGTERM, 128+15)" },
];

export default function ExitCodesReference() {
  return (
    <div className="space-y-1">
      {CODES.map((c) => (
        <div key={c.code} className="flex gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2">
          <code className="text-emerald-600 dark:text-emerald-400 font-bold w-10 shrink-0">{c.code}</code>
          <span className="text-sm text-slate-700 dark:text-slate-300">{c.meaning}</span>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Codes 128+n indicate the process was terminated by signal n — useful for diagnosing why a process died unexpectedly (e.g. 137 often means Docker/Kubernetes OOM-killed it).</p>
    </div>
  );
}
