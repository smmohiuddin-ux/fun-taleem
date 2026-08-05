export const PRODUCT = {
  id: "preschool-learning-cards",
  name: "Magical Tracing Book - Reusable Preschool Learning Cards Set with 64 Activities",
  subtitle: "Screen-Free Learning Activity Set for Ages 3+",
  price: 1450,
  compareAt: 2499,
  currency: "PKR",
  image: "/og.png",
} as const;

export const WHATSAPP_NUMBER = "923042175897";

export function formatPKR(n: number) {
  return `PKR ${n.toLocaleString("en-PK")}`;
}
