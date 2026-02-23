"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Copy, Check, ExternalLink } from "lucide-react";

export default function URLBuilder() {
    const [baseUrl, setBaseUrl] = useState("https://a2zcreation.in");
    const [source, setSource] = useState("facebook");
    const [medium, setMedium] = useState("paid");
    const [campaign, setCampaign] = useState("");
    const [content, setContent] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const url = new URL(baseUrl);
        url.searchParams.set("utm_source", source);
        url.searchParams.set("utm_medium", medium);
        if (campaign) url.searchParams.set("utm_campaign", campaign.replace(/\s+/g, "_").toLowerCase());
        if (content) url.searchParams.set("utm_content", content.replace(/\s+/g, "_").toLowerCase());
        setGeneratedUrl(url.toString());
    }, [baseUrl, source, medium, campaign, content]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-xl max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Marketing URL Builder</h3>
                    <p className="text-sm text-gray-500">Create tracking links for your ad campaigns.</p>
                </div>
            </div>

            <div className="grid gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Page</label>
                    <Input
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        placeholder="e.g. https://a2zcreation.in"
                        className="bg-gray-50 border-none h-11"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Source</label>
                        <select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border-none bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-brand/20 transition-all appearance-none"
                        >
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="google">Google</option>
                            <option value="whatsapp">WhatsApp</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Medium</label>
                        <select
                            value={medium}
                            onChange={(e) => setMedium(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border-none bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-brand/20 transition-all appearance-none"
                        >
                            <option value="paid">Paid Ad</option>
                            <option value="organic">Organic Social</option>
                            <option value="referral">Referral</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Campaign Name</label>
                    <Input
                        value={campaign}
                        onChange={(e) => setCampaign(e.target.value)}
                        placeholder="e.g. Mumbai Full Home"
                        className="bg-gray-50 border-none h-11"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ad Content (Optional)</label>
                    <Input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="e.g. Living Room Video"
                        className="bg-gray-50 border-none h-11"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Generated Tracking Link</label>
                <div className="relative group">
                    <div className="w-full p-4 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 break-all border border-gray-100 group-hover:border-brand/30 transition-all pr-12">
                        {generatedUrl}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white shadow-sm border border-gray-100 hover:border-brand/40 text-gray-500 hover:text-brand transition-all"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
                <div className="flex justify-end mt-4">
                    <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="text-xs">
                            <ExternalLink className="w-3 h-3 mr-2" /> Test Link
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
