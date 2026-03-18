"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Calendar,
  MessageSquare,
  User,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  role: "client" | "helper";
}

export function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();

  const clientTabs = [
    { name: "Home", href: "/client", icon: Home },
    { name: "Search", href: "/client/search", icon: Search },
    { name: "Bookings", href: "/client/bookings", icon: Calendar },
    { name: "Messages", href: "/client/messages", icon: MessageSquare },
    { name: "Profile", href: "/client/profile", icon: User },
  ];

  const helperTabs = [
    { name: "Dashboard", href: "/helper", icon: Home },
    { name: "Requests", href: "/helper/requests", icon: Briefcase },
    { name: "Calendar", href: "/helper/calendar", icon: Calendar },
    { name: "Messages", href: "/helper/messages", icon: MessageSquare },
    { name: "Profile", href: "/helper/profile", icon: User },
  ];

  const tabs = role === "client" ? clientTabs : helperTabs;

  return (
    <>
      {/* 🚨 Changed 'absolute' to 'fixed left-0' so it sticks to the glass! */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl border-t border-stone-200/50 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (pathname.startsWith(tab.href) &&
              tab.href !== "/client" &&
              tab.href !== "/helper");
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-12 gap-1 transition-all",
                isActive
                  ? "text-teal-900"
                  : "text-stone-400 hover:text-stone-600",
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-10 h-8 rounded-full transition-all", 
                isActive ? "bg-teal-100/50" : "bg-transparent"
              )}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all", 
                isActive ? "font-semibold" : ""
              )}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
      </nav>
    </>
  );
}