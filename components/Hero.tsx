"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DEST, DEST_KEYS, DestKey } from "@/lib/data";

export default function Hero() {
  const router = useRouter();
  const [k, setK] = useState<DestKey>("Maldives");
  const [auto, setAuto] = useState(true);
  const [cat, setCat] = useState("all");
  const [trav, setTrav] = useState(2);
  const scene = useRef<SVGSVGElement>(null);
  const d = DEST[k];

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const t = setInterval(() => setK((p) => DEST_KEYS[(DEST_KEYS.indexOf(p) + 1) % DEST_KEYS.length]), 6500);
    return () => clearInterval(t);
  }, [auto]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const on = () => {
      const y = window.scrollY;
      if (y < 1200 && scene.current) scene.current.style.transform = `translateY(${y * 0.2}px) scale(1.2)`;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="hero">
      <svg id="scene" ref={scene} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={d.a[0]} />
            <stop offset="1" stopColor={d.a[1]} />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#sky)" />
        <circle id="sun" cx="800" cy={d.sy} r="90" fill={d.sun} opacity=".9" />
        <path id="far" d={d.far} fill="#000" opacity=".18" />
        <path id="near" d="M0 640 Q300 580 600 640 T1200 620 V800 H0Z" fill="#000" opacity=".3" />
        <g id="plane"><path d="M0 0 L46 9 L0 18 L11 9Z" fill="#fff" opacity=".85" /></g>
      </svg>
      <div className="wrap hero-in">
        <div>
          <div className="dest-tabs" role="group" aria-label="Pick a destination">
            {DEST_KEYS.map((key) => (
              <button key={key} className="chip" aria-pressed={key === k} onClick={() => { setAuto(false); setK(key); }}>{DEST[key].t}</button>
            ))}
          </div>
          <h1>{d.t}</h1>
          <p className="lead">{d.x}</p>
          <div className="facts">{d.f.map((x) => <span key={x}>{x}</span>)}</div>
        </div>
        <form
          className="finder"
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("wl-trav", String(trav));
            router.push(cat === "all" ? "/packages" : `/packages/${cat}`);
          }}
        >
          <strong style={{ font: "600 1.5rem var(--serif)" }}>Find your journey</strong>
          <label>Interested in
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="all">Anywhere</option>
              <option value="beach">Beach</option>
              <option value="culture">Culture</option>
              <option value="adventure">Adventure</option>
            </select>
          </label>
          <label>Travellers
            <div className="stepper">
              <button type="button" aria-label="Fewer travellers" onClick={() => setTrav(Math.max(1, trav - 1))}>−</button>
              <output>{trav}</output>
              <button type="button" aria-label="More travellers" onClick={() => setTrav(Math.min(12, trav + 1))}>+</button>
            </div>
          </label>
          <button className="btn" type="submit">Show packages</button>
        </form>
      </div>
    </section>
  );
}
