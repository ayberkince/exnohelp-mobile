import { getLaunchReadiness } from '@/lib/founder/launch-readiness';

export default async function LaunchReadinessPage() {
  const stats = await getLaunchReadiness();

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-black text-stone-900">Founder Control Room</h1>
        <p className="text-stone-500">Launch Readiness & Stage-Gate Review</p>
      </header>

      <div className={`p-8 rounded-3xl border-2 ${stats.isReady ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
        <h2 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-2">Current Stage Status</h2>
        <p className={`text-3xl font-black ${stats.isReady ? 'text-emerald-700' : 'text-red-700'}`}>
          {stats.status}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-stone-200">
          <p className="text-xs font-bold text-stone-400 uppercase">Total Helpers</p>
          <p className="text-2xl font-black">{stats.helperCount}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-200">
          <p className="text-xs font-bold text-stone-400 uppercase">Verified Helpers</p>
          <p className="text-2xl font-black">{stats.verifiedHelpers}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-200">
          <p className="text-xs font-bold text-stone-400 uppercase">Open Requests</p>
          <p className="text-2xl font-black">{stats.openRequests}</p>
        </div>
      </div>

      <div className="bg-stone-900 text-white p-8 rounded-3xl">
        <h3 className="font-bold mb-4">Founder Decision Logic</h3>
        <ul className="space-y-2 text-sm text-stone-400">
          <li className={stats.helperCount >= 10 ? "text-emerald-400" : ""}>• Minimum 10 Helpers registered</li>
          <li className={stats.verifiedHelpers >= 5 ? "text-emerald-400" : ""}>• Minimum 5 Helpers verified</li>
          <li>• Core Payment/Booking flows tested in Staging</li>
        </ul>
      </div>
    </div>
  );
}
