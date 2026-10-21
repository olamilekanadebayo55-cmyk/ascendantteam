import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], variable: "--serif", style: ["normal", "italic"], display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--sans", display: "swap" });
const site = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const isProd = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Ascendant Talent: researched career opportunities", template: "%s | Ascendant Talent" },
  description: "Publicly available career opportunities, researched and checked against their sources. A service of Ascendant Groups.",
  robots: isProd ? { index: true, follow: true } : { index: false, follow: false },
};

const NAV: [string, string][] = [["/opportunities", "Opportunities"], ["/how-it-works", "How it works"], ["/candidates", "Candidates"], ["/employers", "Employers"], ["/about", "About"]];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const parent = process.env.NEXT_PUBLIC_PARENT_URL;
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site"><div className="wrap">
          <Link className="brand" href="/">Ascendant Talent<small>A service of Ascendant Groups</small></Link>
          <nav aria-label="Primary"><ul>
            {NAV.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}
            <li><Link className="btn" href="/contact">Contact</Link></li>
          </ul></nav>
        </div></header>
        <main id="main"><div className="wrap">{children}</div></main>
        <footer className="site"><div className="wrap">
          <p>Ascendant Talent operates under {parent ? <a href={parent} rel="noopener">Ascendant Groups</a> : "Ascendant Groups"}. Listings are labelled by how we came to know of them. <Link href="/disclaimer">Read the disclaimer</Link>, <Link href="/privacy">privacy notice</Link> and <Link href="/terms">terms</Link>.</p>
        </div></footer>
      </body>
    </html>
  );
}
