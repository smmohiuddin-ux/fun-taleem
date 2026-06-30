import { useEffect, useState, useCallback } from "react";

const KEY = "mtb_cart_qty_v1";
const EVT = "mtb-cart-changed";

function read(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function write(n: number) {
  if (typeof window === "undefined") return;
  const safe = Math.max(0, Math.min(99, Math.floor(n)));
  if (safe <= 0) window.localStorage.removeItem(KEY);
  else window.localStorage.setItem(KEY, String(safe));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function useCart() {
  const [qty, setQty] = useState<number>(0);
  useEffect(() => {
    setQty(read());
    const onChange = () => setQty(read());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const add = useCallback((n = 1) => write(read() + n), []);
  const set = useCallback((n: number) => write(n), []);
  const remove = useCallback(() => write(0), []);
  const increment = useCallback(() => write(read() + 1), []);
  const decrement = useCallback(() => write(Math.max(0, read() - 1)), []);

  return { qty, add, set, remove, increment, decrement };
}
