import LeadCaptureForm from "./components/LeadCaptureForm";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { getProjects, getServices } from "../lib/repository";
import Link from "next/link";

// Curated Unsplash photo IDs for reliable, beautiful interior images
const INTERIOR_IMAGES = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85&auto=format&fit=crop",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
  bedroom: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop",
  living: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop",
  wardrobe: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
  bathroom: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
  project1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80&auto=format&fit=crop",
  project2: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80&auto=format&fit=crop",
  project3: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80&auto=format&fit=crop",
  project4: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop",
  testimonial1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face",
  testimonial2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face",
  testimonial3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop&crop=face",
};

const SERVICES_DATA = [
  { title: "Modular Kitchen", slug: "modular-kitchen", img: INTERIOR_IMAGES.kitchen, desc: "Smart storage solutions with premium finishes for your dream kitchen." },
  { title: "Bedroom Design", slug: "bedroom", img: INTERIOR_IMAGES.bedroom, desc: "Serene, stylish bedrooms crafted for comfort and elegance." },
  { title: "Living Room", slug: "living-room", img: INTERIOR_IMAGES.living, desc: "Statement living spaces that reflect your personality and taste." },
  { title: "Wardrobe Design", slug: "wardrobe-design", img: INTERIOR_IMAGES.wardrobe, desc: "Custom wardrobes maximizing space with beautiful organization." },
  { title: "Bathroom Design", slug: "bathroom", img: INTERIOR_IMAGES.bathroom, desc: "Spa-like bathrooms with premium fixtures and elegant finishes." },
  { title: "Office Interiors", slug: "office", img: INTERIOR_IMAGES.office, desc: "Productive, inspiring workspaces designed for modern professionals." },
];

const PROJECTS_DATA = [
  { title: "Modern Villa, Noida", area: "2800 sq.ft", city: "Noida", slug: "modern-villa-noida", img: INTERIOR_IMAGES.project1 },
  { title: "Luxury Apartment, Gurgaon", area: "1600 sq.ft", city: "Gurgaon", slug: "luxury-apt-gurgaon", img: INTERIOR_IMAGES.project2 },
  { title: "Contemporary Home, Delhi", area: "2200 sq.ft", city: "Delhi", slug: "contemporary-delhi", img: INTERIOR_IMAGES.project3 },
  { title: "Premium Penthouse, Noida", area: "3500 sq.ft", city: "Noida", slug: "penthouse-noida", img: INTERIOR_IMAGES.project4 },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", location: "Noida", rating: 5, img: INTERIOR_IMAGES.testimonial1, text: "A2Z Creation transformed our 3BHK into a stunning home. The team was professional, on time, and the quality exceeded our expectations!" },
  { name: "Rahul Mehta", location: "Gurgaon", rating: 5, img: INTERIOR_IMAGES.testimonial2, text: "Best interior designers in Delhi NCR! They delivered our full home interior in just 42 days. Absolutely love the modular kitchen they designed." },
  { name: "Anita Kapoor", location: "Delhi", rating: 5, img: INTERIOR_IMAGES.testimonial3, text: "From the first consultation to the final handover, the experience was seamless. Our home looks like it's straight out of a magazine!" },
];

export default async function HomePage() {
  let services: any[] = [];
  let projects: any[] = [];
  try {
    [services, projects] = await Promise.all([getServices(), getProjects()]);
  } catch { }

  const displayServices = services.length > 0 ? services.slice(0, 6) : SERVICES_DATA;
  const displayProjects = projects.length > 0 ? projects.slice(0, 4) : PROJECTS_DATA;

  return (
    <>
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0f0f1a]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={INTERIOR_IMAGES.hero}
              alt="Luxury interior design"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a] via-[#0f0f1a]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-[45%] w-72 h-72 bg-[#e75f52]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-[30%] w-96 h-96 bg-[#C5A059]/8 rounded-full blur-3xl" />

          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Hero Text */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e75f52]/15 border border-[#e75f52]/25 text-[#e75f52] text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#e75f52] animate-pulse" />
                  Premium Interior Design Studio
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight">
                  Design Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">
                    Dream Home
                  </span>
                  with A2Z
                </h1>

                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg">
                  Premium home & office interiors with quality assurance and 45-day delivery commitment. 500+ happy families across Delhi NCR.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#lead-form">
                    <button className="px-8 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold text-base rounded-2xl shadow-2xl shadow-[#e75f52]/30 hover:shadow-[#e75f52]/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                      Get Free Consultation
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </a>
                  <Link href="/projects">
                    <button className="px-8 py-4 bg-white/8 border border-white/15 text-white font-semibold text-base rounded-2xl hover:bg-white/15 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View Portfolio
                    </button>
                  </Link>
                </div>

                {/* Phone CTA */}
                <a
                  href="tel:+918375852594"
                  className="inline-flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#e75f52]/20 group-hover:border-[#e75f52]/30 transition-all">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">Call us now</p>
                    <p className="text-white font-bold text-lg group-hover:text-[#e75f52] transition-colors">+91 83758 52594</p>
                  </div>
                </a>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-4 border-t border-white/10">
                  {[
                    { value: "500+", label: "Projects Done" },
                    { value: "4.9★", label: "Client Rating" },
                    { value: "45 Days", label: "Delivery" },
                    { value: "10 Yr", label: "Warranty" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-white font-bold text-xl">{stat.value}</p>
                      <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Lead Form */}
              <div id="lead-form" className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#e75f52]/20 to-[#C5A059]/10 rounded-3xl blur-2xl" />
                <div className="relative">
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST BAR ─── */}
        <section className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🏆", label: "10-Year Warranty", sub: "On all materials" },
                { icon: "🏠", label: "500+ Projects", sub: "Across Delhi NCR" },
                { icon: "🎯", label: "Free Site Visit", sub: "No charges ever" },
                { icon: "⚡", label: "45-Day Delivery", sub: "Guaranteed timeline" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="py-24 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Our Interior Design <span className="text-[#e75f52]">Expertise</span>
              </h2>
              <p className="text-gray-500 text-lg">
                Comprehensive interior design services tailored to your lifestyle and budget.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((item, index) => (
                <Link href={`/services/${item.slug}`} key={item.slug} className="group block">
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      {/* Number badge */}
                      <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#e75f52] font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#e75f52] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex items-center gap-1 text-[#e75f52] text-sm font-semibold">
                        Explore Service
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <button className="px-8 py-3.5 border-2 border-[#e75f52] text-[#e75f52] font-bold rounded-xl hover:bg-[#e75f52] hover:text-white transition-all duration-300">
                  View All Services
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CALCULATOR CTA ─── */}
        <section className="py-20 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e75f52]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A059]/8 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-[#C5A059]/15 text-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                Budget Planning Tool
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Know Your Interior Budget <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">
                  in Just 2 Minutes
                </span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
                Use our advanced cost calculator to get an accurate estimate for your dream home project — completely free, no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/interior-cost-calculator">
                  <button className="px-10 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold text-base rounded-2xl shadow-2xl shadow-[#e75f52]/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Calculate My Budget
                  </button>
                </Link>
                <a href="tel:+918375852594">
                  <button className="px-10 py-4 bg-white/8 border border-white/15 text-white font-semibold text-base rounded-2xl hover:bg-white/15 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call: 83758 52594
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Dream Home in <span className="text-[#e75f52]">4 Steps</span>
              </h2>
              <p className="text-gray-500 text-lg">Simple, transparent, and stress-free interior design process.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#e75f52]/30 to-transparent" />

              {[
                { step: "01", title: "Book Consultation", desc: "Call us or fill the form. We'll schedule a free site visit at your convenience.", icon: "📞" },
                { step: "02", title: "Meet Our Designer", desc: "Our expert designer visits your home, understands your vision and requirements.", icon: "🎨" },
                { step: "03", title: "Approve 3D Design", desc: "Review detailed 3D renders of your space before any work begins.", icon: "🏠" },
                { step: "04", title: "Handover in 45 Days", desc: "We execute with precision and hand over your beautiful home on time.", icon: "🎉" },
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e75f52]/10 to-[#e75f52]/5 border-2 border-[#e75f52]/15 flex flex-col items-center justify-center group-hover:border-[#e75f52] group-hover:bg-[#e75f52]/10 transition-all duration-300 shadow-sm">
                      <span className="text-2xl mb-1">{item.icon}</span>
                      <span className="text-[#e75f52] text-xs font-bold">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO ─── */}
        <section className="py-24 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  Our Work
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  Featured <span className="text-[#e75f52]">Projects</span>
                </h2>
                <p className="text-gray-500 text-lg">Real homes, real transformations across Delhi NCR.</p>
              </div>
              <Link href="/projects">
                <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#e75f52] hover:text-[#e75f52] transition-all duration-300 flex items-center gap-2 shrink-0">
                  View All Projects
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS_DATA.map((item, index) => (
                <Link href={`/projects/${item.slug}`} key={item.slug} className="group block">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-2xl transition-all duration-500">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">
                          {item.city} · {item.area}
                        </p>
                        <h3 className="text-white text-2xl font-bold mb-3">{item.title}</h3>
                        <span className="inline-flex items-center gap-1.5 text-white/80 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/15">
                          View Project
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Client Love
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Clients <span className="text-[#e75f52]">Say</span>
              </h2>
              <p className="text-gray-500 text-lg">500+ happy families trust A2Z Creation for their dream homes.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-[#faf8f6] rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <svg key={si} className="w-4 h-4 text-[#C5A059] fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.location}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 rounded-lg bg-[#e75f52]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#e75f52]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-24 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] p-12 md:p-20 text-center">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px"
                }} />
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#e75f52]/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 bg-[#e75f52]/15 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                  Start Your Journey
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Ready to Transform <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">
                    Your Space?
                  </span>
                </h2>
                <p className="text-white/50 text-xl mb-10">
                  Get a free consultation and customized quote for your home today. No commitment, no pressure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#lead-form">
                    <button className="px-10 py-4 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold text-lg rounded-2xl shadow-2xl shadow-[#e75f52]/30 hover:-translate-y-1 transition-all duration-300">
                      Get Free Quote Now
                    </button>
                  </a>
                  <a href="tel:+918375852594">
                    <button className="px-10 py-4 bg-white/8 border border-white/15 text-white font-bold text-lg rounded-2xl hover:bg-white/15 transition-all duration-300 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      83758 52594
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FLOATING ACTIONS ─── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918375852594"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-2xl text-white shadow-xl shadow-green-500/40 hover:scale-110 hover:shadow-green-500/60 transition-all duration-300"
          title="Chat on WhatsApp"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
        {/* Call */}
        <a
          href="tel:+918375852594"
          className="flex items-center justify-center w-14 h-14 bg-[#e75f52] rounded-2xl text-white shadow-xl shadow-[#e75f52]/40 hover:scale-110 hover:shadow-[#e75f52]/60 transition-all duration-300"
          title="Call Us"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      <SiteFooter />
    </>
  );
}
