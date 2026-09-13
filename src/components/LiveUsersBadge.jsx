import { useEffect, useState } from "react";

export default function LiveUsersBadge() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/active-users");
        const data = await res.json();
        if (!cancelled) {
          setCount(typeof data.activeUsers === "number" ? data.activeUsers : null);
        }
      } catch {
        if (!cancelled) setCount(null);
      }
    }

    poll();
    const interval = setInterval(poll, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      {count} {count === 1 ? "person" : "people"} online
    </span>
  );
}
