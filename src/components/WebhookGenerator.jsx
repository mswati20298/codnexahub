import { useMemo, useState } from "react";

const PAYLOAD_TYPES = {
  "generic-event": {
    label: "Generic event",
    build: () => ({
      event: "user.created",
      timestamp: new Date().toISOString(),
      data: { id: "usr_" + Math.random().toString(36).slice(2, 10), email: "test@example.com" },
    }),
  },
  "stripe-payment": {
    label: "Stripe-style payment succeeded",
    build: () => ({
      id: "evt_" + Math.random().toString(36).slice(2, 12),
      type: "payment_intent.succeeded",
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: "pi_" + Math.random().toString(36).slice(2, 12),
          amount: 2000,
          currency: "usd",
          status: "succeeded",
        },
      },
    }),
  },
  "github-push": {
    label: "GitHub-style push event",
    build: () => ({
      ref: "refs/heads/main",
      repository: { full_name: "your-org/your-repo" },
      pusher: { name: "octocat", email: "octocat@example.com" },
      commits: [
        { id: Math.random().toString(36).slice(2, 10), message: "Fix bug in webhook handler" },
      ],
    }),
  },
  "slack-message": {
    label: "Slack-style message event",
    build: () => ({
      type: "message",
      channel: "C0123456789",
      user: "U0123456789",
      text: "Hello from a test webhook",
      ts: (Date.now() / 1000).toFixed(6),
    }),
  },
};

export default function WebhookGenerator() {
  const [type, setType] = useState("generic-event");
  const [copied, setCopied] = useState(false);
  const [nonce, setNonce] = useState(0);

  const payload = useMemo(() => {
    return JSON.stringify(PAYLOAD_TYPES[type].build(), null, 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, nonce]);

  const handleCopy = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(PAYLOAD_TYPES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              type === key
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300"
        >
          Regenerate
        </button>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-300"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto text-xs text-slate-200">
        <code>{payload}</code>
      </pre>

      <p className="text-xs text-slate-500 mt-4">
        These are illustrative sample shapes for local testing, not official
        specs — always check the real provider's docs for exact field names
        before relying on this in production.
      </p>
    </div>
  );
}
