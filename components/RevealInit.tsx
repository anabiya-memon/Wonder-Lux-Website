"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SEL = ".head,.fi,.st,.cc,.tile,.card,.quote,details,.cta .wrap>*";

export default function RevealInit() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("in");
        io.unobserve(el);
        setTimeout(() => (el.style.transitionDelay = ""), 1200);
      }),
      { threshold: 0.15 }
    );
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(SEL).forEach((el, i) => {
        if (el.classList.contains("rv")) return;
        el.classList.add("rv");
        el.style.transitionDelay = (i % 4) * 80 + "ms";
        io.observe(el);
      });
    }, 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [path]);
  return null;
}
