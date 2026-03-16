'use client';

import { useState } from "react";
import { BookingSummaryCard } from "@/components/shared/BookingSummaryCard";
import { HelperCard } from "@/components/shared/HelperCard";
import { HelperEarnings } from "@/components/shared/HelperEarnings";
import { ReportForm } from "@/components/shared/ReportForm";
import { AccountReviewScreen } from "@/components/shared/AccountReviewScreen";
import { AdminDashboard } from "@/components/shared/AdminDashboard";
import { calculateBookingPrice } from "@/lib/pricing";
import { calculateRefundEligibility } from "@/lib/cancellations";

export default function TestUIPage() {
  // --- LIVE INTERACTIVE STATE ---
  const [hourlyRate, setHourlyRate] = useState(20);
  const [durationHours, setDurationHours] = useState(2);
  const [hoursUntilBooking, setHoursUntilBooking] = useState(48);

  // --- THE FINANCIAL ENGINE AT WORK ---
  const pricing = calculateBookingPrice(hourlyRate, durationHours);
  const refund = calculateRefundEligibility(pricing.totalAmount, hoursUntilBooking);

  // FAKE DATA FOR UI COMPONENTS
  const mockHelpers = [
    { id: 1, name: "Sarah M.", district: "Mitte", rating: 4.9, reviews: 34, hourlyRate: hourlyRate, languages: ["German", "English"], isVerified: true },
  ];

  const mockFinancials = {
    totalEarned: 320.50,
    pendingAmount: pricing.helperAmount, // Dynamically showing what the helper will earn
    transactions: [
      { id: "tx_1", date: "Mar 16, 2026", clientName: "Current Test Booking", amount: pricing.helperAmount, status: "PENDING" as const },
      { id: "tx_2", date: "Mar 12, 2026", clientName: "Maria G.", amount: 35.00, status: "PAID_OUT" as const },
    ]
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-stone-900">Platform Operations Testing Ground</h1>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-12">

        {/* --- THE CONTROL PANEL --- */}
        <section className="bg-white p-6 rounded-3xl shadow-lg border-2 border-emerald-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            LIVE MATH
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-4">God Mode Controls</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex justify-between text-sm font-bold text-stone-700">
                <span>Helper Rate (€/hr)</span>
                <span>€{hourlyRate}</span>
              </label>
              <input type="range" min="15" max="50" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full accent-emerald-600" />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-bold text-stone-700">
                <span>Duration (Hours)</span>
                <span>{durationHours} hrs</span>
              </label>
              <input type="range" min="1" max="8" value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))} className="w-full accent-emerald-600" />
            </div>

            <div className="pt-4 border-t border-stone-100">
              <label className="flex justify-between text-sm font-bold text-stone-700">
                <span>Hours until booking (For Refunds)</span>
                <span>{hoursUntilBooking} hrs</span>
              </label>
              <input type="range" min="0" max="72" value={hoursUntilBooking} onChange={(e) => setHoursUntilBooking(Number(e.target.value))} className="w-full accent-red-500" />
            </div>
          </div>
        </section>

        {/* --- SECTION 1: BOOKING SUMMARY (Client Side) --- */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-4">1. Checkout (Client Pays)</h2>
          <BookingSummaryCard 
            helperName="Sarah M."
            category="Appointment Accompaniment"
            date="Upcoming Date"
            time="10:00 AM"
            location="Charité Campus Mitte"
            duration={`${durationHours} Hours`}
            price={pricing.totalAmount}
          />
          
          <div className="mt-4 p-4 bg-stone-100 rounded-xl text-sm space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>Helper Subtotal (€{hourlyRate} x {durationHours}h)</span>
              <span>€{pricing.helperAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Platform Fee (15%)</span>
              <span className="font-bold text-emerald-600">+ €{pricing.platformFee.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* --- SECTION 2: CANCELLATION ENGINE --- */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-4">2. Cancellation Rules</h2>
          <div className={`p-5 rounded-2xl border ${refund.refundAmount > 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <p className="text-sm font-bold text-stone-900 mb-2">If client cancels right now:</p>
            <p className="text-2xl font-black text-stone-900 mb-1">€{refund.refundAmount.toFixed(2)} Refund</p>
            <p className="text-xs text-stone-600">{refund.message}</p>
            <span className="inline-block mt-3 px-2 py-1 bg-white border border-stone-200 text-stone-800 text-xs font-bold rounded-md uppercase tracking-wider">
              Status: {refund.refundStatus}
            </span>
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* --- SECTION 3: EARNINGS (Helper Side) --- */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-4">3. Earnings (Helper Receives)</h2>
          <HelperEarnings {...mockFinancials} />
        </section>

        <hr className="border-stone-200" />

        {/* --- SECTION 4: TRUST & SAFETY --- */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-4">4. Trust & Safety (Report Issue)</h2>
          <ReportForm 
            reportedUserName="Sarah M." 
            bookingDate="Friday, March 20" 
          />
        </section>

        <hr className="border-stone-200" />

        {/* --- SECTION 5: ACCOUNT LOCKDOWN --- */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-4">5. Account Suspended (Lockdown View)</h2>
          <div className="space-y-6">
            <AccountReviewScreen status="SUSPENDED" />
            <AccountReviewScreen status="BANNED" />
          </div>
        </section>

        <hr className="border-stone-200" />

        {/* --- SECTION 6: ADMIN OPERATIONS --- */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-4">6. Admin Operations (God Mode)</h2>
          <AdminDashboard />
        </section>

      </div>
    </main>
  );
}