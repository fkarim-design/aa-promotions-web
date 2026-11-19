# A&A Promotion — website demo

A proposed website for A&A Promotion, the events business run by Andrea
Chisholm and Audrey Williams (Caribbean brunches, polo experiences, social
outings, and wine and gin days in the works), with the offer beside it.

| Route | Page |
| --- | --- |
| `/` | The new site: one page covering what's on, booking, about, gallery, guest list, FAQ and contact |
| `/offer/` | The offer: what they asked for against what the site does, the price, the terms |

Both pages carry a demo bar and are kept out of search engines until handover.

## Structure

```
public/            everything Cloudflare serves (no build step)
  index.html
  offer/index.html
  404.html
  assets/css/      site.css, offer.css
  assets/js/       site.js (tab deep links, demo form messages)
  assets/img/      web copies of A&A's photos (WebP, metadata stripped)
  fonts/           self-hosted Fraunces and Inter, fonts.css
  favicon.svg
  _headers         security, caching, noindex
  robots.txt       disallow all while a demo
work/brief.json    the facts behind every line, with sources, gaps and questions
wrangler.jsonc     assets-only Worker config
```

## Local development

```bash
npm install
npm run dev      # wrangler dev, serves public/
npm run check    # wrangler deploy --dry-run
```

## Deployment

Cloudflare Workers Builds deploys `main` on every push once the repository is
connected: Workers & Pages → Create → Import a repository → this repo. The
first connection is a manual step in the Cloudflare dashboard.

## What is still a placeholder

The site is built strictly from A&A's own brief. Where a detail is missing, a
black "Demo" note says what goes there instead of guessing:

- event dates, venues, prices and what's included (the cards read "To be announced")
- which event each indoor photo is from (none is labelled a Caribbean brunch yet)
- a line about Andrea and Audrey, and guest comments
- the logo, brand colours and fonts (the palette and type are proposals)
- the WhatsApp number and the inbox the contact form sends to
- the mailing-list and ticketing accounts the forms and booking steps connect to

The open questions for the client are listed in `work/brief.json`.

## Photos

A&A's photos (supplied 19 November 2026) appear in the hero, the About
section and the gallery as resized WebP copies; the originals are archived in
`prompt text/`. They are not yet cleared for a public launch: everyone pictured,
and whoever took them, should agree first.

## External resources

None. Fonts are self-hosted from npm `@fontsource`; the only outside links are
to A&A's Instagram profile.
