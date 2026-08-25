import type { MarketplaceProvider } from "../../core/providers/marketplace-provider";
import type { Listing } from "../../core/entities/listing";
import { scrapeDivar } from "../../divar";

export class DivarProvider implements MarketplaceProvider {
  name = "divar";

  async search(_query: string): Promise<Listing[]> {
    const ads = await scrapeDivar();

    return ads.map((ad) => ({
      source: "divar",
      title: ad.title,
      description: ad.raw,
      price: ad.price ?? undefined,
      images: [],
      url: ad.url,
      currency: "IRR",
    }));
  }

  async getDetails(_url: string): Promise<Listing> {
    throw new Error("Not implemented");
  }
}
