import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

/**
 * Creates a booking from a Client Request or Direct Match.
 * Automatically initializes a Conversation for coordination.
 */
export async function createBooking(data: {
  clientId: string;
  helperId: string;
  requestId?: string;
  scheduledAt: Date;
  categorySlug: string;
}) {
  return await prisma.$transaction(async (tx) => {
    // 1. Create the Booking
    const booking = await tx.booking.create({
      data: {
        clientId: data.clientId,
        helperId: data.helperId,
        requestId: data.requestId,
        scheduledAt: data.scheduledAt,
        status: "PENDING", // Initial state
        // In a real app, calculate fees here
      },
    });

    // 2. Create the Conversation context immediately
    await tx.conversation.create({
      data: {
        bookingId: booking.id,
        clientUserId: data.clientId, // Logic assumes these are User IDs
        helperUserId: data.helperId,
      },
    });

    // 3. Log the event
    // Inside lib/bookings.ts
    await tx.adminAction.create({
      data: {
        adminId: data.clientId, // 🚨 Add this line (or a 'SYSTEM' string if allowed)
        notes: `Booking ${booking.id} created.`,
        actionTaken: "BOOKING_CREATED",
      },
    });

    return booking;
  });
}