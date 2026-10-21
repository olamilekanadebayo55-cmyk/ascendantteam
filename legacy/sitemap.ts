import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/pages";
import { searchOpportunities } from "@/lib/opportunities";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  const pages = ["", "/opportunities", ...Object.keys(PAGES).map((k) => `/${k}`)].map((p) => ({ url: base + p }));
  const r = await searchOpportunities({ page: 1, pageSize: 500 });
  return [...pages, ...r.items.map((o) => ({ url: `${base}/opportunities/${o.slug}`, lastModified: o.lastVerifiedAt ?? undefined }))];
}
