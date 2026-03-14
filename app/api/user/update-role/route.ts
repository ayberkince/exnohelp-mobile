import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // Adjust dots if needed

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    // Safety check: is someone actually logged in?
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { role } = await req.json(); // "CLIENT" or "HELPER"

    if (role !== "CLIENT" && role !== "HELPER") {
      return new NextResponse("Invalid role", { status: 400 });
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { role: role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("ROLE_UPDATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}