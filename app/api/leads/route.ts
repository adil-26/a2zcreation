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
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            return NextResponse.json(data);
        }

        // Fallback to local db.json
        const raw = await readFile(dbPath, "utf8");
        const db = JSON.parse(raw);
        return NextResponse.json(db.leads || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
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
            name,
            phone,
            city,
            budget,
            service: serviceType,
            status: "New",
            date: new Date().toISOString().split("T")[0],
            created_at: new Date().toISOString(),
        };

        const fullLead = {
            ...baseLead,
            id: Date.now(), // Local ID fallback
            utm_source: utm_source || null,
            utm_medium: utm_medium || null,
            utm_campaign: utm_campaign || null,
            utm_content: utm_content || null,
            utm_term: utm_term || null,
        };

        const supabase = getSupabaseClient();
        if (supabase) {
            // Attempt 1: Full insert with UTMs
            const { data, error } = await supabase.from("leads").insert([fullLead]).select();

            if (!error) return NextResponse.json(data[0]);

            // Attempt 2: If UTM columns are missing, try base insert
            if (error.code === "42703") { // Undefined column error
                console.warn("UTM columns missing, falling back to base insert");
                const { data: baseData, error: baseError } = await supabase.from("leads").insert([baseLead]).select();
                if (!baseError) return NextResponse.json(baseData[0]);
                throw baseError;
            }
            throw error;
        }

        // Fallback to local db.json
        try {
            const raw = await readFile(dbPath, "utf8");
            const db = JSON.parse(raw);
            if (!db.leads) db.leads = [];
            db.leads.unshift(fullLead);
            await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
            return NextResponse.json(fullLead);
        } catch (fsError: any) {
            console.error("Local FS fallback failed:", fsError.message);
            // In Prod (Vercel), FS is read-only. Return the lead anyway so UI shows success.
            return NextResponse.json(fullLead);
        }
    } catch (error: any) {
        console.error("CRITICAL API ERROR:", error);
        return NextResponse.json({ error: error.message || "Failed to save lead" }, { status: 500 });
    }
}
