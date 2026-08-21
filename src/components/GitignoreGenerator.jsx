import { useMemo, useState } from "react";

const TEMPLATES = {
  Node: `node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.env\n.env.local\ndist/\nbuild/\n.DS_Store`,
  Python: `__pycache__/\n*.pyc\n.venv/\nvenv/\n.env\n*.egg-info/\ndist/\nbuild/\n.pytest_cache/\n.DS_Store`,
  React: `node_modules/\nbuild/\ndist/\n.env\n.env.local\nnpm-debug.log*\n.DS_Store\ncoverage/`,
  "Next.js": `node_modules/\n.next/\nout/\nbuild/\n.env*.local\nnpm-debug.log*\n.DS_Store`,
  Java: `*.class\n*.jar\ntarget/\n.gradle/\nbuild/\n.idea/\n*.iml`,
  Go: `*.exe\n*.test\n*.out\nvendor/\n.env\n.DS_Store`,
  General: `.DS_Store\nThumbs.db\n.env\n.vscode/\n.idea/\n*.log\n*.tmp`,
};

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState(["Node", "General"]);

  const output = useMemo(() => {
    return selected
      .map((key) => `# ${key}\n${TEMPLATES[key]}`)
      .join("\n\n");
  }, [selected]);

  const toggle = (key) => {
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));
  };

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(TEMPLATES).map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              selected.includes(key)
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>

      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 max-h-96">
        <code>{output || "Select at least one template."}</code>
      </pre>
    </div>
  );
}
