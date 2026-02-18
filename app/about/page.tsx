import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import Link from "next/link";

export const metadata = {
  title: "About Us | A2Z Creation",
  description: "Learn about our journey, vision, and the team behind beautiful interiors.",
};

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "4.9★", label: "Average Rating" },
  { value: "45", label: "Days Delivery" },
];

const WHY_US = [
  { icon: "🏆", title: "Expert Designers", desc: "Certified interior designers with 10+ years of experience in luxury residential and commercial spaces." },
  { icon: "✅", title: "Quality Assurance", desc: "50+ quality checkpoints at every stage of execution to ensure flawless delivery." },
  { icon: "⚡", title: "45-Day Delivery", desc: "Guaranteed move-in ready in 45 days or we pay a penalty. No delays, no excuses." },
  { icon: "💰", title: "Transparent Pricing", desc: "No hidden costs. Fixed quotes with detailed breakdowns before any work begins." },
  { icon: "🛡️", title: "10-Year Warranty", desc: "Industry-leading warranty on all materials and workmanship for complete peace of mind." },
  { icon: "🎨", title: "3D Visualization", desc: "See your home before it's built with photorealistic 3D renders and walkthroughs." },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative py-28 bg-[#0f0f1a] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop"
              alt="A2Z Creation Studio"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a] via-[#0f0f1a]/90 to-[#0f0f1a]/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-[#e75f52]/15 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Our Story
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Designing Dreams,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">
                  Delivering Reality.
                </span>
              </h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
                A2Z Creation was founded with a simple mission: to make premium interior design accessible, transparent, and hassle-free for every Indian family.
              </p>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl font-bold text-[#e75f52] mb-1">{s.value}</p>
                  <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MISSION ─── */}
        <section className="py-24 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop"
                    alt="Our design studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                  <p className="text-3xl font-bold text-[#e75f52]">10+</p>
                  <p className="text-gray-500 text-sm font-medium">Years of Excellence</p>
                </div>
              </div>
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full">
                  Our Mission
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Transforming Spaces,<br />
                  <span className="text-[#e75f52]">Enriching Lives</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  We believe that a beautiful home is not a luxury — it's a right. Our team of expert designers, skilled craftsmen, and dedicated project managers work together to bring your vision to life within your budget and timeline.
                </p>
                <p className="text-gray-500 text-lg leading-relaxed">
                  From the first consultation to the final handover, we are with you every step of the way — ensuring quality, transparency, and a stress-free experience.
                </p>
                <Link href="/contact">
                  <button className="mt-2 px-8 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold rounded-2xl shadow-lg shadow-[#e75f52]/25 hover:-translate-y-0.5 transition-all duration-300">
                    Start Your Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US ─── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Why A2Z?
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The A2Z <span className="text-[#e75f52]">Difference</span>
              </h2>
              <p className="text-gray-500 text-lg">What sets us apart from every other interior design firm.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#faf8f6] border border-gray-100 hover:shadow-lg hover:border-[#e75f52]/20 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-[#e75f52]/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#e75f52]/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOUNDER ─── */}
        <section className="py-24 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e75f52]/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 bg-[#C5A059]/15 text-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-full">
                  From the Founder
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  A Note from <span className="text-[#e75f52]">Our Founder</span>
                </h2>
                <blockquote className="text-xl text-white/70 leading-relaxed border-l-4 border-[#e75f52] pl-6 italic">
                  "We believe that every home has a story to tell. Our job is to help you write it with colors, textures, and spaces that reflect who you truly are. At A2Z Creation, we don't just design homes — we craft experiences."
                </blockquote>
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-12 h-12 rounded-full bg-[#e75f52]/20 border-2 border-[#e75f52]/30 flex items-center justify-center text-[#e75f52] font-bold text-lg">
                    A
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Adil Khan</p>
                    <p className="text-white/40 text-sm">Founder & Principal Designer</p>
                  </div>
                </div>
                <a href="tel:+918375852594">
                  <button className="mt-2 px-8 py-4 bg-white/8 border border-white/15 text-white font-bold rounded-2xl hover:bg-white/15 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call: +91 83758 52594
                  </button>
                </a>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-2xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop&crop=face"
                    alt="Founder Adil Khan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#e75f52] rounded-2xl p-4 shadow-xl">
                  <p className="text-white font-bold text-sm">10+ Years</p>
                  <p className="text-white/70 text-xs">of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 bg-[#faf8f6]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Work <span className="text-[#e75f52]">Together?</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Let's create something extraordinary for your home. Get a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-10 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#e75f52]/25 hover:-translate-y-0.5 transition-all duration-300">
                  Get Free Consultation
                </button>
              </Link>
              <Link href="/projects">
                <button className="px-10 py-4 border-2 border-gray-200 text-gray-700 font-bold text-base rounded-2xl hover:border-[#e75f52] hover:text-[#e75f52] transition-all duration-300">
                  View Our Work
                </button>
              </Link>
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
