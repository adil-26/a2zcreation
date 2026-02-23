import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
    title: "Terms of Service | A2Z Creation",
    description: "Terms and conditions for using A2Z Creation interior design services.",
};

export default function TermsOfServicePage() {
    return (
        <>
            <SiteHeader />
            <main className="bg-[#faf8f6] py-20 min-h-screen">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">
                            Terms of <span className="text-[#e75f52]">Service</span>
                        </h1>

                        <div className="space-y-8 text-gray-600 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing the A2Z Creation website or engaging our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Scope of Services</h2>
                                <p>
                                    A2Z Creation provides interior design consultation, planning, and execution services. The specific scope of work, timelines, and deliverables for any project will be outlined in a separate signed agreement Between A2Z Creation and the client.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Obligations</h2>
                                <p className="mb-4">As a user of our website and services, you agree to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide accurate and complete information when filling out forms or calculators.</li>
                                    <li>Use our website for lawful purposes only.</li>
                                    <li>Respect all intellectual property rights related to our designs, images, and content.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
                                <p>
                                    All content, designs, images, and trademarks on this website are the property of A2Z Creation. Users may not reproduce, distribute, or use any site material for commercial purposes without explicit written consent.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
                                <p>
                                    A2Z Creation shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. While we strive for excellence, design outcomes are subject to various factors beyond our control.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Privacy</h2>
                                <p>
                                    Your use of our services is also governed by our <a href="/privacy" className="text-[#e75f52] font-medium hover:underline">Privacy Policy</a>, which explains how we handle your personal data.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">7. Governing Law</h2>
                                <p>
                                    These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact Information</h2>
                                <p>
                                    For any questions regarding these Terms of Service, please contact us at:<br />
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
