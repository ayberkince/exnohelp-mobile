import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * STRICT ACCESS CONTROL
 * Ensures a helper can ONLY see a client's specific coordination details 
 * (like meeting location or phone) IF they have an active, confirmed booking.
 */
export async function canHelperAccessClientDetails(helperId: string, clientId: string) {
  const activeBooking = await prisma.booking.findFirst({
    where: {
      helperId: helperId,
      clientId: clientId,
      status: { in: ['CONFIRMED', 'IN_PROGRESS'] }
    }
  });

  return !!activeBooking;
}

/**
 * ADMIN AUDIT LOGGING
 * Every time an admin performs a sensitive action (verifying a helper, 
 * viewing a report, issuing a refund), it MUST be logged.
 */
export async function logAdminAction(adminId: string, action: string, targetId: string, details: string) {
  // In a real production app, this would write to an 'AuditLog' table.
  console.log(`[AUDIT LOG] Admin: ${adminId} | Action: ${action} | Target: ${targetId} | Details: ${details}`);
  
  // Future implementation:
  // await prisma.auditLog.create({ data: { adminId, action, targetId, details } });
}
