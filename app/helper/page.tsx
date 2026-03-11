import { AppHeader } from "@/components/shared/AppHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { helperRequests, openRequests } from "@/data/dummy";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { OpenRequestCard } from "@/components/shared/OpenRequestCard";

export default function HelperDashboard() {
  return (
    <main className="flex-1 overflow-y-auto bg-stone-50 pb-[calc(80px+env(safe-area-inset-bottom))]">
      <AppHeader title="Dashboard" showBack={false} />

      <div className="p-5 space-y-8">
        {/* Status Banner */}
        <section>
          <div className="bg-emerald-50/80 border border-emerald-100/50 rounded-[24px] p-5 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900">
                  Profile Verified
                </h3>
                <p className="text-sm text-emerald-800/80 mt-0.5">
                  You are ready to accept requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Earnings Summary */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-display font-medium text-stone-800">This Week</h3>
            <Link
              href="/helper/earnings"
              className="text-sm text-teal-800 font-medium flex items-center hover:text-teal-900 transition-colors"
            >
              Details <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <CardContent className="p-5">
                <p className="text-sm text-stone-500 font-medium uppercase tracking-wider mb-1">Earnings</p>
                <p className="text-3xl font-display font-medium text-stone-800">
                  €157.50
                </p>
              </CardContent>
            </Card>
            <Card className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <CardContent className="p-5">
                <p className="text-sm text-stone-500 font-medium uppercase tracking-wider mb-1">Completed</p>
                <p className="text-3xl font-display font-medium text-stone-800">
                  4
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recommended Open Requests */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-display font-medium text-stone-800">
              Recommended for You
            </h3>
            <Link
              href="/helper/requests"
              className="text-sm text-teal-800 font-medium flex items-center hover:text-teal-900 transition-colors"
            >
              Marketplace <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-5 pb-6 -mx-5 px-5 snap-x hide-scrollbar">
            {openRequests.map((req) => (
              <div key={req.id} className="snap-start shrink-0 w-[300px]">
                <OpenRequestCard request={req} />
              </div>
            ))}
          </div>
        </section>

        {/* Direct Requests */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-display font-medium text-stone-800">
              Direct Requests
            </h3>
            <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full">
              {helperRequests.length}
            </span>
          </div>

          <div className="space-y-4">
            {helperRequests.map((req) => {
              const isAccepted = req.status === "accepted";
              return (
              <Card
                key={req.id}
                className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden"
              >
                <div className="p-5 border-b border-stone-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-[16px] overflow-hidden shrink-0 shadow-sm">
                        <Image
                          src={req.clientPhoto}
                          alt={req.clientName}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-800 text-lg">
                          {req.clientName}
                        </h4>
                        <p className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-1">
                          Needs Accompaniment
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-semibold text-stone-800 text-xl">
                        €{req.totalPrice}
                      </p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${isAccepted ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>
                        {isAccepted ? 'ACCEPTED' : 'PENDING'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-sm text-stone-600 font-medium">
                      <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                      <span>{new Date(req.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}, {new Date(req.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-stone-600 font-medium">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                      <span className="truncate">{req.location}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-stone-50/50 p-5 flex gap-3">
                  {isAccepted ? (
                    <Button className="w-full rounded-full h-12 shadow-sm" variant="secondary">
                      View Booking Details
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1 bg-white border-stone-200 rounded-full h-12">
                        Decline
                      </Button>
                      <Button className="flex-1 rounded-full h-12 shadow-lg shadow-teal-900/20">Accept</Button>
                    </>
                  )}
                </div>
              </Card>
            )})}
          </div>
        </section>

        {/* Safety Reminder */}
        <section className="pt-2 pb-6">
          <Card className="bg-stone-900 border-none text-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
            <CardContent className="p-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-lg">Strict Boundaries Apply</h4>
                <p className="text-sm text-stone-300 mt-1.5 leading-relaxed">
                  You are providing <strong className="text-white">non-medical support only</strong>. You must never offer medical advice, administer medication, or perform physical nursing care. Violations result in immediate removal.
                </p>
                <Link
                  href="/trust-safety"
                  className="text-sm text-rose-400 font-medium mt-4 inline-flex items-center hover:text-rose-300 transition-colors"
                >
                  Review Safety Guidelines <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
