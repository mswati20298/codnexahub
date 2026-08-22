const ALGORITHMS = [
  { name: "bcrypt", desc: "Widely supported, battle-tested. Has a work factor to adjust difficulty. Max input length limit (72 bytes) is a common gotcha.", recommended: true },
  { name: "argon2id", desc: "Winner of the 2015 Password Hashing Competition. Resistant to both GPU and side-channel attacks. Generally the current best-practice choice.", recommended: true },
  { name: "scrypt", desc: "Memory-hard like argon2, older and still solid, less commonly used in new projects than argon2 today.", recommended: true },
  { name: "PBKDF2", desc: "NIST-approved, widely available in standard libraries, but weaker against GPU cracking than the memory-hard alternatives above.", recommended: false },
  { name: "SHA-256 (alone)", desc: "Never use a general-purpose hash function alone for passwords — too fast, making brute-force trivial at scale.", recommended: false },
  { name: "MD5 / SHA-1", desc: "Broken for security purposes entirely. Never use for passwords or anything security-sensitive.", recommended: false },
];

export default function HashingAlgorithmsComparison() {
  return (
    <div className="space-y-2">
      {ALGORITHMS.map((a) => (
        <div key={a.name} className={`rounded-lg border px-4 py-3 ${a.recommended ? "border-emerald-200 dark:border-emerald-900 bg-emerald-950/20" : "border-red-200 dark:border-red-900 bg-red-950/20"}`}>
          <p className={`text-sm font-medium ${a.recommended ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{a.name} {a.recommended ? "— Recommended" : "— Avoid for passwords"}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}
