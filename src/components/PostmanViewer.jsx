import { useMemo, useState } from "react";

const SAMPLE = `{
  "info": { "name": "My API Collection" },
  "item": [
    { "name": "Get Users", "request": { "method": "GET", "url": { "raw": "https://api.example.com/users" } } },
    { "name": "Create User", "request": { "method": "POST", "url": { "raw": "https://api.example.com/users" } } }
  ]
}`;

const METHOD_COLORS = {
  GET: "text-emerald-400", POST: "text-amber-400", PUT: "text-sky-400", PATCH: "text-purple-400", DELETE: "text-red-400",
};

function extractRequests(items, path = []) {
  let results = [];
  (items || []).forEach((item) => {
    if (item.item) {
      results = results.concat(extractRequests(item.item, [...path, item.name]));
    } else if (item.request) {
      results.push({
        name: item.name,
        folder: path.join(" / "),
        method: item.request.method,
        url: item.request.url?.raw || item.request.url || "",
      });
    }
  });
  return results;
}

export default function PostmanViewer() {
  const [input, setInput] = useState(SAMPLE);

  const { requests, error, collectionName } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      return { requests: extractRequests(parsed.item), error: null, collectionName: parsed.info?.name || "Collection" };
    } catch (e) {
      return { requests: [], error: "Invalid JSON — " + e.message, collectionName: "" };
    }
  }, [input]);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <p className="text-sm text-slate-400 mb-2">{collectionName} — {requests.length} request(s)</p>
          <div className="space-y-2">
            {requests.map((r, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${METHOD_COLORS[r.method] || "text-slate-400"}`}>{r.method}</span>
                  <span className="text-sm text-slate-100">{r.name}</span>
                </div>
                {r.folder && <p className="text-xs text-slate-500">{r.folder}</p>}
                <code className="text-xs text-slate-400 break-all">{r.url}</code>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
