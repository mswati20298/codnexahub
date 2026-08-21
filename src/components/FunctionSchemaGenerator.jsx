import { useMemo, useState } from "react";

const SAMPLE = `name: string, required — city name
unit: string — celsius or fahrenheit`;

export default function FunctionSchemaGenerator() {
  const [funcName, setFuncName] = useState("get_weather");
  const [description, setDescription] = useState("Get the current weather for a location.");
  const [params, setParams] = useState(SAMPLE);
  const [format, setFormat] = useState("anthropic");

  const schema = useMemo(() => {
    const fields = params.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
      const [nameType, ...rest] = line.split("—");
      const [name, typePart] = (nameType || "").split(":").map((s) => s.trim());
      const required = /required/i.test(typePart);
      const type = (typePart || "string").replace(/,?\s*required/i, "").trim();
      return { name, type: type || "string", required, desc: (rest.join("—") || "").trim() };
    });

    const properties = {};
    const requiredList = [];
    fields.forEach((f) => {
      properties[f.name] = { type: f.type, description: f.desc };
      if (f.required) requiredList.push(f.name);
    });

    if (format === "anthropic") {
      return JSON.stringify({
        name: funcName,
        description,
        input_schema: { type: "object", properties, required: requiredList },
      }, null, 2);
    } else {
      return JSON.stringify({
        type: "function",
        function: {
          name: funcName,
          description,
          parameters: { type: "object", properties, required: requiredList },
        },
      }, null, 2);
    }
  }, [funcName, description, params, format]);

  const copy = () => navigator.clipboard.writeText(schema);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFormat("anthropic")} className={`text-sm px-3 py-1.5 rounded-lg border ${format === "anthropic" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>Anthropic (Claude) format</button>
        <button onClick={() => setFormat("openai")} className={`text-sm px-3 py-1.5 rounded-lg border ${format === "openai" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>OpenAI format</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Function name
          <input value={funcName} onChange={(e) => setFuncName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Description
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Parameters (name: type, required — description)
        <textarea value={params} onChange={(e) => setParams(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 max-h-72">
        <code>{schema}</code>
      </pre>
    </div>
  );
}
