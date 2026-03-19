'use client';

import { useState, useTransition } from 'react';
import { ReportType } from '@prisma/client';
import { submitReportAction } from '@/app/actions/reports';

type ReportFormProps = {
  reportedUserName: string;
  reportedUserId: string; // 🚨 Added for DB integrity
  bookingId: string;       // 🚨 Added for DB integrity
  bookingDate: string;
};

export function ReportForm({ reportedUserName, reportedUserId, bookingId, bookingDate }: ReportFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitReportAction(formData);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || "Something went wrong.");
      }
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
          ✓
        </div>
        <h3 className="text-xl font-black text-stone-900 mb-2 uppercase tracking-tighter">Report Received</h3>
        <p className="text-stone-600 leading-relaxed">
          Thank you. Our Trust & Safety team has been notified and will review the details of your booking on <strong>{bookingDate}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border-2 border-stone-900 overflow-hidden">
      {/* Header section - Heavy Warning Style */}
      <div className="bg-red-600 p-6 text-white">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Safety & Trust Report</h2>
        <p className="text-red-100 text-sm mt-1 font-medium">
          Reporting: <strong>{reportedUserName}</strong>
        </p>
      </div>

      <form className="p-6 space-y-5" onSubmit={handleSubmit}>
        {/* Hidden inputs to pass IDs to the Server Action */}
        <input type="hidden" name="bookingId" value={bookingId} />
        <input type="hidden" name="reportedUserId" value={reportedUserId} />

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">Primary Issue</label>
          <select 
            name="type"
            required
            className="w-full p-4 border-2 border-stone-200 rounded-2xl bg-stone-50 text-stone-900 font-bold focus:border-red-600 outline-none transition-all appearance-none"
          >
            <option value="">Select the reason...</option>
            <option value="NO_SHOW">No Show / Did not arrive</option>
            <option value="UNSAFE_BEHAVIOR">Unsafe behavior</option>
            <option value="PROHIBITED_SERVICE">Requested medical care</option>
            <option value="OFF_PLATFORM_PAYMENT">Asked for cash/off-platform payment</option>
            <option value="HARASSMENT">Harassment or inappropriate conduct</option>
            <option value="OTHER">Other serious issue</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">Description of Incident</label>
          <textarea 
            name="description"
            rows={4}
            className="w-full p-4 border-2 border-stone-200 rounded-2xl bg-stone-50 text-stone-900 focus:border-red-600 outline-none transition-all placeholder:text-stone-400 font-medium"
            placeholder="Please be as specific as possible about what happened..."
            required
          ></textarea>
        </div>

        {error && (
          <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100 italic">
            ⚠️ {error}
          </p>
        )}

        <button 
          type="submit"
          disabled={isPending}
          className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 disabled:bg-stone-400 transition-all shadow-lg active:scale-[0.98]"
        >
          {isPending ? "Submitting Securely..." : "Submit Formal Report"}
        </button>
        
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
          <p className="text-center text-[10px] text-stone-500 font-bold uppercase leading-tight">
            🚨 Immediate Emergency? Call 112 (Berlin Authorities) immediately. <br/> 
            This form is for platform documentation and safety reviews.
          </p>
        </div>
      </form>
    </div>
  );
}