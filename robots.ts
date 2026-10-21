import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  const live = process.env.VERCEL_ENV === "production";
  return { rules: live ? { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] } : { userAgent: "*", disallow: "/" }, ...(base && live ? { sitemap: `${base}/sitemap.xml` } : {}) };
}
