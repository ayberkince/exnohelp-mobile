import { prisma } from "@/lib/prisma";

/**
 * Fetch all verified helpers for the discovery list.
 * Future: Add pagination and geolocation.
 */
export async function getDiscoveryHelpers(filters?: { district?: string; category?: string }) {
  return await prisma.helperProfile.findMany({
    where: {
      verificationStatus: "APPROVED",
      ...(filters?.district && { district: filters.district }),
      // Note: We'll add category joins here as we build out the HelperServiceCategory table
    },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  });
}