"use client";

import { useState } from "react";
import { AppHeader } from "@/components/shared/AppHeader";
import { helperRequests, openRequests, categories } from "@/data/dummy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, SlidersHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { OpenRequestCard } from "@/components/shared/OpenRequestCard";

export default function HelperRequests() {
  const [activeTab, setActiveTab] = useState<"market" | "direct">("market");

  return (
    <main className="flex-1 flex flex-col bg-stone-50">
      <AppHeader title="Marketplace" showBack={false} />

      {/* Tabs */}
      <div className="px-5 py-4 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 sticky top-[calc(64px+env(safe-area-inset-top))] z-30">
        <div className="flex gap-2 bg-stone-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab("market")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "market" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
          >
            Open Market
          </button>
          <button 
            onClick={() => setActiveTab("direct")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === "direct" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
          >
            Direct Requests
          </button>
        </div>

        {activeTab === "market" && (
          <div className="flex gap-2.5 mt-4 overflow-x-auto hide-scrollbar pb-1">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 text-white text-sm font-medium shrink-0">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            {['All Districts', 'Today', 'High Paying', 'English'].map((filter) => (
              <button key={filter} className="px-5 py-2 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium whitespace-nowrap hover:bg-stone-50 transition-colors">
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-[calc(112px+env(safe-area-inset-bottom))]">
        {activeTab === "market" ? (
          openRequests.map((req) => (
            <OpenRequestCard key={req.id} request={req} />
          ))
        ) : (
          helperRequests.map((req) => {
            const category = categories.find((c) => c.id === req.serviceId);
            const isAccepted = req.status === "accepted";

            return (
              <Card
                key={req.id}
                className="border-stone-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden bg-white"
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
                          {category?.title || "Support"}
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
                      <span>
                        {new Date(req.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(req.date).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-stone-600 font-medium">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                      <span className="truncate">{req.location}</span>
                    </div>
                  </div>

                  {req.notes && (
                    <div className="mt-5 p-4 bg-stone-50/80 rounded-[16px] border border-stone-100/50">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                        Client Notes
                      </p>
                      <p className="text-sm text-stone-700 leading-relaxed italic">
                        "{req.notes}"
                      </p>
                    </div>
                  )}
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
                      <Button className="flex-1 rounded-full h-12 shadow-lg shadow-teal-900/20">Accept Request</Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </main>
  );
}
