import { useMemo, useState } from "react";

const TASKS = {
  explain: {
    label: "Explain what it does",
    build: (code, lang) =>
      `Explain what the following ${lang} code does, step by step:\n\n\`\`\`${lang}\n${code}\n\`\`\``,
  },
  debug: {
    label: "Find bugs",
    build: (code, lang) =>
      `Review the following ${lang} code and identify any bugs or edge cases it doesn't handle:\n\n\`\`\`${lang}\n${code}\n\`\`\``,
  },
  optimize: {
    label: "Optimize performance",
    build: (code, lang) =>
      `Suggest performance optimizations for the following ${lang} code, explaining the trade-offs of each suggestion:\n\n\`\`\`${lang}\n${code}\n\`\`\``,
  },
  document: {
    label: "Add documentation",
    build: (code, lang) =>
      `Add clear docstrings/comments to the following ${lang} code, following standard ${lang} documentation conventions:\n\n\`\`\`${lang}\n${code}\n\`\`\``,
  },
  convert: {
    label: "Convert to another language",
    build: (code, lang) =>
      `Convert the following ${lang} code to [TARGET_LANGUAGE], preserving the same behavior:\n\n\`\`\`${lang}\n${code}\n\`\`\``,
  },
};

const SAMPLE_CODE = `function sum(arr) {
  let total = 0;
  for (let i = 0; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}`;

export default function CodeToPrompt() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [lang, setLang] = useState("javascript");
  const [task, setTask] = useState("debug");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => TASKS[task].build(code, lang), [code, lang, task]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Language
          <input
            type="text"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Code
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(TASKS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setTask(key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              task === key
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-2">
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
