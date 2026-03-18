'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HelperDashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        
        <header className="mt-8">
          <h1 className="text-3xl font-black text-stone-900">
            Hi, {session?.user?.name?.split(' ')[0] || 'Helper'}! 🚀
          </h1>
          <p className="text-stone-500 mt-2">Here is what is happening with your profile today.</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/helper/earnings" className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 hover:border-emerald-300 transition-colors block">
            <p className="text-stone-500 text-sm font-bold mb-2">Pending Earnings</p>
            <p className="text-3xl font-black text-stone-900">€40.00</p>
            <p className="text-emerald-600 text-xs font-bold mt-2">View payouts →</p>
          </Link>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
            <p className="text-stone-500 text-sm font-bold mb-2">Profile Status</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <p className="text-lg font-bold text-stone-900">Verified</p>
            </div>
          </div>
        </div>

        <section className="bg-stone-900 p-8 rounded-3xl text-center text-white mt-8">
          <h2 className="text-xl font-bold mb-2">Browse Open Requests</h2>
          <p className="text-stone-400 mb-6 max-w-sm mx-auto">
            Clients in your area are looking for support. Apply to your next booking today.
          </p>
          <Link href="/helper/requests" className="inline-block px-6 py-3 bg-white text-stone-900 font-bold rounded-xl hover:bg-stone-100 transition-colors">
            View Requests Board
          </Link>
        </section>

      </div>
    </main>
  );
}