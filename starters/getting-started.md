# Getting Started with a Starter Kit

A loop kit is a folder of small files — a definition, a spine, a budget, a constitution,
a skill, and a read-only checker. You can put one into a project three ways, and which
one you want depends on where the loop is going to live.

| You want to | Use |
| --- | --- |
| Run one of these 20 loops **in your own project** | [`npx @loop-engineering/loop-kit`](#install-a-kit-with-npx) |
| Design a **brand-new** loop, blanks and all | [`npx … new <loop-name>`](#start-a-brand-new-loop) |
| Add a kit **to this library** as a contributor | [the manual copy](#contributor-route-copy-the-template) |

The first two need nothing but Node 18+. You do not clone this repo to use a kit.

## Install a kit with `npx`

One command, run from the root of the project you want the loop to watch:

```text
npx @loop-engineering/loop-kit ci-sweeper
```

`npx` fetches the CLI, writes the kit, and exits. Nothing is installed globally, no
repository is cloned into your working directory, and the download is **the kits only** —
the course itself, the labs, the website, and the loops that built them are not in the
package. To see what is on offer first:

```text
npx @loop-engineering/loop-kit list
```

That prints all 20 kits with their category and the autonomy level they ship at — every
one of them L1, report-only, because [that is the rule](../docs/10-operating/safety.md).

The rest of this page shortens that to `npx loop-kit …` for readability. Substitute the
full form above, or alias it once: `alias loop-kit='npx @loop-engineering/loop-kit'`.

### Where the files land

A kit is split across two places, because Claude Code only discovers skills and
subagents under a project-root `.claude/` directory:

```text
your-project/
├── loops/ci-sweeper/
│   ├── LOOP.md                  the definition — six parts, prompt, limits, stops
│   ├── ci-sweeper-state.md      the spine — commit this before beat 1
│   ├── loop-budget.md           caps + the 80% tripwire
│   ├── loop-constraints.md      the constitution
│   ├── loop-run-log.md          append-only, one line per beat
│   ├── README.md                quickstart + Loop Ready notes
│   ├── opencode.json.example    OpenCode: write-narrow permissions
│   └── skills/loop-task.md      OpenCode: the procedure
└── .claude/
    ├── skills/ci-sweeper/SKILL.md    Claude Code: the procedure
    └── agents/loop-verifier.md       Claude Code: the read-only checker
```

Install a second kit and the checker does not collide — the CLI notices
`loop-verifier.md` is taken and writes `docs-sweep-verifier.md` instead, with the
frontmatter name adjusted to match. Existing files are never overwritten silently; the
command refuses and lists what it would have clobbered.

### Options

```text
--dir <path>     install into another project instead of the current directory
--tool <name>    claude · opencode · both     (default: both)
--force          overwrite existing files
--dry-run        print every path it would write, write nothing
```

`--tool claude` skips the OpenCode files; `--tool opencode` skips the `.claude/` ones.
When you are unsure what a kit will do to a directory, `--dry-run` answers it exactly.

> [!NOTE]
> There is a second route — `npx github:ayeshakhalid192007-dev/LoopEngineering-CrashCourse`
> runs the same CLI straight out of the repository, with no registry involved. It behaves
> identically, but it downloads the entire course to install ten small files, and it
> resolves whatever the repository's default branch happens to be. Reach for it only when
> you need a change that has not been published yet.

## Start a brand-new loop

When none of the 20 kits fits, take the blank template instead. It is the same
skeleton, with every decision left as an `<ANGLE-BRACKET>` for you to fill:

```text
npx loop-kit new link-sentinel
```

Your loop name gets substituted throughout — the spine is named for it, the skill is
named for it, the OpenCode permission block scopes writes to it. What is left is the
thinking: fill `LOOP.md` using [the A–F method](../docs/09-methods/make-your-own-loop.md),
write the real procedure into the `SKILL.md`, and commit the spine before beat 1.

The full walkthrough, with a worked example and the cross-tool plumbing, is
[Scaffold a Loop from the Template](../docs/09-methods/scaffold-from-template.md).

## Contributor route: copy the template

This one is different in kind from the two above. It does not install a loop into your
project — it adds a **new kit to this library**, which is something you do with the
repo cloned and a pull request in mind:

```text
git clone https://github.com/ayeshakhalid192007-dev/LoopEngineering-CrashCourse.git
cd LoopEngineering-CrashCourse
cp -r starters/_template starters/<loop-name>
```

Or let the repo's own script do the copy and the placeholder substitution:

```text
node scripts/new-loop-scaffold.mjs <loop-name>
```

Either way, rename `loop-state.md.example` to `<loop-name>-state.md`, fill every
blank, add the kit to [`patterns/registry.yaml`](../patterns/registry.yaml), and run
`node scripts/validate-registry.mjs` before you open the PR. See
[CONTRIBUTING.md](../CONTRIBUTING.md).

## Whichever route you took

The kit is a starting shape, not a finished loop. Before the first real beat, walk it
against the seven-item minimum:

1. Provable success condition
2. Run limit
3. Spine written first, committed
4. Report-only (L1) start
5. Human gate placed
6. One log line per beat
7. Kill switch tested

Then run one watched cycle at L1 before you let it near a schedule.

## Publishing the CLI

The published package is not this repository. It is
[`packages/loop-kit/`](../packages/loop-kit/README.md) — a CLI plus the kits, and nothing
else. The repository's own root `package.json` is marked `private`, so the course can
never be pushed to the registry by accident.

A maintainer with an npm account publishes it from that directory:

```text
npm adduser                              # one-time, interactive
cd packages/loop-kit && npm publish      # access:public is set in package.json
```

The `@loop-engineering` scope has to exist before that publish will land. Scopes are not
created from the CLI — there is no `npm org create`. Either register the free org at
[npmjs.com/org/create](https://www.npmjs.com/org/create), or drop the org entirely and
rename the package to your own username scope (`@your-npm-name/loop-kit`), which every
account owns by default.

npm requires two-factor authentication to publish. With an authenticator app you pass the
six-digit code as `--otp=<code>`; with a security key or passkey there is no code at all —
`npm publish` prints an `npmjs.com/login/<uuid>` line, and you open **that exact URL**,
authorize, and press Enter at the terminal's OTP prompt. Run it from a real terminal: the
browser handshake needs a session that can wait for you.

Publishing does **not** wait on any branch merge. `npm publish` uploads the working tree
you run it from, so a maintainer sitting on a feature branch can publish today and
`npx @loop-engineering/loop-kit` starts working for everyone immediately. Only the
`github:` fallback is branch-sensitive, because that form resolves the repository's
default branch.

A first publish under a brand-new scope can 404 for a minute while the registry's CDN
catches up. That is propagation, not failure — `+ @loop-engineering/loop-kit@0.1.0` in the
publish output is the authoritative answer.

The kits are copied into the package at pack time by `scripts/bundle-kits.mjs`, so they
stay authored in one place (`starters/`) and are never duplicated in the repo. Check what
would ship before you push it:

```text
cd packages/loop-kit && npm pack --dry-run
```

That lists every file in the tarball: `bin/`, `starters/`, `patterns/registry.yaml`, and
the licence. Roughly 90 kB — the repository is many times that.

## Related command-line tools

The `cobusgreyling/loop-engineering` reference repo ships its own `npx` tools for
costing and auditing a loop, which pair well with a kit installed here:

```text
npx @cobusgreyling/loop-cost --pattern daily-triage --level L1   # estimate token cost
npx @cobusgreyling/loop-audit . --suggest                        # audit + suggestions
npx @cobusgreyling/loop-audit . --badge                          # readiness badge
```

Its `--tool` flag selects the coding agent a kit is written for. S7's examples use
`grok`; this course pairs Claude Code and OpenCode, so `--tool claude` or
`--tool opencode` fills the same slot.

---

*Attribution: the starter-kit model and the `loop-init` CLI shape are adapted from the
`cobusgreyling/loop-engineering` reference repo
([S7](https://github.com/cobusgreyling/loop-engineering), MIT); the loop anatomy the kit
encodes is from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../resources/sources.md).*
