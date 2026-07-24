#!/usr/bin/env node
// Renders assets/terminal-loop-ready.svg from a REAL run of the Loop Ready audit.
// The README terminal demo is never hand-edited: this script runs
// scripts/loop-ready-audit.mjs --json, groups the actual results into the ten
// checks every kit must pass, and draws exactly what the audit said — ten
// streaming check rows, a score ring that climbs as each check lands, and the
// real exit code. Ten checks × 10 points = the Loop Ready score out of 100.
// Usage: node scripts/render-loop-ready-terminal.mjs   (or: npm run render:terminal)

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outFile = path.join(repoRoot, "assets", "terminal-loop-ready.svg");

// ── 1. Run the real audit ────────────────────────────────────────────────────
const audit = spawnSync("node", [path.join(__dirname, "loop-ready-audit.mjs"), "--json"], {
  cwd: repoRoot,
  encoding: "utf8",
});
const exitCode = audit.status ?? 1;

let data;
try {
  data = JSON.parse(audit.stdout);
} catch {
  console.error("render-terminal: could not parse audit --json output.");
  process.exit(1);
}
const { total, passed, kits } = data;
if (total === 0) {
  console.error("render-terminal: no kits to audit — nothing to render.");
  process.exit(1);
}
const allPass = passed === total;

// ── 2. Group the real results into the ten checks every kit must pass ───────
// Each check is worth 10 points; a check's points scale with how many kits pass
// it, so the score is 100 exactly when every kit passes every check.
const missing = (kit, file) => kit.missing.includes(file);
const CHECKS = [
  { label: "definition", path: "LOOP.md", fails: (k) => missing(k, "LOOP.md") },
  { label: "docs", path: "README.md", fails: (k) => missing(k, "README.md") },
  { label: "spine", path: "<kit>-state.md", fails: (k) => missing(k, `${k.name}-state.md`) },
  { label: "budget", path: "loop-budget.md", fails: (k) => missing(k, "loop-budget.md") },
  { label: "constitution", path: "loop-constraints.md", fails: (k) => missing(k, "loop-constraints.md") },
  { label: "run log", path: "loop-run-log.md", fails: (k) => missing(k, "loop-run-log.md") },
  { label: "checker", path: ".claude/agents/loop-verifier.md", fails: (k) => missing(k, ".claude/agents/loop-verifier.md") },
  { label: "skill", path: ".claude/skills/loop-task/SKILL.md", fails: (k) => missing(k, ".claude/skills/loop-task/SKILL.md") },
  { label: "dual tool", path: "opencode.json + loop-task.md", fails: (k) => missing(k, "opencode.json.example") || missing(k, "skills/loop-task.md") },
  { label: "filled in", path: "no unfilled template placeholders", fails: (k) => k.placeholders.length > 0 },
];

const rows = CHECKS.map((c) => {
  const ok = kits.filter((k) => !c.fails(k)).length;
  return { ...c, ok, points: (ok / total) * 10 };
});

// Cumulative score after each row lands — these drive the climbing counter.
// The final score floors instead of rounding so a single failing kit can never
// round back up to a perfect 100 (epsilon guards float sums like 99.9999…).
const steps = [0];
for (const r of rows) steps.push(steps[steps.length - 1] + r.points);
const score = Math.floor(steps[steps.length - 1] + 1e-9);
const scoreValues = steps.map((s, i) => (i === steps.length - 1 ? score : Math.floor(s + 1e-9)));

const scoreColor = score === 100 ? "#34d399" : score >= 70 ? "#fbbf24" : "#f87171";

// ── 3. Timeline ──────────────────────────────────────────────────────────────
const T = 7.0; // total keyframe timeline in seconds
const ROW_START = 1.9;
const ROW_STEP = 0.32;
const rowDelay = (i) => ROW_START + i * ROW_STEP;
const lastRow = rowDelay(rows.length - 1);
const summaryDelay = lastRow + 0.7;
const badgeDelay = summaryDelay + 0.3;
const pct = (t) => ((t / T) * 100).toFixed(2);

// Climbing counter: value i is visible from rowDelay(i-1)+0.15 until the next
// value takes over; the final value stays.
const numCss = scoreValues
  .map((v, i) => {
    const from = i === 0 ? 0.4 : rowDelay(i - 1) + 0.15;
    const isLast = i === scoreValues.length - 1;
    const to = isLast ? T : rowDelay(i) + 0.15;
    const kf = isLast
      ? `@keyframes n${i} { 0%, ${pct(from)}% { opacity: 0; } ${pct(from + 0.02)}%, 100% { opacity: 1; } }`
      : `@keyframes n${i} { 0%, ${pct(from)}% { opacity: 0; } ${pct(from + 0.02)}%, ${pct(to)}% { opacity: 1; } ${pct(to + 0.02)}%, 100% { opacity: 0; } }`;
    return `    .n${i} { opacity: 0; animation: n${i} ${T}s linear forwards; }\n    ${kf}`;
  })
  .join("\n");

const rowCss = rows
  .map((_, i) => `    .r${i} { animation-delay: ${rowDelay(i).toFixed(2)}s; }`)
  .join("\n");

// ── 4. Geometry ──────────────────────────────────────────────────────────────
const ROW_H = 30;
const rowsTop = 150;
const summaryY = rowsTop + rows.length * ROW_H + 26;
const height = summaryY + 50;
const RING = { cx: 726, cy: 278, r: 84 };
const circ = 2 * Math.PI * RING.r;
const ringTarget = (circ * (1 - score / 100)).toFixed(1);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const rowSvg = rows
  .map((r, i) => {
    const y = rowsTop + i * ROW_H;
    const good = r.ok === total;
    const mark = good ? "✔" : "✖";
    const markCls = good ? "green" : "red";
    return `    <g class="appear r${i}">
      <text x="36" y="${y}" class="${markCls}" font-weight="700">${mark}</text>
      <text x="64" y="${y}" class="txt" font-weight="600">${esc(r.label)}</text>
      <text x="205" y="${y}" class="dim" font-size="12.5">${esc(r.path)}</text>
      <text x="548" y="${y}" text-anchor="end" class="${markCls}" font-weight="700">${r.ok}/${total}</text>
    </g>`;
  })
  .join("\n");

const summary = allPass
  ? `<tspan class="green" font-weight="700">✔ ${passed} / ${total} kits Loop Ready</tspan><tspan class="dim" dx="12">·</tspan><tspan class="purple" dx="12">exit ${exitCode}</tspan>`
  : `<tspan class="red" font-weight="700">✖ ${passed} / ${total} kits Loop Ready</tspan><tspan class="dim" dx="12">·</tspan><tspan class="purple" dx="12">exit ${exitCode}</tspan>`;

const numSvg = scoreValues
  .map((v, i) => `      <text x="${RING.cx}" y="${RING.cy + 8}" text-anchor="middle" class="ui n${i}" font-size="44" font-weight="800" fill="#f5f3ff">${v}</text>`)
  .join("\n");

// ── 5. Draw ──────────────────────────────────────────────────────────────────
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 ${height}" role="img" aria-label="Terminal demo: npm run audit:loops runs ten real checks across all ${total} starter kits and the Loop Ready score climbs to ${score} out of 100.">
  <defs>
    <linearGradient id="tbar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#241353"/>
      <stop offset="1" stop-color="#180b38"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7c3aed"/>
      <stop offset="0.65" stop-color="#a855f7"/>
      <stop offset="1" stop-color="${scoreColor}"/>
    </linearGradient>
    <radialGradient id="tglow" cx="0.5" cy="0" r="1">
      <stop offset="0" stop-color="#7c3aed" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ringGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.7" stop-color="#7c3aed" stop-opacity="0"/>
      <stop offset="0.92" stop-color="#7c3aed" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-6%" y="-6%" width="112%" height="112%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <style>
    .mono { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; font-size: 15px; }
    .ui   { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .dim    { fill: #8b87a8; }
    .txt    { fill: #e9e6f7; }
    .green  { fill: #34d399; }
    .red    { fill: #f87171; }
    .purple { fill: #c4b5fd; }

    .appear { opacity: 0; animation: appear 0.4s ease-out forwards; }
    @keyframes appear {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cmd  { animation-delay: 0.3s; }
    .scan { animation-delay: 1.3s; }
${rowCss}
    .summary { animation-delay: ${summaryDelay.toFixed(2)}s; }

    .cursor { animation: blink 1s steps(2, start) infinite, vanish 0.1s linear 1.3s forwards; }
    @keyframes blink  { 50% { opacity: 0; } }
    @keyframes vanish { to  { opacity: 0; } }

    .ringFill {
      stroke-dasharray: ${circ.toFixed(1)};
      stroke-dashoffset: ${circ.toFixed(1)};
      animation: ring ${(lastRow - ROW_START + 0.5).toFixed(2)}s cubic-bezier(0.4, 0, 0.2, 1) ${ROW_START}s forwards;
    }
    @keyframes ring { to { stroke-dashoffset: ${ringTarget}; } }

${numCss}

    .verdict {
      opacity: 0;
      transform-origin: ${RING.cx}px ${RING.cy + 128}px;
      animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${badgeDelay.toFixed(2)}s forwards;
    }
    @keyframes pop {
      from { opacity: 0; transform: scale(0.6); }
      to   { opacity: 1; transform: scale(1); }
    }
  </style>

  <!-- Window -->
  <g filter="url(#shadow)">
    <rect x="2" y="2" width="896" height="${height - 12}" rx="14" fill="#0b0820"/>
  </g>
  <rect x="2" y="2" width="896" height="${height - 12}" rx="14" fill="url(#tglow)"/>
  <rect x="2.75" y="2.75" width="894.5" height="${height - 13.5}" rx="13.5" fill="none" stroke="#7c3aed" stroke-opacity="0.45" stroke-width="1.5"/>
  <line x1="26" y1="2" x2="874" y2="2" stroke="#c4b5fd" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Title bar -->
  <path d="M2,16 a14,14 0 0 1 14,-14 h868 a14,14 0 0 1 14,14 v24 h-896 z" fill="url(#tbar)"/>
  <line x1="2" y1="40" x2="898" y2="40" stroke="#7c3aed" stroke-opacity="0.35" stroke-width="1"/>
  <circle cx="26" cy="21" r="6" fill="#f87171"/>
  <circle cx="46" cy="21" r="6" fill="#fbbf24"/>
  <circle cx="66" cy="21" r="6" fill="#34d399"/>
  <text x="450" y="26" text-anchor="middle" class="ui" font-size="13" font-weight="600" fill="#a99fd0">loop-ready-audit — ~/my-project</text>
  <rect x="826" y="10" width="58" height="21" rx="10.5" fill="#7c3aed" fill-opacity="0.2" stroke="#a78bfa" stroke-opacity="0.5" stroke-width="1"/>
  <text x="855" y="25" text-anchor="middle" class="ui" font-size="11" font-weight="600" fill="#c4b5fd">zsh</text>

  <!-- Command line -->
  <g class="mono appear cmd">
    <text x="28" y="78"><tspan class="green">$</tspan><tspan class="txt" dx="10">npm run audit:loops</tspan></text>
  </g>
  <rect x="230" y="65" width="9" height="17" fill="#c4b5fd" class="cursor"/>

  <!-- Scan line -->
  <g class="mono appear scan">
    <text x="28" y="112" class="dim">Auditing ${total} kits in starters/ — ten checks per kit, 10 points each …</text>
  </g>

  <!-- Check rows (real audit results) -->
  <g class="mono">
${rowSvg}
  </g>

  <!-- Summary -->
  <g class="mono appear summary">
    <text x="28" y="${summaryY}">${summary}</text>
  </g>

  <!-- Score ring -->
  <g>
    <circle cx="${RING.cx}" cy="${RING.cy}" r="${RING.r + 26}" fill="url(#ringGlow)"/>
    <circle cx="${RING.cx}" cy="${RING.cy}" r="${RING.r}" fill="none" stroke="#241353" stroke-width="12"/>
    <circle class="ringFill" cx="${RING.cx}" cy="${RING.cy}" r="${RING.r}" fill="none" stroke="url(#ringGrad)" stroke-width="12" stroke-linecap="round" transform="rotate(-90 ${RING.cx} ${RING.cy})"/>
${numSvg}
    <text x="${RING.cx}" y="${RING.cy + 34}" text-anchor="middle" class="ui" font-size="13" font-weight="600" fill="#8b87a8">/ 100</text>
    <text x="${RING.cx}" y="${RING.cy - 108}" text-anchor="middle" class="ui" font-size="13" font-weight="700" letter-spacing="3" fill="#a99fd0">LOOP READY</text>
    <g class="verdict">
      <rect x="${RING.cx - 62}" y="${RING.cy + 110}" width="124" height="30" rx="15" fill="${scoreColor}" fill-opacity="0.15" stroke="${scoreColor}" stroke-width="1.5"/>
      <text x="${RING.cx}" y="${RING.cy + 130}" text-anchor="middle" class="ui" font-size="13" font-weight="800" fill="${scoreColor}">${allPass ? "ALL KITS PASS" : `${passed}/${total} PASS`}</text>
    </g>
  </g>
</svg>
`;

fs.writeFileSync(outFile, svg);
console.log(
  `render-terminal: score ${score}/100 — ${passed}/${total} kits pass — wrote ${path.relative(repoRoot, outFile)}`
);
