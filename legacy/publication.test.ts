import { describe, it, expect } from "vitest";
import { isPubliclyVisible, publicationProblems } from "./publication";
const base = { status: "ACTIVE", classification: "INDEPENDENT_RESEARCH", authorizationStatus: "NONE",
  hasAuthorizationEvidence: false, sourceUrl: "https://example.com/job", lastVerifiedAt: new Date("2026-10-01") } as const;
describe("publication rules", () => {
  it("shows a verified active listing", () => expect(isPubliclyVisible({ ...base })).toBe(true));
  it("hides drafts", () => expect(isPubliclyVisible({ ...base, status: "DRAFT" })).toBe(false));
  it("requires source URL", () => expect(publicationProblems({ ...base, sourceUrl: null })).not.toEqual([]));
  it("rejects javascript: URLs", () => expect(isPubliclyVisible({ ...base, sourceUrl: "javascript:alert(1)" })).toBe(false));
  it("requires verification date", () => expect(isPubliclyVisible({ ...base, lastVerifiedAt: null })).toBe(false));
  it("blocks authorized claim without evidence", () =>
    expect(isPubliclyVisible({ ...base, classification: "AUTHORIZED_RECRUITMENT", authorizationStatus: "CLAIMED" })).toBe(false));
  it("allows authorized claim with verified evidence", () =>
    expect(isPubliclyVisible({ ...base, classification: "AUTHORIZED_RECRUITMENT", authorizationStatus: "VERIFIED", hasAuthorizationEvidence: true })).toBe(true));
  it("hides past-deadline listings", () => expect(isPubliclyVisible({ ...base, deadline: new Date("2020-01-01") })).toBe(false));
});
