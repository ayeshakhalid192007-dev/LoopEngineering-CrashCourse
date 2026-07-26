/**
 * Repoint README links at the published curriculum (audit item C2).
 *
 * The README's relative links resolve to files in this repo. On GitHub that is
 * correct behaviour; for search it means every unit of PageRank the README earns
 * flows to github.com rather than to the site that publishes the same content.
 *
 * Where a published page exists for a target, this rewrites the link to it.
 * Where one does not — LICENSE, CONTRIBUTING, scripts, workflows, the starter
 * scaffolds, and every image — the relative link is correct and is left alone.
 *
 * The route map is not hand-maintained. It is extracted from the built site:
 * every curriculum page carries a "View source on GitHub" anchor naming the file
 * it was rendered from, so the built output *is* the source-path -> URL contract.
 * Regenerate it with --build-map after the site's routes change.
 *
 *   node scripts/repoint-readme-links.mjs --build-map ../loop-landing/out
 *   node scripts/repoint-readme-links.mjs --check
 *   node scripts/repoint-readme-links.mjs --write
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join, relative, posix } from "node:path";

const SITE = "https://ayeshakhalid192007-dev.github.io/loop-lab";
const MAP_FILE = new URL("./readme-route-map.json", import.meta.url).pathname;
const README = "README.md";

/** Walk a static export and pair each page's source file with its route. */
function buildMap(outDir) {
  const map = {};
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === "index.html") {
        const html = readFileSync(p, "utf8");
        // The anchor's href and its label are separated by attributes we do not
        // care about, hence the lazy any-char span rather than a tight match.
        const hit = html.match(
          /<a[^>]*blob\/main\/([^"]*)"[^>]*>(?:(?!<\/a>).)*?View source on GitHub/s,
        );
        if (!hit) continue;
        const route = "/" + relative(outDir, dir).split(/[\\/]/).join("/");
        map[hit[1]] = (route === "/." ? "" : route.replace(/\/$/, "")) + "/";
      }
    }
  };
  walk(outDir);
  return map;
}

/**
 * Rewrite `[text](path)` where a published page exists.
 *
 * Image syntax is skipped explicitly rather than relied upon to miss the map:
 * an asset that later gains a page must still render as an image, not link to one.
 *
 * The link text allows one level of nesting so that badges — `[![alt](shield)](target)`,
 * of which the README has four — are seen as links to `target` and not as bare
 * images. Without it the inner image consumes the `[` and the outer link is missed.
 */
const LINK = /(!?)\[((?:[^[\]]|!\[[^\]]*\]\([^)]*\))*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;

function repoint(md, map) {
  const changes = [];
  const out = md.replace(
    LINK,
    (whole, bang, text, href, title = "") => {
      if (bang) return whole; // image
      if (/^(https?:|#|mailto:)/.test(href)) return whole;
      const [rawPath, frag] = href.split("#");
      const path = posix.normalize(rawPath.split("?")[0]);
      const route = map[path];
      if (!route) return whole;
      const url = SITE + route + (frag ? "#" + frag : "");
      changes.push({ from: href, to: url });
      return `${bang}[${text}](${url}${title})`;
    },
  );
  return { out, changes };
}

const args = process.argv.slice(2);

if (args[0] === "--build-map") {
  const outDir = args[1];
  if (!outDir || !existsSync(outDir)) {
    console.error("usage: --build-map <path to loop-landing/out>");
    process.exit(1);
  }
  const map = buildMap(outDir);
  writeFileSync(MAP_FILE, JSON.stringify(map, null, 1) + "\n");
  console.log(`wrote ${Object.keys(map).length} route mappings`);
  process.exit(0);
}

if (!existsSync(MAP_FILE)) {
  console.error("no route map — run --build-map first");
  process.exit(1);
}
const map = JSON.parse(readFileSync(MAP_FILE, "utf8"));
const md = readFileSync(README, "utf8");
const { out, changes } = repoint(md, map);

console.log(`${changes.length} links repointed at the published site`);
if (args[0] === "--write") {
  writeFileSync(README, out);
  console.log("README.md updated");
} else {
  for (const c of changes.slice(0, 10)) console.log(`  ${c.from}\n    -> ${c.to}`);
  if (changes.length > 10) console.log(`  … ${changes.length - 10} more`);
  console.log("\ndry run — pass --write to apply");
}
