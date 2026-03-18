'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function joinWaitlist(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const district = formData.get('district') as string;

  if (!email || !name) {
    return { error: "Name and email are required." };
  }

  try {
    await prisma.waitlistEntry.create({
      data: {
        name,
        email,
        role,
        district,
      },
    });

    revalidatePath('/waitlist');
    return { success: true };
  } catch (error: any) {
    // Handle unique constraint error (user already on waitlist)
    if (error.code === 'P2002') {
      return { error: "You're already on the list! We'll be in touch soon." };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
