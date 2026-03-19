'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function acceptRequestAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const requestId = formData.get("requestId") as string;

  // 1. Verify the Helper exists and is verified
  const helperProfile = await prisma.helperProfile.findUnique({
    where: { userId: session.user.id }
  });

  if (!helperProfile || helperProfile.verificationStatus !== "APPROVED") {
    throw new Error("You must be an approved helper to accept requests.");
  }

  // 2. Fetch the Request and ensure it's still OPEN
  const supportRequest = await prisma.supportRequest.findUnique({
    where: { id: requestId },
    include: { client: true }
  });

  if (!supportRequest || supportRequest.status !== "OPEN") {
    throw new Error("This request is no longer available.");
  }

  // 3. Create the Booking and Conversation in one Transaction!
  const booking = await prisma.$transaction(async (tx) => {
    // Update Request status
    await tx.supportRequest.update({
      where: { id: requestId },
      data: { status: "MATCHED" }
    });

    // Create Booking
    const newBooking = await tx.booking.create({
      data: {
        clientId: supportRequest.clientId,
        helperId: helperProfile.id,
        requestId: supportRequest.id,
        scheduledAt: supportRequest.requestedDate,
        status: "PENDING",
      }
    });

    // Create Chat Room
    await tx.conversation.create({
      data: {
        bookingId: newBooking.id,
        clientUserId: supportRequest.client.userId,
        helperUserId: session.user.id,
      }
    });

    return newBooking;
  });

  // 4. Send Helper to the new Booking page
  revalidatePath('/helper/bookings');
  redirect(`/helper/bookings/${booking.id}`);
}