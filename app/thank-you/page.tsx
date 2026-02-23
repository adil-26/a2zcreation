import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import Link from "next/link";
import Script from "next/script";

export const metadata = {
    title: "Thank You | A2Z Creation",
    description: "Thank you for contacting A2Z Creation. We will get back to you shortly.",
};

export default function ThankYouPage() {
    return (
        <>
            <SiteHeader />
            <main className="bg-[#faf8f6] py-28 min-h-[80vh] flex items-center">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Thank You for <span className="text-[#e75f52]">Choosing Us!</span>
                    </h1>
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        Your request has been successfully submitted. Our interior design experts will review your requirements and call you back within 24 hours to schedule your free consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <button className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto">
                                Back to Home
                            </button>
                        </Link>
                        <Link href="/projects">
                            <button className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#e75f52] hover:text-[#e75f52] transition-all duration-300 w-full sm:w-auto">
                                Explore Our Projects
                            </button>
                        </Link>
                    </div>

                    {/* Social Proof / Next Steps */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-6">Follow our design journey</p>
                        <div className="flex justify-center gap-6">
                            <a href="https://instagram.com/a2zcreation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e75f52] transition-colors">
                                <span className="text-sm font-bold">Instagram</span>
                            </a>
                            <a href="https://facebook.com/a2zcreation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e75f52] transition-colors">
                                <span className="text-sm font-bold">Facebook</span>
                            </a>
                            <a href="https://youtube.com/@a2zcreation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e75f52] transition-colors">
                                <span className="text-sm font-bold">YouTube</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Facebook Conversion Tracking - Lead Event */}
            <Script
                id="fb-track-lead"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            if (typeof fbq === 'function') {
              fbq('track', 'Lead');
            }
          `,
                }}
            />

            <SiteFooter />
        </>
    );
}
