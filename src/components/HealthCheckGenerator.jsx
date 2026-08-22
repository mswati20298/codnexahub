import { useMemo, useState } from "react";

const SNIPPETS = {
  "Node.js (Express)": `app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});`,
  "Python (Flask)": `@app.route('/health')
def health():
    return jsonify({"status": "ok"}), 200`,
  "Python (FastAPI)": `@app.get("/health")
async def health():
    return {"status": "ok"}`,
  Go: `http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
})`,
};

export default function HealthCheckGenerator() {
  const [lang, setLang] = useState("Node.js (Express)");
  const output = useMemo(() => SNIPPETS[lang], [lang]);
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(SNIPPETS).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`text-sm px-3 py-1.5 rounded-lg border ${lang === l ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{l}</button>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">A good health check should verify critical dependencies (database, cache) are reachable, not just that the process is running.</p>
    </div>
  );
}
