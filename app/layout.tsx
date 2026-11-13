import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { CONTACT, LINKS, SITE, STUDIO } from "@/lib/site";
import "./globals.css";

const DESCRIPTION =
  "Wilfred Hirst is an artist working in charcoal, pastel, oil pen and collage. The gallery, a short biography, and how to ask about a piece.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Wilfred Hirst, artist", template: "%s / Wilfred Hirst" },
  description: DESCRIPTION,
  authors: [{ name: "Wilfred Hirst", url: SITE }],
  openGraph: { type: "website", siteName: "Wilfred Hirst", locale: "en_US", images: ["/art/joan-of-arc.webp"] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#wilfred`,
  name: "Wilfred Hirst",
  jobTitle: "Artist",
  url: SITE,
  description: DESCRIPTION,
  sameAs: [LINKS.instagram, LINKS.linkedin, STUDIO],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Spectral:ital,wght@0,300;0,400;0,500;1,300&family=Courier+Prime:wght@400;700&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD).replace(/</g, "\\u003c") }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div id="paper" aria-hidden="true" />
        <div className="sheet">
          <Nav />
          <main id="main">{children}</main>
          <footer className="colophon">
            <div className="wrap">
              <span>Wilfred Hirst</span>
              <span className="colophon-links">
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={STUDIO}>vynfred.com</a>
                <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
