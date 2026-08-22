import { useEffect, useState } from "react";

export function useApiKey() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("devtoolkit_anthropic_key");
    if (saved) setApiKey(saved);
  }, []);

  const updateKey = (value) => {
    setApiKey(value);
    if (value) {
      localStorage.setItem("devtoolkit_anthropic_key", value);
    } else {
      localStorage.removeItem("devtoolkit_anthropic_key");
    }
  };

  return [apiKey, updateKey];
}

export function ApiKeyInput({ apiKey, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
        Your Anthropic API key
        <div className="flex gap-2">
          <input
            type={show ? "text" : "password"}
            value={apiKey}
            onChange={(e) => onChange(e.target.value)}
            placeholder="sk-ant-..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="text-xs px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
        Stored only in your browser's local storage, never on our servers.
        Get a key at{" "}
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          console.anthropic.com
        </a>
        .
      </p>
    </div>
  );
}
