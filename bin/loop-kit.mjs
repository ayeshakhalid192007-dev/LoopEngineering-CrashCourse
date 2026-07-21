#!/usr/bin/env node
// Installs a loop kit from this package's starters/ into the user's project.
// Replaces `cp -r starters/_template starters/<loop-name>`, which needed a clone.
//
//   npx github:ayeshakhalid192007-dev/LoopEngineering-CrashCourse list
//   npx github:ayeshakhalid192007-dev/LoopEngineering-CrashCourse ci-sweeper
//   npx github:ayeshakhalid192007-dev/LoopEngineering-CrashCourse new my-loop --tool claude
//
// Kits ship inside the tarball, so nothing is fetched at run time.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");
const startersDir = path.join(pkgRoot, "starters");
const registryPath = path.join(pkgRoot, "patterns", "registry.yaml");

const REPO_SLUG = "ayeshakhalid192007-dev/LoopEngineering-CrashCourse";
const REPO_BLOB = `https://github.com/${REPO_SLUG}/blob/main`;
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// How a user reinvokes this CLI. `npx github:` needs no published package, so it is
// what the messages quote; after an npm publish, `npx @loop-engineering/loop-kit` is
// the shorter equivalent.
const INVOKE = `npx github:${REPO_SLUG}`;

function die(msg) {
  console.error(msg);
  process.exit(1);
}

function parseArgs(argv) {
  const opts = { dir: process.cwd(), tool: "both", force: false, dryRun: false };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dir") opts.dir = path.resolve(argv[++i] ?? ".");
    else if (arg === "--tool") opts.tool = argv[++i] ?? "both";
    else if (arg === "--force") opts.force = true;
    else if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg.startsWith("-")) die(`Unknown flag "${arg}". Run with --help.`);
    else positional.push(arg);
  }
  if (!["claude", "opencode", "both"].includes(opts.tool)) {
    die(`--tool must be claude, opencode, or both (got "${opts.tool}").`);
  }
  return { opts, positional };
}

function listKits() {
  if (!fs.existsSync(startersDir)) return [];
  return fs
    .readdirSync(startersDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "_template")
    .map((e) => e.name)
    .sort();
}

// registry.yaml is a flat list of "- name:" blocks; this reads the one-line
// fields the CLI prints, without pulling in a YAML dependency.
function readRegistry() {
  if (!fs.existsSync(registryPath)) return new Map();
  const entries = new Map();
  let current = null;
  for (const line of fs.readFileSync(registryPath, "utf8").split("\n")) {
    const nameMatch = line.match(/^\s*-\s*name:\s*["']?([a-z0-9-]+)["']?\s*$/);
    if (nameMatch) {
      current = { name: nameMatch[1] };
      entries.set(current.name, current);
      continue;
    }
    if (!current) continue;
    const fieldMatch = line.match(/^\s+([a-z_]+):\s*["']?(.*?)["']?\s*$/);
    if (fieldMatch) current[fieldMatch[1]] = fieldMatch[2];
  }
  return entries;
}

function cmdList() {
  const kits = listKits();
  const registry = readRegistry();
  if (kits.length === 0) die("No kits found in this package.");
  console.log(`${kits.length} loop kits available:\n`);
  for (const kit of kits) {
    const meta = registry.get(kit) ?? {};
    const level = meta.level ? ` [${meta.level}]` : "";
    const summary = meta.category_name ? ` — ${meta.category_name}` : "";
    console.log(`  ${kit}${level}${summary}`);
  }
  console.log(`\nInstall one:  ${INVOKE} <name>`);
}

// Kit prose links out to the course with paths relative to the kit's home in this
// repo. Those resolve to nothing once the kit lives in someone else's project, so
// point them at GitHub. Resolve against the source file rather than pattern-matching
// the prefix — a kit links up to docs/ AND sideways to sibling kits, and only real
// path resolution gets both right.
function rewriteLinks(content, srcFile) {
  const srcDir = path.dirname(srcFile);
  return content.replace(/\]\((\.\.\/[^)]+)\)/g, (match, target) => {
    const hash = target.indexOf("#");
    const pathPart = hash === -1 ? target : target.slice(0, hash);
    const fragment = hash === -1 ? "" : target.slice(hash);
    const repoRel = path.relative(pkgRoot, path.resolve(srcDir, pathPart));
    // Escaped the package root — not ours to rewrite; leave it alone.
    if (repoRel.startsWith("..") || path.isAbsolute(repoRel)) return match;
    return `](${REPO_BLOB}/${repoRel.split(path.sep).join("/")}${fragment})`;
  });
}

function collectFiles(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(full, base));
    else out.push(path.relative(base, full));
  }
  return out;
}

// Maps a file's path inside the kit to where it belongs in the target project.
// Claude Code only discovers skills and agents under a project-root .claude/,
// so those two split away from the rest of the kit.
function planDestination(relPath, loopName, opts, ctx) {
  const parts = relPath.split(path.sep);
  const base = parts[parts.length - 1];

  if (parts[0] === ".claude") {
    if (opts.tool === "opencode") return null;
    if (base === "SKILL.md") {
      return { to: path.join(".claude", "skills", loopName, "SKILL.md") };
    }
    if (parts[1] === "agents") {
      return { to: path.join(".claude", "agents", ctx.verifierFile), rename: ctx.verifierName };
    }
    return { to: relPath };
  }

  const isOpenCodeOnly = base === "opencode.json.example" || parts[0] === "skills";
  if (isOpenCodeOnly && opts.tool === "claude") return null;

  if (base === "loop-state.md.example") {
    return { to: path.join("loops", loopName, `${loopName}-state.md`) };
  }
  return { to: path.join("loops", loopName, relPath) };
}

function cmdInstall(kitName, opts, { fromTemplate }) {
  if (!KEBAB.test(kitName)) {
    die(`Loop name "${kitName}" must be kebab-case (e.g. "docs-sweep").`);
  }

  const srcDir = path.join(startersDir, fromTemplate ? "_template" : kitName);
  if (!fs.existsSync(srcDir)) {
    const kits = listKits();
    die(
      `No kit named "${kitName}".\n\nAvailable: ${kits.join(", ")}\n` +
        `Or start from the blank template:  ${INVOKE} new ${kitName}`,
    );
  }
  if (!fs.existsSync(opts.dir)) die(`Target directory does not exist: ${opts.dir}`);

  // A second kit in the same project must not clobber the first kit's verifier.
  const defaultVerifier = path.join(opts.dir, ".claude", "agents", "loop-verifier.md");
  const verifierTaken = fs.existsSync(defaultVerifier);
  const ctx = {
    verifierFile: verifierTaken ? `${kitName}-verifier.md` : "loop-verifier.md",
    verifierName: verifierTaken ? `${kitName}-verifier` : "loop-verifier",
  };

  const writes = [];
  for (const relPath of collectFiles(srcDir)) {
    const plan = planDestination(relPath, kitName, opts, ctx);
    if (!plan) continue;
    writes.push({ src: path.join(srcDir, relPath), dest: path.join(opts.dir, plan.to), rel: plan.to, rename: plan.rename });
  }

  const clashes = writes.filter((w) => fs.existsSync(w.dest));
  if (clashes.length > 0 && !opts.force) {
    die(
      `Refusing to overwrite ${clashes.length} existing file(s):\n` +
        clashes.map((w) => `  ${w.rel}`).join("\n") +
        `\n\nPass --force to overwrite, or --dir to install elsewhere.`,
    );
  }

  for (const write of writes) {
    let content = fs.readFileSync(write.src, "utf8");
    content = rewriteLinks(content, write.src);
    if (fromTemplate) content = content.replaceAll("<loop-name>", kitName);
    if (write.rename) content = content.replace(/^name:\s*loop-verifier\s*$/m, `name: ${write.rename}`);
    if (opts.dryRun) {
      console.log(`would write  ${write.rel}`);
      continue;
    }
    fs.mkdirSync(path.dirname(write.dest), { recursive: true });
    fs.writeFileSync(write.dest, content);
    console.log(`wrote  ${write.rel}`);
  }

  if (opts.dryRun) {
    console.log(`\nDry run — nothing written.`);
    return;
  }

  console.log(`\nInstalled "${kitName}" into ${opts.dir}.`);
  if (fromTemplate) {
    console.log(`\nNext:`);
    console.log(`  1. Fill every <ANGLE-BRACKET> in loops/${kitName}/LOOP.md.`);
    console.log(`  2. Write the real procedure into .claude/skills/${kitName}/SKILL.md.`);
    console.log(`  3. Commit loops/${kitName}/${kitName}-state.md before the first beat.`);
  } else {
    console.log(`\nNext:`);
    console.log(`  1. Read loops/${kitName}/LOOP.md — the definition, limits, and three stops.`);
    console.log(`  2. Adjust loops/${kitName}/loop-budget.md and loop-constraints.md for your repo.`);
    console.log(`  3. Commit loops/${kitName}/${kitName}-state.md before the first beat.`);
  }
  console.log(`  4. Run one watched beat at L1 (report-only) before scheduling it.`);
}

const HELP = `
loop-kit — install a loop kit from the Loop Engineering Crash Course

Run it with:  ${INVOKE} <command>
No clone, no global install. Node 18+ is the only prerequisite.

Commands
  list                 List every available kit
  <kit-name>           Install a named kit into the current project
  new <loop-name>      Stamp the blank template as a new loop

Options
  --dir <path>     Target project directory (default: current directory)
  --tool <name>    claude | opencode | both (default: both)
  --force          Overwrite existing files
  --dry-run        Print what would be written, write nothing

Every kit ships at L1 (report-only). Promote it only after one watched run.
`;

function main() {
  const { opts, positional } = parseArgs(process.argv.slice(2));
  const [command, ...rest] = positional;

  if (opts.help || !command || command === "help") {
    console.log(HELP.trim());
    process.exit(command || opts.help ? 0 : 1);
  }
  if (command === "list") return cmdList();
  if (command === "new") {
    const name = rest[0];
    if (!name) die(`Usage: ${INVOKE} new <loop-name>`);
    return cmdInstall(name, opts, { fromTemplate: true });
  }
  return cmdInstall(command, opts, { fromTemplate: false });
}

main();
