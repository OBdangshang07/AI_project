---
name: og
description: >
  Share-link previews and app identity for apps on *.grok.me: the injector-owned
  og:image card, the SVG favicon, and PWA icons for installable apps.
  Use when scaffolding, renaming, or restyling the app — and for share /
  unfurl / OG / Twitter card questions. A custom 1200×630 card from the app's
  own art is the default — games of every kind (DOM board/word games
  included), whimsical apps, creative tools, and brand-forward pages; only
  plain utilities keep the placeholder. Always run the brand-asset pass as a
  `task` subagent while the app builds.
  Triggers on "share", "rename", "app name", "OG", "Open Graph",
  "twitter card", "unfurl", "og:image", "og:type", "x:game:image",
  "x-banner", "link preview", "social card", "thumbnail", "preview image",
  "favicon", "app icon", "PWA", "manifest", "installable", "home screen",
  "SEO", "meta description".
metadata:
  short-description: "Brand assets: og.jpg card, X feed banner, SVG favicon, PWA icons — always a `task` subagent"
user-invocable: false
---

# Share cards, favicon, and app icons

A deployed app (`https://{name}.grok.me`) unfurls with a 1200×630 card; every app
(preview included) shows a favicon in the tab. **Share-card `<meta>` tags are not
authored in `__root.tsx`** — the injector (`scripts/grok-pwa-shared.mjs`) overwrites
`og:*` and `twitter:card` on every HTML response. You write identity data only:

- `src/lib/og/site.json` — create only if needed: `{ "title", "type"?: "x:game", "card"?: "custom", "color"?: "RRGGBB" }`. Not pre-seeded; title defaults to the host slug.
- `public/og.jpg` — custom 1200×630 card (optional; placeholder otherwise)
- `public/x-banner.jpg` — games only: 50:11 (1200×264) X feed card
- `public/favicon.svg` — still linked from root `head()`

**Extend `__root.tsx`; never replace it wholesale** (auth SSR, redesign, another
skill's excerpt). Adding `og:*` / `twitter:card` there is pointless — the injector
replaces them — and dropping the favicon link ships a blank tab icon that
`npm run dev` / `build` will not catch.

## Decide: which card this app gets

**Default: a custom card** from the app's own art — games of every kind and
rendering tech (Canvas/WebGL *and* DOM board, card, word, puzzle, quiz: a
tic-tac-toe grid of divs is still a game), whimsical and toy apps, creative tools,
content- and brand-forward pages. **When in doubt, make the custom card.**

**Plain utility apps only** (converters, invoice/CRUD trackers, internal dashboards,
minimal notes/admin — apps whose face is the data) keep the default `og.grok.me`
placeholder: no `public/og.jpg`. Its URL, the `"color"` knob, the rename rule, and
when card pixels reach the unfurl (next deploy; never a `.env` for the hostname)
are in `references/placeholder-card.md`.

## `og:type` for games

**A game of any kind** sets `"type": "x:game"` in `src/lib/og/site.json` —
`{ "title": "Sky Strike", "type": "x:game", "card": "custom" }` — which needs no
hostname and must never be gated on a custom card.
X's card pipeline keys off that exact value to present the unfurl as a **game** card.
Keep it: do not "correct" it to `website` during refactors, shorten it to bare
`game`, or reach for `twitter:card` / invented `x:type` tags — the rejected
alternatives are in `references/og-type-contract.md`. Non-games omit `og:type`.
`browser-smoke.mjs` / `brand-check.mjs` emit a **BRAND WARNING** when a canvas app
lacks `"type": "x:game"` or — once a custom card exists — `public/x-banner.jpg`; treat that as not done.

## Brand-asset pass: always a subagent

**Have the `task` tool? You are building the app: always dispatch this pass as a subagent,
never generate card art yourself** — inline it serializes minutes of generation latency behind
a finished app. As soon as the name and palette settle (AGENTS.md § "Parallel work") give it
this skill plus `references/custom-card.md`, sole ownership of `public/` brand assets +
`src/lib/og/site.json`, and a prompt naming it the brand pass; keep building, and merge
`site.json` at the end (`wait_tasks` before the final verify). Stay sequential only when the
user is art-directing or the art to reuse doesn't exist yet.

**No `task` tool? Then you are the pass** — build the assets now, below; nothing else will.

## Build the assets

- **Custom `public/og.jpg`** → follow `references/custom-card.md` (16:9 generation,
  baked title lockup, the 1200×630 ffmpeg normalize, and the read-back gate: a card
  with a clipped title is **rejected**, not shipped).
- **`public/x-banner.jpg` — games only** → follow `references/x-banner.md`
  (50:11 generation plus the left/top safe lockup that feed chrome forces).
- **`public/favicon.svg` — every app** → **hand-author the SVG; never generate it
  with `imagine_text_to_image`**, it must stay crisp at 16px. Markup, `head()`
  wiring, verification, and the PWA raster icons (only when the app ships a web
  manifest because the user asked for installable / PWA / home-screen behavior —
  never invent a manifest just to have icons): `references/favicon-and-icons.md`.

Regenerate the card when the visual identity materially changes, and on rename — the
title is baked into the pixels *and* into `site.json`, so update `APP_NAME`,
`site.json` `title`, and regenerate (a titleless card survives a rename). With neither
`imagine_text_to_image` nor the xAI Images API available, fall back to the `og.grok.me`
card; never ship a missing or broken `og:image` URL.

## Not supported

No `/api/og` route, no runtime image renderer, no per-route cards — the card is one
static site-wide image (`public/og.jpg` or the placeholder service). **Never author or
mutate `og:*` / `twitter:card` in `__root.tsx`** — the injector overwrites them. If you
add `robots.txt`, never blanket `Disallow: /`: crawlers must fetch `/` to read the tags.
