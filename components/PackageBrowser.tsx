"use client";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Cat, PACKAGES, Pkg, fmt } from "@/lib/data";
import { sendEnquiry, toast, validEmail } from "@/lib/client";

function Thumb({ p }: { p: Pkg }) {
  return (
    <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx="300" cy="60" r="28" fill="#fff" opacity=".35" />
      <path d="M0 130 Q100 100 200 130 T400 120 V170 H0Z" fill="#000" opacity=".25" />
    </svg>
  );
}

function BookingForm({ pkg, onDone }: { pkg: Pkg; onDone: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [trav, setTrav] = useState(2);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { const t = Number(localStorage.getItem("wl-trav")); if (t) setTrav(t); }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !validEmail(email.trim())) { setErr("Enter your name and a valid email so we can reply."); return; }
    setBusy(true); setErr("");
    const ok = await sendEnquiry({ type: "booking", name: name.trim(), email: email.trim(), pkg: pkg.n, travellers: trav, total: pkg.p * trav });
    setBusy(false);
    if (ok) { toast(`Thanks ${name.trim().split(" ")[0]}! We’ll email your ${pkg.n} itinerary soon.`); onDone(); }
    else setErr("We couldn’t send that. Please try again.");
  }

  return (
    <div className="dlg">
      <button className="close" aria-label="Close" onClick={onDone}>✕</button>
      <h3 style={{ fontSize: "2rem" }}>{pkg.n}</h3>
      <p className="meta">{pkg.d} nights · {pkg.c} · for {trav} traveller{trav > 1 ? "s" : ""}</p>
      <ul>{pkg.i.map((x) => <li key={x}>{x}</li>)}</ul>
      <div className="stepper">
        <button type="button" aria-label="Fewer travellers" onClick={() => setTrav(Math.max(1, trav - 1))}>−</button>
        <output>{trav}</output>
        <button type="button" aria-label="More travellers" onClick={() => setTrav(Math.min(12, trav + 1))}>+</button>
        <span className="meta">travellers</span>
      </div>
      <p><b style={{ font: "600 1.8rem var(--serif)" }}>{fmt(pkg.p * trav)}</b> <span className="meta">total for {trav}</span></p>
      <form onSubmit={submit} noValidate>
        <div className="row">
          <input placeholder="Your name" aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="err">{err}</div>
        <button className="btn" type="submit" style={{ width: "100%" }} disabled={busy}>{busy ? "Sending…" : "Request this package"}</button>
      </form>
    </div>
  );
}

type Props = { category?: Cat; featured?: number[]; controls?: boolean };

export default function PackageBrowser({ category, featured, controls = true }: Props) {
  const [budget, setBudget] = useState(6000);
  const [sort, setSort] = useState("rec");
  const [wish, setWish] = useState<number[]>([]);
  const [sel, setSel] = useState<Pkg | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => { try { setWish(JSON.parse(localStorage.getItem("wl") || "[]")); } catch {} }, []);
  useEffect(() => { if (sel) dlg.current?.showModal(); }, [sel]);

  function toggle(id: number) {
    const has = wish.includes(id);
    const next = has ? wish.filter((x) => x !== id) : [...wish, id];
    setWish(next);
    localStorage.setItem("wl", JSON.stringify(next));
    toast(has ? "Removed from wishlist" : "Saved to your wishlist");
  }

  let list = PACKAGES.filter((p) => (featured ? featured.includes(p.id) : (!category || p.c === category) && p.p <= budget));
  if (sort === "lo") list = [...list].sort((a, b) => a.p - b.p);
  if (sort === "hi") list = [...list].sort((a, b) => b.p - a.p);

  const chips: [string, string, Cat | undefined][] = [["All", "/packages", undefined], ["Beach", "/packages/beach", "Beach"], ["Culture", "/packages/culture", "Culture"], ["Adventure", "/packages/adventure", "Adventure"]];

  return (
    <>
      {controls && !featured && (
        <div className="toolbar">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {chips.map(([label, href, c]) => (
              <Link key={label} href={href} className="chip" aria-pressed={category === c}>{label}</Link>
            ))}
          </div>
          <label className="range">Up to <input type="range" min={1500} max={6000} step={100} value={budget} onChange={(e) => setBudget(+e.target.value)} /><b>{fmt(budget)}</b></label>
          <select style={{ width: "auto" }} aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rec">Recommended</option>
            <option value="lo">Price: low to high</option>
            <option value="hi">Price: high to low</option>
          </select>
        </div>
      )}
      <div className="grid">
        {list.length === 0 && <p className="empty">No packages match. Try a higher budget or another style.</p>}
        {list.map((p) => (
          <article className="card" key={p.id}>
            <div className="thumb" style={{ background: `linear-gradient(${p.h[0]},${p.h[1]})` }}>
              <Thumb p={p} />
              <button className="heart" aria-label={`Save ${p.n}`} aria-pressed={wish.includes(p.id)} onClick={() => toggle(p.id)}>{wish.includes(p.id) ? "♥" : "♡"}</button>
            </div>
            <div className="body">
              <h3>{p.n}</h3>
              <p className="meta">{p.c} · {p.d} nights · flights included</p>
              <div className="price">
                <span><b>{fmt(p.p)}</b> <small>per person</small></span>
                <button className="btn" onClick={() => setSel(p)}>View details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <dialog ref={dlg} onClose={() => setSel(null)} onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}>
        {sel && <BookingForm pkg={sel} onDone={() => dlg.current?.close()} />}
      </dialog>
    </>
  );
}
