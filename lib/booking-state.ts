import { BookingStatus } from "@prisma/client";

const ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELED_BY_CLIENT", "CANCELED_BY_HELPER"],
  CONFIRMED: ["IN_PROGRESS", "CANCELED_BY_CLIENT", "CANCELED_BY_PLATFORM"],
  IN_PROGRESS: ["COMPLETED", "CANCELED_BY_PLATFORM"],
  COMPLETED: [], // Terminal
  CANCELED_BY_CLIENT: [],
  CANCELED_BY_HELPER: [],
  CANCELED_BY_PLATFORM: [],
};

export function isValidTransition(current: BookingStatus, next: BookingStatus): boolean {
  return ALLOWED_TRANSITIONS[current]?.includes(next) ?? false;
}