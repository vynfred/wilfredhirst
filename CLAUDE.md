# CLAUDE.md

wilfredhirst.com: the art of Wilfred Hirst. Gallery and a short biography,
two pages, linking out to vynfred.com (his studio, a separate repo and site).
Keep it to two pages unless he asks for more.

- Copy lives in `lib/site.ts`. The biography is third person and holds only
  what he has confirmed or vynfred.com already says. Do not invent
  exhibitions, dates, media or prices.
- Per-piece detail (`medium`, `year`, `note` in `lib/gallery.json`) is shown
  only when present. Never fill in a generic default.
- No em dashes anywhere, the same standing instruction as vynfred.com.
- The palette in `app/globals.css` was sampled from his paintings. Coral is
  for fills, rules and large type; small coloured text uses oxblood.
- Hand-written CSS, no Tailwind, no UI kit. No database, no API routes, no
  environment variables needed to build.
- Hosted on Vercel (project `wilfredhirst`), deployed from this repo.
