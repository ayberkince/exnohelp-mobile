import Link from "next/link";

type BookingSummaryProps = {
  helperName: string;
  category: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  price: number;
};

export function BookingSummaryCard({
  helperName,
  category,
  date,
  time,
  location,
  duration,
  price,
}: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 p-6 text-white">
        <h2 className="text-xl font-bold">Review your booking</h2>
        <p className="text-stone-300 text-sm mt-1">Check the details before confirming.</p>
      </div>

      {/* Details List */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between border-b border-stone-100 pb-4">
          <span className="text-stone-500">Helper</span>
          <span className="font-semibold text-stone-900">{helperName}</span>
        </div>
        <div className="flex justify-between border-b border-stone-100 pb-4">
          <span className="text-stone-500">Service</span>
          <span className="font-semibold text-stone-900">{category}</span>
        </div>
        <div className="flex justify-between border-b border-stone-100 pb-4">
          <span className="text-stone-500">Date & Time</span>
          <span className="font-semibold text-stone-900">{date} at {time}</span>
        </div>
        <div className="flex justify-between border-b border-stone-100 pb-4">
          <span className="text-stone-500">Location</span>
          <span className="font-semibold text-stone-900 text-right max-w-[200px]">{location}</span>
        </div>
        <div className="flex justify-between border-b border-stone-100 pb-4">
          <span className="text-stone-500">Duration</span>
          <span className="font-semibold text-stone-900">{duration}</span>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-bold text-stone-900">Total Price</span>
          <span className="text-2xl font-bold text-emerald-600">€{price.toFixed(2)}</span>
        </div>
      </div>

      {/* Safety Notice from Day 5 Rules */}
      <div className="bg-red-50 p-4 mx-6 mb-6 rounded-xl border border-red-100">
        <h4 className="font-bold text-red-900 text-sm mb-1">Safety Notice</h4>
        <p className="text-red-700 text-xs leading-relaxed">
          Helpers can accompany, wait with you, and support simple practical needs. 
          <strong> They cannot provide medical advice, treatment, or emergency care.</strong>
        </p>
      </div>
    </div>
  );
}