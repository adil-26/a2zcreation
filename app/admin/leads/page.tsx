"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Search, Filter, Phone, Mail, MapPin, Loader2, Link as LinkIcon, X } from "lucide-react";
import URLBuilder from "../components/URLBuilder";

interface Lead {
    id: number;
    name: string;
    phone: string;
    email?: string;
    city: string;
    service: string;
    budget: string;
    status: string;
    date: string;
    utm_source?: string;
    utm_campaign?: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showBuilder, setShowBuilder] = useState(false);

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        try {
            const response = await fetch("/api/leads");
            const data = await response.json();
            setLeads(data);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
        }
    }

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
                    <p className="text-gray-500">Track and manage your incoming enquiries.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button onClick={fetchLeads} variant="outline" size="sm" disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-brand/5 border-brand/20 text-brand hover:bg-brand/10"
                        onClick={() => setShowBuilder(true)}
                    >
                        <LinkIcon className="w-4 h-4 mr-2" /> Build Tracking Link
                    </Button>
                    <Button size="sm">Download CSV</Button>
                </div>
            </div>

            {/* URL Builder Modal Overlay */}
            {showBuilder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowBuilder(false)}
                            className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <URLBuilder />
                    </div>
                </div>
            )}

            <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-9 h-10 bg-gray-50 border-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                                    <th className="px-4 py-3">Attribution</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 rounded-r-lg">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="w-6 h-6 animate-spin text-brand" />
                                                <span>Loading leads...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            No leads found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-4 font-medium text-gray-900">
                                                {lead.name}
                                                <div className="md:hidden text-xs text-gray-500 mt-1">{lead.phone}</div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-500">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {lead.phone}</div>
                                                    {lead.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {lead.email}</div>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-gray-900">{lead.service}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <MapPin className="w-3 h-3" /> {lead.city} • {lead.budget}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-xs font-medium text-gray-900">{lead.utm_source || "Direct"}</div>
                                                <div className="text-[10px] text-gray-500 truncate max-w-[120px]" title={lead.utm_campaign}>
                                                    {lead.utm_campaign || "-"}
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
