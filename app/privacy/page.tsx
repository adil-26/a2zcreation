import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
    title: "Privacy Policy | A2Z Creation",
    description: "Our commitment to protecting your personal information and privacy.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <SiteHeader />
            <main className="bg-[#faf8f6] py-20 min-h-screen">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">
                            Privacy <span className="text-[#e75f52]">Policy</span>
                        </h1>

                        <div className="space-y-8 text-gray-600 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                                <p>
                                    At A2Z Creation, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                                <p className="mb-4">We collect information that you provide directly to us, including:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Contact Details:</strong> Name, phone number, email address, and physical address.</li>
                                    <li><strong>Project Requirements:</strong> Information about your home, budget, and design preferences provided through our lead forms or calculator.</li>
                                    <li><strong>Communication:</strong> Records of your interactions with our team via email, WhatsApp, or phone.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
                                <p className="mb-4">We use the collected information for the following purposes:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>To provide personalized interior design consultations and services.</li>
                                    <li>To process your inquiries and requests submitted via forms.</li>
                                    <li>To send project updates, newsletters, and promotional offers (you can opt-out at any time).</li>
                                    <li>To improve our website functionality and user experience.</li>
                                    <li>For marketing and advertising purposes, including Facebook Pixel tracking and retargeting.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Protection</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to maintain the security of your personal information. Your data is stored securely and is only accessible by authorized personnel for the purpose of serving you.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Sharing</h2>
                                <p>
                                    We do not sell or rent your personal information to third parties. We may share data with trusted partners (such as logistics or installation teams) only as necessary to fulfill our service commitments to you. We Also use tools like Facebook Pixel for analytics and advertising.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
                                <p>
                                    Our website uses cookies to enhance your browsing experience and for advertising purposes. You can choose to disable cookies through your browser settings, though this may affect some website features.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at:<br />
                                    <strong>Email:</strong> <a href="mailto:rumanaa2zcreation@gmail.com" className="text-[#e75f52] font-medium">rumanaa2zcreation@gmail.com</a><br />
                                    <strong>Phone:</strong> <a href="tel:+919289163952" className="text-[#e75f52] font-medium">+91 92891 63952</a>
                                </p>
                            </section>

                            <div className="pt-8 border-t border-gray-100 text-sm text-gray-400">
                                Last Updated: February 23, 2026
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
