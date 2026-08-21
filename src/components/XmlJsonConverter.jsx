import { useMemo, useState } from "react";

function xmlToJson(node) {
  const obj = {};
  if (node.attributes && node.attributes.length > 0) {
    for (const attr of node.attributes) obj[`@${attr.name}`] = attr.value;
  }
  const children = Array.from(node.childNodes).filter((n) => n.nodeType === 1);
  if (children.length === 0) {
    const text = node.textContent.trim();
    return Object.keys(obj).length > 0 ? { ...obj, "#text": text } : text;
  }
  children.forEach((child) => {
    const childValue = xmlToJson(child);
    if (obj[child.nodeName] !== undefined) {
      if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]];
      obj[child.nodeName].push(childValue);
    } else {
      obj[child.nodeName] = childValue;
    }
  });
  return obj;
}

function jsonToXml(obj, tagName = "root") {
  if (typeof obj !== "object" || obj === null) return `<${tagName}>${obj}</${tagName}>`;
  const inner = Object.entries(obj)
    .map(([key, value]) => {
      if (Array.isArray(value)) return value.map((v) => jsonToXml(v, key)).join("");
      return jsonToXml(value, key);
    })
    .join("");
  return `<${tagName}>${inner}</${tagName}>`;
}

const SAMPLE_XML = `<user>\n  <name>Alice</name>\n  <age>30</age>\n</user>`;

export default function XmlJsonConverter() {
  const [input, setInput] = useState(SAMPLE_XML);
  const [mode, setMode] = useState("xml-to-json");

  const { output, error } = useMemo(() => {
    try {
      if (mode === "xml-to-json") {
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, "application/xml");
        const errorNode = doc.querySelector("parsererror");
        if (errorNode) throw new Error("Invalid XML");
        return { output: JSON.stringify({ [doc.documentElement.nodeName]: xmlToJson(doc.documentElement) }, null, 2), error: null };
      } else {
        const parsed = JSON.parse(input);
        const rootKey = Object.keys(parsed)[0];
        return { output: jsonToXml(parsed[rootKey], rootKey), error: null };
      }
    } catch (e) {
      return { output: "", error: "Couldn't parse input — " + e.message };
    }
  }, [input, mode]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setMode("xml-to-json"); setInput(SAMPLE_XML); }} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === "xml-to-json" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>XML → JSON</button>
        <button onClick={() => { setMode("json-to-xml"); setInput('{"user":{"name":"Alice","age":30}}'); }} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === "json-to-xml" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>JSON → XML</button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={7} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
            <code>{output}</code>
          </pre>
        </>
      )}
    </div>
  );
}
