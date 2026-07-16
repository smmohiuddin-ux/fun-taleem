import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/product";
import { AnnouncementBar, SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Funtaleem" },
      { name: "description", content: "Review your Funtaleem order and proceed to Cash on Delivery checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, qty, subtotal, compareTotal, increment, decrement, set, remove } = useCart();
  const navigate = useNavigate();
  const savings = Math.max(0, compareTotal - subtotal);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eaf7fb] via-white to-white pb-24">
      <AnnouncementBar />
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" hash="products" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-[#1e88e5]">
            <ArrowLeft className="size-4" /> Continue shopping
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#0a2647]">Your Cart</h1>
          <div className="w-40 text-right text-sm text-muted-foreground">{qty} item{qty === 1 ? "" : "s"}</div>
        </div>

        {items.length === 0 ? <EmptyCart /> : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <Link to={it.href as "/products/preschool-learning-cards"} className="relative w-full overflow-hidden rounded-2xl bg-[#eaf7fb] sm:size-40 sm:shrink-0">
                      <img src={it.image} alt={it.name} loading="lazy" className="size-full object-cover transition duration-300 hover:scale-105" />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to={it.href as "/products/preschool-learning-cards"} className="text-lg font-bold leading-snug text-[#0a2647] hover:text-[#1e88e5]">{it.name}</Link>
                          <p className="mt-1 text-sm text-muted-foreground">{it.subtitle}</p>
                          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            In Stock — Cash on Delivery
                          </p>
                        </div>
                        <button onClick={() => remove(it.id)} aria-label="Remove item" className="rounded-full p-2 text-muted-foreground transition hover:bg-rose-50 hover:text-rose-600">
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="inline-flex items-center rounded-full border border-border bg-background">
                          <button onClick={() => decrement(it.id)} aria-label="Decrease quantity" className="grid size-10 place-items-center rounded-full hover:bg-muted">
                            <Minus className="size-4" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={99}
                            value={it.qty}
                            onChange={(e) => set(it.id, parseInt(e.target.value || "0", 10))}
                            className="w-12 bg-transparent text-center text-base font-semibold outline-none"
                          />
                          <button onClick={() => increment(it.id)} aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full hover:bg-muted">
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#0a2647]">{formatPKR(it.lineTotal)}</div>
                          <div className="text-xs text-muted-foreground line-through">{formatPKR(it.lineCompare)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/70 p-4 text-center text-xs text-muted-foreground ring-1 ring-border">
                <div className="flex flex-col items-center gap-1"><Truck className="size-4 text-[#1e88e5]" /> Fast Delivery</div>
                <div className="flex flex-col items-center gap-1"><ShieldCheck className="size-4 text-emerald-600" /> COD Available</div>
                <div className="flex flex-col items-center gap-1"><RefreshCw className="size-4 text-[#f39c12]" /> Easy Returns</div>
              </div>
            </section>

            <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border lg:sticky lg:top-24">
              <h3 className="text-base font-bold text-[#0a2647]">Order Summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{formatPKR(subtotal)}</dd></div>
                {savings > 0 && (
                  <div className="flex justify-between"><dt className="text-muted-foreground">You save</dt><dd className="font-semibold text-emerald-600">−{formatPKR(savings)}</dd></div>
                )}
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="font-semibold">Calculated at checkout</dd></div>
              </dl>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold">Total</span>
                <span className="font-display text-2xl font-extrabold text-[#0a2647]">{formatPKR(subtotal)}</span>
              </div>

              <button
                onClick={() => navigate({ to: "/checkout" })}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f39c12] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#f39c12]/30 transition hover:scale-[1.02] hover:bg-[#e67e22]"
              >
                <ShoppingBag className="size-5" /> Proceed to Checkout
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Pay on delivery — no advance payment</p>
            </aside>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-border">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#eaf7fb]">
        <ShoppingBag className="size-10 text-[#1e88e5]" />
      </div>
      <h2 className="mt-5 font-display text-xl font-bold text-[#0a2647]">Your cart is empty</h2>
      <p className="mt-2 text-sm text-muted-foreground">Browse our interactive learning toys to get started.</p>
      <Link to="/" hash="products" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1e88e5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0a2647]">
        Browse Products
      </Link>
    </div>
  );
}
