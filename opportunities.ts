import type { Prisma, WorkArrangement, EmploymentType } from "@prisma/client";
import { db } from "./db";
import { isPubliclyVisible } from "./publication";

export const CLASS_LABEL: Record<string, string> = {
  INDEPENDENT_RESEARCH: "Independently researched public opportunity",
  PUBLIC_EMPLOYER_LISTING: "Public employer listing shared for information",
  AUTHORIZED_RECRUITMENT: "Authorized recruitment assignment",
};
export const ARRANGEMENTS = ["REMOTE", "HYBRID", "ON_SITE"] as const;
export const TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERNSHIP", "OTHER"] as const;
export const nice = (s: string) => s.replace("_", " ").toLowerCase().replace(/^./, (c) => c.toUpperCase());

// Explicit select: verificationNotes and authorization evidence are never returned.
const select = {
  slug: true, title: true, employerName: true, employerWebsite: true, location: true, country: true,
  workArrangement: true, remoteEligibility: true, employmentType: true, industry: true,
  salaryMin: true, salaryMax: true, salaryCurrency: true, salaryPeriod: true, summary: true, description: true,
  essentialReqs: true, preferredQuals: true, deadline: true, employerPostedAt: true, lastVerifiedAt: true,
  classification: true, authorizationStatus: true, status: true,
  authorization: { select: { id: true } },
  sources: { select: { sourceUrl: true, applicationUrl: true }, orderBy: { isPrimary: "desc" as const }, take: 1 },
} satisfies Prisma.OpportunitySelect;

type Row = Prisma.OpportunityGetPayload<{ select: typeof select }>;
export type PublicOpportunity = Omit<Row, "authorization" | "sources"> & { sourceUrl: string; applicationUrl: string | null };

function toPublic(r: Row): PublicOpportunity | null {
  const s = r.sources[0];
  const ok = isPubliclyVisible({
    status: r.status, classification: r.classification, authorizationStatus: r.authorizationStatus,
    hasAuthorizationEvidence: !!r.authorization, sourceUrl: s?.sourceUrl, lastVerifiedAt: r.lastVerifiedAt,
    deadline: r.deadline, salaryMin: r.salaryMin, salaryMax: r.salaryMax,
  });
  if (!ok || !s) return null;
  const { authorization: _a, sources: _s, ...rest } = r;
  return { ...rest, sourceUrl: s.sourceUrl, applicationUrl: s.applicationUrl };
}

const baseWhere = (now: Date): Prisma.OpportunityWhereInput[] => [
  { status: "ACTIVE" }, { lastVerifiedAt: { not: null } }, { sources: { some: {} } },
  { OR: [{ deadline: null }, { deadline: { gte: now } }] },
];

export interface Search { q?: string; country?: string; arrangement?: string; type?: string; page: number; pageSize?: number }

export async function searchOpportunities(p: Search) {
  const pageSize = p.pageSize ?? 10;
  if (!db) return { items: [] as PublicOpportunity[], total: 0, pageSize, configured: false, failed: false };
  try {
    const AND = baseWhere(new Date());
    if (p.q) AND.push({ OR: [{ title: { contains: p.q, mode: "insensitive" } }, { employerName: { contains: p.q, mode: "insensitive" } }, { industry: { contains: p.q, mode: "insensitive" } }] });
    if (p.country) AND.push({ OR: [{ country: { contains: p.country, mode: "insensitive" } }, { location: { contains: p.country, mode: "insensitive" } }] });
    if ((ARRANGEMENTS as readonly string[]).includes(p.arrangement ?? "")) AND.push({ workArrangement: p.arrangement as WorkArrangement });
    if ((TYPES as readonly string[]).includes(p.type ?? "")) AND.push({ employmentType: p.type as EmploymentType });
    const where = { AND };
    const [rows, total] = await Promise.all([
      db.opportunity.findMany({ where, select, orderBy: { lastVerifiedAt: "desc" }, skip: (p.page - 1) * pageSize, take: pageSize }),
      db.opportunity.count({ where }),
    ]);
    return { items: rows.map(toPublic).filter((x): x is PublicOpportunity => x !== null), total, pageSize, configured: true, failed: false };
  } catch {
    return { items: [] as PublicOpportunity[], total: 0, pageSize, configured: true, failed: true };
  }
}

export async function getOpportunity(slug: string): Promise<PublicOpportunity | null> {
  if (!db) return null;
  try {
    const r = await db.opportunity.findFirst({ where: { AND: [{ slug }, ...baseWhere(new Date())] }, select });
    return r ? toPublic(r) : null;
  } catch { return null; }
}
