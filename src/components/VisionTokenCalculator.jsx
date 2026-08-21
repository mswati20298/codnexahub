import { useMemo, useState } from "react";

export default function VisionTokenCalculator() {
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [imageCount, setImageCount] = useState(1);
  const [pricePerM, setPricePerM] = useState(3.0);

  const results = useMemo(() => {
    // Rough approximation based on common vision tokenization: ~1 token per ~750 pixels, tile-based
    const pixels = width * height;
    const tokensPerImage = Math.ceil(pixels / 750);
    const totalTokens = tokensPerImage * imageCount;
    const cost = (totalTokens / 1_000_000) * pricePerM;
    return { tokensPerImage, totalTokens, cost };
  }, [width, height, imageCount, pricePerM]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Image width (px)
          <input type="number" min="1" value={width} onChange={(e) => setWidth(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Image height (px)
          <input type="number" min="1" value={height} onChange={(e) => setHeight(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Number of images
          <input type="number" min="1" value={imageCount} onChange={(e) => setImageCount(Number(e.target.value) || 1)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          Price ($/1M tokens)
          <input type="number" min="0" value={pricePerM} onChange={(e) => setPricePerM(Number(e.target.value) || 0)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Tokens/image</p>
          <p className="text-lg font-semibold text-slate-100">~{results.tokensPerImage.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Total tokens</p>
          <p className="text-lg font-semibold text-slate-100">~{results.totalTokens.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Estimated cost</p>
          <p className="text-lg font-semibold text-indigo-400">${results.cost.toFixed(4)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4">This is a rough approximation — exact image tokenization varies significantly by provider (tile-based resizing, detail level settings). Check your provider's specific vision pricing docs for precise numbers.</p>
    </div>
  );
}
