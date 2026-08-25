import { chromium } from "playwright";

const DIVAR_URL = "https://divar.ir/s/shiraz/buy-residential";

function parsePrice(text: string): number | null {
  const value = text.replace(/[^0-9]/g, "");
  return value ? Number(value) : null;
}

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

  await page.waitForTimeout(4000);

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"))
      .map((item) => ({
        title: item.textContent?.trim() || "",
        url: (item as HTMLAnchorElement).href,
      }))
      .filter((item) => item.url.includes("/v/"))
      .slice(0, 30)
  );

  const ads = [];

  for (const link of links) {
    const detail = await browser.newPage({ locale: "fa-IR" });

    try {
      await detail.goto(link.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      await detail.waitForTimeout(2000);

      const data = await detail.evaluate(() => {
        const body = document.body.innerText;
        return {
          text: body,
          title: document.title,
        };
      });

      const priceMatch = data.text.match(/([\d,]+)\s*تومان/);

      ads.push({
        title: link.title || data.title,
        url: link.url,
        price: priceMatch ? parsePrice(priceMatch[1]) : null,
        raw: data.text.slice(0, 1500),
      });
    } catch {
      ads.push({
        ...link,
        price: null,
      });
    } finally {
      await detail.close();
    }
  }

  await browser.close();

  return ads.filter((ad) => {
    if (!ad.price) return false;
    return ad.price >= 2000000000 && ad.price <= 3000000000;
  });
}
