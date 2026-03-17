'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 🚦 THE TRAFFIC CONTROLLER
    if (status === "authenticated" && session?.user) {
      // @ts-ignore - We know role exists because we added it to the session!
      const role = session.user.role;

      if (role === "CLIENT") {
        router.push("/client/dashboard");
      } else if (role === "HELPER") {
        router.push("/helper/dashboard");
      } else if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        // If they genuinely have no role yet, send to onboarding
        router.push("/onboarding");
      }
    }
  }, [session, status, router]);

  // While checking the session, show a clean loading state
  if (status === "loading") {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-stone-200 rounded-xl mb-4"></div>
          <p className="text-stone-400 font-bold">Verifying access...</p>
        </div>
      </main>
    );
  }

  // If NOT logged in, show a basic landing page
  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center text-3xl font-black mb-6 shadow-lg">
          B.
        </div>
        <h1 className="text-4xl font-black text-stone-900 mb-4">Trusted Non-Medical Support</h1>
        <p className="text-stone-500 mb-8 max-w-md mx-auto text-lg">
          Connect with verified helpers in your area for everyday companionship and assistance.
        </p>
        <Link href="/auth/login" className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-md">
          Sign In to Platform
        </Link>
      </main>
    );
  }

  return null;
}