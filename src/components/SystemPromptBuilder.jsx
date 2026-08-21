import { useMemo, useState } from "react";

export default function SystemPromptBuilder() {
  const [role, setRole] = useState("a helpful customer support assistant for a SaaS company");
  const [tone, setTone] = useState("friendly and professional");
  const [constraints, setConstraints] = useState("Never make up pricing information.\nAlways ask for the account email if troubleshooting a specific account.");
  const [format, setFormat] = useState("Keep responses concise — 2-3 sentences unless more detail is explicitly requested.");

  const prompt = useMemo(() => {
    return `You are ${role}.

Tone: ${tone}

Guidelines:
${constraints.split("\n").filter(Boolean).map((c) => `- ${c}`).join("\n")}

Format: ${format}`;
  }, [role, tone, constraints, format]);

  const copy = () => navigator.clipboard.writeText(prompt);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Role (You are...)
        <input value={role} onChange={(e) => setRole(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Tone
        <input value={tone} onChange={(e) => setTone(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Guidelines (one per line)
        <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Format instructions
        <input value={format} onChange={(e) => setFormat(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{prompt}</code>
      </pre>
    </div>
  );
}
