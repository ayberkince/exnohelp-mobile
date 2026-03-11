import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, HeartHandshake } from "lucide-react";

export default function SplashPage() {
  return (
    <main className="flex-1 flex flex-col bg-stone-50 p-6 relative overflow-hidden pb-[calc(32px+env(safe-area-inset-bottom))]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-stone-100 to-transparent pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-32 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 relative z-10 mt-10">
        <div className="w-24 h-24 bg-teal-900 rounded-[32px] flex items-center justify-center shadow-[0_8px_30px_rgba(13,148,136,0.2)] mb-2">
          <HeartHandshake className="w-12 h-12 text-white" />
        </div>

        <div className="space-y-5">
          <h1 className="text-5xl font-display font-medium text-stone-900 tracking-tight">
            Begleit
          </h1>
          <p className="text-lg text-stone-500 max-w-[280px] mx-auto leading-relaxed">
            Trusted non-medical support for your appointments in Berlin.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-stone-200/50 rounded-[24px] p-5 flex items-start gap-4 text-left max-w-sm shadow-[0_4px_24px_rgba(0,0,0,0.02)] mt-8">
          <div className="bg-emerald-50 p-2.5 rounded-full shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            <strong className="text-stone-900 font-medium">
              Safe & Verified.
            </strong>{" "}
            All helpers undergo ID checks and agree to strict non-medical boundaries.
          </p>
        </div>
      </div>

      <div className="space-y-4 pb-8 w-full max-w-sm mx-auto relative z-10">
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest text-center mb-6">
            How would you like to use Begleit?
          </h2>

          <Button asChild className="w-full h-14 text-lg rounded-full shadow-lg shadow-teal-900/10">
            <Link href="/client">I need support</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-14 text-lg rounded-full bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
          >
            <Link href="/helper">I want to help</Link>
          </Button>
        </div>

        <p className="text-xs text-center text-stone-400 pt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
