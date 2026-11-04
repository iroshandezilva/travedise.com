---
name: canvas-iteration
description: The design loop on the Claude Design canvas — read the canvas, put 2–3 labelled options as artboards, take feedback in rounds, keep a decision log, and hand an approved artboard to the build with a spec. Load when designing or redesigning a page or section before any code is written.
---

# Designing on the canvas before building

The site's canvas is a Claude Design artifact:
**https://claude.ai/artifact/E5arYMHaYtTm9GyBuEPNLd** — artboards such as `Main.dc.html`,
`Journeys.dc.html`, `Package.dc.html`, `WhenToGo.dc.html`, `About.dc.html`, `Contact.dc.html`,
`Blog.dc.html`, `Post.dc.html`.

Work on that canvas through the Artifact tool. Always `read` it first and build on what comes
back — the owner edits it too, and a publish on top of an unread version is refused. Start a new
canvas only if the owner asks for one.

## Why this loop exists

Building a page costs hours; moving a rectangle on the canvas costs seconds. Every design
decision made on the canvas is a decision the build doesn't have to redo. So the canvas is where
options get compared and rejected — not the PR.

## The loop

1. **Brief (one message).** Restate the goal in one sentence: page, audience, the one thing a
   visitor must do or feel. List the real content that will fill it — pull it from
   `src/content/**`, don't use lorem ipsum. Ask at most one question, only if the answer changes
   the design.
2. **Diverge (2–3 options).** Put each option on its own artboard next to the current one, named
   `<Page> — A: <idea>`, `B: <idea>`. The options must differ in idea (structure, hierarchy,
   what leads), not just colour. Every option uses the tokens and components from the
   `travedise-design-system` skill; a new component is allowed only if you say why the existing
   ones don't fit.
3. **Show desktop and phone.** For each option, a 1440 artboard and a 390 artboard. The site is
   designed desktop-first, but travellers plan on their phones too — an option that only works
   on desktop is not finished.
4. **Explain in three lines per option:** what it bets on, what it gives up, what you would pick
   and why. Give a recommendation, not a menu.
5. **Converge.** Take the owner's comments (canvas comments or chat). Change only what they
   commented on, plus anything the change forces. Re-publish to the same artboard so the history
   stays in one place.
6. **Repeat 5** until the owner says the word **approve** (or clearly equivalent) for one artboard.
   "Looks nice" is not approval — ask "Approve B for the build?".

## Decision log

Keep a short log on the canvas (a `Decisions` text block on the page) and repeat it at the top of
each reply:

```
Decisions so far
- Hero: full-bleed photo, headline bottom-left (round 2)
- Rejected: split hero — too much like the packages page (round 1)
Open
- Does the map sit above or below the itinerary?
```

It stops later rounds from undoing earlier ones and lets anyone pick the work up.

## Quality bar before showing an option

- Real copy and real photos from `public/` at the real sizes.
- Contrast: body text on navy is `v2-muted`, on white `v2-body`; check anything new against WCAG AA.
- One `v2-sky` button per view.
- Nothing that the static site can't do (no live search, no logins, no forms with a backend
  other than the enquiry form).

## Handoff to the build

When an artboard is approved, write the handoff and give it to `design-porter`:

```
Approved: <artboard name> (round n), canvas <url>
Route: /<path>, template or new page
Sections, top to bottom:
  1. <name> — <component to reuse | NEW: why> — surface white|cream|navy — content from <json path>
  ...
New tokens: none | <name hex role>
New content fields: none | <collection.field type, optional?>
Phone differences: <what reflows or hides>
Motion: <Reveal usage, anything beyond>
Out of scope: <what the build must not add>
```

The designer never edits `src/`. The build is someone else's job, so the spec must be enough on
its own.
