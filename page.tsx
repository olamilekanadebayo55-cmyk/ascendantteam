import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(PAGES).map((page) => ({ page })); }
type P = { params: Promise<{ page: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = PAGES[(await params).page];
  return p ? { title: p.title, description: p.description } : {};
}
export default async function Page({ params }: P) {
  const p = PAGES[(await params).page];
  if (!p) notFound();
  return (
    <>
      <h1>{p.title}</h1>
      {p.placeholder && <p className="notice">Parts of this page are development placeholders awaiting approved content.</p>}
      {p.sections.map((s) => <section key={s.h}><h2>{s.h}</h2>{s.p.map((t) => <p key={t}>{t}</p>)}</section>)}
    </>
  );
}
