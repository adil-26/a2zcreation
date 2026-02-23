import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const dbPath = path.join(process.cwd(), "data", "db.json");

function getSupabaseClient() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET() {
    try {
        // Check if we just want a heartbeat or version
        if (typeof window === "undefined") {
            // Heartbeat/Diagnostic
            console.log("Leads API accessed via GET");
        }

        const supabase = getSupabaseClient();
        if (supabase) {
            const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            return NextResponse.json({ leads: data, v: "1.0.4" });
        }

        // Fallback to local db.json
        const raw = await readFile(dbPath, "utf8");
        const db = JSON.parse(raw);
        return NextResponse.json({ leads: db.leads || [], v: "1.0.4-local" });
    } catch (error: any) {
        console.error("GET Leads Error:", error);
        return NextResponse.json({ error: error.message, v: "1.0.4-err" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            name, phone, city, budget, serviceType,
            utm_source, utm_medium, utm_campaign, utm_content, utm_term
        } = body;

        if (!name || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const baseLead = {
            name: String(name || ""),
            phone: String(phone || ""),
            city: String(city || ""),
            budget: String(budget || ""),
            service: String(serviceType || ""),
            status: "New",
            date: new Date().toISOString().split("T")[0],
            created_at: new Date().toISOString(),
        };

        const utmData = {
            utm_source: utm_source ? String(utm_source) : null,
            utm_medium: utm_medium ? String(utm_medium) : null,
            utm_campaign: utm_campaign ? String(utm_campaign) : null,
            utm_content: utm_content ? String(utm_content) : null,
            utm_term: utm_term ? String(utm_term) : null,
        };

        const supabase = getSupabaseClient();
        if (supabase) {
            try {
                // Try inserting without explicit ID first (DB handles it)
                const { data, error } = await supabase.from("leads").insert([{ ...baseLead, ...utmData }]).select();
                if (!error) return NextResponse.json(data[0]);

                // Fallback: If UTM columns are missing, try base insert
                if (error.code === "42703") {
                    const { data: bData, error: bErr } = await supabase.from("leads").insert([baseLead]).select();
                    if (!bErr) return NextResponse.json(bData[0]);
                }
            } catch (supaErr) {
                console.error("Supabase fail-safe hit:", supaErr);
            }
        }

        // Final local fallback
        const localLead = { ...baseLead, ...utmData, id: Date.now() };
        try {
            const raw = await readFile(dbPath, "utf8");
            const db = JSON.parse(raw);
            if (!db.leads) db.leads = [];
            db.leads.unshift(localLead);
            await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
        } catch (fsErr) {
            console.warn("Read-only FS fallback");
        }

        return NextResponse.json(localLead);
    } catch (error: any) {
        console.error("Critical API Error:", error);
        return NextResponse.json({ error: error.message || "Submission failed" }, { status: 500 });
    }
}
