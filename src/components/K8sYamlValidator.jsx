import { useMemo, useState } from "react";

const SAMPLE = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: my-app:latest`;

function validate(text) {
  const issues = [];
  if (!/^apiVersion:/m.test(text)) issues.push("Missing 'apiVersion' field.");
  if (!/^kind:/m.test(text)) issues.push("Missing 'kind' field.");
  if (!/^metadata:/m.test(text)) issues.push("Missing 'metadata' section.");
  if (!/name:/.test(text)) issues.push("No 'name' found under metadata.");
  if (/^kind:\s*Deployment/m.test(text)) {
    if (!/replicas:/.test(text)) issues.push("Deployment is missing 'replicas'.");
    if (!/containers:/.test(text)) issues.push("Deployment is missing 'containers' in spec.template.spec.");
    if (!/image:/.test(text)) issues.push("No container 'image' specified.");
  }
  if (/\t/.test(text)) issues.push("Contains tab characters — YAML requires spaces for indentation.");
  return issues;
}

export default function K8sYamlValidator() {
  const [input, setInput] = useState(SAMPLE);
  const issues = useMemo(() => validate(input), [input]);

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={12} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {issues.length === 0 ? (
        <p className="text-emerald-400 text-sm">Basic structure looks valid.</p>
      ) : (
        <ul className="space-y-1">
          {issues.map((issue, i) => (
            <li key={i} className="text-sm text-amber-300 bg-amber-950/40 border border-amber-900 rounded-lg px-3 py-2">{issue}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-slate-500 mt-4">Checks common structural requirements for Deployment manifests — not a full Kubernetes schema validator.</p>
    </div>
  );
}
