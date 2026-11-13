import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import { STILLS } from "@/lib/gallery";
import { GALLERY_LEAD, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The work of Wilfred Hirst: stills and work in motion, each with its title and a way to ask about it.",
  alternates: { canonical: "/gallery" },
};

// Titles and images only: the structured data says no more about a piece
// than the page does.
const LD = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Wilfred Hirst: gallery",
  url: `${SITE}/gallery`,
  creator: { "@id": `${SITE}/#wilfred` },
  image: STILLS.map((it) => ({ "@type": "ImageObject", name: it.title, contentUrl: `${SITE}${it.src}`, creator: { "@id": `${SITE}/#wilfred` } })),
};

export default function GalleryPage() {
  return (
    <section className="wrap page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD).replace(/</g, "\\u003c") }} />
      <div className="lead">
        <p className="slug">{GALLERY_LEAD.title}</p>
        <h1 className="h-small">The work.</h1>
        <p className="dim">{GALLERY_LEAD.line}</p>
      </div>
      <Gallery />
    </section>
  );
}
