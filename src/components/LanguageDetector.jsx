import { useMemo, useState } from "react";

const SIGNATURES = [
  { lang: "Python", test: (c) => /def \w+\(.*\):|import \w+|print\(/.test(c) && !/function|const |let /.test(c) },
  { lang: "JavaScript/TypeScript", test: (c) => /function\s+\w+\(|const |let |=>|console\.log/.test(c) },
  { lang: "Java", test: (c) => /public\s+(static\s+)?class|public static void main|System\.out\.println/.test(c) },
  { lang: "Go", test: (c) => /func \w+\(|package \w+|fmt\.Println/.test(c) },
  { lang: "Rust", test: (c) => /fn \w+\(|let mut |println!/.test(c) },
  { lang: "SQL", test: (c) => /SELECT .* FROM|INSERT INTO|CREATE TABLE/i.test(c) },
  { lang: "HTML", test: (c) => /<\/?[a-z][\s\S]*>/i.test(c) && /<html|<div|<body/i.test(c) },
  { lang: "CSS", test: (c) => /\{[^}]*:[^}]*;[^}]*\}/.test(c) && /[.#][\w-]+\s*\{/.test(c) },
  { lang: "PHP", test: (c) => /<\?php|\$\w+\s*=/.test(c) },
  { lang: "Ruby", test: (c) => /def \w+.*\n.*end|puts /.test(c) },
  { lang: "C/C++", test: (c) => /#include\s*<.*>|int main\(/.test(c) },
];

export default function LanguageDetector() {
  const [code, setCode] = useState('function greet(name) {\n  console.log(`Hello, ${name}!`);\n}');

  const matches = useMemo(() => SIGNATURES.filter((s) => s.test(code)).map((s) => s.lang), [code]);

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={8} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs mb-4" />
      {matches.length === 0 ? (
        <p className="text-slate-500 text-sm">Couldn't confidently detect a language from this snippet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {matches.map((m) => (
            <span key={m} className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-700 text-indigo-300">{m}</span>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-500 mt-4">Uses simple pattern heuristics, not a full language parser — ambiguous or minimal snippets may match multiple languages or none.</p>
    </div>
  );
}
