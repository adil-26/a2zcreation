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
  try {
    const raw = await readFile(dbPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Local DB read failed:", err);
    return {};
  }
}

async function fetchTable<T = any>(table: string): Promise<T[]> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from(table).select("*");
      if (!error && data) return data as T[];

      console.warn(`Supabase ${table} fetch failed, using local fallback. Error:`, error?.message);
    }
  } catch (err) {
    console.error(`Supabase ${table} exception:`, err);
  }

  // Fallback to local DB
  const local = await readLocalDb();
  return (local[table] as T[]) || [];
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
