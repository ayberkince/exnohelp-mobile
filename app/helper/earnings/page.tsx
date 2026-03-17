'use client';

import { HelperEarnings } from "@/components/shared/HelperEarnings";

export default function EarningsPage() {
  // In Step 3 (Database Sync), we will replace this with real data!
  const mockFinancials = {
    totalEarned: 320.50,
    pendingAmount: 45.00,
    transactions: [
      { id: "tx_1", date: "Mar 16, 2026", clientName: "Current Test Booking", amount: 45.00, status: "PENDING" as const },
      { id: "tx_2", date: "Mar 12, 2026", clientName: "Maria G.", amount: 35.00, status: "PAID_OUT" as const },
    ]
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        
        <header className="mb-6">
          <h1 className="text-2xl font-black text-stone-900">Your Earnings</h1>
          <p className="text-stone-500 text-sm mt-1">Track your payouts and upcoming transfers.</p>
        </header>

        <HelperEarnings {...mockFinancials} />

      </div>
    </main>
  );
}