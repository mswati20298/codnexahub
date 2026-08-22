const PATTERNS = [
  { name: "Singleton", desc: "Ensures a class has only one instance with a global access point. Common for config or connection pools, but often overused." },
  { name: "Factory", desc: "Creates objects without specifying the exact class — useful when object creation logic is complex or varies by input." },
  { name: "Observer", desc: "Objects subscribe to and get notified of changes in another object — the basis for event systems and reactive UIs." },
  { name: "Strategy", desc: "Encapsulates interchangeable algorithms behind a common interface, selected at runtime." },
  { name: "Decorator", desc: "Wraps an object to add behavior dynamically, without modifying its class — middleware chains are a common real-world example." },
  { name: "Repository", desc: "Abstracts data access behind an interface, decoupling business logic from the specific database/storage implementation." },
  { name: "Adapter", desc: "Converts one interface into another that client code expects — useful for integrating incompatible APIs." },
];

export default function DesignPatternsReference() {
  return (
    <div className="space-y-2">
      {PATTERNS.map((p) => (
        <div key={p.name} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{p.name}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
