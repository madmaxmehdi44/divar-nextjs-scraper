import { chromium } from "playwright";

export async function scrapeDivar() {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    locale: "fa-IR",
  });

  await page.goto("https://divar.ir/s/shiraz/buy-residential", {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  await page.waitForTimeout(5000);

  const ads = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map((item) => ({
        title: item.textContent?.trim(),
        url: (item as HTMLAnchorElement).href,
      }))
      .filter((item) => item.title && item.url.includes("/v/"))
      .slice(0, 20);
  });

  await browser.close();

  return ads;
}
