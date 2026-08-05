import plcImg from "@/assets/preschool.jpeg.asset.json";
import fpkImg from "@/assets/fpk-main.jpg.asset.json";
import bbImg from "@/assets/bb-main.jpg.asset.json";

export type CatalogItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt: number;
  image: string;
  href: string;
};

export const CATALOG: Record<string, CatalogItem> = {
  "preschool-learning-cards": {
    id: "preschool-learning-cards",
    name: "Magical Tracing Book",
    subtitle: "64 wipe-clean activities · Ages 2+",
    price: 1450,
    compareAt: 2499,
    image: plcImg.url,
    href: "/products/preschool-learning-cards",
  },
  "finger-painting-kit": {
    id: "finger-painting-kit",
    name: "Kids Finger Painting Kit",
    subtitle: "12 washable colors + 30 activity cards · Ages 3+",
    price: 2220,
    compareAt: 2499,
    image: fpkImg.url,
    href: "/products/finger-painting-kit",
  },
  "interactive-busy-book": {
    id: "interactive-busy-book",
    name: "Kids Interactive Busy Book",
    subtitle: "4 themed books · Peel & stick play · Ages 2+",
    price: 2061,
    compareAt: 2499,
    image: bbImg.url,
    href: "/products/interactive-busy-book",
  },
};
