// lib/pricing.ts

const PLATFORM_FEE_PERCENTAGE = 0.15; // Exnohelp takes 15%

export function calculateBookingPrice(helperHourlyRate: number, durationHours: number) {
  // 1. What the Helper earns
  const helperAmount = helperHourlyRate * durationHours;
  
  // 2. What the Platform earns
  const platformFee = helperAmount * PLATFORM_FEE_PERCENTAGE;
  
  // 3. What the Client pays
  const totalAmount = helperAmount + platformFee;

  return {
    helperAmount,
    platformFee,
    totalAmount
  };
}