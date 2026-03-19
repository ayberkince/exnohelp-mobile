import { prisma } from "@/lib/prisma";
import { EnforcementLevel } from "@prisma/client";

export async function flagUserForReview(userId: string, notes: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      enforcement: "RESTRICTED",
      // Add entry to AdminAction log
    }
  });
}