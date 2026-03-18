'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ClientDashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        
        <header className="mt-8">
          <h1 className="text-3xl font-black text-stone-900">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Client'}! 👋
          </h1>
          <p className="text-stone-500 mt-2">Manage your support requests and upcoming bookings.</p>
        </header>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            📅
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">No Upcoming Bookings</h2>
          <p className="text-stone-500 mb-6 max-w-sm mx-auto">
            {/* 🚨 FIXED HERE */}
            You don&apos;t have any support sessions scheduled right now. Ready to find a helper?
          </p>
          <Link href="/client/requests" className="inline-block px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors">
            Create a New Request
          </Link>
        </section>

      </div>
    </main>
  );
}