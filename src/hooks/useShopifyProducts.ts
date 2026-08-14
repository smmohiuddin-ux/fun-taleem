import { useQuery } from "@tanstack/react-query";
import {
  fetchProductByHandle,
  fetchProducts,
  firstVariant,
  toAmount,
  HANDLE_TO_SLUG,
  PRODUCT_HANDLES,
  type ShopifyProductNode,
} from "@/lib/shopify";

export type StorefrontProduct = {
  slug: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: string[];
  price: number;
  compareAt: number;
  currencyCode: string;
  availableForSale: boolean;
  variantId: string | null;
};

export function mapProduct(product: ShopifyProductNode): StorefrontProduct {
  const variant = firstVariant(product);
  const price = variant ? toAmount(variant.price) : toAmount(product.priceRange.minVariantPrice);
  const compareAt = variant?.compareAtPrice ? toAmount(variant.compareAtPrice) : price;
  return {
    slug: HANDLE_TO_SLUG[product.handle] ?? product.handle,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    images: product.images.edges.map((e) => e.node.url),
    price,
    compareAt,
    currencyCode: variant?.price.currencyCode ?? product.priceRange.minVariantPrice.currencyCode,
    availableForSale: product.availableForSale,
    variantId: variant?.id ?? null,
  };
}

/** All Fun Taleem products, keyed by local slug. */
export function useShopifyProducts() {
  const query = useQuery({
    queryKey: ["shopify", "products"],
    queryFn: async () => {
      const products = await fetchProducts(50);
      return products.map(mapProduct);
    },
    staleTime: 5 * 60 * 1000,
  });

  const bySlug: Record<string, StorefrontProduct> = {};
  for (const p of query.data ?? []) bySlug[p.slug] = p;

  return { ...query, products: query.data ?? [], bySlug };
}

/** A single product resolved from its local slug. */
export function useShopifyProduct(slug: string) {
  const handle = PRODUCT_HANDLES[slug];
  const query = useQuery({
    queryKey: ["shopify", "product", handle],
    queryFn: async () => {
      if (!handle) return null;
      const product = await fetchProductByHandle(handle);
      return product ? mapProduct(product) : null;
    },
    enabled: Boolean(handle),
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, product: query.data ?? null };
}
