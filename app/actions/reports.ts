'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createReport } from "@/lib/reports";
import { ReportType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function submitReportAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const type = formData.get("type") as ReportType;
  const description = formData.get("description") as string;
  const bookingId = formData.get("bookingId") as string;
  const reportedUserId = formData.get("reportedUserId") as string;

  try {
    await createReport({
      reporterId: session.user.id,
      reportedUserId,
      bookingId,
      type,
      description,
    });

    revalidatePath(`/client/bookings/${bookingId}`);
    return { success: true };
  } catch (error) {
    console.error("REPORT_SUBMISSION_ERROR", error);
    return { success: false, error: "Failed to submit report. Please try again." };
  }
}