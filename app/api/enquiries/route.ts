import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

export const runtime = "nodejs";

type Enquiry = { type: string; name: string; email: string; message?: string; pkg?: string; travellers?: number; total?: number; at: string };

// Local dev: ./data/enquiries.json. On Vercel the disk is temporary, so also set RESEND_API_KEY
// (email) or swap saveEnquiry() for a database such as Vercel Postgres, Supabase or MongoDB.
const FILE = path.join(process.env.VERCEL ? os.tmpdir() : process.cwd(), "data", "enquiries.json");

async function readAll(): Promise<Enquiry[]> {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return []; }
}
async function saveEnquiry(e: Enquiry) {
  const all = await readAll();
  all.push(e);
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(all.slice(-500), null, 2));
}
async function notify(e: Enquiry) {
  const key = process.env.RESEND_API_KEY, to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || "Wonderlux <onboarding@resend.dev>",
      to: [to],
      reply_to: e.email,
      subject: `New ${e.type}: ${e.name}`,
      text: `${e.name} <${e.email}>\n${e.pkg ? `${e.pkg} · ${e.travellers} travellers · $${e.total}\n` : ""}${e.message ?? ""}`,
    }),
  }).catch(() => {});
}

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const type = clip(b.type, 20);
  const name = clip(b.name, 100);
  const email = clip(b.email, 200);
  if (!["booking", "contact", "newsletter"].includes(type) || !name || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a name and a valid email." }, { status: 400 });
  }
  const e: Enquiry = { type, name, email, at: new Date().toISOString() };
  if (b.message) e.message = clip(b.message, 2000);
  if (b.pkg) { e.pkg = clip(b.pkg, 120); e.travellers = Math.min(12, Math.max(1, Number(b.travellers) || 1)); e.total = Number(b.total) || 0; }
  try { await saveEnquiry(e); } catch { if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "Could not save" }, { status: 500 }); }
  await notify(e);
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const key = process.env.ADMIN_KEY;
  if (!key || req.headers.get("x-admin-key") !== key) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ enquiries: (await readAll()).reverse() });
}
