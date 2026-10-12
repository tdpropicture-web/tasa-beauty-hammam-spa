# Tasa Beauty & Hammam Spa

Marketing and booking website for Tasa Beauty & Hammam Spa, Gwarinpa, Abuja.
Built with Vite, React 19, Tailwind CSS 4, Motion and GSAP.

## Run locally

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run lint     # type-check
```

## Editing content

Nearly everything lives in `src/data/spaData.ts`:

- `SPA_DETAILS`: name, address, phones, WhatsApp number, hours, membership price
- services, packages, testimonials, FAQs and Instagram tiles

Prices are stored in Naira (`priceNGN`). Other currencies are converted using the
rates in `src/utils/currency.ts`, so update those occasionally.

Bookings are sent to the spa as a pre-filled WhatsApp message to
`SPA_DETAILS.primaryWhatsApp`.

## Deploy

Pushing to `main` builds and publishes to GitHub Pages through
`.github/workflows/deploy.yml`. `dist/` also works on any static host.
