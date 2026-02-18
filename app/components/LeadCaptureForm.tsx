"use client";

import { useState } from "react";

export default function LeadCaptureForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "there").trim();
    setIsLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      (event.target as HTMLFormElement).reset();
    }, 4000);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-500 text-sm">Our A2Z Creation team will call you within 24 hours.</p>
        <p className="text-[#e75f52] font-bold mt-3 text-sm">Or call us now: +91 83758 52594</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#e75f52] to-[#cb493e] px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
          <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Free Consultation</span>
        </div>
        <h3 className="text-white text-xl font-bold">Get Your Dream Home Design</h3>
        <p className="text-white/70 text-sm mt-1">Response within 24 hours · No commitment required</p>
      </div>

      <div className="p-6">
        <form id="lead-form" onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e75f52]/30 focus:border-[#e75f52] transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Mobile Number *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+91</span>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit number"
                required
                pattern="[0-9]{10}"
                className="w-full h-11 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e75f52]/30 focus:border-[#e75f52] transition-all"
              />
            </div>
          </div>

          {/* City + Budget Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                City *
              </label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Noida"
                required
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e75f52]/30 focus:border-[#e75f52] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Budget *
              </label>
              <select
                name="budget"
                required
                defaultValue=""
                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#e75f52]/30 focus:border-[#e75f52] transition-all appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="under-5">Under 5L</option>
                <option value="5-10">5L – 10L</option>
                <option value="10-20">10L – 20L</option>
                <option value="20-plus">20L+</option>
              </select>
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Service Type *
            </label>
            <select
              name="serviceType"
              required
              defaultValue=""
              className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#e75f52]/30 focus:border-[#e75f52] transition-all appearance-none"
            >
              <option value="" disabled>Select service type</option>
              <option value="modular-kitchen">Modular Kitchen</option>
              <option value="full-home">Full Home Interior</option>
              <option value="bedroom">Bedroom Design</option>
              <option value="wardrobe">Wardrobe Design</option>
              <option value="living-room">Living Room Design</option>
              <option value="office">Office Interiors</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold rounded-xl shadow-lg shadow-[#e75f52]/25 hover:shadow-xl hover:shadow-[#e75f52]/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-1"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Request Free Callback
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            🔒 Your information is safe with us. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}
