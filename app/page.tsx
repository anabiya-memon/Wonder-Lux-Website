import Link from "next/link";
import type { CSSProperties } from "react";
import Hero from "@/components/Hero";
import PackageBrowser from "@/components/PackageBrowser";
import { Newsletter } from "@/components/Forms";
import { Testimonials } from "@/components/Interactive";

const g = (a: string, b: string) => ({ "--a": a, "--b": b }) as CSSProperties;
const PLACES = ["Maldives", "Santorini", "Kyoto", "Swiss Alps", "Marrakech", "Bali", "Patagonia"];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mq" aria-hidden="true">
        <div className="mqt">{[...PLACES, ...PLACES].map((p, i) => <span key={i}>{p}</span>)}</div>
      </section>

      <section className="s96"><div className="wrap">
        <div className="head"><h2>Why travellers choose Wonderlux</h2><p>We handle the details that usually go wrong, so your time away stays yours.</p></div>
        <div className="feat">
          <div className="fi"><h3>Local experts</h3><p>Every route is built by consultants who have stayed, eaten and walked it themselves.</p></div>
          <div className="fi"><h3>One clear price</h3><p>Flights, stays, transfers and guides are included. No surprises at checkout.</p></div>
          <div className="fi"><h3>Support all day and night</h3><p>A real person answers at any hour, in any time zone, while you are away.</p></div>
          <div className="fi"><h3>Easy changes</h3><p>Plans shift. We rebook flights and stays without making you start over.</p></div>
        </div>
      </div></section>

      <section className="s80 alt"><div className="wrap">
        <div className="head"><h2>Choose how you travel</h2><p>Three styles, each with its own page of hand-built packages.</p></div>
        <div className="cats3">
          <Link className="cc" href="/packages/beach" style={g("#0b4f6c", "#2bb5b0")}><h3>Beach holidays</h3><p>Villas, islands and slow days by the sea.</p></Link>
          <Link className="cc" href="/packages/culture" style={g("#2b2f45", "#c05a68")}><h3>Culture trips</h3><p>Old cities, local kitchens and quiet temples.</p></Link>
          <Link className="cc" href="/packages/adventure" style={g("#16294a", "#7fa6d0")}><h3>Adventure</h3><p>Glaciers, trails and wild places with expert guides.</p></Link>
        </div>
        <p style={{ marginTop: 32 }}><Link className="btn" href="/about">About Wonderlux</Link></p>
      </div></section>

      <section className="s96"><div className="wrap">
        <div className="head"><h2>Featured journeys</h2><p>The packages our travellers request most this season.</p></div>
        <PackageBrowser featured={[1, 3, 4]} />
        <p style={{ marginTop: 32 }}><Link className="btn" href="/packages">See all packages</Link></p>
      </div></section>

      <section className="s96 alt"><div className="wrap">
        <div className="head"><h2>How your trip comes together</h2></div>
        <div className="steps">
          <div className="st"><h3>Tell us your plans</h3><p>Share dates, budget and what a good trip means to you.</p></div>
          <div className="st"><h3>Receive an itinerary</h3><p>Within one working day you get a day-by-day plan with prices.</p></div>
          <div className="st"><h3>Refine it together</h3><p>Swap hotels, add experiences or change the pace until it fits.</p></div>
          <div className="st"><h3>Travel with support</h3><p>Documents, transfers and a local host are ready when you land.</p></div>
        </div>
      </div></section>

      <section className="s96"><div className="wrap">
        <div className="head"><h2>Where we send people</h2><p>Scroll sideways and pick a style of trip.</p></div>
        <div className="tiles">
          <Link className="tile" href="/packages/beach" style={g("#0b4f6c", "#2bb5b0")}><h3>Maldives</h3><p>Overwater villas</p></Link>
          <Link className="tile" href="/packages/beach" style={g("#3b2a5a", "#e8895a")}><h3>Santorini</h3><p>Caldera sunsets</p></Link>
          <Link className="tile" href="/packages/culture" style={g("#2b2f45", "#c05a68")}><h3>Kyoto</h3><p>Temples and tea houses</p></Link>
          <Link className="tile" href="/packages/adventure" style={g("#16294a", "#7fa6d0")}><h3>Swiss Alps</h3><p>Glacier railways</p></Link>
          <Link className="tile" href="/packages/culture" style={g("#5a2b1b", "#e3a45a")}><h3>Morocco</h3><p>Medinas and desert camps</p></Link>
          <Link className="tile" href="/packages/adventure" style={g("#12332f", "#8bb08a")}><h3>Patagonia</h3><p>Lodge-based trekking</p></Link>
        </div>
      </div></section>

      <section className="s96"><div className="wrap"><Testimonials /></div></section>

      <section className="s80 alt"><div className="wrap narrow">
        <div className="head"><h2>Good to know</h2></div>
        <details><summary>What is included in the price?</summary><p>Return flights, hotels, private transfers, listed activities and a local host.</p></details>
        <details><summary>Can I change my plans after booking?</summary><p>Yes. Most changes are free up to 30 days before departure.</p></details>
        <details><summary>Do you plan trips for families or groups?</summary><p>Yes. Tell us the group size and ages and we will adjust rooms and pace.</p></details>
        <details><summary>How soon will I hear back?</summary><p>A consultant replies within one working day with a first itinerary.</p></details>
      </div></section>

      <section className="cta"><div className="wrap">
        <h2>Get new journeys in your inbox</h2>
        <p style={{ marginTop: 12, opacity: 0.9 }}>One email a month. Real itineraries, no spam.</p>
        <Newsletter />
      </div></section>
    </>
  );
}
