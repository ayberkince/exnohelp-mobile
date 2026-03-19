import { prisma } from "@/lib/prisma";
import { VerificationStatus } from "@prisma/client";

export async function updateVerificationStatus(
  helperProfileId: string, 
  status: VerificationStatus,
  notes?: string
) {
  return await prisma.helperProfile.update({
    where: { id: helperProfileId },
    data: {
      verificationStatus: status,
      adminNotes: notes,
    },
  });
}