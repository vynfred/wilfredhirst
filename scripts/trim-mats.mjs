// Trim the white mat off the framed-print mockups in public/art, in place,
// and write the new dimensions back to lib/gallery.json. Only an image whose
// corner is near-white is touched; full-bleed pieces are left alone.
// Run: node scripts/trim-mats.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const file = fileURLToPath(new URL("../lib/gallery.json", import.meta.url));
const items = JSON.parse(readFileSync(file, "utf8"));

for (const it of items) {
  if (it.kind !== "image") continue;
  const path = fileURLToPath(new URL("../public" + it.src, import.meta.url));
  const { data } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  const white = data[0] > 235 && data[1] > 235 && data[2] > 235;
  if (!white) {
    console.log("skip ", it.slug, "(no mat)");
    continue;
  }
  // The mockups cast a soft grey shadow onto the mat. A high threshold
  // cuts through it to the frame edge; the extra pixel takes the last
  // anti-aliased sliver with it.
  const trimmed = await sharp(path)
    .trim({ background: "#ffffff", threshold: 140 })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const out = await sharp(trimmed.data)
    .extract({ left: 1, top: 1, width: width - 2, height: height - 2 })
    .webp({ quality: 88 })
    .toBuffer({ resolveWithObject: true });
  writeFileSync(path, out.data);
  console.log("trim ", it.slug, `${it.width}x${it.height} -> ${out.info.width}x${out.info.height}`);
  it.width = out.info.width;
  it.height = out.info.height;
}
writeFileSync(file, JSON.stringify(items, null, 2) + "\n");
