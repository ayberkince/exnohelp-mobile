'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 Required for path checking

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // 🚨 RULE 1: If we are on Register or Login, the Navbar is INVISIBLE
  if (pathname === '/login' || pathname === '/register') {
    return null; 
  }

  // 🚨 RULE 2: If we aren't logged in and on the homepage, keep it clean
  // (Optional: Hide if you want a totally empty header for guests)
  if (status === "unauthenticated" && pathname === '/') {
    // You can return a simpler "Public" navbar here if you prefer!
  }

  if (status === "loading") return null;

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

        {/* Links & Controls - Only show if session exists */}
        {session && (
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {(session?.user as any)?.role === "CLIENT" && (
                <>
                  <Link href="/client/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900">Dashboard</Link>
                  <Link href="/client/helpers" className="text-sm font-bold text-stone-500 hover:text-stone-900">Find a Helper</Link>
                </>
              )}
              {(session?.user as any)?.role === "HELPER" && (
                <>
                  <Link href="/helper/dashboard" className="text-sm font-bold text-stone-500 hover:text-stone-900">Dashboard</Link>
                  <Link href="/helper/requests" className="text-sm font-bold text-stone-500 hover:text-stone-900">Find Requests</Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 border-l border-stone-200 pl-8">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-stone-900">{session?.user?.name}</p>
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

        {/* If guest, show a simple Login button instead */}
        {!session && (
          <Link href="/login" className="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg">
            Sign In
          </Link>
        )}

      </div>
    </header>
  );
}