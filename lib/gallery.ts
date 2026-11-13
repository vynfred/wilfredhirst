import raw from "./gallery.json";

// Optional per-piece detail. A piece says its medium, year and a note only
// when gallery.json gives them: nothing generic is filled in, because a
// guessed year or medium on a work of art is a false statement about it.
export type Detail = { medium?: string; year?: string; note?: string };

export type GalleryItem =
  | ({ kind: "image"; slug: string; title: string; src: string; width: number; height: number } & Detail)
  | ({
      kind: "video";
      slug: string;
      title: string;
      playbackId: string;
      poster?: string;
      aspect?: string; // "773:540", as Mux reports it
      assetId?: string;
      seconds?: number;
    } & Detail);

// Playback IDs are public and live in gallery.json. A video with no ID yet
// is dropped rather than rendered broken.
const ORDERED: GalleryItem[] = (raw as GalleryItem[])
  .filter((it) => it.kind === "image" || it.playbackId !== "")
  // Mux renders a poster from the stream when none is supplied.
  .map((it) =>
    it.kind === "video" && !it.poster
      ? { ...it, poster: `https://image.mux.com/${it.playbackId}/thumbnail.jpg?time=20` }
      : it
  );

// gallery.json is ordered light to dark. The motion pieces are lifted out of
// that order and spread evenly through the top third of the wall, so they
// are seen without a scroll.
export const GALLERY: GalleryItem[] = (() => {
  const videos = ORDERED.filter((it) => it.kind === "video");
  const stills = ORDERED.filter((it) => it.kind === "image");
  const third = Math.ceil(ORDERED.length / 3);
  const out: GalleryItem[] = [...stills];
  videos.forEach((v, k) => out.splice(Math.round(((k + 0.5) * third) / videos.length), 0, v));
  return out;
})();

export type Still = Extract<GalleryItem, { kind: "image" }>;
export const STILLS: Still[] = ORDERED.filter((it): it is Still => it.kind === "image");

// A few stills for the home page, taken evenly from light to dark.
export function sample(n: number): Still[] {
  return Array.from({ length: n }, (_, i) => STILLS[Math.floor(((i + 0.5) * STILLS.length) / n)]);
}
