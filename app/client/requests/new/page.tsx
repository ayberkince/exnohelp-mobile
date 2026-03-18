'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupportRequest } from "@/app/actions/requests";

export default function NewRequestPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // This wraps our Server Action so we can show a loading state
  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await createSupportRequest(formData); // This runs the database code!
      router.push('/client/requests');      // Send them back to the dashboard
      router.refresh();                     // Force the dashboard to fetch the new data
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Something went wrong saving your request!");
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        
        <header className="mt-8">
          <Link href="/client/requests" className="text-emerald-600 font-bold text-sm mb-4 inline-block hover:underline">
            ← Back to requests
          </Link>
          <h1 className="text-3xl font-black text-stone-900">Create a Request</h1>
          <p className="text-stone-500 mt-2">Tell us what you need help with, and we will find the right helper.</p>
        </header>

        {/* 🚨 Notice the 'action={clientAction}' here! */}
        <form action={clientAction} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Request Title</label>
            <input 
              type="text" 
              name="title" /* 👈 REQUIRED FOR SERVER ACTIONS */
              placeholder="e.g., Grocery shopping assistance"
              className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Date</label>
              <input 
                type="date" 
                name="date" /* 👈 REQUIRED FOR SERVER ACTIONS */
                className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">District</label>
              <input 
                type="text" 
                name="district" /* 👈 REQUIRED FOR SERVER ACTIONS */
                placeholder="e.g., Mitte"
                className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Details & Instructions</label>
            <textarea 
              name="description" /* 👈 REQUIRED FOR SERVER ACTIONS */
              rows={4}
              placeholder="Please describe exactly what you need help with..."
              className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Publishing Request..." : "Publish Request"}
          </button>
        </form>

      </div>
    </main>
  );
}