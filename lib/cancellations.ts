// lib/cancellations.ts

export function calculateRefundEligibility(totalPaid: number, hoursUntilBooking: number) {
  if (hoursUntilBooking >= 24) {
    return {
      refundAmount: totalPaid,
      refundStatus: 'APPROVED_FULL',
      message: "Full refund approved. Canceled with more than 24 hours notice."
    };
  } 
  
  if (hoursUntilBooking > 2 && hoursUntilBooking < 24) {
    return {
      refundAmount: totalPaid * 0.5, // 50% refund
      refundStatus: 'APPROVED_PARTIAL',
      message: "50% refund approved. Canceled within 24 hours."
    };
  }

  // Under 2 hours or no-show
  return {
    refundAmount: 0,
    refundStatus: 'DENIED',
    message: "No refund available for cancellations under 2 hours."
  };
}