import { scrapeDivar } from "../lib/divar";
import { isTargetPrice, parsePrice } from "../lib/parser";
import { mkdir, writeFile } from "node:fs/promises";

async function main() {
  console.log("Starting Divar scraper...");

  const ads = await scrapeDivar();

  const parsedAds = ads.map((ad) => ({
    ...ad,
    price: parsePrice(ad.description || ad.title),
  }));

  const filteredAds = parsedAds.filter((ad) => isTargetPrice(ad.price));

  await mkdir("output", { recursive: true });

  const output = {
    success: true,
    source: "https://divar.ir/s/shiraz",
    total: parsedAds.length,
    matchedPriceRange: filteredAds.length,
    generatedAt: new Date().toISOString(),
    ads: filteredAds,
  };

  await writeFile(
    "output/divar-shiraz-results.json",
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(`Matched ${filteredAds.length} ads`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
