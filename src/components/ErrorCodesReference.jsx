const ERRORS = [
  { code: "400", name: "Invalid Request", desc: "Malformed request — check JSON syntax, required fields, and parameter types." },
  { code: "401", name: "Authentication Error", desc: "Missing or invalid API key." },
  { code: "403", name: "Permission Denied", desc: "Your API key doesn't have access to this resource or model." },
  { code: "404", name: "Not Found", desc: "The requested resource (e.g. a specific model) doesn't exist." },
  { code: "413", name: "Request Too Large", desc: "Payload exceeds the maximum allowed size — often a context window issue." },
  { code: "429", name: "Rate Limited", desc: "Too many requests — back off and retry with exponential backoff." },
  { code: "500", name: "Server Error", desc: "An error on the provider's end — safe to retry." },
  { code: "503", name: "Overloaded", desc: "The service is temporarily overloaded — retry with backoff." },
];

export default function ErrorCodesReference() {
  return (
    <div className="space-y-2">
      {ERRORS.map((e) => (
        <div key={e.code} className="flex gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
          <code className="text-emerald-600 dark:text-emerald-400 font-bold w-12 shrink-0">{e.code}</code>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{e.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{e.desc}</p>
          </div>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Codes and general meanings are consistent across most major AI providers, though exact error formats vary — check your provider's docs for specifics.</p>
    </div>
  );
}
