# Ascendant Talent

Talent-sourcing research and career-opportunity platform for Ascendant Groups.

## What this version contains
- Public site: homepage, opportunity directory (search, filters, pagination), opportunity detail pages, how it works, about, candidates, employers, contact, privacy, terms, disclaimer, 404, robots.txt, sitemap.xml.
- Publication gate (`src/lib/publication.ts`): a listing appears only if it is Active, has a valid source URL and verified date, is not past its deadline, and (for authorized recruitment) has verified evidence.
- Database schema (`prisma/schema.prisma`) for the full platform.
- Works with **no database**: pages show honest empty states. Nothing is invented.

## Not built yet
Admin dashboard and login, candidate/employer enquiry forms and CV upload, email notifications, JSON-LD, analytics, end-to-end tests. The candidates/employers/contact/privacy/terms pages are marked as placeholders until the client supplies approved content.
Until the admin exists, opportunities can only be added directly in the database.

## Deploy on Vercel
1. Push to GitHub (upload ALL files and folders, including `src`, `prisma`, `docs`) and import the repo in Vercel (framework: Next.js, defaults are fine).
2. Click Deploy. No environment variables are required for the first deploy.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your final domain. Search engines are blocked on preview deployments and allowed only on Production.

## Connect a database (to show real listings)
1. Create a free PostgreSQL database (Neon or Supabase) and copy its connection string.
2. On your computer: `npm install`, set `DATABASE_URL` in a `.env` file, then run `npx prisma db push` to create the tables.
3. Add `DATABASE_URL` in Vercel > Settings > Environment Variables and redeploy.

## Checks
`npm test` runs the publication-rule tests. `npm run typecheck` runs TypeScript.
