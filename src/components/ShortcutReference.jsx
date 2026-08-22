import { useState } from "react";

const SHORTCUTS = {
  "VS Code": [
    { keys: "Ctrl/Cmd + P", desc: "Quick open file" },
    { keys: "Ctrl/Cmd + Shift + P", desc: "Command palette" },
    { keys: "Ctrl/Cmd + D", desc: "Select next occurrence" },
    { keys: "Alt/Option + Click", desc: "Add cursor" },
    { keys: "Ctrl/Cmd + /", desc: "Toggle line comment" },
    { keys: "F12", desc: "Go to definition" },
    { keys: "Shift + Alt + F", desc: "Format document" },
  ],
  "Chrome DevTools": [
    { keys: "F12 / Ctrl+Shift+I", desc: "Open DevTools" },
    { keys: "Ctrl+Shift+C", desc: "Inspect element" },
    { keys: "Ctrl+Shift+J", desc: "Open console" },
    { keys: "Ctrl+R (in console)", desc: "Search past commands" },
  ],
  Terminal: [
    { keys: "Ctrl + R", desc: "Search command history" },
    { keys: "Ctrl + A / Ctrl + E", desc: "Jump to start/end of line" },
    { keys: "Ctrl + U", desc: "Clear line before cursor" },
    { keys: "Ctrl + L", desc: "Clear screen" },
    { keys: "Tab", desc: "Autocomplete" },
  ],
};

export default function ShortcutReference() {
  const [tool, setTool] = useState("VS Code");

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {Object.keys(SHORTCUTS).map((t) => (
          <button key={t} onClick={() => setTool(t)} className={`text-sm px-3 py-1.5 rounded-lg border ${tool === t ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-1">
        {SHORTCUTS[tool].map((s) => (
          <div key={s.keys} className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2">
            <span className="text-sm text-slate-700 dark:text-slate-300">{s.desc}</span>
            <code className="text-sm text-emerald-600 dark:text-emerald-400">{s.keys}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
