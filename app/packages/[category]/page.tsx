import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageBrowser from "@/components/PackageBrowser";
import { CATS } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(CATS).map((category) => ({ category }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  return { title: CATS[category]?.title };
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = CATS[category];
  if (!c) notFound();
  return (
    <section className="page"><div className="wrap">
      <div className="head"><h2>{c.title}</h2><p>{c.text}</p></div>
      <PackageBrowser category={c.name} />
    </div></section>
  );
}
