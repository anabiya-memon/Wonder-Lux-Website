"use client";
import { FormEvent, useState } from "react";
import { sendEnquiry, toast, validEmail } from "@/lib/client";

export function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!f.name.trim() || !validEmail(f.email.trim())) { setErr("Add your name and a valid email address."); return; }
    setErr(""); setBusy(true);
    const ok = await sendEnquiry({ type: "contact", ...f });
    setBusy(false);
    if (ok) { setF({ name: "", email: "", message: "" }); toast("Enquiry sent. We’ll reply within one working day."); }
    else setErr("We couldn’t send that. Please try again.");
  }
  return (
    <form className="dlg" style={{ padding: 0 }} onSubmit={submit} noValidate>
      <div className="row">
        <label>Name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label>Email<input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
      </div>
      <label>Your ideas<textarea rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></label>
      <div className="err">{err}</div>
      <button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!validEmail(email.trim())) { toast("Enter a valid email address."); return; }
    const ok = await sendEnquiry({ type: "newsletter", name: "Subscriber", email: email.trim() });
    if (ok) { setEmail(""); toast("You’re on the list. New journeys will reach your inbox."); }
    else toast("We couldn’t subscribe you. Please try again.");
  }
  return (
    <form className="nl" onSubmit={submit} noValidate>
      <input type="email" placeholder="Your email" aria-label="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn" type="submit">Subscribe</button>
    </form>
  );
}
