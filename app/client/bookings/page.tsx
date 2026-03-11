import { AppHeader } from "@/components/shared/AppHeader";
import { clientBookings, helpers, categories } from "@/data/dummy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ClientBookings() {
  return (
    <main className="flex-1 flex flex-col bg-stone-50">
      <AppHeader title="My Bookings" showBack={false} />

      {/* Tabs */}
      <div className="px-5 py-4 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 sticky top-[calc(64px+env(safe-area-inset-top))] z-30">
        <div className="flex gap-2 bg-stone-100 p-1 rounded-2xl">
          <button className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white text-stone-900 shadow-sm transition-all">
            Upcoming
          </button>
          <button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-stone-500 hover:text-stone-700 transition-all">
            Past
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-[calc(112px+env(safe-area-inset-bottom))]">
        {clientBookings.map((booking) => {
          const helper = helpers.find((h) => h.id === booking.helperId);
          const category = categories.find((c) => c.id === booking.serviceId);

          if (!helper || !category) return null;

          const isUpcoming = booking.status === "upcoming";
          const isPending = booking.status === "pending";
          const isCompleted = booking.status === "completed";
          const isCancelled = booking.status === "cancelled";

          let statusBadgeClass = "bg-stone-100 text-stone-600";
          let statusText = "Completed";

          if (isUpcoming) {
            statusBadgeClass = "bg-teal-100 text-teal-800";
            statusText = "Confirmed";
          } else if (isPending) {
            statusBadgeClass = "bg-amber-100 text-amber-800";
            statusText = "Pending";
          } else if (isCancelled) {
            statusBadgeClass = "bg-rose-100 text-rose-800";
            statusText = "Cancelled";
          }

          return (
            <Card
              key={booking.id}
              className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden bg-white"
            >
              <div className="p-5 border-b border-stone-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-[16px] overflow-hidden shrink-0 shadow-sm">
                      <Image
                        src={helper.photo}
                        alt={helper.firstName}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 text-lg">
                        {helper.firstName} {helper.lastName}
                      </h4>
                      <p className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-1">
                        {category.title}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadgeClass}`}
                  >
                    {statusText}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm text-stone-600 font-medium">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(booking.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-stone-600 font-medium">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{booking.durationHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-stone-600 font-medium">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>
              </div>
              <div className="bg-stone-50/50 p-5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-0.5">Total</span>
                  <span className="font-display font-semibold text-stone-900 text-xl">
                    €{booking.totalPrice}
                  </span>
                </div>
                <Button variant="outline" className="bg-white rounded-full h-10 px-5 text-sm border-stone-200">
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
