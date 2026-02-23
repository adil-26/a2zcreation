import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const dbPath = path.join(process.cwd(), "data", "db.json");
export const runtime = "nodejs";

function getSupabaseClient() {
    try {
        const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key =
            process.env.SUPABASE_SERVICE_ROLE_KEY ||
            process.env.SUPABASE_ANON_KEY ||
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) return null;
        return createClient(url, key, { auth: { persistSession: false } });
    } catch (e) {
        return null;
    }
}

async function appendLeadToLocalDb(lead: Record<string, any>) {
    const raw = await readFile(dbPath, "utf8").catch(() => "{\"leads\":[]}");
    const db = JSON.parse(raw || "{\"leads\":[]}");
    if (!Array.isArray(db.leads)) db.leads = [];
    db.leads.unshift(lead);
    await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
}

export async function GET() {
    try {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
            if (!error) return NextResponse.json({ leads: data || [], v: "1.0.6" });
        }

        const raw = await readFile(dbPath, "utf8").catch(() => "{\"leads\":[]}");
        const db = JSON.parse(raw || "{\"leads\":[]}");
        return NextResponse.json({ leads: db.leads || [], v: "1.0.6-fs" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, v: "1.0.6-err" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // 1. Safe Body Parse
        let body: any;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const {
            name, phone, city, budget, serviceType,
            utm_source, utm_medium, utm_campaign, utm_content, utm_term
        } = body;

        if (!name || !phone) {
            return NextResponse.json({ error: "Name and Phone required" }, { status: 400 });
        }

        // 2. Lead data preparation
        const baseLead = {
            name: String(name),
            phone: String(phone),
            city: String(city || ""),
            budget: String(budget || ""),
            service: String(serviceType || ""),
            status: "New",
            date: new Date().toISOString().split("T")[0],
            created_at: new Date().toISOString(),
        };

        const utmFields = {
            utm_source: utm_source ? String(utm_source) : null,
            utm_medium: utm_medium ? String(utm_medium) : null,
            utm_campaign: utm_campaign ? String(utm_campaign) : null,
            utm_content: utm_content ? String(utm_content) : null,
            utm_term: utm_term ? String(utm_term) : null,
        };

        const fullLead = { ...baseLead, ...utmFields, id: Date.now() };

        // 3. Database attempt
        const supabase = getSupabaseClient();
        if (supabase) {
            try {
                const { data, error } = await supabase.from("leads").insert([{ ...baseLead, ...utmFields }]).select();
                if (!error && Array.isArray(data) && data[0]) return NextResponse.json(data[0], { status: 201 });

                if (error?.code === "42703") {
                    const { data: bData, error: bErr } = await supabase.from("leads").insert([baseLead]).select();
                    if (!bErr && Array.isArray(bData) && bData[0]) return NextResponse.json(bData[0], { status: 201 });
                }
            } catch (supaErr) {
                console.error("Supabase fail-safe hit");
            }
        }

        // 4. File-system attempt
        try {
            await appendLeadToLocalDb(fullLead);
            return NextResponse.json(fullLead, { status: 201 });
        } catch (fsErr) {
            const message = fsErr instanceof Error ? fsErr.message : "Local write failed";
            return NextResponse.json(
                {
                    error: "Lead storage is not configured. Add Supabase env vars on production.",
                    detail: message,
                },
                { status: 503 }
            );
        }

    } catch (fatal: any) {
        return new NextResponse(
            JSON.stringify({
                error: fatal.message || "Fatal Server Error",
                trace: "API_CRASH_PROTECT"
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
