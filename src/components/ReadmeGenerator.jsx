import { useState } from "react";
import { ApiKeyInput, useApiKey } from "./ApiKeyInput.jsx";

export default function ReadmeGenerator() {
  const [apiKey, setApiKey] = useApiKey();
  const [projectName, setProjectName] = useState("devtoolkit");
  const [description, setDescription] = useState(
    "A collection of free, no-signup developer tools for working with AI APIs."
  );
  const [techStack, setTechStack] = useState("Astro, React, Tailwind CSS");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!apiKey) {
      setError("Enter your API key first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");

    const prompt = `Write a clean, professional README.md for this project. Include sections for Overview, Features, Installation, Usage, and License. Return only the Markdown content, no explanation.

Project name: ${projectName}
Description: ${description}
Tech stack: ${techStack}`;

    try {
      const res = await fetch("/api/byok-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({ prompt, maxTokens: 1200 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed.");
      setResult(data.text.trim());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => navigator.clipboard.writeText(result);

  return (
    <div>
      <ApiKeyInput apiKey={apiKey} onChange={setApiKey} />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Project name
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Tech stack
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex gap-2 mb-4">
        <button
          onClick={generate}
          disabled={loading}
          className="text-sm px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white"
        >
          {loading ? "Generating..." : "Generate README"}
        </button>
        {result && (
          <button
            onClick={copyResult}
            className="text-sm px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300"
          >
            Copy
          </button>
        )}
      </div>

      {error && <p className="text-red-600 dark:text-red-400 text-sm mb-2">{error}</p>}

      {result && (
        <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-96">
          <code>{result}</code>
        </pre>
      )}
    </div>
  );
}
