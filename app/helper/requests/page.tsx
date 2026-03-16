import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { SupportRequestCard } from "../../../components/shared/SupportRequestCard";

export default async function HelperMarketplacePage() {
  // 1. Check Auth (Bouncer)
  const session = await getServerSession();
  if (!session) return <div>Please log in</div>;

  // 2. Fetch OPEN jobs straight from Supabase!
  const openRequests = await prisma.supportRequest.findMany({
    where: { status: "OPEN" },
    orderBy: { requestedDate: "asc" }, // Soonest jobs first
  });

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-stone-900">Open Requests</h1>
      </header>

      <div className="max-w-md mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-stone-900">Find work in Berlin</h2>
          <p className="text-stone-500 text-sm mt-1">
            Showing {openRequests.length} open requests matching your profile.
          </p>
        </div>

        <div className="space-y-4">
          {openRequests.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-2xl border border-stone-100">
              <p className="text-stone-500">No open requests right now.</p>
              <p className="text-sm text-stone-400 mt-2">Check back later!</p>
            </div>
          ) : (
            openRequests.map((req) => (
              <SupportRequestCard key={req.id} request={req} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}