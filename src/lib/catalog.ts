import plcImg from "@/assets/preschool.jpeg.asset.json";
import fpkImg from "@/assets/fpk-main.jpg.asset.json";
import bbImg from "@/assets/bb-main.jpg.asset.json";

/**
 * Presentation-only metadata for each product.
 *
 * Titles, prices, images, variants, inventory and availability come from
 * Shopify (see `src/lib/shopify.ts`). This map only holds Fun Taleem UI
 * concerns: the local route, the marketing subtitle, and a fallback image
 * shown before Shopify data resolves.
 */
export type ProductMeta = {
  slug: string;
  subtitle: string;
  image: string;
  href: string;
};

export const PRODUCT_META: Record<string, ProductMeta> = {
  "preschool-learning-cards": {
    slug: "preschool-learning-cards",
    subtitle: "64 wipe-clean activities · Ages 2+",
    image: plcImg.url,
    href: "/products/preschool-learning-cards",
  },
  "finger-painting-kit": {
    slug: "finger-painting-kit",
    subtitle: "12 washable colors + 30 activity cards · Ages 3+",
    image: fpkImg.url,
    href: "/products/finger-painting-kit",
  },
  "interactive-busy-book": {
    slug: "interactive-busy-book",
    subtitle: "4 themed books · Peel & stick play · Ages 2+",
    image: bbImg.url,
    href: "/products/interactive-busy-book",
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCT_META);
