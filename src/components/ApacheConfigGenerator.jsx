import { useMemo, useState } from "react";

export default function ApacheConfigGenerator() {
  const [serverName, setServerName] = useState("example.com");
  const [proxyPass, setProxyPass] = useState("http://localhost:3000");
  const [enableSsl, setEnableSsl] = useState(true);

  const config = useMemo(() => {
    const base = `<VirtualHost *:80>
    ServerName ${serverName}
    ${enableSsl ? `Redirect permanent / https://${serverName}/` : `ProxyPreserveHost On
    ProxyPass / ${proxyPass}/
    ProxyPassReverse / ${proxyPass}/`}
</VirtualHost>`;

    const sslBlock = enableSsl
      ? `\n\n<VirtualHost *:443>
    ServerName ${serverName}

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/${serverName}/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/${serverName}/privkey.pem

    ProxyPreserveHost On
    ProxyPass / ${proxyPass}/
    ProxyPassReverse / ${proxyPass}/
</VirtualHost>`
      : "";

    return base + sslBlock;
  }, [serverName, proxyPass, enableSsl]);

  const copy = () => navigator.clipboard.writeText(config);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Server name
          <input value={serverName} onChange={(e) => setServerName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Proxy target
          <input value={proxyPass} onChange={(e) => setProxyPass(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-300 mb-4">
        <input type="checkbox" checked={enableSsl} onChange={(e) => setEnableSsl(e.target.checked)} />
        Include SSL virtual host
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{config}</code>
      </pre>
      <p className="text-xs text-slate-500 mt-4">Requires mod_proxy and mod_ssl enabled (a2enmod proxy proxy_http ssl).</p>
    </div>
  );
}
