const GROUPS = [
  { category: "Character classes", items: [
    { token: "\\d", desc: "Digit (0-9)" },
    { token: "\\w", desc: "Word character (a-z, A-Z, 0-9, _)" },
    { token: "\\s", desc: "Whitespace" },
    { token: ".", desc: "Any character except newline" },
    { token: "[abc]", desc: "Any of a, b, or c" },
    { token: "[^abc]", desc: "Not a, b, or c" },
  ]},
  { category: "Quantifiers", items: [
    { token: "*", desc: "0 or more" },
    { token: "+", desc: "1 or more" },
    { token: "?", desc: "0 or 1 (optional)" },
    { token: "{n}", desc: "Exactly n times" },
    { token: "{n,m}", desc: "Between n and m times" },
  ]},
  { category: "Anchors", items: [
    { token: "^", desc: "Start of string" },
    { token: "$", desc: "End of string" },
    { token: "\\b", desc: "Word boundary" },
  ]},
  { category: "Groups & alternation", items: [
    { token: "(...)", desc: "Capturing group" },
    { token: "(?:...)", desc: "Non-capturing group" },
    { token: "a|b", desc: "a or b" },
  ]},
];

export default function RegexCheatSheet() {
  return (
    <div className="space-y-6">
      {GROUPS.map((group) => (
        <div key={group.category}>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">{group.category}</h3>
          <div className="space-y-1">
            {group.items.map((item) => (
              <div key={item.token} className="flex gap-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                <code className="text-emerald-600 dark:text-emerald-400 w-20 shrink-0">{item.token}</code>
                <span className="text-slate-700 dark:text-slate-300">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
