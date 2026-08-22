import { useMemo, useState } from "react";

const FIRST_NAMES = ["Alex", "Priya", "Sam", "Maria", "Jordan", "Wei", "Fatima", "Liam"];
const LAST_NAMES = ["Sharma", "Chen", "Garcia", "Patel", "Smith", "Kim", "Khan", "Rossi"];
const DOMAINS = ["example.com", "test.dev", "mail.io"];
const WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing"];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fakeValueFor(type) {
  switch (type) {
    case "string":
      return randomFrom(WORDS) + " " + randomFrom(WORDS);
    case "name":
      return `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`;
    case "email":
      return `${randomFrom(FIRST_NAMES).toLowerCase()}.${randomFrom(LAST_NAMES).toLowerCase()}@${randomFrom(DOMAINS)}`;
    case "number":
      return Math.floor(Math.random() * 1000);
    case "boolean":
      return Math.random() > 0.5;
    case "uuid":
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    case "date":
      return new Date(Date.now() - Math.floor(Math.random() * 1e10)).toISOString();
    default:
      return null;
  }
}

const SAMPLE_SCHEMA = `id: uuid
name: name
email: email
age: number
isActive: boolean
createdAt: date`;

function parseSchema(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [key, type] = line.split(":").map((s) => s.trim());
      return { key, type: (type || "string").toLowerCase() };
    });
}

export default function MockResponseGenerator() {
  const [schemaText, setSchemaText] = useState(SAMPLE_SCHEMA);
  const [count, setCount] = useState(3);
  const [nonce, setNonce] = useState(0);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const fields = parseSchema(schemaText);
    const items = Array.from({ length: Math.max(1, count) }, () => {
      const obj = {};
      fields.forEach(({ key, type }) => {
        obj[key] = fakeValueFor(type);
      });
      return obj;
    });
    return JSON.stringify(count === 1 ? items[0] : items, null, 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaText, count, nonce]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
        Schema (field: type — supports string, name, email, number, boolean, uuid, date)
        <textarea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          rows={6}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          Count
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-20 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300"
        >
          Regenerate
        </button>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 ml-auto"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-800 dark:text-slate-200 max-h-96">
        <code>{output}</code>
      </pre>
    </div>
  );
}
