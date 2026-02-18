import LeadCaptureForm from "../components/LeadCaptureForm";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Contact Us | A2Z Creation",
  description: "Get in touch for a free consultation and site visit. Call +91 83758 52594.",
};

const CONTACT_INFO = [
  {
    icon: "📞",
    title: "Call Us",
    value: "+91 83758 52594",
    sub: "Mon–Sat: 10am – 7pm",
    href: "tel:+918375852594",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    value: "Chat with us",
    sub: "Quick response guaranteed",
    href: "https://wa.me/918375852594",
  },
  {
    icon: "📧",
    title: "Email Us",
    value: "hello@a2zcreation.in",
    sub: "We reply within 24 hours",
    href: "mailto:hello@a2zcreation.in",
  },
  {
    icon: "📍",
    title: "Visit Us",
    value: "Sector 62, Noida, UP",
    sub: "By appointment only",
    href: "#map",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="relative py-28 bg-[#0f0f1a] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop"
              alt="Contact A2Z Creation"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a] via-[#0f0f1a]/90 to-[#0f0f1a]/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 bg-[#e75f52]/15 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e75f52] to-[#C5A059]">Talk</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              We'd love to hear about your project. Reach out for a free consultation — no commitment required.
            </p>
          </div>
        </section>

        {/* ─── CONTACT CARDS ─── */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CONTACT_INFO.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group p-5 rounded-2xl bg-[#faf8f6] border border-gray-100 hover:border-[#e75f52]/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e75f52]/10 flex items-center justify-center text-2xl mx-auto mb-3 group-hover:bg-[#e75f52]/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-[#e75f52] font-semibold text-sm">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MAIN CONTACT SECTION ─── */}
        <section className="py-24 bg-[#faf8f6]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Info */}
              <div className="space-y-8">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-[#e75f52]/10 text-[#e75f52] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    Free Consultation
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Let's Create Something <span className="text-[#e75f52]">Beautiful</span> Together
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Whether you have a specific project in mind or just want to explore possibilities, our team is here to help you every step of the way.
                  </p>
                </div>

                {/* Process */}
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Fill the form or call us", desc: "Share your basic requirements and we'll get back to you within 2 hours." },
                    { step: "02", title: "Free site visit", desc: "Our designer visits your home at your convenience — completely free." },
                    { step: "03", title: "Get your 3D design", desc: "We create a detailed 3D render of your space for your approval." },
                    { step: "04", title: "Move in within 45 days", desc: "We execute with precision and hand over your dream home on time." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#e75f52]/20 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#e75f52]/10 flex items-center justify-center text-[#e75f52] font-bold text-sm shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                        <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Call CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] text-center">
                  <p className="text-white/50 text-sm mb-2">Prefer to talk directly?</p>
                  <a href="tel:+918375852594" className="text-white font-bold text-2xl hover:text-[#e75f52] transition-colors">
                    +91 83758 52594
                  </a>
                  <p className="text-white/30 text-xs mt-1">Mon–Sat, 10am–7pm</p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="sticky top-24">
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAP ─── */}
        <section id="map" className="h-80 w-full relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319286!2d77.06889754724775!3d28.52735223631915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709210000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
