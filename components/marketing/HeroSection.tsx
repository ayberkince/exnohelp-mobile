import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function HeroSection() {
  // 1. Check if the user visiting the homepage is already logged in
  const session = await getServerSession(authOptions);
  // @ts-ignore - bypassing strict type check for role
  const role = session?.user?.role;

  return (
    <section className="bg-stone-50 pt-24 pb-16 px-6 border-b border-stone-200">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-tight">
          Trusted non-medical support around appointments and recovery moments
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Book calm, practical help when you need it — or earn flexible income by supporting others in a structured, trust-first way.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* 2. SMART BUTTONS: Change based on who is looking at the page! */}
          
          {!session && (
            <>
              <Link href="/register?role=CLIENT" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm w-full sm:w-auto">
                Get Support
              </Link>
              <Link href="/register?role=HELPER" className="px-8 py-4 bg-white text-stone-900 border border-stone-200 font-bold rounded-xl hover:bg-stone-50 transition-colors shadow-sm w-full sm:w-auto">
                Become a Helper
              </Link>
            </>
          )}

          {role === 'CLIENT' && (
            <Link href="/client/dashboard" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm w-full sm:w-auto">
              Go to My Dashboard →
            </Link>
          )}

          {role === 'HELPER' && (
            <Link href="/helper/dashboard" className="px-8 py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-sm w-full sm:w-auto">
              Go to Helper Dashboard →
            </Link>
          )}
        </div>

        <div className="pt-10 flex items-center justify-center gap-2 text-sm font-bold text-stone-500 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Non-medical support only • Verified helpers • In-platform booking
        </div>
      </div>
    </section>
  );
}