# `@loop-engineering/loop-kit`

The installable half of the [Loop Engineering Crash Course](https://github.com/ayeshakhalid192007-dev/LoopEngineering-CrashCourse/blob/main/README.md): a CLI that
drops a ready-to-run loop kit into any project.

```text
npx @loop-engineering/loop-kit list         # browse all 20 kits
npx @loop-engineering/loop-kit ci-sweeper   # install one
npx @loop-engineering/loop-kit new my-loop  # start from the blank template
```

Node 18+ is the only prerequisite. Nothing is installed globally and nothing is cloned.

## What ships, and what does not

The tarball carries the CLI, the 20 kits, the blank template, and the pattern registry —
about 90 kB. It does **not** carry the course: no `docs/`, no labs, no website, none of
the loops that built the repository. Users installing a kit download kits.

The kits are authored once at the repo root in [`starters/`](https://github.com/ayeshakhalid192007-dev/LoopEngineering-CrashCourse/blob/main/starters/README.md),
because the course reads them too. `scripts/bundle-kits.mjs` copies them into this
package at pack time; the copies are gitignored build artifacts and must never be edited
here.

## Publishing

```text
npm publish            # from this directory; access:public is set in package.json
npm pack --dry-run     # inspect the tarball first
```

`npm publish` uploads the working tree it runs in, so it does not depend on any branch
being merged. The repo root `package.json` is `private`, so only this package is
publishable.

Full user-facing docs: [Getting Started with a Starter Kit](https://github.com/ayeshakhalid192007-dev/LoopEngineering-CrashCourse/blob/main/starters/getting-started.md).
Licensed [MIT](https://github.com/ayeshakhalid192007-dev/LoopEngineering-CrashCourse/blob/main/LICENSE).
