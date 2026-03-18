import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { TrustSection } from "@/components/marketing/TrustSection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { CTASection } from "@/components/marketing/CTASection";
// 🚨 Notice the Navbar import is gone!

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* 🚨 Notice the <Navbar /> tag is deleted from here! */}
      
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Simple Footer */}
      <footer className="bg-stone-900 py-12 text-center border-t border-stone-800">
        <p className="text-stone-500 text-sm font-bold tracking-wider uppercase">
          © {new Date().getFullYear()} Platform. Non-medical support only.
        </p>
      </footer>
    </div>
  );
}