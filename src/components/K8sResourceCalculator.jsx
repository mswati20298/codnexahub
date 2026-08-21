import { useMemo, useState } from "react";

export default function K8sResourceCalculator() {
  const [replicas, setReplicas] = useState(3);
  const [cpuPerPod, setCpuPerPod] = useState(250);
  const [memPerPod, setMemPerPod] = useState(512);
  const [nodeCpu, setNodeCpu] = useState(4000);
  const [nodeMem, setNodeMem] = useState(8192);

  const results = useMemo(() => {
    const totalCpu = replicas * cpuPerPod;
    const totalMem = replicas * memPerPod;
    const podsPerNodeByCpu = Math.floor(nodeCpu / cpuPerPod);
    const podsPerNodeByMem = Math.floor(nodeMem / memPerPod);
    const podsPerNode = Math.min(podsPerNodeByCpu, podsPerNodeByMem);
    const nodesNeeded = podsPerNode > 0 ? Math.ceil(replicas / podsPerNode) : null;
    return { totalCpu, totalMem, podsPerNode, nodesNeeded };
  }, [replicas, cpuPerPod, memPerPod, nodeCpu, nodeMem]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Replicas
          <input type="number" min="1" value={replicas} onChange={(e) => setReplicas(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          CPU per pod (millicores)
          <input type="number" min="1" value={cpuPerPod} onChange={(e) => setCpuPerPod(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Memory per pod (MB)
          <input type="number" min="1" value={memPerPod} onChange={(e) => setMemPerPod(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Node capacity CPU (millicores)
          <input type="number" min="1" value={nodeCpu} onChange={(e) => setNodeCpu(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Node capacity memory (MB)
          <input type="number" min="1" value={nodeMem} onChange={(e) => setNodeMem(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Total resources requested</p>
          <p className="text-lg font-semibold text-slate-100">{results.totalCpu}m CPU · {results.totalMem}MB RAM</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Estimated nodes needed</p>
          <p className="text-lg font-semibold text-indigo-400">{results.nodesNeeded ?? "—"}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4">This is a simplified bin-packing estimate — real scheduling also accounts for system-reserved resources and pod anti-affinity rules.</p>
    </div>
  );
}
