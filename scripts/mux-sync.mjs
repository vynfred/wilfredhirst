// Runs before every build. If Mux credentials are present (they are on Vercel,
// as MUX_TOKEN_ID and MUX_SECRET), resolve each gallery video to a public
// playback ID: by assetId when it has one, otherwise by duration in seconds.
// Without credentials it does nothing and gallery.json keeps its IDs.
import { readFileSync, writeFileSync } from "node:fs";

const { MUX_TOKEN_ID, MUX_SECRET } = process.env;
if (!MUX_TOKEN_ID || !MUX_SECRET) {
  console.log("mux-sync: no credentials, leaving gallery.json as is");
  process.exit(0);
}

const auth = "Basic " + Buffer.from(`${MUX_TOKEN_ID}:${MUX_SECRET}`).toString("base64");
const res = await fetch("https://api.mux.com/video/v1/assets?limit=100", {
  headers: { authorization: auth },
});
if (!res.ok) {
  console.warn(`mux-sync: Mux answered ${res.status}, leaving gallery.json as is`);
  process.exit(0);
}
const assets = (await res.json()).data.filter((a) => a.status === "ready");
const pub = (a) => a?.playback_ids?.find((p) => p.policy === "public")?.id;
console.log(`mux-sync: ${assets.length} ready asset(s) in Mux`);
for (const a of assets) console.log(`  ${a.id} ${Math.round(a.duration)}s ${a.aspect_ratio ?? ""} -> ${pub(a) ?? "(no public playback ID)"}`);

const path = "lib/gallery.json";
const gallery = JSON.parse(readFileSync(path, "utf8"));
let changed = false;
const claimed = new Set(gallery.filter((it) => it.assetId).map((it) => it.assetId));
for (const it of gallery) {
  if (it.kind !== "video") continue;
  const hit = it.assetId
    ? assets.find((a) => a.id === it.assetId)
    : it.seconds &&
      assets.find((a) => !claimed.has(a.id) && Math.abs(a.duration - it.seconds) < 3);
  const id = pub(hit);
  if (id && id !== it.playbackId) {
    console.log(`mux-sync: ${it.slug}: ${it.playbackId || "(none)"} -> ${id}`);
    it.playbackId = id;
    changed = true;
  }
  if (hit?.aspect_ratio && hit.aspect_ratio !== it.aspect) {
    it.aspect = hit.aspect_ratio;
    changed = true;
  }
  if (!hit) {
    console.log(`mux-sync: ${it.slug} has no matching asset yet`);
  }
}
if (changed) writeFileSync(path, JSON.stringify(gallery, null, 2) + "\n");
