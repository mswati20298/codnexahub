export const prerender = false;

const ENDPOINTS = [
  { id: "openai", name: "OpenAI", url: "https://api.openai.com/v1/models" },
  { id: "anthropic", name: "Anthropic", url: "https://status.anthropic.com/api/v2/status.json" },
  { id: "google", name: "Google AI", url: "https://status.cloud.google.com/incidents.json" },
];

async function measure(endpoint) {
  const start = Date.now();
  try {
    // We only care about connection + response time, not auth — a 401 still
    // tells us the network round-trip time to the provider's edge.
    await fetch(endpoint.url, { signal: AbortSignal.timeout(5000) });
    return { ...endpoint, latencyMs: Date.now() - start, ok: true };
  } catch {
    return { ...endpoint, latencyMs: null, ok: false };
  }
}

export async function GET() {
  const results = await Promise.all(ENDPOINTS.map(measure));
  return new Response(JSON.stringify({ checkedAt: new Date().toISOString(), results }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
