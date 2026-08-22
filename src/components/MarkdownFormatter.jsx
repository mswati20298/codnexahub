import { useMemo, useState } from "react";

const SAMPLE_MD = `# Project Notes

## Goals
- Ship v1 by Friday
- Support CSV import

## Open questions
1. Do we need auth?
2. What's the file size limit?`;

function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+/gm, "") // headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // bold
    .replace(/\*(.*?)\*/g, "$1") // italic
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/^\s*[-*+]\s+/gm, "- ") // normalize bullets
    .replace(/^\s*\d+\.\s+/gm, (m) => m) // keep numbered lists
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links -> text only
    .trim();
}

function toXmlStyle(md) {
  const plain = stripMarkdown(md);
  return `<document>\n${plain
    .split("\n")
    .map((line) => (line.trim() ? "  " + line : ""))
    .join("\n")}\n</document>`;
}

export default function MarkdownFormatter() {
  const [input, setInput] = useState(SAMPLE_MD);
  const [mode, setMode] = useState("plain");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    return mode === "plain" ? stripMarkdown(input) : toXmlStyle(input);
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Paste Markdown
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex gap-2 mb-2">
        {[
          { key: "plain", label: "Plain text" },
          { key: "xml", label: "XML-wrapped" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => setMode(opt.key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              mode === opt.key
                ? "bg-emerald-600 border-emerald-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 ml-auto"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
