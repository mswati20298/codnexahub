import { useMemo, useState } from "react";

export default function ChatHistoryCalculator() {
  const [avgMessageTokens, setAvgMessageTokens] = useState(150);
  const [messagesPerTurn, setMessagesPerTurn] = useState(2);
  const [turns, setTurns] = useState(10);
  const [systemPromptTokens, setSystemPromptTokens] = useState(300);

  const results = useMemo(() => {
    const conversationTokens = avgMessageTokens * messagesPerTurn * turns;
    const totalTokens = conversationTokens + systemPromptTokens;
    const turnsBeforeLimits = {
      "8K context": Math.floor((8000 - systemPromptTokens) / (avgMessageTokens * messagesPerTurn)),
      "32K context": Math.floor((32000 - systemPromptTokens) / (avgMessageTokens * messagesPerTurn)),
      "128K context": Math.floor((128000 - systemPromptTokens) / (avgMessageTokens * messagesPerTurn)),
    };
    return { conversationTokens, totalTokens, turnsBeforeLimits };
  }, [avgMessageTokens, messagesPerTurn, turns, systemPromptTokens]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Avg tokens per message
          <input type="number" min="1" value={avgMessageTokens} onChange={(e) => setAvgMessageTokens(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Messages per turn (user+assistant)
          <input type="number" min="1" value={messagesPerTurn} onChange={(e) => setMessagesPerTurn(Number(e.target.value) || 1)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          Number of turns so far
          <input type="number" min="0" value={turns} onChange={(e) => setTurns(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300">
          System prompt tokens
          <input type="number" min="0" value={systemPromptTokens} onChange={(e) => setSystemPromptTokens(Number(e.target.value) || 0)} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100" />
        </label>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4 mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total tokens in conversation so far</p>
        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{results.totalTokens.toLocaleString()}</p>
      </div>

      <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Estimated max turns before hitting context limit:</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {Object.entries(results.turnsBeforeLimits).map(([label, val]) => (
          <div key={label} className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{val > 0 ? val : "0"} turns</p>
          </div>
        ))}
      </div>
    </div>
  );
}
