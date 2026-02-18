import LeadCaptureForm from "@/app/components/LeadCaptureForm";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { getServiceBySlug, getServices } from "@/lib/repository";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((item: any) => ({ slug: item.slug }));
}

// Per-service accent images (multiple curated shots per service)
const SERVICE_META: Record<string, {
  icon: string;
  tagline: string;
  whyUs: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
}> = {
  "modular-kitchen": {
    icon: "🍳",
    tagline: "Cook in style. Every day.",
    whyUs: [
      { icon: "🔧", title: "Precision Engineering", desc: "Every cabinet is built to the millimeter with BWR plywood and soft-close hardware." },
      { icon: "🎨", title: "100+ Finish Options", desc: "Acrylic, matte, gloss, textured — choose from over 100 shutter finishes." },
      { icon: "📦", title: "Smart Storage", desc: "Pull-out baskets, corner units, and tall storage to maximize every inch." },
      { icon: "⚡", title: "15-Day Installation", desc: "Your modular kitchen installed and ready in just 15 working days." },
    ],
    faq: [
      { q: "How long does a modular kitchen take?", a: "Typically 15–20 working days from design approval to installation." },
      { q: "What is the warranty on the kitchen?", a: "We offer a 10-year warranty on the cabinet structure and 1-year on hardware." },
      { q: "Can I customize the layout?", a: "Absolutely! We design every kitchen from scratch based on your space and needs." },
    ],
  },
  "wardrobe-design": {
    icon: "👔",
    tagline: "Organized living. Elegant spaces.",
    whyUs: [
      { icon: "📐", title: "Floor-to-Ceiling Design", desc: "Maximize vertical space with custom floor-to-ceiling wardrobe solutions." },
      { icon: "💡", title: "LED Interior Lighting", desc: "Integrated LED strips inside every wardrobe for easy visibility." },
      { icon: "🔒", title: "Soft-Close Mechanisms", desc: "Premium soft-close hinges and drawer slides for a luxury feel." },
      { icon: "🪞", title: "Mirror Integration", desc: "Full-length mirrors, glass shutters, and custom panel options." },
    ],
    faq: [
      { q: "What types of wardrobes do you make?", a: "Sliding, hinged, walk-in, and loft wardrobes — all fully customized." },
      { q: "How much does a wardrobe cost?", a: "Starts from ₹1.2L depending on size, material, and finish." },
      { q: "Do you provide installation?", a: "Yes, our team handles complete installation with a clean finish." },
    ],
  },
  "living-room-design": {
    icon: "🛋️",
    tagline: "Where family moments happen.",
    whyUs: [
      { icon: "📺", title: "TV Unit Design", desc: "Custom TV units with hidden wire management and ambient backlighting." },
      { icon: "✨", title: "False Ceiling & Lighting", desc: "Layered lighting design with coves, spots, and pendant fixtures." },
      { icon: "🎨", title: "Feature Walls", desc: "Fluted panels, stone cladding, wallpaper, and textured paint options." },
      { icon: "🛋️", title: "Furniture Planning", desc: "Space planning with sofa, coffee table, and storage layout." },
    ],
    faq: [
      { q: "What styles do you offer for living rooms?", a: "Modern, minimal, luxury, contemporary, and classic — all fully customizable." },
      { q: "Do you supply furniture too?", a: "Yes, we can source and supply furniture as part of the complete package." },
      { q: "How long does a living room design take?", a: "Typically 10–15 working days for execution after design approval." },
    ],
  },
  "bedroom-design": {
    icon: "🛏️",
    tagline: "Your personal sanctuary.",
    whyUs: [
      { icon: "🛏️", title: "Bed with Storage", desc: "Hydraulic beds and box storage to maximize your bedroom space." },
      { icon: "💡", title: "Ambient Lighting", desc: "Layered lighting with cove lights, bedside lamps, and reading lights." },
      { icon: "🎨", title: "Wallpaper & Textures", desc: "Headboard walls with wallpaper, textured paint, or veneer panels." },
      { icon: "📚", title: "Study Nook", desc: "Integrated study desks and bookshelves for kids and teen bedrooms." },
    ],
    faq: [
      { q: "Do you design kids' bedrooms?", a: "Yes! We specialize in master, guest, kids, and teen bedroom designs." },
      { q: "Can you match my existing furniture?", a: "Absolutely — we design around your existing pieces for a cohesive look." },
      { q: "What is the starting price for a bedroom?", a: "Bedroom design starts from ₹1.6L including wardrobe and false ceiling." },
    ],
  },
  "full-home-interior": {
    icon: "🏠",
    tagline: "Your dream home, delivered.",
    whyUs: [
      { icon: "📋", title: "End-to-End Management", desc: "One point of contact from design to delivery — no coordination headaches." },
      { icon: "🎯", title: "45-Day Delivery", desc: "Guaranteed move-in ready in 45 days or we pay a penalty." },
      { icon: "🏆", title: "10-Year Warranty", desc: "Industry-leading warranty on all materials and workmanship." },
      { icon: "🖥️", title: "3D Visualization", desc: "See your entire home in photorealistic 3D before a single nail is hammered." },
    ],
    faq: [
      { q: "What does full home interior include?", a: "Kitchen, all bedrooms, living room, bathrooms, false ceilings, and all woodwork." },
      { q: "How do you ensure quality?", a: "50+ quality checkpoints at every stage with a dedicated site supervisor." },
      { q: "What is the starting price for a 2BHK?", a: "Full home interiors for a 2BHK start from ₹6.8L depending on specifications." },
    ],
  },
  "office-interiors": {
    icon: "🏢",
    tagline: "Spaces that inspire great work.",
    whyUs: [
      { icon: "💼", title: "Brand-Aligned Design", desc: "We design offices that reflect your brand identity and culture." },
      { icon: "🔇", title: "Acoustic Solutions", desc: "Soundproof meeting rooms and focus zones for productive work." },
      { icon: "⚡", title: "Fast Turnaround", desc: "Minimal business disruption with phased execution and weekend work." },
      { icon: "🌿", title: "Biophilic Elements", desc: "Green walls, natural light optimization, and wellness-focused design." },
    ],
    faq: [
      { q: "Do you design co-working spaces?", a: "Yes — corporate offices, co-working spaces, clinics, salons, and retail stores." },
      { q: "How long does an office interior take?", a: "Typically 3–6 weeks depending on the size and complexity of the project." },
      { q: "What is the starting price for office interiors?", a: "Office interiors start from ₹8L for a 1000 sq.ft space." },
    ],
  },
};

const DEFAULT_META = {
  icon: "🏠",
  tagline: "Premium design, delivered.",
  whyUs: [
    { icon: "🏆", title: "Expert Designers", desc: "Certified designers with 10+ years of experience." },
    { icon: "✅", title: "Quality Assured", desc: "50+ quality checkpoints at every stage." },
    { icon: "⚡", title: "45-Day Delivery", desc: "On-time delivery guaranteed." },
    { icon: "💰", title: "Transparent Pricing", desc: "No hidden costs, fixed quotes." },
  ],
  faq: [
    { q: "How do I get started?", a: "Fill the form or call us for a free consultation and site visit." },
    { q: "Do you provide a warranty?", a: "Yes, we offer a 10-year warranty on all our work." },
  ],
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const meta = SERVICE_META[slug] || DEFAULT_META;
  const gallery: string[] = service.gallery || [];

  return (
    <>
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[70vh] flex items-end bg-[#0f0f1a] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/80 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto px-4 pb-16 pt-32">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{meta.icon}</span>
                <span className="px-4 py-1.5 bg-[#e75f52]/15 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full">
                  Our Service
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
                {service.title}
              </h1>
              <p className="text-white/60 text-xl mb-2">{meta.tagline}</p>
              <p className="text-white/50 text-lg max-w-2xl">{service.summary}</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="px-5 py-2.5 bg-white/8 border border-white/15 rounded-xl text-white text-sm font-semibold">
                  💰 {service.priceRange}
                </div>
                <div className="px-5 py-2.5 bg-white/8 border border-white/15 rounded-xl text-white text-sm font-semibold">
                  🛡️ 10-Year Warranty
                </div>
                <div className="px-5 py-2.5 bg-white/8 border border-white/15 rounded-xl text-white text-sm font-semibold">
                  ⚡ 45-Day Delivery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAIN CONTENT + FORM ─── */}
        <section className="py-16 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left: Content */}
              <div className="lg:col-span-2 space-y-10">

                {/* Gallery */}
                {gallery.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-5">
                      Our <span className="text-[#e75f52]">{service.title}</span> Work
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {gallery.map((img: string, i: number) => (
                        <div
                          key={i}
                          className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${i === 0 ? "col-span-2 aspect-[16/7]" : "aspect-square"}`}
                        >
                          <img
                            src={img}
                            alt={`${service.title} design ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Types & Materials */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#e75f52]/10 flex items-center justify-center text-[#e75f52] text-sm">✓</span>
                      Types We Offer
                    </h3>
                    <ul className="space-y-2.5">
                      {service.types?.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2.5 text-gray-600 text-sm">
                          <div className="w-5 h-5 rounded-full bg-[#e75f52]/10 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-[#e75f52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] text-sm">★</span>
                      Materials & Finishes
                    </h3>
                    <ul className="space-y-2.5">
                      {service.materials?.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2.5 text-gray-600 text-sm">
                          <div className="w-5 h-5 rounded-full bg-[#C5A059]/10 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Features */}
                {service.features && (
                  <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-2xl p-6">
                    <h3 className="font-bold text-white text-lg mb-5">What's Included</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {service.features.map((feat: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                          <div className="w-4 h-4 rounded-full bg-[#e75f52]/20 flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-[#e75f52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/70 text-xs font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Block */}
                <div className="bg-white rounded-2xl p-6 border-2 border-[#e75f52]/20 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium mb-1">Estimated Price Range</p>
                      <p className="text-4xl font-bold text-[#e75f52]">{service.priceRange}</p>
                      <p className="text-gray-400 text-xs mt-1.5">* Varies based on dimensions, materials & specifications</p>
                    </div>
                    <Link href="/interior-cost-calculator">
                      <button className="px-6 py-3 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold rounded-xl shadow-lg shadow-[#e75f52]/25 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                        Calculate My Budget →
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Why Us */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    Why Choose A2Z for <span className="text-[#e75f52]">{service.title}?</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {meta.whyUs.map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#e75f52]/20 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-[#e75f52]/10 flex items-center justify-center text-xl mb-3">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1.5">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {meta.faq.map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                          <span className="text-[#e75f52] shrink-0">Q.</span>
                          {item.q}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed pl-5">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Sticky Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  <LeadCaptureForm />
                  {/* Direct call */}
                  <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-2xl p-5 text-center">
                    <p className="text-white/50 text-xs mb-2">Or call us directly</p>
                    <a href="tel:+918375852594" className="text-white font-bold text-xl hover:text-[#e75f52] transition-colors block">
                      +91 83758 52594
                    </a>
                    <p className="text-white/30 text-xs mt-1">Mon–Sat, 10am–7pm</p>
                    <a
                      href="https://wa.me/918375852594"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-semibold hover:bg-green-500/20 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── OTHER SERVICES ─── */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Services</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "🍳 Modular Kitchen", href: "/services/modular-kitchen" },
                { label: "👔 Wardrobe Design", href: "/services/wardrobe-design" },
                { label: "🛋️ Living Room", href: "/services/living-room-design" },
                { label: "🛏️ Bedroom Design", href: "/services/bedroom-design" },
                { label: "🏠 Full Home Interiors", href: "/services/full-home-interior" },
                { label: "🏢 Office Interiors", href: "/services/office-interiors" },
              ].filter(s => !s.href.includes(slug)).map((s) => (
                <Link key={s.href} href={s.href}>
                  <span className="px-5 py-2.5 bg-[#faf8f6] border border-gray-200 rounded-xl text-gray-700 text-sm font-semibold hover:border-[#e75f52] hover:text-[#e75f52] hover:bg-[#e75f52]/5 transition-all duration-200 cursor-pointer">
                    {s.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Buttons */}
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
