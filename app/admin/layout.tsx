"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Users, Briefcase, FileText, Settings, LogOut, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads", icon: Users },
    { href: "/admin/projects", label: "Projects", icon: Briefcase },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/cities", label: "Cities", icon: MapPin },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Auth guard — redirect to login if not authenticated
    useEffect(() => {
        if (pathname === "/admin") return; // allow login page
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.replace("/admin");
        }
    }, [pathname, router]);

    function handleSignOut() {
        localStorage.removeItem("admin_auth");
        router.push("/admin");
    }

    // Don't show sidebar on the login page
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e75f52] to-[#cb493e] flex items-center justify-center shadow">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">
                            a2z<span className="text-[#e75f52]">creation</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 text-xs mt-1 ml-10">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-[#e75f52]/10 text-[#e75f52]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
                    <Link href="/" className="font-bold text-gray-900 text-lg">
                        a2z<span className="text-[#e75f52]">creation</span> Admin
                    </Link>
                    <button onClick={handleSignOut} className="text-red-500 text-sm font-semibold">
                        Sign Out
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
