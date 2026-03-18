import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { TrustSection } from "@/components/marketing/TrustSection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { CTASection } from "@/components/marketing/CTASection";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* 🚨 Navbar is handled by the root layout, so we don't add it here! */}
      
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Simple Footer */}
      <footer className="bg-stone-900 py-16 text-center border-t border-stone-800">
        <div className="max-w-xs mx-auto space-y-4">
          {!session && (
            <Link href="/waitlist" className="text-stone-400 hover:text-white text-sm font-bold block transition-colors">
              Join the Berlin Waitlist →
            </Link>
          )}
          <p className="text-stone-600 text-[10px] font-black tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Platform • Non-medical only
          </p>
        </div>
      </footer>
    </div>
  );
}