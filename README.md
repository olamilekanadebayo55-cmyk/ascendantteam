# Ascendant Talent: website handover

A static site: real HTML pages, one stylesheet (`styles.css`) and one script (`site.js`). No build step, no database.

## Deploy
1. Unzip. Upload ALL files (not the zip) to the root of your GitHub repo, committing directly to `main`.
2. Delete the old files from the repo: `partners.json`, `README.md` (old), and anything left from earlier versions (`package.json`, `src`, `prisma`, `legacy`).
3. `vercel.json` turns on clean URLs (/about instead of /about.html). Netlify does this by default.

## Edit settings: top of `site.js`
- `CONFIG.email`, `phone`, `address`: shown in the footer only when filled in. Use real details only.
- `CONFIG.endpoint`: a form service URL (e.g. Formspree) that emails submissions to your business address. Until it is set, the contact form tells visitors their message was NOT sent.
- `CONFIG.careerServicesUrl`: the official Ascendant Career Services link, if it exists.

## Photography
The hero photo is `hero-900.webp` and `hero-600.webp` (two sizes of one image; both must be uploaded). The Who we serve banner uses `serve-800.webp`, `serve-1200.webp`, `serve-1800.webp` (desktop sizes) and `serve-m.webp` (phone crop); upload all four. The About image position still shows a designed graphic until you add a photo:
1. Put an optimized photo (WebP or JPEG, about 900px wide, under 250 KB) in the same folder as `index.html`, and use its file name as `src`.
2. In `site.js`, fill `IMAGES.hero`, `IMAGES.serve` or `IMAGES.about` with `src`, `alt` (a real description) and `credit`.
Shot list: hero, a single experienced professional reading or thinking by a window, natural light, not posed. Who we serve, a mentoring or one-to-one conversation, candid. About, a small working session. No handshakes, no staged smiles. Use licensed sources (e.g. Unsplash, Pexels, Stocksy, Adobe Stock) or your own photography, and never imply the people pictured work for Ascendant Talent.

## Edit content
Open any `.html` file on GitHub and use the pencil icon. Text is plain HTML. Articles are the `article-*.html` files; add one by copying an existing file and adding a row in `resources.html`.

## Before launch
- Complete the bracketed items in `privacy.html`, `terms.html` and `disclaimer.html` and have them reviewed by a qualified professional. Remove the draft notice.
- Confirm every service on `services.html`, especially "Where offered" and "Where available".
- Add the real team to `about.html` (with permission).
- `sitemap.xml` and `robots.txt` use https://ascendantteam.vercel.app. Replace it with your final domain.

## Hero photo licence
Confirm that you hold the right to use the hero photo commercially. If it was made with an AI image tool, check that tool's commercial-use terms. If the licence requires a credit, add a line under the image in `index.html`. The site never states that the person pictured works for Ascendant Talent.
