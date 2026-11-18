import type { Metadata } from "next";
import PackageBrowser from "@/components/PackageBrowser";

export const metadata: Metadata = { title: "All packages" };

export default function Packages() {
  return (
    <section className="page"><div className="wrap">
      <div className="head"><h2>Our packages</h2><p>Every package includes flights, stays, private transfers and a local host. Filter by style or budget, then enquire in a minute.</p></div>
      <PackageBrowser />
    </div></section>
  );
}
