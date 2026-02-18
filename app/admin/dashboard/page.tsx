"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Users, TrendingUp, Calendar, AlertCircle } from "lucide-react";

const stats = [
    { label: "Total Leads", value: "128", icon: Users, trend: "+12% this month", color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Active Projects", value: "12", icon: Calendar, trend: "3 completing soon", color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Revenue (Est.)", value: "₹45.2L", icon: TrendingUp, trend: "+8% vs last month", color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending Actions", value: "5", icon: AlertCircle, trend: "Requires attention", color: "text-orange-600", bg: "bg-orange-100" },
];

export default function AdminDashboardPage() {
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
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className={`text-xs mt-2 font-medium ${stat.color.replace('text-', 'text-opacity-80 text-')}`}>{stat.trend}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                {/* {stat.iconComp ? <stat.iconComp className="w-6 h-6" /> : <stat.icon className="w-6 h-6" />} */}
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
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">John Doe</p>
                                            <p className="text-xs text-muted">Modular Kitchen • Noida</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">New</span>
                                </div>
                            ))}
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
                                        <span className="text-muted">{project.status}</span>
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
