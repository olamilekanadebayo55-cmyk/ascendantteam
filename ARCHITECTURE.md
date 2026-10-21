# Ascendant Talent: Architecture & Design Plan (Phase 1-3)

## Environment findings
- Build sandbox: Node 22, npm 10, Python 3.12. **No network, no Postgres.** Dependencies are not installed and the full app has not been run. Only pure-logic checks have been executed.
- First thing to run locally: `npm install && npx prisma migrate dev && npm run test`.

## Architecture
Single Next.js 15 (App Router, TypeScript) app with server actions and route handlers. A separate NestJS service is unnecessary at this scale (departure from the brief's "or" option, intentional).
- PostgreSQL + Prisma. Zod schemas shared by client and server.
- Sessions: server-side, random token stored hashed (`Session`), HttpOnly cookie, argon2 passwords.
- Roles: `StaffRole` enum + a permission matrix in code (`src/lib/permissions.ts`), enforced in every server action. Simpler than Role/Permission tables; the brief allows "an equivalent structure".
- Storage: S3-compatible private bucket, random keys, short-lived signed URLs. Upload is disabled with an explanation if S3 vars are blank.
- Email: Resend behind an adapter. `emailStatus` on enquiries is stored separately from DB success.
- **Publication gate:** `src/lib/publication.ts` is the single source of truth. Every public query, detail page, sitemap and JobPosting JSON-LD must call it. Add a DB-level guard in the first migration: a CHECK that `status <> 'ACTIVE'` OR (`lastVerifiedAt` IS NOT NULL).
- Public queries use an explicit `select` that omits `verificationNotes`, authorization evidence and internal IDs.

## Build order (remaining)
4 auth + RBAC + audit helper -> 5 directory, filters, detail -> 6 enquiry forms (idempotency key, reference numbers, honeypot + rate limit) -> 7 admin -> 8 email, storage, SEO, analytics -> 9 tests -> 10 deploy docs.

## Design plan
- **Palette** (brief-mandated, contrast to be verified): Charcoal #20211F, Ivory #F7F4ED, Antique gold #A88B52 (decorative/large text only; use a darker gold ~#7D6532 for gold text on ivory), Muted gray #74746E, Stone #E4DFD3, White.
- **Type:** a text serif with real italics for headlines and long reading (Newsreader), paired with a neutral grotesque for UI and data (Hanken Grotesk). Sentence case, no all-caps eyebrows.
- **The one memorable element, the provenance record:** every opportunity carries a compact ruled "record" block: classification, source, date originally published, date last verified by us, authorization status. It is the product's honesty made visible, repeated on cards, detail pages and the homepage hero. Everything else stays quiet.
- **Layout:** left-aligned editorial grid, 12 columns, generous margins, hairline rules only where they encode structure (record rows, list separators). Few rounded corners, no shadows, no stock photos.
- **Hero concept:** a plain headline about researched opportunities and informed connections, beside a sample record styled as a *clearly labelled specimen* of the format (marked "Example of a record", never presented as a real vacancy). With no live listings, the same space shows the empty state.
- **Review against defaults:** the brief pins ivory/charcoal/gold, so those stay. Departures from generic: no terracotta accent, no card grid, no numbered feature rows, no stats band.
- **Assumption:** no approval round was possible; this plan is documented per Phase 3 and can be revised after client review.

## Pending client input
Legal copy (privacy, terms, disclaimer), retention periods, domains, email sender, parent/related brand URLs, logo, approved About content.
