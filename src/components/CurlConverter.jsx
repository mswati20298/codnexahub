import { useMemo, useState } from "react";

const SAMPLE_CURL = `curl -X POST https://api.example.com/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{"message": "hello"}'`;

function parseCurl(curl) {
  const cleaned = curl.replace(/\\\n/g, " ").trim();

  const methodMatch = cleaned.match(/-X\s+(\w+)/i);
  const method = methodMatch ? methodMatch[1].toUpperCase() : "GET";

  const urlMatch = cleaned.match(/curl\s+(?:-X\s+\w+\s+)?['"]?(https?:\/\/[^\s'"]+)['"]?/i);
  const url = urlMatch ? urlMatch[1] : "";

  const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
  const headers = {};
  let hMatch;
  while ((hMatch = headerRegex.exec(cleaned)) !== null) {
    const [key, ...rest] = hMatch[1].split(":");
    headers[key.trim()] = rest.join(":").trim();
  }

  const dataMatch = cleaned.match(/-d\s+'([^']+)'/) || cleaned.match(/-d\s+"([^"]+)"/);
  const body = dataMatch ? dataMatch[1] : null;

  return { method, url, headers, body };
}

function toPython({ method, url, headers, body }) {
  const headersStr = Object.entries(headers)
    .map(([k, v]) => `    "${k}": "${v}",`)
    .join("\n");
  return `import requests

response = requests.request(
    "${method}",
    "${url}",
    headers={
${headersStr}
    },${body ? `\n    json=${body},` : ""}
)

print(response.json())`;
}

function toJs({ method, url, headers, body }) {
  const headersStr = Object.entries(headers)
    .map(([k, v]) => `    "${k}": "${v}",`)
    .join("\n");
  return `const response = await fetch("${url}", {
  method: "${method}",
  headers: {
${headersStr}
  },${body ? `\n  body: JSON.stringify(${body}),` : ""}
});

const data = await response.json();
console.log(data);`;
}

export default function CurlConverter() {
  const [curl, setCurl] = useState(SAMPLE_CURL);
  const [lang, setLang] = useState("js");

  const output = useMemo(() => {
    try {
      const parsed = parseCurl(curl);
      if (!parsed.url) return "// Couldn't detect a URL — check your curl command.";
      return lang === "python" ? toPython(parsed) : toJs(parsed);
    } catch {
      return "// Couldn't parse this curl command.";
    }
  }, [curl, lang]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Paste your curl command
        <textarea
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
          rows={6}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex gap-2 mb-4">
        {["js", "python"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              lang === l
                ? "bg-emerald-600 border-emerald-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500"
            }`}
          >
            {l === "js" ? "JavaScript (fetch)" : "Python (requests)"}
          </button>
        ))}
      </div>

      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200">
        <code>{output}</code>
      </pre>
    </div>
  );
}
