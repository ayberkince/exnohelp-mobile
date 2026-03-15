import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
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

    // 2. Update the User Role
    await prisma.user.update({
      where: { id: user.id },
      data: { role: role }
    });

    // 3. Create or Update the specific Profile table
    if (role === "CLIENT") {
      await prisma.clientProfile.upsert({
        where: { userId: user.id },
        update: {
          city: city,           // <--- FIXED: changed from defaultCity
          district: district,   // <--- Added district so we save it!
          emergencyContactName: emergencyName,
          emergencyContactPhone: emergencyPhone,
        },
        create: {
          userId: user.id,
          city: city,           // <--- FIXED
          district: district,   // <--- Added district
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