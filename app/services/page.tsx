import Link from "next/link";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { getServices } from "@/lib/repository";

export const metadata = {
  title: "Our Services | A2Z Creation",
  description: "Explore our premium interior design services for home and office.",
};

const SERVICE_IMAGES: Record<string, string> = {
  "modular-kitchen": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
  "bedroom": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop",
  "living-room": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop",
  "wardrobe-design": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
  "bathroom": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
  "office": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
  "full-home": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop",
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format&fit=crop",
];

export default async function ServicesPage() {
  let services: any[] = [];
  try { services = await getServices(); } catch { }

  return (
    <>
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative py-28 bg-[#0f0f1a] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80&auto=format&fit=crop"
              alt="Interior Services"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a] via-[#0f0f1a]/90 to-[#0f0f1a]/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 bg-[#e75f52]/15 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Expert Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Our Interior <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">Services</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              From modular kitchens to full home interiors — end-to-end design and execution with a 45-day delivery guarantee.
            </p>
          </div>
        </section>

        {/* ─── SERVICES GRID ─── */}
        <section className="py-24 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.length > 0 ? services.map((item: any, index: number) => (
                <Link href={`/services/${item.slug}`} key={item.slug} className="group block">
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={SERVICE_IMAGES[item.slug] || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#e75f52] font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col grow">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#e75f52] transition-colors">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 grow">{item.summary}</p>
                      <div className="flex items-center gap-1 text-[#e75f52] text-sm font-semibold mt-auto">
                        View Details
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : FALLBACK_IMAGES.map((img, index) => (
                <div key={index} className="rounded-2xl overflow-hidden bg-white shadow-sm h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img src={img} alt="Interior Service" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="h-4 bg-gray-100 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-50 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple <span className="text-[#e75f52]">4-Step Process</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", icon: "📞", title: "Book Consultation", desc: "Call us or fill the form for a free site visit." },
                { step: "02", icon: "🎨", title: "Meet Designer", desc: "Our expert visits your home and understands your vision." },
                { step: "03", icon: "🏠", title: "Approve 3D Design", desc: "Review photorealistic 3D renders before work begins." },
                { step: "04", icon: "🎉", title: "45-Day Handover", desc: "We execute with precision and deliver on time." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-[#e75f52]/8 border-2 border-[#e75f52]/15 flex flex-col items-center justify-center group-hover:border-[#e75f52] group-hover:bg-[#e75f52]/12 transition-all duration-300 mb-5">
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-[#e75f52] text-xs font-bold">{item.step}</span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Get a free consultation and customized quote for your home today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-10 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#e75f52]/25 hover:-translate-y-0.5 transition-all duration-300">
                  Get Free Quote
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
