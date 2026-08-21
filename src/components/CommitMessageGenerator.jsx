import { useState } from "react";
import { ApiKeyInput, useApiKey } from "./ApiKeyInput.jsx";

const SAMPLE_DIFF = `diff --git a/src/auth.js b/src/auth.js
index 1234567..89abcde 100644
--- a/src/auth.js
+++ b/src/auth.js
@@ -12,7 +12,7 @@ function login(user, password) {
-  if (user.password === password) {
+  if (bcrypt.compareSync(password, user.passwordHash)) {
     return generateToken(user);
   }`;

export default function CommitMessageGenerator() {
  const [apiKey, setApiKey] = useApiKey();
  const [diff, setDiff] = useState(SAMPLE_DIFF);
  const [style, setStyle] = useState("conventional");
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

    const styleInstruction =
      style === "conventional"
        ? "Follow Conventional Commits format (e.g. 'fix:', 'feat:', 'refactor:')."
        : "Write a plain, human-readable commit message, no prefix required.";

    const prompt = `Write a concise git commit message for this diff. ${styleInstruction} Return only the commit message, nothing else.\n\n${diff}`;

    try {
      const res = await fetch("/api/byok-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({ prompt, maxTokens: 150 }),
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

  return (
    <div>
      <ApiKeyInput apiKey={apiKey} onChange={setApiKey} />

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Paste your git diff
        <textarea
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          rows={8}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {[
          { key: "conventional", label: "Conventional Commits" },
          { key: "plain", label: "Plain English" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => setStyle(opt.key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              style === opt.key
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          onClick={generate}
          disabled={loading}
          className="text-sm px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white ml-auto"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      {result && (
        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-sm text-slate-200 whitespace-pre-wrap">
          <code>{result}</code>
        </pre>
      )}
    </div>
  );
}
