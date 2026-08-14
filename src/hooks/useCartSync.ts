import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

/** Keeps the local cart in step with Shopify (clears it after a completed checkout). */
export function useCartSync() {
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    void syncCart();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void syncCart();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [syncCart]);
}
