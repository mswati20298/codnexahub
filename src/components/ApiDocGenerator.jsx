import { useMemo, useState } from "react";

const SAMPLE = {
  method: "POST",
  path: "/api/v1/users",
  description: "Creates a new user account.",
  params: "email: string, required — user's email address\npassword: string, required — min 8 characters\nname: string, optional — display name",
  response: '{\n  "id": "usr_123",\n  "email": "user@example.com",\n  "createdAt": "2026-01-01T00:00:00Z"\n}',
};

function buildMarkdown({ method, path, description, params, response }) {
  const paramRows = params
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [nameType, ...rest] = line.split("—");
      const [name, type] = (nameType || "").split(":").map((s) => s.trim());
      return `| \`${name || ""}\` | ${type || ""} | ${(rest.join("—") || "").trim()} |`;
    })
    .join("\n");

  return `## \`${method}\` ${path}

${description}

### Parameters

| Name | Type | Description |
|------|------|-------------|
${paramRows}

### Example response

\`\`\`json
${response}
\`\`\`
`;
}

export default function ApiDocGenerator() {
  const [method, setMethod] = useState(SAMPLE.method);
  const [path, setPath] = useState(SAMPLE.path);
  const [description, setDescription] = useState(SAMPLE.description);
  const [params, setParams] = useState(SAMPLE.params);
  const [response, setResponse] = useState(SAMPLE.response);
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(
    () => buildMarkdown({ method, path, description, params, response }),
    [method, path, description, params, response]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Method
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300 sm:col-span-2">
          Path
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Parameters (one per line: name: type — description)
        <textarea
          value={params}
          onChange={(e) => setParams(e.target.value)}
          rows={4}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Example response JSON
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={5}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <div className="flex justify-end mb-2">
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300"
        >
          {copied ? "Copied!" : "Copy Markdown"}
        </button>
      </div>

      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{markdown}</code>
      </pre>
    </div>
  );
}
