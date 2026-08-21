import { useMemo, useState } from "react";

export default function RobotsTxtGenerator() {
  const [mode, setMode] = useState("allow-all");
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/api/");

  const output = useMemo(() => {
    let rules;
    if (mode === "allow-all") {
      rules = "User-agent: *\nAllow: /";
    } else if (mode === "disallow-all") {
      rules = "User-agent: *\nDisallow: /";
    } else {
      const paths = disallowPaths.split("\n").map((p) => p.trim()).filter(Boolean);
      rules = "User-agent: *\n" + paths.map((p) => `Disallow: ${p}`).join("\n");
    }
    return sitemapUrl ? `${rules}\n\nSitemap: ${sitemapUrl}` : rules;
  }, [mode, sitemapUrl, disallowPaths]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: "allow-all", label: "Allow everything" },
          { key: "disallow-all", label: "Block everything" },
          { key: "custom", label: "Custom paths" },
        ].map((m) => (
          <button key={m.key} onClick={() => setMode(m.key)} className={`text-sm px-3 py-1.5 rounded-lg border ${mode === m.key ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            {m.label}
          </button>
        ))}
      </div>
      {mode === "custom" && (
        <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
          Paths to disallow (one per line)
          <textarea value={disallowPaths} onChange={(e) => setDisallowPaths(e.target.value)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs" />
        </label>
      )}
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Sitemap URL (optional)
        <input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
      </label>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200 whitespace-pre-wrap">
        <code>{output}</code>
      </pre>
    </div>
  );
}
