"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/packages", label: "All packages" },
  { href: "/packages/beach", label: "Beach" },
  { href: "/packages/culture", label: "Culture" },
  { href: "/packages/adventure", label: "Adventure" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <header>
      <div className="wrap nav">
        <Link className="logo" href="/">Wonder<span>lux</span></Link>
        <nav aria-label="Main">
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
          <ul id="menu" className={open ? "open" : ""}>
            {LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</Link></li>
            ))}
            <li><Link className="btn" href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
