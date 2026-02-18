"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "a2zcreation@admin";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                // Store session in localStorage
                localStorage.setItem("admin_auth", "true");
                router.push("/admin/dashboard");
            } else {
                setError("Incorrect password. Please try again.");
                setLoading(false);
            }
        }, 600);
    }

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-4">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e75f52]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C5A059]/8 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e75f52] to-[#cb493e] flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-[#e75f52]/30">
                        <span className="text-white font-bold text-3xl">A</span>
                    </div>
                    <h1 className="text-white font-bold text-2xl">
                        a2z<span className="text-[#e75f52]">creation</span>
                    </h1>
                    <p className="text-white/40 text-sm mt-1">Admin Panel</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-white font-bold text-xl mb-1">Welcome back</h2>
                    <p className="text-white/40 text-sm mb-6">Enter your password to continue</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                                autoFocus
                                className="w-full h-12 px-4 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-white/25 focus:outline-none focus:border-[#e75f52]/60 focus:bg-white/10 transition-all text-sm"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <span className="text-red-400 text-sm">⚠️ {error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-[#e75f52] to-[#cb493e] text-white font-bold rounded-xl shadow-lg shadow-[#e75f52]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:translate-y-0 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                "Sign In →"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    A2Z Creation © {new Date().getFullYear()} · Admin Access Only
                </p>
            </div>
        </div>
    );
}
