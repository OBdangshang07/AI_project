# Browser QA (agent-driven only; the user is not your QA)

`AGENTS.md` § "Execution loop" states the mandatory pass. This is the menu of
capabilities and the depth judgment around it.

Everything here runs **in the sandbox** against `http://127.0.0.1:8080` — it is
**not** the user's Grok chat tab. Use whatever browser capability you have
**yourself**, so quality beats curl-only.

1. **Grok browser / computer-use / MCP browser tools**, if listed — open
   `http://127.0.0.1:8080`, glance at the UI, screenshot if supported.
2. **`web_fetch`** on that URL for an HTML-only check.
3. **Playwright helper (preinstalled)** — one run loads desktop **and** mobile,
   screenshots both, and prints a JSON verdict.

```bash
mkdir -p /workspace/screenshots
node scripts/browser-smoke.mjs http://127.0.0.1:8080/ /workspace/screenshots/app-builder-preview.png
# Writes app-builder-preview.png (desktop), -mobile.png, and .json (verdict).
# Then Read BOTH PNGs in one batched read if you have an image tool, and iterate if either looks wrong.
```

One run audits desktop (1280×800) **and** mobile (390×844): two PNGs (mobile
gets a `-mobile` suffix) plus a JSON verdict (per-viewport console/page errors,
body text, horizontal overflow) on stdout and next to the PNG (`.json`). It
writes under `/workspace/screenshots/` by default; pass an explicit path only
for a different name **under that directory**.

## Built output

Serve the build with `npm run preview` (loopback `127.0.0.1:8081`) and reuse the
dev verdict as a baseline — the JSON reports `divergesFromBaseline`, so you only
re-read the built screenshots when it flags.

```bash
node scripts/browser-smoke.mjs http://127.0.0.1:8081/ /workspace/screenshots/app-builder-built.png --baseline /workspace/screenshots/app-builder-preview.json
```

## How deep to go

Depth **beyond the mandatory smoke pass + screenshot read** is your judgment: a
landing page usually needs nothing more than that pass. For a game with WASD /
vehicles / flight, still verify control signs (A left / D right from a chase
cam) per `.grok/skills/controls/SKILL.md` — you don't have to play end-to-end,
but inverted A/D must not ship.
