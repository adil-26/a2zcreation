"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Plus, MoreVertical, MapPin, Calendar, Loader2 } from "lucide-react";

interface Project {
    id: number;
    slug: string;
    title: string;
    client?: string;
    city: string;
    status: string;
    progress: number;
    lastUpdate?: string;
    image?: string;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Projects fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-500">Manage ongoing and completed sites.</p>
                </div>
                <Button><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-brand" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500">No projects found. Add your first project!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id || project.slug} className="group border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="h-48 bg-gray-100 relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop'})` }}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-700">
                                    {project.status || "Planned"}
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{project.title}</h3>
                                        <p className="text-sm text-gray-500">{project.client || "Self Project"}</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.city}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.lastUpdate || "Recently"}</span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-bold text-gray-700">
                                            <span>Progress</span>
                                            <span>{project.progress || 0}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-brand rounded-full transition-all duration-500"
                                                style={{ width: `${project.progress || 0}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <Button variant="outline" size="sm" className="w-full">Edit</Button>
                                        <Button variant="outline" size="sm" className="w-full">Updates</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
