import { useState } from "react";
import { ApiKeyInput, useApiKey } from "./ApiKeyInput.jsx";

const SAMPLE_COMMITS = `fix: resolve token counter crashing on empty input
feat: add dark mode toggle to settings page
refactor: simplify pricing calculator state logic
fix: correct rounding error in cost estimates
feat: add CSV export for comparison table`;

export default function ChangelogGenerator() {
  const [apiKey, setApiKey] = useApiKey();
  const [commits, setCommits] = useState(SAMPLE_COMMITS);
  const [version, setVersion] = useState("1.2.0");
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

    const prompt = `Turn this list of commit messages into a clean, user-facing changelog entry for version ${version}. Group into "Added", "Fixed", and "Changed" sections (omit empty sections). Write for end users, not developers — avoid technical jargon. Return only the changelog in Markdown, no explanation.

Commits:
${commits}`;

    try {
      const res = await fetch("/api/byok-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({ prompt, maxTokens: 600 }),
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

      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4 max-w-xs">
        Version
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Commit messages (one per line)
        <textarea
          value={commits}
          onChange={(e) => setCommits(e.target.value)}
          rows={7}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex gap-2 mb-4">
        <button
          onClick={generate}
          disabled={loading}
          className="text-sm px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white"
        >
          {loading ? "Generating..." : "Generate Changelog"}
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
        <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
          <code>{result}</code>
        </pre>
      )}
    </div>
  );
}
