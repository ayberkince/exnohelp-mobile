'use client';

export function AnalyticsDashboard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="bg-stone-900 p-6 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📈</span> Marketplace Metrics
        </h2>
        <p className="text-stone-400 text-sm mt-1">Live overview of liquidity, funnels, and trust.</p>
      </div>

      <div className="p-6 space-y-8">
        
        {/* SECTION: Marketplace Liquidity */}
        <div>
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">Liquidity & Health</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-emerald-700 text-xs font-bold mb-1">Active Helpers</p>
              <p className="text-3xl font-black text-emerald-900">42</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-emerald-700 text-xs font-bold mb-1">Open Requests</p>
              <p className="text-3xl font-black text-emerald-900">18</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <p className="text-stone-500 text-xs font-bold mb-1">Req-to-Booking Rate</p>
              <p className="text-xl font-bold text-stone-900">68%</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <p className="text-stone-500 text-xs font-bold mb-1">Repeat Booking Rate</p>
              <p className="text-xl font-bold text-stone-900">34%</p>
            </div>
          </div>
        </div>

        {/* SECTION: Funnel Drop-off */}
        <div>
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">Client Funnel (Last 7 Days)</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 text-right text-xs text-stone-500 font-bold">100%</div>
              <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-900 w-full rounded-full"></div>
              </div>
              <div className="w-24 text-xs font-bold text-stone-900">Signups (120)</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 text-right text-xs text-stone-500 font-bold">85%</div>
              <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-[85%] rounded-full"></div>
              </div>
              <div className="w-24 text-xs font-bold text-stone-900">Onboarded</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 text-right text-xs text-stone-500 font-bold">45%</div>
              <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[45%] rounded-full"></div>
              </div>
              <div className="w-24 text-xs font-bold text-stone-900">Requested</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 text-right text-xs text-stone-500 font-bold">38%</div>
              <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[38%] rounded-full"></div>
              </div>
              <div className="w-24 text-xs font-bold text-stone-900">Booked (45)</div>
            </div>
          </div>
        </div>

        {/* SECTION: Trust Early Warnings */}
        <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
          <h3 className="text-sm font-bold text-red-900 uppercase tracking-wider mb-2">Early Warning Signals</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-red-700 text-sm">No-Show Rate</span>
            <span className="font-bold text-red-900">2.1% <span className="text-xs font-normal opacity-70">(&lt;5% target)</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-700 text-sm">Dispute Rate</span>
            <span className="font-bold text-red-900">0.8% <span className="text-xs font-normal opacity-70">(&lt;2% target)</span></span>
          </div>
        </div>

      </div>
    </div>
  );
}