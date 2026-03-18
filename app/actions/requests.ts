'use server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createSupportRequest(formData: FormData) {
  // 1. Get the logged-in user
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Not logged in");

  // 2. Find their Client Profile ID
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { clientProfile: true }
  });

  if (!user?.clientProfile) throw new Error("Client profile not found");

  // 3. Save the form directly to Supabase!
  await prisma.supportRequest.create({
    data: {
      clientId: user.clientProfile.id,
      title: formData.get('title') as string,
      categorySlug: 'general-support', 
      city: 'Berlin',
      district: formData.get('district') as string,
      description: formData.get('description') as string,
      requestedDate: new Date(formData.get('date') as string),
    }
  });

  // 4. Tell Next.js to instantly refresh the Client Dashboard
  revalidatePath('/client/requests');
}