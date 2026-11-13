"use client";

import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { GALLERY } from "@/lib/gallery";
import { askAbout } from "@/lib/site";

// A justified collage: every row is the same height and each piece takes
// the width its own proportions ask for, so nothing is cropped and the
// rows read as one wall rather than a grid of cells.
//
// Select a piece and a note opens under the row it sits in; select it
// again, or pick another, to move it.
export default function Gallery() {
  const [pinned, setPinned] = useState<number | null>(null);
  const [rowEnd, setRowEnd] = useState<number | null>(null);
  const wall = useRef<HTMLDivElement>(null);

  // Rows are decided by the browser, so read them back: the note goes
  // after the last piece sharing the pinned piece's top edge.
  useLayoutEffect(() => {
    const find = () => {
      const el = wall.current;
      if (!el || pinned === null) return setRowEnd(null);
      const pieces = Array.from(el.querySelectorAll<HTMLElement>(".piece"));
      const top = pieces[pinned]?.offsetTop;
      let end = pinned;
      for (let i = pinned + 1; i < pieces.length && pieces[i].offsetTop === top; i++) end = i;
      setRowEnd(end);
    };
    find();
    window.addEventListener("resize", find);
    return () => window.removeEventListener("resize", find);
  }, [pinned]);

  const open = pinned === null ? null : GALLERY[pinned];
  const spec = open ? [open.medium, open.year].filter(Boolean).join(" · ") : "";

  // Mux reports "773:540". The player assumes 16:9 until the stream loads.
  const ratioOf = (it: (typeof GALLERY)[number]) => {
    if (it.kind === "image") return it.width / it.height;
    const [w, h] = (it.aspect ?? "16:9").split(":").map(Number);
    return w / h;
  };

  return (
    <div className="gal" ref={wall}>
      {GALLERY.map((it, i) => {
        const ar = ratioOf(it);
        return (
          <Fragment key={it.slug}>
            <figure
              className={`piece${pinned === i ? " lit" : ""}`}
              style={{ ["--ar" as string]: ar }}
              role="button"
              tabIndex={0}
              aria-pressed={pinned === i}
              onClick={() => setPinned(pinned === i ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPinned(pinned === i ? null : i);
                }
              }}
            >
              {it.kind === "image" ? (
                <Image
                  src={it.src}
                  alt={it.title}
                  width={it.width}
                  height={it.height}
                  sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
              ) : (
                <MuxPlayer
                  playbackId={it.playbackId}
                  poster={it.poster}
                  streamType="on-demand"
                  autoPlay="muted"
                  loop
                  muted
                  playsInline
                  nohotkeys
                  style={{ ["--controls" as string]: "none", aspectRatio: `${ar}` }}
                  metadata={{ video_title: it.title }}
                />
              )}
              <figcaption>{it.title}</figcaption>
            </figure>

            {i === rowEnd && open && (
              <div className="piece-note" aria-live="polite">
                <div>
                  <span className="who">{open.title}</span>
                  {spec && <span className="spec">{spec}</span>}
                </div>
                {open.note && <p className="what">{open.note}</p>}
                <a className="go" href={askAbout(open.title)}>
                  Ask about this piece
                </a>
              </div>
            )}
          </Fragment>
        );
      })}
      {/* Keeps the last row from stretching to fill the width. */}
      <i className="gal-fill" aria-hidden="true" />
    </div>
  );
}
