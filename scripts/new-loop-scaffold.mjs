#!/usr/bin/env node
// Stamps a new loop kit from starters/_template/.
// Usage: node scripts/new-loop-scaffold.mjs <loop-name>

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const templateDir = path.join(repoRoot, "starters", "_template");
const startersDir = path.join(repoRoot, "starters");

const loopName = process.argv[2];

if (!loopName) {
  console.error("Usage: node scripts/new-loop-scaffold.mjs <loop-name>");
  process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(loopName)) {
  console.error(`Loop name "${loopName}" must be kebab-case (e.g. "docs-sweep").`);
  process.exit(1);
}

const destDir = path.join(startersDir, loopName);

if (fs.existsSync(destDir)) {
  console.error(`starters/${loopName}/ already exists — refusing to overwrite.`);
  process.exit(1);
}
if (!fs.existsSync(templateDir)) {
  console.error(`Template not found at ${templateDir}`);
  process.exit(1);
}

function copyAndFill(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyAndFill(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }

  let destPath = dest;
  if (path.basename(destPath) === "loop-state.md.example") {
    destPath = path.join(path.dirname(destPath), `${loopName}-state.md`);
  }

  const isText = /\.(md|json|txt|toml|yaml|yml)$/i.test(src) || path.basename(src).endsWith(".example");
  if (isText) {
    const content = fs.readFileSync(src, "utf8").replaceAll("<loop-name>", loopName);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, content);
  } else {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(src, destPath);
  }
}

copyAndFill(templateDir, destDir);

console.log(`Stamped starters/${loopName}/ from _template/.`);
console.log(`Next: fill every remaining <ANGLE-BRACKET> in starters/${loopName}/LOOP.md,`);
console.log(`write the real procedure into .claude/skills/loop-task/SKILL.md, and commit`);
console.log(`starters/${loopName}/${loopName}-state.md before the first beat.`);
