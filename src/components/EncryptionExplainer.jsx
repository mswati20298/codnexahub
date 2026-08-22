export default function EncryptionExplainer() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">Encryption in Transit</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">Protects data while it moves between systems — client to server, server to database, service to service. Implemented via TLS/HTTPS. Prevents eavesdropping on the network (e.g. someone sniffing traffic on public wifi).</p>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">Encryption at Rest</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">Protects data while it's stored — on disk, in a database, in backups. Implemented via disk encryption, database-level encryption, or application-level field encryption. Prevents exposure if physical storage or backups are stolen/accessed without authorization.</p>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-4">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">Why you need both</p>
        <p className="text-sm text-slate-700 dark:text-slate-300">They protect against different threats. Data encrypted in transit but not at rest is exposed if the disk/database is compromised directly. Data encrypted at rest but sent over plain HTTP is exposed to network interception.</p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-500">A third category — encryption in use (processing encrypted data without decrypting it) — is more specialized (e.g. confidential computing) and less commonly needed for typical applications.</p>
    </div>
  );
}
