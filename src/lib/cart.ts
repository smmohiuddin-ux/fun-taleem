import { useCallback, useEffect, useState } from "react";
import { useCartStore, cartTotals } from "@/stores/cartStore";
import { PRODUCT_META } from "@/lib/catalog";
import { toAmount } from "@/lib/shopify";

/**
 * Adapter that keeps the existing Fun Taleem UI API (`useCart()`), while the
 * real cart lives in Shopify via the Storefront API.
 */
export type CartLine = {
  id: string;
  variantId: string;
  name: string;
  subtitle: string;
  image: string;
  href: string;
  price: number;
  compareAt: number;
  qty: number;
  lineTotal: number;
  lineCompare: number;
};

export function useCart() {
  const storeItems = useCartStore((s) => s.items);
  const isLoading = useCartStore((s) => s.isLoading);
  const addBySlug = useCartStore((s) => s.addBySlug);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const checkoutUrl = useCartStore((s) => s.checkoutUrl);

  // zustand/persist rehydrates on the client only; avoid SSR mismatch.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const items: CartLine[] = hydrated
    ? storeItems.map((it) => {
        const meta = PRODUCT_META[it.slug];
        const price = toAmount(it.price);
        const compareAt = it.compareAtPrice ? toAmount(it.compareAtPrice) : price;
        return {
          id: it.slug,
          variantId: it.variantId,
          name: it.title,
          subtitle: meta?.subtitle ?? "",
          image: it.image ?? meta?.image ?? "",
          href: meta?.href ?? "/",
          price,
          compareAt,
          qty: it.quantity,
          lineTotal: price * it.quantity,
          lineCompare: compareAt * it.quantity,
        };
      })
    : [];

  const totals = cartTotals(hydrated ? storeItems : []);

  const findVariant = useCallback(
    (slug: string) => storeItems.find((i) => i.slug === slug),
    [storeItems],
  );

  const add = useCallback((slug: string, n = 1) => void addBySlug(slug, n), [addBySlug]);

  const set = useCallback(
    (slug: string, n: number) => {
      const line = findVariant(slug);
      if (line) void updateQuantity(line.variantId, n);
    },
    [findVariant, updateQuantity],
  );

  const increment = useCallback(
    (slug: string) => {
      const line = findVariant(slug);
      if (line) void updateQuantity(line.variantId, line.quantity + 1);
    },
    [findVariant, updateQuantity],
  );

  const decrement = useCallback(
    (slug: string) => {
      const line = findVariant(slug);
      if (line) void updateQuantity(line.variantId, line.quantity - 1);
    },
    [findVariant, updateQuantity],
  );

  const remove = useCallback(
    (slug: string) => {
      const line = findVariant(slug);
      if (line) void removeItem(line.variantId);
    },
    [findVariant, removeItem],
  );

  const clear = useCallback(() => clearCart(), [clearCart]);

  const openCheckout = useCallback(() => {
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  }, [checkoutUrl]);

  return {
    items,
    qty: totals.qty,
    subtotal: totals.subtotal,
    compareTotal: totals.compareTotal,
    hydrated,
    isLoading,
    checkoutUrl,
    openCheckout,
    add,
    set,
    increment,
    decrement,
    remove,
    clear,
  };
}
