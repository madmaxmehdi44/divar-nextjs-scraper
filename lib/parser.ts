export function parsePrice(text: string): number | null {
  const normalized = text
    .replace(/,/g, "")
    .replace(/٬/g, "")
    .replace(/،/g, "")
    .replace(/تومان/g, "");

  const match = normalized.match(/\d+/g);

  if (!match) return null;

  const value = Number(match.join(""));

  return Number.isNaN(value) ? null : value;
}

export function isTargetPrice(price: number | null) {
  if (!price) return false;

  return price >= 2000000000 && price <= 3000000000;
}
