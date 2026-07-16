import { useEffect, useState, useCallback } from "react";
import { CATALOG, type CatalogItem } from "@/lib/catalog";

const KEY = "funtaleem_cart_v2";
const EVT = "funtaleem-cart-changed";

type CartMap = Record<string, number>;

export type CartLine = CatalogItem & { qty: number; lineTotal: number; lineCompare: number };

function read(): CartMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const out: CartMap = {};
      for (const [k, v] of Object.entries(parsed)) {
        const n = typeof v === "number" ? v : parseInt(String(v), 10);
        if (CATALOG[k] && Number.isFinite(n) && n > 0) out[k] = Math.min(99, Math.floor(n));
      }
      return out;
    }
  } catch { /* ignore */ }
  return {};
}

function write(next: CartMap) {
  if (typeof window === "undefined") return;
  const clean: CartMap = {};
  for (const [k, v] of Object.entries(next)) {
    if (CATALOG[k] && v > 0) clean[k] = Math.min(99, Math.floor(v));
  }
  if (Object.keys(clean).length === 0) window.localStorage.removeItem(KEY);
  else window.localStorage.setItem(KEY, JSON.stringify(clean));
  window.dispatchEvent(new CustomEvent(EVT));
}

function derive(map: CartMap): { items: CartLine[]; qty: number; subtotal: number; compareTotal: number } {
  const items: CartLine[] = [];
  let qty = 0;
  let subtotal = 0;
  let compareTotal = 0;
  for (const [id, n] of Object.entries(map)) {
    const item = CATALOG[id];
    if (!item) continue;
    items.push({ ...item, qty: n, lineTotal: item.price * n, lineCompare: item.compareAt * n });
    qty += n;
    subtotal += item.price * n;
    compareTotal += item.compareAt * n;
  }
  return { items, qty, subtotal, compareTotal };
}

export function useCart() {
  const [map, setMap] = useState<CartMap>({});
  useEffect(() => {
    setMap(read());
    const onChange = () => setMap(read());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const add = useCallback((id: string, n = 1) => {
    const cur = read();
    cur[id] = (cur[id] ?? 0) + n;
    write(cur);
  }, []);
  const set = useCallback((id: string, n: number) => {
    const cur = read();
    if (n <= 0) delete cur[id]; else cur[id] = n;
    write(cur);
  }, []);
  const increment = useCallback((id: string) => {
    const cur = read();
    cur[id] = (cur[id] ?? 0) + 1;
    write(cur);
  }, []);
  const decrement = useCallback((id: string) => {
    const cur = read();
    const next = (cur[id] ?? 0) - 1;
    if (next <= 0) delete cur[id]; else cur[id] = next;
    write(cur);
  }, []);
  const remove = useCallback((id: string) => {
    const cur = read();
    delete cur[id];
    write(cur);
  }, []);
  const clear = useCallback(() => write({}), []);

  const { items, qty, subtotal, compareTotal } = derive(map);
  return { items, qty, subtotal, compareTotal, add, set, increment, decrement, remove, clear };
}
