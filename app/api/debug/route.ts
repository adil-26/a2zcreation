import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
    const diagnostics = {
        time: new Date().toISOString(),
        node_version: process.version,
        env: {
            has_supabase_url: !!process.env.SUPABASE_URL,
            has_supabase_key: !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY),
        },
        cwd: process.cwd(),
        db_path: path.join(process.cwd(), "data", "db.json"),
        fs_check: false as boolean | string,
    };

    try {
        const raw = await readFile(diagnostics.db_path, "utf8");
        diagnostics.fs_check = !!raw;
    } catch (e: any) {
        diagnostics.fs_check = `Error: ${e.message}`;
    }

    return NextResponse.json(diagnostics);
}
