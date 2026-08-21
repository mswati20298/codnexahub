export default function JwtStructureExplainer() {
  return (
    <div className="space-y-4">
      <div className="font-mono text-xs bg-slate-950 border border-slate-800 rounded-lg p-4 break-all">
        <span className="text-red-400">eyJhbGciOiJIUzI1NiJ9</span>
        <span className="text-slate-500">.</span>
        <span className="text-emerald-400">eyJzdWIiOiIxMjM0NTY3ODkwIn0</span>
        <span className="text-slate-500">.</span>
        <span className="text-indigo-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
      </div>
      <div className="space-y-3">
        <div className="border-l-2 border-red-400 pl-3">
          <p className="text-sm font-medium text-red-400">Header</p>
          <p className="text-sm text-slate-300">Base64URL-encoded JSON specifying the algorithm (e.g. HS256) and token type.</p>
        </div>
        <div className="border-l-2 border-emerald-400 pl-3">
          <p className="text-sm font-medium text-emerald-400">Payload</p>
          <p className="text-sm text-slate-300">Base64URL-encoded JSON containing claims — data about the user/session, like subject, expiry, and custom fields. Not encrypted, just encoded — anyone can read it.</p>
        </div>
        <div className="border-l-2 border-indigo-400 pl-3">
          <p className="text-sm font-medium text-indigo-400">Signature</p>
          <p className="text-sm text-slate-300">HMAC or RSA signature over the header and payload, using a secret only the server knows. This is what makes the token tamper-evident — changing the payload invalidates the signature.</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">A JWT is not encryption — it's a signed, readable data format. Never put sensitive data (passwords, secrets) directly in the payload.</p>
    </div>
  );
}
