'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // 1. Hide the Navbar completely on registration/login screens
  if (pathname === '/login' || pathname === '/register') {
    return null; 
  }

  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-stone-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
            B.
          </div>
          <span className="font-bold text-stone-900 tracking-tight text-lg underline decoration-emerald-500 decoration-2 underline-offset-4">Platform</span>
        </Link>

        {/* 2. Logged In State */}
        {session && (
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {(session?.user as any)?.role === "CLIENT" && (
                <>
                  <Link href="/client/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">Dashboard</Link>
                  <Link href="/client/search" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">Find a Helper</Link>
                </>
              )}
              {(session?.user as any)?.role === "HELPER" && (
                <>
                  <Link href="/helper/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">Dashboard</Link>
                  <Link href="/helper/requests" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">Find Requests</Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 border-l border-stone-200 pl-8">
              <div className="text-right hidden sm:block">
                {/* 🚨 FIX: Fallback to name or email to avoid "undefined" */}
                <p className="text-sm font-bold text-stone-900">{session?.user?.name || "User"}</p>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mt-1">
                  {(session?.user as any)?.role} ACCOUNT
                </p>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 text-sm font-bold rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* 3. Logged Out State - Only show Sign In if not logged in */}
        {!session && status === "unauthenticated" && (
          <Link href="/login" className="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-xl hover:bg-stone-800 transition-colors">
            Sign In
          </Link>
        )}

      </div>
    </header>
  );
}