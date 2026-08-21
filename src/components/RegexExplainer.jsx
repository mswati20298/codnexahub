import { useMemo, useState } from "react";

const TOKEN_EXPLANATIONS = [
  { re: /\\d/, label: "\\d", desc: "any digit (0-9)" },
  { re: /\\D/, label: "\\D", desc: "any non-digit" },
  { re: /\\w/, label: "\\w", desc: "any word character (letter, digit, underscore)" },
  { re: /\\W/, label: "\\W", desc: "any non-word character" },
  { re: /\\s/, label: "\\s", desc: "any whitespace character" },
  { re: /\\S/, label: "\\S", desc: "any non-whitespace character" },
  { re: /\^/, label: "^", desc: "start of string" },
  { re: /\$/, label: "$", desc: "end of string" },
  { re: /\.\*/, label: ".*", desc: "any character, zero or more times" },
  { re: /\.\+/, label: ".+", desc: "any character, one or more times" },
  { re: /\?/, label: "?", desc: "previous token, zero or one time (optional)" },
  { re: /\[.*?\]/, label: "[...]", desc: "a character class — matches any one character inside the brackets" },
  { re: /\(.*?\)/, label: "(...)", desc: "a capturing group" },
  { re: /\{(\d+),?(\d+)?\}/, label: "{n,m}", desc: "between n and m repetitions of the previous token" },
  { re: /\|/, label: "|", desc: "alternation (OR) between patterns" },
];

function explain(pattern) {
  const found = [];
  TOKEN_EXPLANATIONS.forEach((t) => {
    if (t.re.test(pattern)) found.push(t);
  });
  return found;
}

export default function RegexExplainer() {
  const [pattern, setPattern] = useState("^\\w+@[\\w.-]+\\.\\w{2,}$");
  const [testString, setTestString] = useState("user@example.com");

  const explanations = useMemo(() => explain(pattern), [pattern]);

  const matchResult = useMemo(() => {
    try {
      const re = new RegExp(pattern);
      return re.test(testString);
    } catch {
      return null;
    }
  }, [pattern, testString]);

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Regex pattern
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-300 mb-4">
        Test string
        <input value={testString} onChange={(e) => setTestString(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-sm" />
      </label>
      {matchResult !== null && (
        <p className={`text-sm mb-4 ${matchResult ? "text-emerald-400" : "text-red-400"}`}>{matchResult ? "✓ Matches" : "✗ Does not match"}</p>
      )}
      <div className="space-y-1">
        {explanations.map((e) => (
          <div key={e.label} className="flex gap-3 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm">
            <code className="text-indigo-400 w-16 shrink-0">{e.label}</code>
            <span className="text-slate-300">{e.desc}</span>
          </div>
        ))}
        {explanations.length === 0 && <p className="text-slate-500 text-sm">No recognized tokens found in this pattern.</p>}
      </div>
    </div>
  );
}
