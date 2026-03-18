'use server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function submitFeedback(formData: FormData) {
  const session = await getServerSession(authOptions);
  const text = formData.get('text') as string;
  const category = formData.get('category') as string;
  const pageUrl = formData.get('pageUrl') as string;

  if (!text) return { error: "Please provide some feedback text." };

  try {
    await prisma.feedback.create({
      data: {
        userId: session?.user?.id,
        // @ts-ignore
        role: session?.user?.role || 'GUEST',
        category,
        text,
        pageUrl,
      },
    });
    return { success: true };
  } catch (e) {
    return { error: "Failed to submit feedback." };
  }
}
