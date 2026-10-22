# Ascendant Talent: site handover

Two files make the site: `index.html` (everything) and `logo.jpg` (favicon; the logo is also embedded in the page).

## Deploy
Put `index.html` and `logo.jpg` at the ROOT of the GitHub repo and commit. Vercel/Netlify redeploy automatically.
Delete any old `package.json`, `prisma/`, `src/`, `docs/` from the repo. Otherwise Vercel will try to build them as a Next.js app.

## Edit content (top of the `<script>` in index.html, between the EDITABLE CONTENT markers)
- `CONFIG`: `contactEmail`, `endpoint` (a form service URL, e.g. Formspree, so enquiries reach you), business details, `staleDays`.
- `PARTNERS`: organisations shown in the moving strip. Keep the heading "Career Resources & Organizations" unless a partnership is verified. Logos only with permission; put files in a `logos/` folder.
- `TEAM`, `TESTIMONIALS` (permission:true required), `ARTICLES`: add or remove entries in the same format.

## Add and maintain job listings
1. Open `yoursite/#/admin`. Add a listing with its source URL, application URL and verified date. It can be Active only if the publication rules pass.
2. Click "Export for publishing", paste the result into `PUBLISHED`, commit.
3. A listing is hidden from the public site automatically when its deadline passes or when its verified date is older than `staleDays` (default 14). Re-check the source, click "Re-verified today", and export again.

Status shown publicly: Verified Active, or Closing Soon (deadline within 14 days). Everything else is hidden.
