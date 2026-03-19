/**
 * THE STEEL THREAD
 * This defines the ONLY path a booking can take.
 * It prevents "inconsistent" states.
 */

export type BookingStatus = 
  | 'REQUESTED' 
  | 'OFFERED' 
  | 'CONFIRMED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'PAID' 
  | 'CANCELLED';

export const VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  REQUESTED: ['OFFERED', 'CANCELLED'],
  OFFERED: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED'],
  COMPLETED: ['PAID'],
  PAID: [], // Terminal state
  CANCELLED: [], // Terminal state
};

export function canTransition(current: BookingStatus, next: BookingStatus): boolean {
  return VALID_TRANSITIONS[current].includes(next);
}
