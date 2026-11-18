import type { Metadata } from "next";
import { AboutTabs, Stats } from "@/components/Interactive";

export const metadata: Metadata = { title: "About us" };

export default function About() {
  return (
    <section className="page"><div className="wrap about-grid">
      <div>
        <div className="head" style={{ marginBottom: 0 }}>
          <h2>Travel planned by people who have been there</h2>
          <p>Wonderlux began in 2011 with one belief: a great trip should feel effortless. Our consultants visit every hotel, guide and route we sell, then handle flights, transfers and surprises so you can simply arrive.</p>
        </div>
        <AboutTabs />
      </div>
      <Stats />
    </div></section>
  );
}
