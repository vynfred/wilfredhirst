import Image from "next/image";
import Link from "next/link";
import { sample } from "@/lib/gallery";
import { HOME, STUDIO, askAbout } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

// Home: who he is, a few pieces, and the two ways on from here: the gallery
// and the studio. Short on purpose. The work is on the other page.
export default function Home() {
  return (
    <section className="wrap page">
      <div className="lead">
        <h1>{HOME.title}</h1>
        <p className="lead-line">{HOME.line}</p>
      </div>

      <Link className="gal strip" href="/gallery" aria-label={HOME.galleryCta}>
        {sample(4).map((it) => (
          <span className="piece" key={it.slug} style={{ ["--ar" as string]: it.width / it.height }}>
            <Image src={it.src} alt={it.title} width={it.width} height={it.height} sizes="(max-width: 620px) 50vw, 25vw" priority />
          </span>
        ))}
      </Link>

      <div className="cols">
        <p className="slug">About</p>
        <div className="prose">
          {HOME.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <Link className="go" href="/gallery">
            {HOME.galleryCta}
          </Link>
        </div>
      </div>

      <div className="cols">
        <p className="slug">{HOME.studio.label}</p>
        <div className="prose">
          <h2>{HOME.studio.heading}</h2>
          <p>{HOME.studio.body}</p>
          <a className="go" href={STUDIO}>
            {HOME.studio.cta}
          </a>
        </div>
      </div>

      <div className="cols" id="contact">
        <p className="slug">{HOME.contact.label}</p>
        <div className="prose">
          <h2>{HOME.contact.heading}</h2>
          <p>{HOME.contact.body}</p>
          <a className="go" href={askAbout()}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
