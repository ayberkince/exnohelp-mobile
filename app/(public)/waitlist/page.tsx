'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { joinWaitlist } from '@/app/actions/waitlist';

export default function WaitlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [role, setRole] = useState<'CLIENT' | 'HELPER' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // 🚨 Redirect if user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      // @ts-ignore
      const dashboard = session?.user?.role === 'HELPER' ? '/helper' : '/client';
      router.push(dashboard);
    }
  }, [status, session, router]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);
    if (role) formData.append('role', role);
    const result = await joinWaitlist(formData);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
      setIsSubmitting(false);
    } else {
      setMessage({ type: 'success', text: "You're in! Check your inbox soon for early access details." });
    }
  }

  if (status === "loading") return null;

  if (message?.type === 'success') {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="text-6xl">💌</div>
          <h1 className="text-3xl font-black text-stone-900">Welcome to the Founding Cohort</h1>
          <p className="text-stone-600 leading-relaxed">{message.text}</p>
          <button onClick={() => window.location.href = '/'} className="text-emerald-600 font-bold hover:underline">Return Home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 pt-20 pb-12 px-6">
      <div className="max-w-xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-black text-stone-900">Join the Berlin Waitlist</h1>
        <p className="text-stone-600 leading-relaxed">We are launching carefully to ensure every booking is trusted. Join the early access list.</p>
        
        {!role ? (
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setRole('CLIENT')} className="p-8 bg-white border-2 border-stone-200 rounded-3xl hover:border-emerald-500 transition-all group">
              <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🙋‍♀️</span>
              <span className="font-bold text-stone-900 uppercase text-xs tracking-widest">I need support</span>
            </button>
            <button onClick={() => setRole('HELPER')} className="p-8 bg-white border-2 border-stone-200 rounded-3xl hover:border-emerald-500 transition-all group">
              <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🤝</span>
              <span className="font-bold text-stone-900 uppercase text-xs tracking-widest">I want to help</span>
            </button>
          </div>
        ) : (
          <form action={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 text-left space-y-4">
             <h3 className="font-black text-xl text-stone-900 mb-6">You selected: {role === 'CLIENT' ? 'Client' : 'Helper'}</h3>
             
             {message?.type === 'error' && (
               <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 mb-4">{message.text}</div>
             )}

             <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Full Name</label>
                  <input name="name" required type="text" className="w-full p-3 rounded-xl border border-stone-200 focus:outline-emerald-500 bg-stone-50" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Email Address</label>
                  <input name="email" required type="email" className="w-full p-3 rounded-xl border border-stone-200 focus:outline-emerald-500 bg-stone-50" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Berlin District</label>
                  <input name="district" required type="text" className="w-full p-3 rounded-xl border border-stone-200 focus:outline-emerald-500 bg-stone-50" placeholder="e.g. Mitte" />
                </div>
             </div>

             <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-sm"
              >
               {isSubmitting ? "Processing..." : "Request Early Access"}
             </button>
             
             <button type="button" onClick={() => setRole(null)} className="w-full text-stone-400 text-sm font-bold pt-2">Go Back</button>
          </form>
        )}
      </div>
    </main>
  );
}