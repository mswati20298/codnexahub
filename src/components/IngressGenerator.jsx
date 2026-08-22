import { useMemo, useState } from "react";

export default function IngressGenerator() {
  const [name, setName] = useState("app-ingress");
  const [host, setHost] = useState("example.com");
  const [serviceName, setServiceName] = useState("app-service");
  const [servicePort, setServicePort] = useState(80);
  const [tls, setTls] = useState(true);

  const yaml = useMemo(() => `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
${tls ? `  tls:\n    - hosts:\n        - ${host}\n      secretName: ${name}-tls\n` : ""}  rules:
    - host: ${host}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ${serviceName}
                port:
                  number: ${servicePort}`, [name, host, serviceName, servicePort, tls]);

  const copy = () => navigator.clipboard.writeText(yaml);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Ingress name
          <input value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Host
          <input value={host} onChange={(e) => setHost(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Service name
          <input value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Service port
          <input type="number" value={servicePort} onChange={(e) => setServicePort(Number(e.target.value) || 80)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
        <input type="checkbox" checked={tls} onChange={(e) => setTls(e.target.checked)} />
        Include TLS configuration
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy YAML</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{yaml}</code>
      </pre>
    </div>
  );
}
