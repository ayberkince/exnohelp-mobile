'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function createSupportRequest(formData: FormData) {
  // 1. Get the logged-in user
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized: Please log in.");

  // 2. Find their Client Profile
  const clientProfile = await prisma.clientProfile.findUnique({
    where: { userId: session.user.id }
  });

  if (!clientProfile) {
    throw new Error("Client profile not found. Have you completed onboarding?");
  }

  // 3. Extract the clean data from FormData
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categorySlug = formData.get("categorySlug") as string;
  const city = formData.get("city") as string;
  const district = formData.get("district") as string;
  
  // Convert HTML date string ("YYYY-MM-DD") to a JS Date object for Prisma
  const dateString = formData.get("date") as string;
  const requestedDate = new Date(dateString);

  // 4. Write to the Database
  const newRequest = await prisma.supportRequest.create({
    data: {
      clientId: clientProfile.id,
      title,
      description,
      categorySlug,
      city,
      district,
      requestedDate,
      status: "OPEN", // Default state from our enums
    }
  });

  return newRequest;
}