export function FAQSection() {
  const faqs = [
    { q: "What kind of support can I book?", a: "You can book non-medical support such as accompaniment to appointments, waiting support, return-home accompaniment, and light practical help." },
    { q: "Is this medical care?", a: "No. This platform provides non-medical support only. Helpers cannot diagnose or treat." },
    { q: "How do I know who I am booking?", a: "Helper profiles include trust-oriented information like reviews, verified IDs, and service categories." },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-stone-900 text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-stone-50 rounded-2xl border border-stone-200">
              <h4 className="font-bold text-stone-900 mb-2">{faq.q}</h4>
              <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
