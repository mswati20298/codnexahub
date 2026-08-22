import { useMemo, useState } from "react";

export default function PrintStylesheetGenerator() {
  const [hideNav, setHideNav] = useState(true);
  const [hideButtons, setHideButtons] = useState(true);
  const [showLinkUrls, setShowLinkUrls] = useState(true);
  const [blackText, setBlackText] = useState(true);

  const css = useMemo(() => {
    const rules = ["@media print {"];
    if (hideNav) rules.push("  nav, header, footer, .no-print {\n    display: none !important;\n  }");
    if (hideButtons) rules.push("  button, .btn, input[type=\"submit\"] {\n    display: none !important;\n  }");
    if (showLinkUrls) rules.push('  a[href]:after {\n    content: " (" attr(href) ")";\n    font-size: 0.8em;\n    color: #555;\n  }');
    if (blackText) rules.push("  body {\n    color: #000 !important;\n    background: #fff !important;\n  }");
    rules.push("}");
    return rules.join("\n\n");
  }, [hideNav, hideButtons, showLinkUrls, blackText]);

  const copy = () => navigator.clipboard.writeText(css);

  return (
    <div>
      <div className="space-y-2 mb-4">
        {[
          { label: "Hide navigation/header/footer", value: hideNav, set: setHideNav },
          { label: "Hide buttons and form submit inputs", value: hideButtons, set: setHideButtons },
          { label: "Show URLs after links", value: showLinkUrls, set: setShowLinkUrls },
          { label: "Force black text on white background", value: blackText, set: setBlackText },
        ].map((f) => (
          <label key={f.label} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={f.value} onChange={(e) => f.set(e.target.checked)} />
            {f.label}
          </label>
        ))}
      </div>
      <div className="flex justify-end mb-2">
        <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300">Copy</button>
      </div>
      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
        <code>{css}</code>
      </pre>
    </div>
  );
}
