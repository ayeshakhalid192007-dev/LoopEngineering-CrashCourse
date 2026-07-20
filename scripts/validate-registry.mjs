#!/usr/bin/env node
// Checks that patterns/registry.yaml has one entry per stamped kit, and that
// patterns/<name>.md exists for each. No YAML dependency — registry.yaml is a
// flat list of "- name: <slug>" blocks, which is all this needs to parse.
// Usage: node scripts/validate-registry.mjs
// Exit code 0 = registry matches. Exit code 1 = mismatch.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const startersDir = path.join(repoRoot, "starters");
const patternsDir = path.join(repoRoot, "patterns");
const registryPath = path.join(patternsDir, "registry.yaml");

function listKits() {
  if (!fs.existsSync(startersDir)) return [];
  return fs
    .readdirSync(startersDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "_template")
    .map((e) => e.name)
    .sort();
}

function listRegistryNames() {
  if (!fs.existsSync(registryPath)) return null;
  const content = fs.readFileSync(registryPath, "utf8");
  const names = [];
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*-?\s*name:\s*["']?([a-z0-9-]+)["']?\s*$/);
    if (m) names.push(m[1]);
  }
  return names;
}

function listPatternPages() {
  if (!fs.existsSync(patternsDir)) return [];
  return fs
    .readdirSync(patternsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

const kits = listKits();

if (kits.length === 0) {
  console.log("No kits found in starters/ yet (only _template/ exists). Nothing to validate.");
  process.exit(0);
}

const registryNames = listRegistryNames();
const pagesNames = listPatternPages();

let ok = true;

if (registryNames === null) {
  console.log(`FAIL — patterns/registry.yaml does not exist yet (${kits.length} kit(s) need an entry).`);
  ok = false;
} else {
  const registrySet = new Set(registryNames);
  const missingFromRegistry = kits.filter((k) => !registrySet.has(k));
  const extraInRegistry = registryNames.filter((n) => !kits.includes(n));
  if (missingFromRegistry.length > 0) {
    console.log(`FAIL — missing from patterns/registry.yaml: ${missingFromRegistry.join(", ")}`);
    ok = false;
  }
  if (extraInRegistry.length > 0) {
    console.log(`FAIL — patterns/registry.yaml has entries with no matching kit: ${extraInRegistry.join(", ")}`);
    ok = false;
  }
}

const pagesSet = new Set(pagesNames);
const missingPages = kits.filter((k) => !pagesSet.has(k));
if (missingPages.length > 0) {
  console.log(`FAIL — missing patterns/<name>.md page for: ${missingPages.join(", ")}`);
  ok = false;
}

if (ok) console.log(`PASS — registry and pattern pages match all ${kits.length} kit(s).`);
process.exit(ok ? 0 : 1);
