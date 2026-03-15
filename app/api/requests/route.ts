import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    // NextAuth reliably gives us the email
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Get the user directly from the Database (The Ultimate Source of Truth)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clientProfile: true } // We need this to attach the request to the client!
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // 2. Check the REAL database role instead of the session cookie
    if (user.role !== "CLIENT") {
      return new NextResponse("Only clients can create requests", { status: 403 });
    }

    // 3. Make sure they actually finished onboarding
    if (!user.clientProfile) {
      return new NextResponse("Client profile not found. Please finish onboarding.", { status: 404 });
    }

    const body = await req.json();
    const { category, date, time, city, district, title, description } = body;

    // Combine date and time
    const requestedDate = new Date(`${date}T${time}:00`);

    // 4. Save the Request to Supabase!
    const newRequest = await prisma.supportRequest.create({
      data: {
        clientId: user.clientProfile.id,
        categorySlug: category,
        title: title,
        description: description,
        requestedDate: requestedDate,
        city: city,
        district: district,
        status: "OPEN" // Makes it visible in the Helper Marketplace
      }
    });

    return NextResponse.json(newRequest);
  } catch (error) {
    console.error("CREATE_REQUEST_ERROR:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}