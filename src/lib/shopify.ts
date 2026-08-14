/**
 * Shopify Storefront API client.
 *
 * Shopify is the source of truth for product data (titles, descriptions,
 * images, prices, variants, availability) and for cart + checkout.
 * Local metadata (route href, marketing subtitle) stays in the app.
 */

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "xgyps7-am.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "78308d8a17caee1162b96a261a2db8cf";

export type Money = { amount: string; currencyCode: string };

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: Array<{ name: string; value: string }>;
};

export type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: Money };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
};

export type ShopifyProduct = { node: ShopifyProductNode };

/** Local product slug (used in routes/cart) -> Shopify product handle. */
export const PRODUCT_HANDLES: Record<string, string> = {
  "preschool-learning-cards":
    "magical-tracing-book-reusable-preschool-learning-cards-set-with-64-activities",
  "finger-painting-kit": "kids-finger-painting-kit",
  "interactive-busy-book": "kids-interactive-busy-book",
};

/** Shopify handle -> local product slug. */
export const HANDLE_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCT_HANDLES).map(([slug, handle]) => [handle, slug]),
);

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  descriptionHtml
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 10) { edges { node { url altText } } }
  variants(first: 25) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function storefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<any | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    console.error(
      "Shopify: payment required. The store needs an active Shopify billing plan for API access.",
    );
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }

  return data;
}

export async function fetchProducts(first = 50, query?: string): Promise<ShopifyProductNode[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query ?? null });
  const edges = data?.data?.products?.edges ?? [];
  return edges.map((e: ShopifyProduct) => e.node);
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product ?? null;
}

export function firstVariant(product: ShopifyProductNode | null | undefined) {
  return product?.variants?.edges?.[0]?.node ?? null;
}

export function firstImage(product: ShopifyProductNode | null | undefined) {
  return product?.images?.edges?.[0]?.node?.url ?? null;
}

/** Shopify returns decimal strings like "1450.0". Convert to a whole-number amount. */
export function toAmount(money: Money | null | undefined): number {
  if (!money) return 0;
  const n = Number.parseFloat(money.amount);
  return Number.isFinite(n) ? n : 0;
}

export function formatMoney(money: Money | null | undefined): string {
  if (!money) return "";
  const amount = toAmount(money);
  try {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: money.currencyCode,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${money.currencyCode} ${amount.toLocaleString("en-PK")}`;
  }
}
