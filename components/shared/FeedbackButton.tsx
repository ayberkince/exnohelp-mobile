'use client';

import { useState } from 'react';
import { submitFeedback } from '@/app/actions/feedback';

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(formData: FormData) {
    const res = await submitFeedback(formData);
    if (res.success) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setIsOpen(false);
      }, 2000);
    }
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-emerald-600 transition-all"
      >
        Feedback 💭
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 animate-in fade-in slide-in-from-bottom-4">
      {sent ? (
        <div className="text-center py-4 text-emerald-600 font-bold">Thanks! We're on it. ✅</div>
      ) : (
        <form action={handleSubmit} className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-black text-xs text-stone-400 uppercase tracking-widest">Beta Feedback</span>
            <button type="button" onClick={() => setIsOpen(false)} className="text-stone-300">✕</button>
          </div>
          <select name="category" className="w-full text-xs p-2 rounded-lg border border-stone-100 bg-stone-50 font-bold">
            <option value="UX">UX / Confusion</option>
            <option value="BUG">Technical Bug</option>
            <option value="TRUST">Trust & Safety</option>
            <option value="OTHER">Other</option>
          </select>
          <textarea 
            name="text" 
            required 
            placeholder="What happened? What was unclear?" 
            className="w-full text-sm p-3 rounded-xl border border-stone-100 bg-stone-50 min-h-[100px] focus:outline-emerald-500"
          />
          <input type="hidden" name="pageUrl" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
          <button type="submit" className="w-full py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">
            Submit Signal
          </button>
        </form>
      )}
    </div>
  );
}
