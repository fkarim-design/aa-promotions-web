# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

A pitch demo for A&A Promotion (an events business run by Andrea Chisholm and
Audrey Williams): their proposed one-page website at `/` and the offer at
`/offer/`, joined by a demo bar. It is a Cloudflare Workers static-assets site.
Everything served lives in `public/` and there is no build step - the files in
that directory are the site. Once the repo is connected to Cloudflare Workers
Builds, **every push to `main` deploys to production**.

```
public/            everything served
  index.html       the new site (one page: what's on, booking, about,
                   gallery, guest list, FAQ, contact)
  offer/index.html the offer
  404.html         themed not-found page
  assets/css|js    site.css, offer.css, site.js
  fonts/           self-hosted Fraunces 600 + Inter 400/600, fonts.css
  favicon.svg
  _headers         security + caching headers (+ noindex while a demo)
  robots.txt       disallow all while a demo
work/brief.json    every fact on the site, with its source; gaps; questions
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler + playwright-core devDependencies, dev/deploy scripts
```

There is no `/original/` tab: A&A have no website to copy (they own a domain
but have not said which). Add it if they send an address that hosts a site.

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. The layout gate, with an **absolute** `--dir` (a relative one makes the
   verifier's server refuse every page) and the repo's playwright-core:

   ```bash
   NODE_PATH=$PWD/node_modules node <site-pitch>/scripts/verify-layout.js \
     --dir "$PWD/public" --routes "/,/offer/,/404.html" --fonts "Fraunces,Inter"
   ```

3. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## The pages

- Every fact on the site traces to an entry in `work/brief.json`. Never invent
  a date, venue, price, policy or quote: a missing fact becomes a question for
  the client and the section says only what the brief can prove.
- Anything waiting on the client is marked with a `.demo-note` (styled like
  the demo bar, never like the client's design). Search for `demo-note`,
  `data-demo` and `To be announced` when their details arrive.
- The palette and typefaces are proposals until A&A send their logo. They live
  as tokens at the top of `site.css` and `offer.css`; change them there.
- Client-facing copy avoids "cost", "contract", "options" and "expensive", and
  writes prices in their shortest honest form.
- When CSS or JS changes, bump the `?v=` stamp on its links - `/assets/*` is
  cached for a year.

On handover: remove the demo bar, every `.demo-note`, the `/offer/` page, the
`noindex` meta tags, the `X-Robots-Tag` header and the disallow-all
`robots.txt`; connect the forms, the WhatsApp number and booking.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## Prompt archive

`prompt text/` holds the records for the version currently in service -
nothing else. Shipping version N replaces the folder's contents wholesale,
in the same push that releases the version: remove the previous version's
folder(s) and add `prompt text/N/` containing `input.txt` (the prompt, byte
for byte), `output.txt` (the reply that shipped it, byte for byte),
`ai model.txt` (three lines: Anthropic / Claude / Fable 5 Max unless the
owner directs otherwise) and every input image and file the owner provided,
each under its own name. The files are owner-supplied records: never edit,
reformat, trim or regenerate them.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | A first look at the A&A Promotion website | A&A Promotion now has a demo website to show them: one page that introduces Andrea and Audrey, presents their brunch, polo and social events, walks through booking, gathers guest-list sign-ups and answers common questions, comfortable on a phone and polished on a laptop. Beside it, the offer page sets out the price and terms, and clearly marked notes show exactly where their dates, photos and logo will go. |
