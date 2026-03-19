// Add these to your imports
import { SupportRequest, HelperProfile, User } from "@prisma/client";

type BookingSummaryProps = {
  // Pass the actual database objects
  request: SupportRequest;
  helper: HelperProfile & { user: User }; 
  onConfirm: () => void; // Add a handler for the "Confirm" button
  isLoading?: boolean;
};

export function BookingSummaryCard({
  request,
  helper,
  onConfirm,
  isLoading
}: BookingSummaryProps) {
  // Extract data directly from the source of truth
  const price = request.offered_total_price ?? 0;
  const helperName = helper.user.name ?? "Helper";

  return (
    // ... your existing (beautiful) UI code ...
    <button 
      onClick={onConfirm}
      disabled={isLoading}
      className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold"
    >
      {isLoading ? "Processing..." : "I Understand & Confirm Booking"}
    </button>
  );
}