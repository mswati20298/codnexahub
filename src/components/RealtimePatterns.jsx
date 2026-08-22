const PATTERNS = [
  { name: "Long Polling", desc: "Client sends a request, server holds it open until data is available or timeout, then client immediately re-requests.", bestFor: "Simple fallback compatibility, infrequent updates" },
  { name: "WebSocket", desc: "Full-duplex persistent connection — both client and server can send messages anytime.", bestFor: "Chat, gaming, collaborative editing — frequent bidirectional data" },
  { name: "Server-Sent Events (SSE)", desc: "One-way persistent connection from server to client over plain HTTP, auto-reconnects.", bestFor: "Live feeds, notifications, streaming AI responses — server-to-client only" },
  { name: "Short Polling", desc: "Client requests on a fixed interval regardless of whether new data exists.", bestFor: "Simplicity over efficiency, very infrequent changes" },
];

export default function RealtimePatterns() {
  return (
    <div className="space-y-3">
      {PATTERNS.map((p) => (
        <div key={p.name} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{p.name}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{p.desc}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Best for: {p.bestFor}</p>
        </div>
      ))}
    </div>
  );
}
