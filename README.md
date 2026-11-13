# wilfredhirst.com

The art of Wilfred Hirst. Two pages, on purpose:

```
/          who he is, a few pieces, and the way on to the gallery and the studio
/gallery   the work: a justified collage, stills and motion
```

The studio (design, technology, go-to-market) is a separate site,
[vynfred.com](https://vynfred.com), and this one links to it. Nothing is
sold here and there is no form: "Ask about this piece" opens an email.

## Run it

```bash
npm install
npm run dev
```

No environment variables are needed.

## Where things are

```
lib/site.ts        every line of copy, the contact address, the links
lib/gallery.json   the pieces, ordered light to dark
lib/gallery.ts     loads the manifest and spreads the videos through the wall
components/        Gallery (the collage and its detail row), Nav
public/art/        the pieces as webp, mats trimmed
scripts/           mux-sync (fills video playback IDs from Mux, needs
                   MUX_TOKEN_ID and MUX_SECRET) and trim-mats (needs sharp,
                   installed by hand when it is used)
```

## Adding or describing a piece

Add the image to `public/art/` and an entry to `lib/gallery.json`. A piece
can carry `medium`, `year` and `note`; the detail row shows them when they
are there and shows only the title when they are not. Nothing generic is
filled in: a guessed year or medium would be a false statement about a
work of art.

## The old site

This domain used to be a portfolio of startup and contract work. It is in
this repository's history before the `art-site` branch. `next.config.ts`
redirects the old addresses: the art page to `/gallery`, and the startup,
contract and consulting pages to vynfred.com.
