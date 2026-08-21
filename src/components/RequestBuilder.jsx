import { useMemo, useState } from "react";

export default function RequestBuilder() {
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("https://api.example.com/v1/orders");
  const [body, setBody] = useState('{\n  "item_id": "123",\n  "quantity": 2\n}');
  const [lang, setLang] = useState("fetch");

  const code = useMemo(() => {
    if (lang === "fetch") {
      return `const response = await fetch("${url}", {
  method: "${method}",
  headers: { "Content-Type": "application/json" },${method !== "GET" ? `\n  body: JSON.stringify(${body}),` : ""}
});
const data = await response.json();`;
    }
    if (lang === "axios") {
      return `const { data } = await axios({
  method: "${method.toLowerCase()}",
  url: "${url}",${method !== "GET" ? `\n  data: ${body},` : ""}
});`;
    }
    return `import requests

response = requests.request(
    "${method}",
    "${url}",${method !== "GET" ? `\n    json=${body},` : ""}
)
data = response.json()`;
  }, [method, url, body, lang]);

  const copy = () => navigator.clipboard.writeText(code);

  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Method
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 sm:col-span-3">
          URL
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
      </div>
      {method !== "GET" && (
        <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
          Body (JSON)
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
        </label>
      )}
      <div className="flex gap-2 mb-4">
        {["fetch", "axios", "python"].map((l) => (
          <button key={l} onClick={() => setLang(l)} className={`text-sm px-3 py-1.5 rounded-lg border capitalize ${lang === l ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>{l}</button>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
}
