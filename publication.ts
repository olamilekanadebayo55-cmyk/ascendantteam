export type Classification = "INDEPENDENT_RESEARCH" | "PUBLIC_EMPLOYER_LISTING" | "AUTHORIZED_RECRUITMENT";
export type Status = "DRAFT" | "PENDING_VERIFICATION" | "ACTIVE" | "UNDER_REVIEW" | "EXPIRED" | "WITHDRAWN" | "REJECTED";

export interface PublishCandidate {
  status: Status;
  classification: Classification;
  authorizationStatus: "NONE" | "CLAIMED" | "VERIFIED";
  hasAuthorizationEvidence: boolean;
  sourceUrl?: string | null;
  lastVerifiedAt?: Date | null;
  deadline?: Date | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
}

export function isSafeHttpUrl(value?: string | null): boolean {
  if (!value) return false;
  try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:"; }
  catch { return false; }
}

/** Returns a list of blocking problems. Empty list = may be published. */
export function publicationProblems(o: PublishCandidate, now = new Date()): string[] {
  const p: string[] = [];
  if (!isSafeHttpUrl(o.sourceUrl)) p.push("A valid source URL is required.");
  if (!o.lastVerifiedAt) p.push("A last-verified date is required.");
  else if (o.lastVerifiedAt > now) p.push("Last-verified date cannot be in the future.");
  if (o.deadline && o.deadline < now) p.push("Application deadline has already passed.");
  if (o.salaryMin != null && o.salaryMax != null && o.salaryMin > o.salaryMax) p.push("Salary minimum exceeds maximum.");
  if (o.classification === "AUTHORIZED_RECRUITMENT" &&
      !(o.authorizationStatus === "VERIFIED" && o.hasAuthorizationEvidence))
    p.push("Authorized recruitment requires verified authorization with evidence.");
  return p;
}

/** Public visibility: ACTIVE + no blocking problems. Used by every public query/page/sitemap. */
export function isPubliclyVisible(o: PublishCandidate, now = new Date()): boolean {
  return o.status === "ACTIVE" && publicationProblems(o, now).length === 0;
}
