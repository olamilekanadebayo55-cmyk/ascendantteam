import { readFileSync } from "node:fs";
import { join } from "node:path";

// The whole public site is the single-page app in src/site/index.html (hash routing).
export const dynamic = "force-static";

export function GET() {
  const html = readFileSync(join(process.cwd(), "src/site/index.html"), "utf8");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
