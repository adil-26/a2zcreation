"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Users, TrendingUp, Calendar, AlertCircle, Loader2 } from "lucide-react";

interface Lead {
    id: number;
    name: string;
    phone: string;
    city: string;
    service: string;
    status: string;
    date: string;
}

interface Project {
    slug: string;
    title: string;
    city: string;
    budget: string;
    [key: string]: any;
}

export default function AdminDashboardPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [projectsCount, setProjectsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leadsRes, projectsRes] = await Promise.all([
                    fetch("/api/leads"),
                    fetch("/api/projects")
                ]);

                const leadsData = await leadsRes.json();
                const projectsData = await projectsRes.json();

                const normalizedLeads: Lead[] = Array.isArray(leadsData)
                    ? leadsData
                    : Array.isArray(leadsData?.leads)
                        ? leadsData.leads
                        : [];
                const normalizedProjects = Array.isArray(projectsData)
                    ? projectsData
                    : Array.isArray(projectsData?.projects)
                        ? projectsData.projects
                        : [];

                setLeads(normalizedLeads);
                setProjectsCount(normalizedProjects.length);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const stats = [
        { label: "Total Leads", value: leads.length.toString(), icon: Users, trend: "+12% this month", color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Active Projects", value: projectsCount.toString(), icon: Calendar, trend: "Current live sites", color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Revenue (Est.)", value: "₹45.2L", icon: TrendingUp, trend: "+8% vs last month", color: "text-green-600", bg: "bg-green-100" },
        { label: "Pending Actions", value: leads.filter(l => l.status === "New").length.toString(), icon: AlertCircle, trend: "Requires attention", color: "text-orange-600", bg: "bg-orange-100" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm">
                        <CardContent className="p-6 flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {loading ? "..." : stat.value}
                                </h3>
                                <p className={`text-xs mt-2 font-medium ${stat.color.replace('text-', 'text-opacity-80 text-')}`}>{stat.trend}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity / Leads Preview */}
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-brand" />
                                </div>
                            ) : leads.length === 0 ? (
                                <p className="text-center text-gray-500 py-4">No recent leads.</p>
                            ) : (
                                leads.slice(0, 5).map((lead) => (
                                    <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">
                                                {lead.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{lead.name}</p>
                                                <p className="text-xs text-muted-foreground">{lead.service} • {lead.city}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${lead.status === "New" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Project Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { name: "Luxury 3BHK, Noida", progress: 75, status: "Finishing" },
                                { name: "Office Space, Delhi", progress: 40, status: "Civil Work" },
                                { name: "Villa, Gurgaon", progress: 10, status: "Design Phase" },
                            ].map((project, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold">{project.name}</span>
                                        <span className="text-muted-foreground">{project.status}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand" style={{ width: `${project.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
