import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { OfferButton } from "@/components/shared/OfferButton";
import { BookingStatus, NotificationType } from "@prisma/client";

const prisma = new PrismaClient();

export default async function HelperRequestsBoard() {
  const openRequests = await prisma.supportRequest.findMany({
    where: { status: "OPEN" },
    orderBy: { requestedDate: 'asc' },
    include: { client: { include: { user: true } } } 
  });

  async function handleOffer(requestId: string) {
    'use server'; 

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { helperProfile: true }
    });

    const request = await prisma.supportRequest.findUnique({
      where: { id: requestId },
      include: { client: true }
    });

    if (!user?.helperProfile || !request) return;

    await prisma.booking.create({
      data: {
        requestId: request.id,
        clientId: request.clientId,
        helperId: user.helperProfile.id,
        scheduledAt: request.requestedDate,
        status: BookingStatus.PENDING, 
        totalAmount: 40.00,  
        helperAmount: 34.00, 
        platformFee: 6.00,   
      }
    });

    await prisma.notification.create({
      data: {
        userId: request.client.userId,
        type: NotificationType.BOOKING,
        title: 'New Helper Offer!',
        message: `${session.user.name} has offered to help with your request: "${request.title}".`,
      }
    });

    revalidatePath('/helper/requests');
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        
        <header className="mt-8">
          <h1 className="text-3xl font-black text-stone-900">Open Requests Board</h1>
          <p className="text-stone-500 mt-2">Browse requests from clients in your area and offer your help.</p>
        </header>

        <div className="grid gap-6">
          {openRequests.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl text-center border border-stone-200 shadow-sm">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-stone-900 font-bold text-lg">No open requests right now.</p>
              <p className="text-sm text-stone-500 mt-2">Check back later to see if someone in your area needs help!</p>
            </div>
          ) : (
            openRequests.map((req) => (
              <div key={req.id} className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col md:flex-row justify-between md:items-center gap-6 transition-all hover:border-emerald-300">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full uppercase tracking-wider">
                      {req.categorySlug.replace('-', ' ')}
                    </span>
                    <span className="text-stone-400 text-sm font-bold">•</span>
                    <span className="text-stone-500 text-sm font-bold">
                      {/* @ts-ignore */}
                      Client: {req.client?.user?.name?.split(' ')[0] || "Anonymous"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-stone-900">{req.title}</h3>
                  
                  <p className="text-stone-500 text-sm font-medium">
                    📍 {req.district}, {req.city} &nbsp;|&nbsp; 📅 {req.requestedDate.toLocaleDateString()}
                  </p>
                  
                  <p className="text-stone-600 mt-2 leading-relaxed">
                    {/* 🚨 FIXED HERE */}
                    &quot;{req.description}&quot;
                  </p>
                </div>

                <div className="shrink-0">
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