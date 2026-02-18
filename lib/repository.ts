import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const dbPath = path.join(process.cwd(), "data", "db.json");

// Define Interfaces
export interface Service { slug: string; title: string; summary: string;[key: string]: any; }
export interface Project { slug: string; title: string;[key: string]: any; }
export interface City { slug: string; name: string;[key: string]: any; }
export interface Blog { slug: string; title: string; excerpt: string; content: string;[key: string]: any; }
export interface DesignIdea { room: string;[key: string]: any; }
export interface Lead { id: number;[key: string]: any; }

async function readLocalDb() {
  const raw = await readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function fetchTable<T = any>(table: string): Promise<T[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const local = await readLocalDb();
    return (local[table] as T[]) || [];
  }
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw new Error(`Supabase ${table} fetch failed: ${error.message}`);
  return (data as T[]) || [];
}

export async function getServices() {
  return fetchTable<Service>("services");
}

export async function getServiceBySlug(slug: string) {
  const services = await getServices();
  return services.find((item) => item.slug === slug) || null;
}

export async function getDesignIdeasByRoom(room: string) {
  const rows = await fetchTable<DesignIdea>("designIdeas");
  return rows.find((item) => item.room === room) || null;
}

export async function getProjects() {
  return fetchTable<Project>("projects");
}

export async function getProjectBySlug(slug: string) {
  const rows = await getProjects();
  return rows.find((item) => item.slug === slug) || null;
}

export async function getCities() {
  return fetchTable<City>("cities");
}

export async function getCityBySlug(slug: string) {
  const rows = await getCities();
  return rows.find((item) => item.slug === slug) || null;
}

export async function getBlogs() {
  return fetchTable<Blog>("blogs");
}

export async function getBlogBySlug(slug: string) {
  const rows = await getBlogs();
  return rows.find((item) => item.slug === slug) || null;
}

export async function getLeads() {
  return fetchTable<Lead>("leads");
}
