import { prisma } from "@/lib/prisma";
import { ReportType } from "@prisma/client";

export async function createReport(data: {
  reporterId: string;
  reportedUserId?: string;
  bookingId?: string;
  type: ReportType;
  description: string;
}) {
  return await prisma.report.create({
    data: {
      reporterId: data.reporterId,
      reportedUserId: data.reportedUserId,
      bookingId: data.bookingId,
      type: data.type,
      description: data.description,
      status: "OPEN",
    },
  });
}