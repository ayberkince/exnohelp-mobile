'use client';

import { BookingSummaryCard } from "@/components/shared/BookingSummaryCard";
import { useRouter } from "next/navigation";

export default function BookingConfirmPage() {
  const router = useRouter();

  // FAKE DATA: So you can test UI without an internet connection!
  const mockBooking = {
    helperName: "Sarah M.",
    category: "Appointment Accompaniment",
    date: "Friday, March 20",
    time: "10:00 AM",
    location: "Charité Campus Mitte, Berlin",
    duration: "2 Hours",
    price: 45.00,
  };

  const handleConfirm = () => {
    // Later, this will trigger the Stripe/Payment gateway
    alert("Payment gateway would open here!");
    router.push('/client');
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-stone-500 hover:text-stone-900 font-bold">
          &larr; Back
        </button>
        <h1 className="text-xl font-bold text-stone-900">Complete Booking</h1>
      </header>

      <div className="max-w-md mx-auto p-6 mt-4">
        <BookingSummaryCard {...mockBooking} />

        <button 
          onClick={handleConfirm}
          className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
        >
          Pay and Confirm
        </button>
        
        <p className="text-center text-xs text-stone-400 mt-4">
          By confirming, you agree to the Exnohelp cancellation policy.
        </p>
      </div>
    </main>
  );
}