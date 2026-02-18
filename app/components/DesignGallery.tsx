"use client";

import { useState, useMemo } from "react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "lucide-react"; // Using generic icon for now, usually Badge is a component
import { motion, AnimatePresence } from "framer-motion";

interface DesignItem {
    title: string;
    budget: string;
    style: string;
}

interface DesignCategory {
    room: string;
    items: DesignItem[];
}

interface DesignGalleryProps {
    data: DesignCategory[];
}

export default function DesignGallery({ data }: DesignGalleryProps) {
    const [activeRoom, setActiveRoom] = useState("All");
    const [activeStyle, setActiveStyle] = useState("All");

    // Flatten data for "All" view and extract unique styles
    const allItems = useMemo(() => {
        return data.flatMap(cat => cat.items.map(item => ({ ...item, room: cat.room })));
    }, [data]);

    const styles = useMemo(() => {
        const s = new Set<string>();
        allItems.forEach(item => s.add(item.style));
        return ["All", ...Array.from(s)];
    }, [allItems]);

    const rooms = ["All", ...data.map(d => d.room)];

    const filteredItems = useMemo(() => {
        return allItems.filter(item => {
            const roomMatch = activeRoom === "All" || item.room === activeRoom;
            const styleMatch = activeStyle === "All" || item.style === activeStyle;
            return roomMatch && styleMatch;
        });
    }, [activeRoom, activeStyle, allItems]);

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-line">
                <div className="space-y-2 w-full md:w-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">Room Type</span>
                    <div className="flex flex-wrap gap-2">
                        {rooms.map(room => (
                            <button
                                key={room}
                                onClick={() => setActiveRoom(room)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeRoom === room
                                        ? "bg-brand text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {room === "All" ? "All Rooms" : room.charAt(0).toUpperCase() + room.slice(1).replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 w-full md:w-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">Style</span>
                    <div className="flex flex-wrap gap-2">
                        {styles.map(style => (
                            <button
                                key={style}
                                onClick={() => setActiveStyle(style)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeStyle === style
                                        ? "bg-brand-dark text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredItems.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={item.title + index}
                        >
                            <Card className="h-full border-none shadow-md hover:shadow-xl group">
                                <div className="h-64 bg-gray-100 relative overflow-hidden rounded-t-2xl">
                                    {/* Placeholder for images */}
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url('https://source.unsplash.com/random/800x600?interior,${item.room},${item.style}')` }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="text-white">
                                            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-1 rounded-md mb-2 inline-block">
                                                {item.room.replace("-", " ")}
                                            </span>
                                            <h3 className="text-xl font-bold font-fraunces leading-tight">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-muted text-xs font-bold uppercase">Budget</span>
                                            <span className="text-brand font-bold">{item.budget}</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-muted text-xs font-bold uppercase">Style</span>
                                            <span className="text-ink font-bold">{item.style}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 text-muted">
                    <p className="text-xl">No designs found matching your filters.</p>
                    <Button variant="link" onClick={() => { setActiveRoom("All"); setActiveStyle("All") }}>Clear Filters</Button>
                </div>
            )}
        </div>
    );
}
