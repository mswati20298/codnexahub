import { useMemo, useState } from "react";

export default function OAuthUrlBuilder() {
  const [authEndpoint, setAuthEndpoint] = useState("https://accounts.google.com/o/oauth2/v2/auth");
  const [clientId, setClientId] = useState("your-client-id");
  const [redirectUri, setRedirectUri] = useState("https://yourapp.com/callback");
  const [scope, setScope] = useState("openid email profile");
  const [state, setState] = useState("random-state-string");

  const url = useMemo(() => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope,
      state,
    });
    return `${authEndpoint}?${params.toString()}`;
  }, [authEndpoint, clientId, redirectUri, scope, state]);

  const copy = () => navigator.clipboard.writeText(url);

  return (
    <div>
      <div className="space-y-3 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Authorization endpoint
          <input value={authEndpoint} onChange={(e) => setAuthEndpoint(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Client ID
          <input value={clientId} onChange={(e) => setClientId(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Redirect URI
          <input value={redirectUri} onChange={(e) => setRedirectUri(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Scope
          <input value={scope} onChange={(e) => setScope(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          State (CSRF token)
          <input value={state} onChange={(e) => setState(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div onClick={copy} className="cursor-pointer bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-emerald-500">
        <code className="text-xs text-emerald-600 dark:text-emerald-400 break-all">{url}</code>
      </div>
    </div>
  );
}
