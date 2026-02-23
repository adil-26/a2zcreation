import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
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
            const { data, error } = await supabase.from("projects").select("*");
            if (error) throw error;
            return NextResponse.json(data);
        }

        // Fallback to local db.json
        const raw = await readFile(dbPath, "utf8");
        const db = JSON.parse(raw);
        return NextResponse.json(db.projects || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
