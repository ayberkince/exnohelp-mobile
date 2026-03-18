import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getLaunchReadiness() {
  const helperCount = await prisma.user.count({ where: { role: 'HELPER' } });
  const verifiedHelpers = await prisma.user.count({ where: { role: 'HELPER', verified: true } as any });
  const openRequests = await prisma.request.count({ where: { status: 'OPEN' } });
  
  // Logical "Go" check
  const isReady = helperCount >= 5 && verifiedHelpers >= 2;

  return {
    helperCount,
    verifiedHelpers,
    openRequests,
    isReady,
    status: isReady ? "READY FOR PRIVATE BETA" : "SUPPLY DEFICIT - DO NOT LAUNCH"
  };
}
