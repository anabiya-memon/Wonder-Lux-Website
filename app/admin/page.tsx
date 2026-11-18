"use client";
import { useState } from "react";

type Row = { type: string; name: string; email: string; message?: string; pkg?: string; travellers?: number; total?: number; at: string };

export default function Admin() {
  const [key, setKey] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("Loading…");
    const r = await fetch("/api/enquiries", { headers: { "x-admin-key": key } });
    if (!r.ok) { setRows(null); setMsg(r.status === 401 ? "Wrong key." : "Couldn’t load enquiries."); return; }
    const d = await r.json();
    setRows(d.enquiries);
    setMsg(d.enquiries.length ? `${d.enquiries.length} received` : "No enquiries yet.");
  }

  return (
    <section className="page"><div className="wrap">
      <div className="head"><h2>Enquiries</h2><p>{msg || "Enter your admin key to see what visitors have sent."}</p></div>
      <div className="nl" style={{ margin: "0 0 30px" }}>
        <input type="password" placeholder="Admin key" aria-label="Admin key" value={key} onChange={(e) => setKey(e.target.value)} />
        <button className="btn" onClick={load}>Load</button>
      </div>
      <div className="grid">
        {rows?.map((r, i) => (
          <article className="card" key={i}><div className="body">
            <h3>{r.name}</h3>
            <p className="meta">{r.type} · {r.at.slice(0, 16).replace("T", " ")}</p>
            <p>{r.email}</p>
            <p>{r.pkg ? `${r.pkg} · ${r.travellers} travellers` : r.message}</p>
          </div></article>
        ))}
      </div>
    </div></section>
  );
}
