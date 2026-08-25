# Divar NextJS Scraper - Project State

## Repository
madmaxmehdi44/divar-nextjs-scraper

## Goal
Build an intelligent Divar scraper for Shiraz listings.

Roadmap:
1. Scrape Divar listings
2. Extract price and metadata
3. Filter listings between 2 and 3 billion toman
4. Store data using Prisma/PostgreSQL
5. Add AI Agent for analysis and ranking

## Current Stack
- Next.js
- TypeScript
- Playwright
- GitHub Actions

## Completed
- Initial Playwright scraper created
- GitHub Actions workflow created
- Workflow runs on push to main and manual dispatch
- Scraper target URL configured:
  https://divar.ir/s/shiraz
- Output artifact configured from output/

## GitHub Actions
Workflow:
.github/workflows/scraper-test.yml

Current setup:
- Ubuntu runner
- Node.js 22
- actions/checkout
- actions/setup-node
- npm install
- Playwright Chromium installation
- npm run scraper

## Previous Issues
- npm cache failed because package-lock.json did not exist
- Removed npm cache requirement temporarily
- Node setup compatibility issue was investigated

## Next Steps
1. Verify latest successful workflow run
2. Inspect scraper JSON output
3. Improve selectors if needed
4. Crawl individual /v/ ad pages
5. Add Persian price parser
6. Add price filtering:
   2,000,000,000 <= price <= 3,000,000,000
7. Add Prisma schema
8. Connect PostgreSQL
9. Build AI analysis agent

## Development Rule
Keep this file updated after major architecture changes.
