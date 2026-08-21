import { useMemo, useState } from "react";

export default function TerraformVarGenerator() {
  const [name, setName] = useState("instance_type");
  const [type, setType] = useState("string");
  const [defaultValue, setDefaultValue] = useState("t3.micro");
  const [description, setDescription] = useState("EC2 instance type");

  const hcl = useMemo(() => {
    const formattedDefault = type === "string" ? `"${defaultValue}"` : defaultValue;
    return `variable "${name}" {
  type        = ${type}
  description = "${description}"
  default     = ${formattedDefault}
}`;
  }, [name, type, defaultValue, description]);

  const copy = () => navigator.clipboard.writeText(hcl);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Variable name
          <input value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Type
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100">
            {["string", "number", "bool", "list(string)", "map(string)"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Default value
          <input value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Description
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{hcl}</code>
      </pre>
    </div>
  );
}
