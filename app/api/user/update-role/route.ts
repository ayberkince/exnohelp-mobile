import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route"; // 🚨 ADJUST PATH as needed

export async function POST(req: Request) {
  try {
    // 🚨 We must pass authOptions here for the session to be decoded correctly
    const session = await getServerSession(authOptions); 
    
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { role, city, district, emergencyName, emergencyPhone } = await req.json();

    // 1. Find the user ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // 2. Update the User Role AND set isOnboarded to true
    await prisma.user.update({
      where: { id: user.id },
      data: {
        role,
        isOnboarded: true
      }
    });

    // 3. Create or Update the specific Profile table
    if (role === "CLIENT") {
      await prisma.clientProfile.upsert({
        where: { userId: user.id },
        update: {
          city: city,
          district: district,
          emergencyContactName: emergencyName,
          emergencyContactPhone: emergencyPhone,
        },
        create: {
          userId: user.id,
          city: city,
          district: district,
          emergencyContactName: emergencyName,
          emergencyContactPhone: emergencyPhone,
        },
      });
    } else if (role === "HELPER") {
      await prisma.helperProfile.upsert({
        where: { userId: user.id },
        update: { 
          city: city, 
          district: district 
        },
        create: {
          userId: user.id,
          city: city,
          district: district,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ONBOARDING_ERROR:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}