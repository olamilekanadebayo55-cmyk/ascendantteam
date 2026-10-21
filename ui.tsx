import Link from "next/link";
import { CLASS_LABEL, nice, type PublicOpportunity } from "@/lib/opportunities";

export const fmt = (d: Date | null) => (d ? d.toLocaleDateString("en-GB", { dateStyle: "medium", timeZone: "UTC" }) : "Not stated");

export function Record({ o }: { o: Pick<PublicOpportunity, "classification" | "sourceUrl" | "employerPostedAt" | "lastVerifiedAt" | "authorizationStatus"> }) {
  let host = "Source";
  try { host = new URL(o.sourceUrl).hostname; } catch {}
  return (
    <dl className="record">
      <div><dt>Classification</dt><dd>{CLASS_LABEL[o.classification]}</dd></div>
      <div><dt>Source</dt><dd><a href={o.sourceUrl} rel="noopener noreferrer nofollow" target="_blank">{host}</a></dd></div>
      <div><dt>Posted by employer</dt><dd>{fmt(o.employerPostedAt)}</dd></div>
      <div><dt>Last verified by us</dt><dd>{fmt(o.lastVerifiedAt)}</dd></div>
      <div><dt>Authorization</dt><dd>{o.authorizationStatus === "VERIFIED" ? "Verified recruitment authorization" : "None. We may not represent the employer."}</dd></div>
    </dl>
  );
}

export function OpportunityItem({ o }: { o: PublicOpportunity }) {
  return (
    <li>
      <h3><Link href={`/opportunities/${o.slug}`}>{o.title}</Link></h3>
      <p className="meta">{[o.employerName, o.location, o.country, nice(o.workArrangement), nice(o.employmentType)].filter(Boolean).join(", ")}</p>
      <p>{o.summary}</p>
      <Record o={o} />
    </li>
  );
}

export function Empty({ failed, configured }: { failed?: boolean; configured?: boolean }) {
  return (
    <div className="empty" role="status">
      <h3>{failed ? "Listings could not be loaded" : "No verified opportunities right now"}</h3>
      <p>{failed ? "Something went wrong while loading listings. Please try again shortly." : "We only publish opportunities that an administrator has checked against a real source. Check back soon, or tell us what you are looking for."}</p>
      {!configured && <p className="meta">Development note: no database is connected yet.</p>}
      <Link className="btn alt" href="/candidates">Candidate enquiries</Link>
    </div>
  );
}
