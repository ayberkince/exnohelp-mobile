import { prisma } from "@/lib/prisma";

export async function getBetaHealthMetrics() {
  const [userCount, openRequests, pendingVerifications, openReports] = await Promise.all([
    prisma.user.count(),
    prisma.supportRequest.count({ where: { status: "OPEN" } }),
    prisma.helperProfile.count({ where: { verificationStatus: "PENDING" } }),
    prisma.report.count({ where: { status: "OPEN" } }),
  ]);

  return {
    userCount,
    openRequests,
    pendingVerifications,
    openReports,
    isLaunchReady: userCount > 0 && pendingVerifications === 0 // Basic logic
  };
}