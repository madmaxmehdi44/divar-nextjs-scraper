import type { Listing } from "../entities/listing";

export interface MarketplaceProvider {
  name: string;

  search(query: string): Promise<Listing[]>;

  getDetails(url: string): Promise<Listing>;
}
