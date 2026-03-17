import Link from "next/link";
import { SupportRequestCard } from "@/components/shared/SupportRequestCard";

export default function ClientRequestsPage() {
  // 💡 For now, we mock the data we seeded in the database. 
  // In our next step, we will wire this up to fetch directly from Prisma!
  const mockRequest = {
    id: "req_1",
    title: "Need help navigating Charité Campus",
    categorySlug: "Appointment Accompaniment",
    city: "Berlin",
    district: "Mitte",
    requestedDate: new Date('2026-03-20T10:00:00Z'),
    description: "Looking for a friendly face to help me find the right building and wait with me during my appointment.",
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        
        <header className="mt-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-stone-900">Your Requests</h1>
            <p className="text-stone-500 mt-2">Manage your open and past support requests.</p>
          </div>
          <Link 
            href="/client/requests/new" 
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
          >
            + New Request
          </Link>
        </header>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 border-b border-stone-200 pb-2">Open Requests</h2>
          <SupportRequestCard request={mockRequest} />
        </div>

      </div>
    </main>
  );
}