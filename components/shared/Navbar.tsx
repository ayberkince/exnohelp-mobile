'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated" || status === "loading") {
    return null; // Hide the nav if they aren't logged in
  }

  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-stone-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
            B.
          </div>
          <span className="font-bold text-stone-900 tracking-tight text-lg">Platform</span>
        </Link>

        {/* 🚨 RIGHT SIDE CONTAINER (Links + Controls) 🚨 */}
        <div className="flex items-center gap-8">
          
          {/* Role-Specific Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {(session?.user as any)?.role === "CLIENT" && (
              <>
                <Link href="/client/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">
                  Dashboard
                </Link>
                <Link href="/client/helpers" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">
                  Find a Helper
                </Link>
              </>
            )}
            
            {(session?.user as any)?.role === "HELPER" && (
              <>
                <Link href="/helper/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">
                  Dashboard
                </Link>
                <Link href="/helper/requests" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">
                  Find Requests
                </Link>
              </>
            )}

            {(session?.user as any)?.role === "ADMIN" && (
              <Link href="/admin/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900 transition-colors">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4 border-l border-stone-200 pl-8">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-stone-900">{session?.user?.name}</p>
              {/* @ts-ignore */}
              <p className="text-xs text-stone-500">{session?.user?.role} ACCOUNT</p>
            </div>
            
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold border-2 border-emerald-200">
              {session?.user?.name?.charAt(0) || "U"}
            </div>

            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="ml-2 px-4 py-2 bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 text-sm font-bold rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}