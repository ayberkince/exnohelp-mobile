'use client';

import { useState } from 'react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'VERIFICATIONS' | 'REPORTS'>('VERIFICATIONS');

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Admin Header */}
      <div className="bg-stone-900 p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>🛡️</span> Admin Control Center
          </h2>
          <p className="text-stone-400 text-sm mt-1">Manage verifications, reports, and payouts.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">System Status</p>
          <p className="text-emerald-400 text-sm font-bold flex items-center justify-end gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Operational
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('VERIFICATIONS')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'VERIFICATIONS' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
        >
          Verifications (1)
        </button>
        <button 
          onClick={() => setActiveTab('REPORTS')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'REPORTS' ? 'border-red-600 text-red-700' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
        >
          Open Reports (1)
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-0">
        
        {/* VERIFICATION QUEUE */}
        {activeTab === 'VERIFICATIONS' && (
          <div className="divide-y divide-stone-100">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-stone-50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-stone-900">Lukas K.</h3>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">PENDING</span>
                </div>
                <p className="text-sm text-stone-500">Submitted ID and Profile 2 hours ago.</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold text-sm rounded-lg transition-colors">Approve</button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-stone-100 text-stone-700 hover:bg-stone-200 font-bold text-sm rounded-lg transition-colors">Review</button>
              </div>
            </div>
          </div>
        )}

        {/* REPORTS QUEUE */}
        {activeTab === 'REPORTS' && (
          <div className="divide-y divide-stone-100">
            <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-red-50/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">NO_SHOW</span>
                  <h3 className="font-bold text-stone-900">Reported: Sarah M.</h3>
                </div>
                <p className="text-sm text-stone-500">"Helper did not arrive at Charité entrance."</p>
                <p className="text-xs text-stone-400 mt-1">Booking: BK-1092 • Reported by Client</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="w-full px-4 py-2 bg-stone-900 text-white hover:bg-stone-800 font-bold text-sm rounded-lg transition-colors">Open Case</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}