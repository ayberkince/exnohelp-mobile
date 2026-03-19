import { prisma } from "@/lib/prisma";
import { BookingStatus, RequestStatus } from "@prisma/client";

export default async function FounderDashboard() {
  // 1. Fetch Liquidity Metrics (Is the marketplace alive?)
  const [activeHelpers, openRequests, completedBookings] = await Promise.all([
    prisma.helperProfile.count({ where: { verificationStatus: "APPROVED" } }),
    prisma.supportRequest.count({ where: { status: RequestStatus.OPEN } }),
    prisma.booking.count({ where: { status: BookingStatus.COMPLETED } })
  ]);

  // 2. Fetch Ops & Trust Metrics (Is the marketplace safe?)
  const [pendingVerifications, openReports, activeBookings] = await Promise.all([
    prisma.helperProfile.count({ where: { verificationStatus: "PENDING" } }),
    prisma.report.count({ where: { status: "OPEN" } }),
    prisma.booking.count({ where: { status: BookingStatus.PENDING } }) // Bookings waiting to happen
  ]);

  // 3. System Logic: Decide if we need to panic
  const liquidityStatus = openRequests > 0 && activeHelpers > 0 ? "Emerging" : "Empty / Imbalanced";
  const opsStatus = openReports > 0 ? "Critical: Review Reports" : pendingVerifications > 5 ? "Warning: Queue Backed Up" : "Controlled";

  return (
    <main className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="border-b-4 border-stone-900 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-stone-900">Founder Cockpit</h1>
            <p className="text-stone-500 font-bold tracking-widest text-sm uppercase mt-2">Live Beta Telemetry</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">System Status</p>
            <p className={`text-sm font-black uppercase tracking-widest ${openReports > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
              {openReports > 0 ? 'Action Required' : 'All Systems Nominal'}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Liquidity Panel */}
          <div className="bg-white p-8 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-stone-900">
            <div className="flex justify-between items-start mb-6 border-b-2 border-stone-100 pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-stone-900">Liquidity</h2>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded ${
                liquidityStatus === "Emerging" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"
              }`}>
                {liquidityStatus}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-bold uppercase tracking-widest text-xs">Approved Helpers</span>
                <span className="text-2xl font-black">{activeHelpers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-bold uppercase tracking-widest text-xs">Open Requests (Unmatched)</span>
                <span className="text-2xl font-black text-blue-600">{openRequests}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-bold uppercase tracking-widest text-xs">Completed Bookings</span>
                <span className="text-2xl font-black text-emerald-600">{completedBookings}</span>
              </div>
            </div>
          </div>

          {/* Trust & Ops Panel */}
          <div className="bg-white p-8 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-stone-900">
            <div className="flex justify-between items-start mb-6 border-b-2 border-stone-100 pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-stone-900">Trust & Ops</h2>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded ${
                opsStatus === "Controlled" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800 animate-pulse"
              }`}>
                {opsStatus}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-bold uppercase tracking-widest text-xs">Active/Pending Bookings</span>
                <span className="text-2xl font-black text-blue-600">{activeBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-bold uppercase tracking-widest text-xs">Pending Verifications</span>
                <span className={`text-2xl font-black ${pendingVerifications > 0 ? 'text-orange-500' : 'text-stone-900'}`}>
                  {pendingVerifications}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Open Safety Reports</span>
                <span className={`text-2xl font-black ${openReports > 0 ? 'text-red-600' : 'text-stone-300'}`}>
                  {openReports}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}