import { scrapeDivar } from "../lib/divar";
import { writeFile } from "node:fs/promises";

async function main() {
  console.log("Starting Divar scraper...");

  const ads = await scrapeDivar();

  const output = {
    success: true,
    count: ads.length,
    generatedAt: new Date().toISOString(),
    ads,
  };

  await writeFile(
    "divar-results.json",
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(`Scraped ${ads.length} ads`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
