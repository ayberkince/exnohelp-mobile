import Link from "next/link";
import { SupportRequestCard } from "@/components/shared/SupportRequestCard";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function ClientRequestsPage() {
  // 1. Find out who is logged in
  const session = await getServerSession(authOptions);
  
  // 2. Get their Client Profile ID
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
    include: { clientProfile: true }
  });

  // 3. Fetch their REAL requests from Supabase
  const realRequests = await prisma.supportRequest.findMany({
    where: { clientId: user?.clientProfile?.id },
    orderBy: { requestedDate: 'asc' } // Show soonest requests first
  });

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
          
          {/* 4. Map over the real data! */}
          {realRequests.length === 0 ? (
             <p className="text-stone-500 italic">No open requests. Create one above!</p>
          ) : (
             realRequests.map((req) => (
               <SupportRequestCard key={req.id} request={req} />
             ))
          )}
        </div>

      </div>
    </main>
  );
}