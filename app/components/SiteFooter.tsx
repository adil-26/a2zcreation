import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, MapPin, Mail, ArrowRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0f0f1a] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e75f52] to-[#cb493e] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-lg tracking-tight">
                  a2z<span className="text-[#e75f52]">creation</span>
                </span>
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-medium">
                  Interior Design
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Transforming spaces into dream homes. Premium interior design with quality assurance and 45-day delivery commitment across Delhi NCR.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/a2zcreation", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com/a2zcreation", label: "Facebook" },
                { icon: Youtube, href: "https://youtube.com/@a2zcreation", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#e75f52] hover:border-[#e75f52]/30 hover:bg-[#e75f52]/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Design Gallery", href: "/design-ideas" },
                { label: "Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm hover:text-[#e75f52] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Modular Kitchen", href: "/services/modular-kitchen" },
                { label: "Wardrobe Design", href: "/services/wardrobe-design" },
                { label: "Living Room", href: "/services/living-room-design" },
                { label: "Bedroom Design", href: "/services/bedroom-design" },
                { label: "Full Home Interiors", href: "/services/full-home-interior" },
                { label: "Office Interiors", href: "/services/office-interiors" },
                { label: "Cost Calculator", href: "/interior-cost-calculator" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm hover:text-[#e75f52] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#e75f52]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#e75f52]" />
                  </div>
                  <span className="text-white/50 text-sm leading-relaxed">
                    Sector 62, Noida,<br />Uttar Pradesh, India
                  </span>
                </div>
              </li>
              <li>
                <a href="tel:+918375852594" className="flex gap-3 items-center group">
                  <div className="w-8 h-8 rounded-lg bg-[#e75f52]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#e75f52]" />
                  </div>
                  <span className="text-white/50 text-sm group-hover:text-[#e75f52] transition-colors font-medium">
                    +91 83758 52594
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@a2zcreation.in" className="flex gap-3 items-center group">
                  <div className="w-8 h-8 rounded-lg bg-[#e75f52]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#e75f52]" />
                  </div>
                  <span className="text-white/50 text-sm group-hover:text-[#e75f52] transition-colors">
                    hello@a2zcreation.in
                  </span>
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918375852594"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-semibold hover:bg-green-500/20 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} A2Z Creation. All rights reserved. | Designed with ❤️ in India</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-white/60 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
