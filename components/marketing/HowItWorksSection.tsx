export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-stone-900 text-center mb-16">How it works</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Clients */}
          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
            <div className="w-12 h-12 bg-stone-900 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6">1</div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">For Clients</h3>
            <p className="text-stone-600 leading-relaxed">
              Create a request or browse helpers, book the support you need, and stay coordinated safely in the app.
            </p>
          </div>

          {/* For Helpers */}
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6">2</div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">For Helpers</h3>
            <p className="text-emerald-800 leading-relaxed">
              Build your profile, complete verification, browse local requests, and earn through completed bookings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
