import { chromium } from "playwright";

const DIVAR_URL = "https://divar.ir/s/shiraz";

export async function scrapeDivar() {
  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage({
    locale: "fa-IR",
    viewport: { width: 1280, height: 1200 },
  });

  await page.goto(DIVAR_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await page.waitForTimeout(5000);

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"))
      .map((item) => ({
        title: item.textContent?.trim() || "",
        url: (item as HTMLAnchorElement).href,
      }))
      .filter((item) => item.url.includes("/v/"))
      .slice(0, 50)
  );

  const ads = [];

  for (const link of links) {
    const detail = await browser.newPage({ locale: "fa-IR" });

    try {
      await detail.goto(link.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      const text = await detail.locator("body").innerText();

      ads.push({
        ...link,
        description: text.slice(0, 1000),
      });
    } catch {
      ads.push(link);
    } finally {
      await detail.close();
    }
  }

  await browser.close();

  return ads;
}
