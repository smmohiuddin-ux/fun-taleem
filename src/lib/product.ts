export const PRODUCT = {
  id: "magic-tracing-book",
  name: "Reusable Magic Tracing Book",
  subtitle: "Screen-Free Learning Activity Book for Ages 3+",
  price: 1499,
  compareAt: 2499,
  currency: "PKR",
  image: "/og.png",
} as const;

export const WHATSAPP_NUMBER = "923042175897";

export function formatPKR(n: number) {
  return `PKR ${n.toLocaleString("en-PK")}`;
}
