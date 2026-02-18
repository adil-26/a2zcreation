import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import CalculatorStepper from "../components/CalculatorStepper";
import Link from "next/link";

export const metadata = {
  title: "Interior Cost Calculator | A2Z Creation",
  description: "Get an instant budget estimate for your home interiors. Free, no commitment.",
};

export default function CostCalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative py-20 bg-[#0f0f1a] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80&auto=format&fit=crop"
              alt="Interior Cost Calculator"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#0f0f1a]/90 to-[#0f0f1a]" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 bg-[#C5A059]/15 text-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Free Budget Tool
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Interior Cost <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">Calculator</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">
              Get an accurate budget estimate for your dream home in just 2 minutes. Completely free, no commitment required.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
              {["✅ 100% Free", "⚡ Instant Results", "🔒 No Spam", "📞 Expert Follow-up"].map((b) => (
                <span key={b} className="font-medium">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CALCULATOR ─── */}
        <section className="py-16 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <CalculatorStepper />
            </div>
          </div>
        </section>

        {/* ─── WHY CALCULATE ─── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Use Our <span className="text-[#e75f52]">Calculator?</span>
              </h2>
              <p className="text-gray-500 text-lg">Plan smarter, spend wiser.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: "🎯", title: "Accurate Estimates", desc: "Based on real project data from 500+ completed homes across Delhi NCR." },
                { icon: "⚡", title: "Instant Results", desc: "Get your budget range in under 2 minutes — no waiting, no forms to fill." },
                { icon: "💰", title: "Plan Your Budget", desc: "Know exactly what to expect before meeting a designer. No surprises." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#faf8f6] border border-gray-100 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-[#e75f52]/10 flex items-center justify-center text-3xl mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Talk to our design experts and get a detailed quote for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-10 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#e75f52]/25 hover:-translate-y-0.5 transition-all duration-300">
                  Book Free Consultation
                </button>
              </Link>
              <a href="tel:+918375852594">
                <button className="px-10 py-4 bg-white/8 border border-white/15 text-white font-bold text-base rounded-2xl hover:bg-white/15 transition-all duration-300">
                  Call: 83758 52594
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="https://wa.me/918375852594" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-2xl text-white shadow-xl shadow-green-500/40 hover:scale-110 transition-all duration-300">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        <a href="tel:+918375852594"
          className="flex items-center justify-center w-14 h-14 bg-[#e75f52] rounded-2xl text-white shadow-xl shadow-[#e75f52]/40 hover:scale-110 transition-all duration-300">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>
      <SiteFooter />
    </>
  );
}
