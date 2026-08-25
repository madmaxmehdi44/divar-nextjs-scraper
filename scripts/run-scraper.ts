import { scrapeDivar } from "../lib/divar";
import { mkdir, writeFile } from "node:fs/promises";

async function main() {
  console.log("Starting Divar scraper...");

  const ads = await scrapeDivar();

  await mkdir("output", { recursive: true });

  const output = {
    success: true,
    source: "https://divar.ir/s/shiraz",
    count: ads.length,
    generatedAt: new Date().toISOString(),
    ads,
  };

  await writeFile(
    "output/divar-shiraz-results.json",
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(`Scraped ${ads.length} ads`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
