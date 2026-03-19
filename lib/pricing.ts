const PLATFORM_FEE_PERCENTAGE = 0.15;

export function calculateBookingPrice(hourlyRate: number, durationHours: number = 1) {
  const helperSubtotal = hourlyRate * durationHours;
  const platformFee = helperSubtotal * PLATFORM_FEE_PERCENTAGE;
  const totalWeight = helperSubtotal + platformFee;

  return {
    helperSubtotal: Math.round(helperSubtotal * 100) / 100,
    platformFee: Math.round(platformFee * 100) / 100,
    totalPrice: Math.round(totalWeight * 100) / 100,
    currency: "EUR"
  };
}