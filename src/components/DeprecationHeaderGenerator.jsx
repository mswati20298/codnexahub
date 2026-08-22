import { useMemo, useState } from "react";

export default function DeprecationHeaderGenerator() {
  const [sunsetDate, setSunsetDate] = useState("2027-01-01");
  const [linkUrl, setLinkUrl] = useState("https://api.example.com/docs/migration-v2");

  const headers = useMemo(() => {
    const sunsetHttpDate = new Date(sunsetDate + "T00:00:00Z").toUTCString();
    return `Deprecation: true\nSunset: ${sunsetHttpDate}\nLink: <${linkUrl}>; rel="deprecation"`;
  }, [sunsetDate, linkUrl]);

  const copy = () => navigator.clipboard.writeText(headers);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Sunset date
          <input type="date" value={sunsetDate} onChange={(e) => setSunsetDate(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Migration guide URL
          <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{headers}</code>
      </pre>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">Based on the IETF Deprecation and Sunset HTTP header drafts — gives API consumers a machine-readable way to detect deprecated endpoints before they break.</p>
    </div>
  );
}
