#!/usr/bin/env node
// Deterministic checker for every stamped kit in starters/ (excluding _template).
// Usage: node scripts/loop-ready-audit.mjs
// Exit code 0 = every kit PASS. Exit code 1 = at least one kit FAIL.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const startersDir = path.join(repoRoot, "starters");

const REQUIRED_FILES = [
  "LOOP.md",
  "README.md",
  "loop-budget.md",
  "loop-constraints.md",
  "loop-run-log.md",
  ".claude/agents/loop-verifier.md",
  ".claude/skills/loop-task/SKILL.md",
  "opencode.json.example",
  "skills/loop-task.md",
];

// Distinctive substrings that only exist in the unfilled _template — if any of
// these survive in a stamped kit, that kit was copied but never actually filled in.
const PLACEHOLDER_MARKERS = [
  "<loop-name>",
  "<N>",
  "<a machine-checkable spec",
  "<in-session interval",
  "<what it may DO",
  "<script / read-only LLM",
  "<where a person decides",
  "<the loop prompt — intent",
  "<the paths it reads",
  "<the success spec from the six-part table",
  "<row 1 —",
  "<row 2>",
  "<row 3>",
  "<what to read:",
  "<the single unit of work",
  "<the machine-checkable success test",
  "⏳ running / ✅ stopped",
  "<YYYY-MM-DDTHH",
];

function listKits() {
  if (!fs.existsSync(startersDir)) return [];
  return fs
    .readdirSync(startersDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== "_template")
    .map((e) => e.name)
    .sort();
}

function auditKit(name) {
  const kitDir = path.join(startersDir, name);
  const missing = [];
  const placeholders = [];

  for (const rel of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(kitDir, rel))) missing.push(rel);
  }

  const stateFile = `${name}-state.md`;
  if (!fs.existsSync(path.join(kitDir, stateFile))) missing.push(stateFile);

  const filesToScan = [...REQUIRED_FILES, stateFile];
  for (const rel of filesToScan) {
    const full = path.join(kitDir, rel);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, "utf8");
    for (const marker of PLACEHOLDER_MARKERS) {
      if (content.includes(marker)) placeholders.push(`${rel}: "${marker}"`);
    }
  }

  const pass = missing.length === 0 && placeholders.length === 0;
  return { name, pass, missing, placeholders };
}

const kits = listKits();
// --json emits machine-readable results (used by render-loop-ready-terminal.mjs
// to draw the README demo from real data); human output is unchanged without it.
const jsonMode = process.argv.includes("--json");

if (kits.length === 0) {
  if (jsonMode) {
    console.log(JSON.stringify({ total: 0, passed: 0, kits: [] }));
  } else {
    console.log("No kits found in starters/ yet (only _template/ exists). Nothing to audit.");
  }
  process.exit(0);
}

let anyFail = false;
const results = [];
for (const name of kits) {
  const result = auditKit(name);
  results.push(result);
  if (!result.pass) anyFail = true;
  if (jsonMode) continue;
  console.log(`\n${result.pass ? "PASS" : "FAIL"} — ${name}`);
  for (const m of result.missing) console.log(`  missing: ${m}`);
  for (const p of result.placeholders) console.log(`  unfilled placeholder in ${p}`);
}

if (jsonMode) {
  console.log(
    JSON.stringify(
      { total: kits.length, passed: results.filter((r) => r.pass).length, kits: results },
      null,
      2
    )
  );
} else {
  console.log(`\n${kits.length} kit(s) checked. ${anyFail ? "At least one FAIL." : "All PASS."}`);
}
process.exit(anyFail ? 1 : 0);
