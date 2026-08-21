import { useEffect, useState } from "react";

// Minimal, dependency-free MD5 implementation (Web Crypto doesn't support MD5).
function md5(input) {
  function rotl(x, c) {
    return (x << c) | (x >>> (32 - c));
  }
  function toHexLE(num) {
    let hex = "";
    for (let i = 0; i < 4; i++) {
      hex += ((num >> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    }
    return hex;
  }

  const K = new Array(64);
  for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32);
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const utf8 = new TextEncoder().encode(input);
  const msgLen = utf8.length;
  const bitLen = msgLen * 8;
  const paddedLen = ((msgLen + 8) >> 6) * 64 + 64;
  const buf = new Uint8Array(paddedLen);
  buf.set(utf8);
  buf[msgLen] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(paddedLen - 8, bitLen >>> 0, true);
  view.setUint32(paddedLen - 4, Math.floor(bitLen / 2 ** 32), true);

  let [a0, b0, c0, d0] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];

  for (let chunkStart = 0; chunkStart < paddedLen; chunkStart += 64) {
    const M = new Array(16);
    for (let i = 0; i < 16; i++) {
      M[i] = view.getUint32(chunkStart + i * 4, true);
    }

    let [A, B, C, D] = [a0, b0, c0, d0];

    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F + A + K[i] + M[g]) | 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotl(F, S[i])) | 0;
    }

    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  return [a0, b0, c0, d0].map(toHexLE).join("");
}

async function sha(algo, input) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("Hello, world!");
  const [hashes, setHashes] = useState({ md5: "", sha1: "", sha256: "", sha512: "" });
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function compute() {
      const [sha1, sha256, sha512] = await Promise.all([
        sha("SHA-1", input),
        sha("SHA-256", input),
        sha("SHA-512", input),
      ]);
      if (!cancelled) {
        setHashes({ md5: md5(input), sha1, sha256, sha512 });
      }
    }
    compute();
    return () => {
      cancelled = true;
    };
  }, [input]);

  const copy = (key, value) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />

      <div className="space-y-2">
        {Object.entries(hashes).map(([key, value]) => (
          <div
            key={key}
            onClick={() => copy(key, value)}
            className="cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 hover:border-indigo-500"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-400 uppercase">{key}</span>
              <span className="text-xs text-slate-500">
                {copiedKey === key ? "Copied!" : "Click to copy"}
              </span>
            </div>
            <p className="font-mono text-xs text-slate-200 break-all">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Hashing runs entirely in your browser. MD5 and SHA-1 are not
        cryptographically secure for security-sensitive use (e.g. password
        storage) — use SHA-256 or SHA-512, or better, a purpose-built
        password hashing function like bcrypt/argon2 on your server.
      </p>
    </div>
  );
}
