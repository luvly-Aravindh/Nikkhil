# Nikhil Bora - Private Residential Advisory (React + Vite + Tailwind)

Faithful React conversion of the original single-file site. React 18 + Vite 5 +
Tailwind CSS 4. Both lead forms are wired to Getnos Desk with validation.

## Run

```
npm install
npm run dev       # local dev on :5173 (forms post through same-origin proxy)
npm run build     # production build to dist/
npm run preview   # serve the build on :4173
```

Deploy = upload `dist/` to the host. Fully static. All 42 site images live in
`public/img/` and are served at `/img/...`.

## Structure

- `src/index.css` imports Tailwind, then `src/styles/original.css`, the authored
  stylesheet that carries the entire visual design (kept verbatim, images
  externalized to `/img/`). Tailwind is available for any new utility work.
- `src/data.js` holds the extracted data: PROPS (residence details), the home
  and properties card lists, the calibre marquee, developer logos, reviews,
  FAQs, process steps, the approach ledger, areas and contact.
- Components: `App.jsx` (nav, view routing, scroll progress, reveal + hero
  parallax, footer, modal coordination), `HomeView.jsx`, `PropView.jsx`
  (filters + grid), `PropCard.jsx` (card with image slideshow), `Emi.jsx`
  (loan calculator), `Modals.jsx` (consultation 2-step, sell/list, property
  details, lightbox).
- `src/api/submitLead.js` posts leads to Desk.
- `src/lib.js` has the background-image helper, phone normalisation/guards, and
  the email pattern.

## Forms and Desk

Both forms validate on submit with errors shown under each field, then POST to
Desk, then show the existing WhatsApp/scheduling step (so the lead is captured
in Desk AND the WhatsApp path stays).

- Consultation modal fields: name*, phone*, email, buying-for, budget,
  preferred area, message. Posts `form_type: consultation`.
- Sell / list modal fields: name*, phone*, building/project, location, carpet
  area, parking, furnishing, notes. Posts `form_type: sell_listing`.
- Validation: name required (min 2), phone required (10 digits; the field
  accepts digits only and normalises a pasted `+91`/leading-zero number), email
  optional but format-checked. Selects have safe defaults.
- Every lead also carries `name`, `phone` as `+91XXXXXXXXXX`, `subject`, `page`.

Desk notes:
1. Key verified live (empty-body probe returns the valid-key 400).
2. Desk enforces a per-project origin allowlist SEPARATE from CORS.
   `http://localhost:5173` works in dev. Before launch, add the production
   domain to the project's Settings -> Allowed Origins in Desk, or the browser
   gets `403 Origin not allowed` while curl still passes. The console prints the
   exact origin to add if it fires.
3. Desk ignores an IDENTICAL payload for ~15 minutes (`{ duplicate: true }`);
   change phone or email when testing.
4. Dev posts through a same-origin Vite proxy (`/desk-api/...`); production
   posts to Desk directly.

## Behaviour preserved

Nav compaction on scroll and animated mobile menu; scroll progress bar; reveal
animations and hero parallax; home and properties views with hash routing;
location/status/budget filters with a live count; residence cards with
auto-rotating photos; property modal with thumbnails, auto-advance and a
click-to-open lightbox; the EMI calculator with live donut. Respects
`prefers-reduced-motion`.

## Placeholders to replace before publishing

- `CONTACT.tidycal` in `src/data.js` still points at `REPLACE-ME`. Until a real
  TidyCal link is set, the consultation step shows the "scheduling connects
  here" placeholder and the WhatsApp brief; add the link to enable the embed.
- Reviews and their avatars are the original placeholders; swap for real,
  verified client reviews and photos.
- Some properties in the grid are "enquire only" (no photo/details) exactly as
  in the source.
