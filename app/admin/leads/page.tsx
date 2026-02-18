"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Search, Filter, Phone, Mail, MapPin } from "lucide-react";

const leads = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", email: "rahul@gmail.com", city: "Noida", service: "Modular Kitchen", budget: "5-10L", status: "New", date: "2024-02-18" },
    { id: 2, name: "Priya Singh", phone: "9988776655", email: "priya@yahoo.com", city: "Delhi", service: "Full Home", budget: "20L+", status: "Contacted", date: "2024-02-17" },
    { id: 3, name: "Amit Verma", phone: "8899776655", email: "amit@outlook.com", city: "Gurgaon", service: "Wardrobes", budget: "Under 5L", status: "Closed", date: "2024-02-16" },
    // Add more dummy data
];

export default function AdminLeadsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
                    <p className="text-gray-500">Track and manage your incoming enquiries.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button>Download CSV</Button>
                </div>
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search leads..." className="pl-9 h-10 bg-gray-50 border-none" />
                    </div>
                    <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Name</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3">Requirement</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 rounded-r-lg">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-gray-900">
                                            {lead.name}
                                            <div className="md:hidden text-xs text-gray-500 mt-1">{lead.phone}</div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-500">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {lead.phone}</div>
                                                <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {lead.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="font-medium text-gray-900">{lead.service}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <MapPin className="w-3 h-3" /> {lead.city} • {lead.budget}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                           ${lead.status === 'New' ? 'bg-green-100 text-green-700' :
                                                    lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                                            {lead.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
