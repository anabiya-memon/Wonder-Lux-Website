"use client";
import { useEffect, useRef, useState } from "react";

export function Stats() {
  const items = [[14000, "Happy travellers", "+"], [62, "Countries covered", "+"], [15, "Years of experience", "+"], [98, "Would book again", "%"]] as const;
  return (
    <div className="stats">
      {items.map(([n, label, s]) => <Stat key={label} n={n} label={label} s={s} />)}
    </div>
  );
}

function Stat({ n, label, s }: { n: number; label: string; s: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const st = performance.now();
      const f = (t: number) => {
        const k = Math.min(1, (t - st) / 1400);
        setV(Math.round(n * k));
        if (k < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return (
    <div className="stat">
      <b ref={ref}>{v.toLocaleString("en-US")}{v === n ? s : ""}</b>
      <span>{label}</span>
    </div>
  );
}

const TABS = [
  ["Tailored", "Every itinerary is built around you: pace, budget, dietary needs and the moments you care about. No templates, no rush."],
  ["Trusted", "Fully licensed and bonded, with 24/7 support from a real person while you travel. If plans change, we rebook for you."],
  ["Responsible", "We choose locally owned stays and guides, offset flights and donate a share of each booking to community projects at your destination."],
];

export function AboutTabs() {
  const [i, setI] = useState(0);
  return (
    <>
      <div className="tabs" role="tablist">
        {TABS.map(([t], k) => (
          <button key={t} className="tab" role="tab" aria-selected={i === k} onClick={() => setI(k)}>{t}</button>
        ))}
      </div>
      <p id="tabtext">{TABS[i][1]}</p>
    </>
  );
}

const TS = [
  ["Maya R.", "Maldives", "Every transfer was timed to the minute. We never once opened a map."],
  ["Daniel and Priya", "Kyoto", "Our guide took us to temples before the crowds. It felt like a private city."],
  ["Hassan A.", "Swiss Alps", "One message when our train was delayed, and the whole day was rebooked."],
  ["Elena V.", "Santorini", "Wonderlux found the quiet corners. Best honeymoon we could have asked for."],
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % TS.length), 6000);
    return () => clearInterval(t);
  }, [auto]);
  return (
    <div className="quote">
      <div key={i}>
        <p>“{TS[i][2]}”</p>
        <b>{TS[i][0]}</b>, {TS[i][1]}
      </div>
      <div className="dots">
        {TS.map((_, k) => <button key={k} aria-label={`Review ${k + 1}`} aria-current={k === i} onClick={() => { setAuto(false); setI(k); }} />)}
      </div>
    </div>
  );
}
