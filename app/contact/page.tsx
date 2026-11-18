import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="page alt"><div className="wrap" style={{ maxWidth: 720 }}>
      <div className="head"><h2>Tell us where you’d like to go</h2><p>A consultant replies within one working day with a first itinerary.</p></div>
      <ContactForm />
    </div></section>
  );
}
