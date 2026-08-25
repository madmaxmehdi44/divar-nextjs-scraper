export interface Listing {
  id?: string;
  source: "divar" | "offerup";
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  category?: string;
  condition?: string;
  city?: string;
  location?: string;
  images: string[];
  url: string;
  publishedAt?: Date;
}
