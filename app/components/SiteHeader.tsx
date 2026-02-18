"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Cost Calculator", href: "/interior-cost-calculator" },
    { label: "Design Ideas", href: "/design-ideas" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] text-white text-[11px] py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <a
              href="tel:+918375852594"
              className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity hover:text-[#e75f52]"
            >
              <Phone className="w-3 h-3" /> +91 83758 52594
            </a>
            <span className="flex items-center gap-1.5 opacity-80">
              <MapPin className="w-3 h-3" /> New Delhi, India
            </span>
          </div>
          <div className="flex gap-6 text-white/70">
            <span>Mon–Sat: 10am – 7pm</span>
            <span>|</span>
            <a href="mailto:hello@a2zcreation.in" className="hover:text-[#e75f52] transition-colors">
              hello@a2zcreation.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-white/98 backdrop-blur-xl shadow-lg border-gray-100"
            : "bg-white/95 backdrop-blur-md"
        )}
      >
        <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e75f52] to-[#cb493e] flex items-center justify-center shadow-lg shadow-[#e75f52]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg leading-none">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[#1a1a2e] text-lg tracking-tight">
                a2z<span className="text-[#e75f52]">creation</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase font-medium">
                Interior Design
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-[#e75f52] bg-[#e75f52]/8 font-semibold"
                    : "text-gray-600 hover:text-[#e75f52] hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918375852594"
              className="flex items-center gap-2 text-sm font-semibold text-[#1a1a2e] hover:text-[#e75f52] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#e75f52]/10 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-[#e75f52]" />
              </div>
              <span>83758 52594</span>
            </a>
            <Link href="/contact">
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#e75f52]/25 hover:shadow-xl hover:shadow-[#e75f52]/30 hover:-translate-y-0.5 transition-all duration-200">
                Get Free Quote
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white lg:hidden border-b border-gray-100 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-1 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === link.href
                        ? "text-[#e75f52] bg-[#e75f52]/8 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+918375852594"
                  className="flex items-center justify-center gap-2 py-3 border-2 border-[#e75f52] text-[#e75f52] font-bold rounded-xl"
                >
                  <Phone className="w-4 h-4" /> Call: 83758 52594
                </a>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold rounded-xl">
                    Get Free Quote
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
