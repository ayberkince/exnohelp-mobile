import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path if yours is different
import { prisma } from "@/lib/prisma"; // 🚨 Use the shared instance, NOT new PrismaClient()
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OfferButton } from "@/components/shared/OfferButton";
import { BookingStatus, NotificationType, RequestStatus } from "@prisma/client";

export default async function HelperRequestsBoard() {
  // 1. Fetch only OPEN requests, and include the Client's User data
  const openRequests = await prisma.supportRequest.findMany({
    where: { status: RequestStatus.OPEN },
    orderBy: { requestedDate: 'asc' },
    include: { 
      client: { 
        include: { user: true } 
      } 
    } 
  });

  // 2. The Server Action (The Brain)
  async function handleOffer(requestId: string) {
    'use server'; 

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { helperProfile: true }
    });

    const request = await prisma.supportRequest.findUnique({
      where: { id: requestId },
      include: { client: true }
    });

    if (!user?.helperProfile) throw new Error("Helper profile not found.");
    if (!request || request.status !== "OPEN") throw new Error("Request is no longer available.");

    // 🚨 THE MAGIC: A Prisma Transaction. 
    // This ensures that if ONE step fails, the whole thing rolls back. No ghost bookings!
    const booking = await prisma.$transaction(async (tx) => {
      
      // A. Lock the request so no one else can take it
      await tx.supportRequest.update({
        where: { id: request.id },
        data: { status: RequestStatus.MATCHED }
      });

      // B. Create the official Booking ledger
      const newBooking = await tx.booking.create({
        data: {
          requestId: request.id,
          clientId: request.clientId,
          helperId: user.helperProfile!.id,
          scheduledAt: request.requestedDate,
          status: BookingStatus.PENDING, 
          // Use dynamic pricing if available, fallback to default math
          totalAmount: request.offered_total_price || 40.00,  
          helperAmount: (request.offered_total_price || 40.00) * 0.85, // 85% to helper
          platformFee: (request.offered_total_price || 40.00) * 0.15,  // 15% to platform 
        }
      });

      // C. Create the Chat Room so they can talk!
      await tx.conversation.create({
        data: {
          bookingId: newBooking.id,
          clientUserId: request.client.userId,
          helperUserId: user.id,
        }
      });

      // D. Send the Notification to the Client
      await tx.notification.create({
        data: {
          userId: request.client.userId,
          type: NotificationType.BOOKING,
          title: 'New Helper Match!',
          message: `${session.user.name || "A helper"} has offered to support your request: "${request.title}".`,
          link: `/client/bookings/${newBooking.id}`
        }
      });

      return newBooking;
    });

    // Revalidate the board and redirect the helper to their new booking!
    revalidatePath('/helper/requests');
    redirect(`/helper/bookings/${booking.id}`);
  }

  // 3. The UI (The Face)
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        
        <header className="mt-8 border-b-4 border-stone-900 pb-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-stone-900">Open Requests Board</h1>
          <p className="text-stone-500 font-bold tracking-widest text-sm uppercase mt-2">Browse requests & offer support</p>
        </header>

        <div className="grid gap-6">
          {openRequests.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border-2 border-stone-200 shadow-sm border-dashed">
              <div className="text-4xl mb-4 opacity-50">📭</div>
              <p className="text-stone-900 font-black text-xl uppercase tracking-tight">No open requests</p>
              <p className="text-sm text-stone-500 mt-2 font-medium">The marketplace is quiet. Check back later to see if someone in Berlin needs your help!</p>
            </div>
          ) : (
            openRequests.map((req) => (
              <div key={req.id} className="bg-white p-8 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-stone-900 flex flex-col md:flex-row justify-between md:items-center gap-6 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded uppercase tracking-widest">
                      {req.categorySlug.replace('-', ' ')}
                    </span>
                    <span className="text-stone-400 text-sm font-bold">•</span>
                    <span className="text-stone-500 text-[10px] font-black uppercase tracking-widest">
                      Client: {req.client.user?.name?.split(' ')[0] || "Anonymous"}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-stone-900 leading-tight">{req.title}</h3>
                  
                  <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">
                    📍 {req.district}, {req.city} &nbsp;|&nbsp; 📅 {new Date(req.requestedDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  
                  {req.description && (
                    <div className="p-4 bg-stone-50 border border-stone-100 rounded-xl mt-4">
                      <p className="text-stone-600 text-sm font-medium leading-relaxed italic">
                        &quot;{req.description}&quot;
                      </p>
                    </div>
                  )}
                </div>

                <div className="shrink-0 md:w-48">
                  <OfferButton requestId={req.id} action={handleOffer} />
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}