# Divar Next.js Scraper

MVP scraper for Divar residential listings.

## Stack

- Next.js
- TypeScript
- Playwright

## Run

```bash
npm install
npx playwright install chromium
npm run dev
```

API:

```
GET /api/divar
```

Current version:

- Opens Shiraz residential listings
- Extracts listing titles and URLs
- Returns JSON

Next steps:

- Extract price
- Filter 2B-3B toman listings
- PostgreSQL + Prisma
- AI search agent
