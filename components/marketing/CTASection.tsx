import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-emerald-600 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl font-black text-white tracking-tight">Start with calm, clear support</h2>
        <p className="text-emerald-100 text-lg">
          Whether you need help or want to help, the platform is designed to make the experience structured, trusted, and easy to understand.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/register?role=CLIENT" className="px-8 py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors w-full sm:w-auto">
            Find Support
          </Link>
          <Link href="/register?role=HELPER" className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-stone-50 transition-colors w-full sm:w-auto">
            Join as Helper
          </Link>
        </div>
      </div>
    </section>
  );
}
