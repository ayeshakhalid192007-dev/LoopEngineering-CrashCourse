# Assets

Artwork used by the README and the curriculum pages.

## `social-preview.png` — the repo's share card

1280×640, the size GitHub asks for. This is the image that appears when the repo
link is shared anywhere — Slack, X, LinkedIn, an AI answer citing the course.

**It is not applied by committing it here.** GitHub exposes no API for the social
preview, so it has to be set by hand, once:

> **Settings → Social preview → Edit → Upload an image** → pick `assets/social-preview.png`

Until that is done, every share of this repo carries GitHub's auto-generated card
(owner avatar, repo name, and a language bar) instead of the course's own design.

Regenerate it from the site repo, which owns the type ramp and palette it uses:

```bash
cd ../loop-lab && npm run og      # writes assets/social-preview.png + public/og.png
```

Then copy the result back here. The two repos share a look deliberately; if the
brand changes, both cards change together.

## The rest

The `.svg` files are curriculum diagrams and section furniture referenced by
`docs/`. Eight of them are raster images wrapped in an `<svg>` element rather than
real vector art — the site's sync step unwraps those to WebP when it vendors the
docs, which is why the published pages are lighter than a naive copy would be.
Leave the wrappers in place here: GitHub renders them fine, and the unwrapping is
the site's job, not this repo's.
