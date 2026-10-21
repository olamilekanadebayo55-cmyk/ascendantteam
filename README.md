# Ascendant Talent

Talent-sourcing research and career-opportunity platform for Ascendant Groups.

## How the site is built
The public site is a single self-contained page, `src/site/index.html` (HTML, CSS and a small hash-routed script for every page: home, opportunities, how it works, about, candidates, employers, contact, privacy, terms, disclaimer and the staff editor). A tiny Next.js route (`src/app/route.ts`) serves that file at `/` so the project builds and deploys as a standard Next.js app.

To change copy or styling, edit `src/site/index.html`. The site config (`CONFIG`) and published listings (`PUBLISHED`) are at the top of its script.

## Earlier work
The earlier Next.js + Prisma prototype (pages, publication rules, database schema and architecture notes) is kept in `legacy/` for reference. It is not part of the build.
