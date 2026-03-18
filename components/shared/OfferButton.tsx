'use client';

import { useState } from "react";

// 🚨 Rename submitOffer to action here
export function OfferButton({ 
  requestId, 
  action 
}: { 
  requestId: string, 
  action: (id: string) => Promise<void> 
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handleAction = async () => {
    setStatus('loading');
    await action(requestId); // 🚨 Call action() instead of submitOffer()
    setStatus('sent');
  };

  return (
    <button 
      onClick={handleAction}
      disabled={status !== 'idle'}
      className={`w-full md:w-auto px-8 py-4 font-bold rounded-xl transition-all shadow-sm ${
        status === 'sent' 
          ? 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
          : status === 'loading'
          ? 'bg-emerald-500 text-white animate-pulse'
          : 'bg-emerald-600 text-white hover:bg-emerald-700'
      }`}
    >
      {status === 'idle' && "Send Offer"}
      {status === 'loading' && "Sending..."}
      {status === 'sent' && "Offer Sent! ✅"}
    </button>
  );
}