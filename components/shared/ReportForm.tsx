'use client';

import { useState } from 'react';

type ReportFormProps = {
  reportedUserName: string;
  bookingDate: string;
};

export function ReportForm({ reportedUserName, bookingDate }: ReportFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          ✓
        </div>
        <h3 className="text-lg font-bold text-stone-900 mb-2">Report Submitted</h3>
        <p className="text-sm text-stone-600">
          Thank you for keeping the platform safe. Our Trust & Safety team will review this immediately.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header section */}
      <div className="bg-red-50 border-b border-red-100 p-6">
        <h2 className="text-xl font-bold text-red-900">Report an Issue</h2>
        <p className="text-red-700 text-sm mt-1">
          Tell us what happened with <strong>{reportedUserName}</strong> (Booking: {bookingDate}). 
          We review every report to protect the platform.
        </p>
      </div>

      {/* Form section */}
      <form 
        className="p-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitted(true);
        }}
      >
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">What is the issue?</label>
          <select className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Select a reason...</option>
            <option value="NO_SHOW">They did not show up</option>
            <option value="UNSAFE_BEHAVIOR">Unsafe behavior during the booking</option>
            <option value="PROHIBITED_SERVICE">They requested/attempted medical care</option>
            <option value="OFF_PLATFORM_PAYMENT">They asked to pay in cash outside the app</option>
            <option value="HARASSMENT">Harassment or inappropriate messages</option>
            <option value="OTHER">Other issue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-700 mb-2">Can you provide more details?</label>
          <textarea 
            rows={4}
            className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Please describe exactly what happened..."
            required
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
        >
          Submit Report
        </button>
        
        <p className="text-center text-xs text-stone-400 mt-4">
          In an immediate emergency, please call local authorities (112 in Berlin) before submitting this report.
        </p>
      </form>
    </div>
  );
}