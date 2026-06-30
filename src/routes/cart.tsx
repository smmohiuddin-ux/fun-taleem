import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useCart } from "@/lib/cart";
import { PRODUCT, formatPKR } from "@/lib/product";
import preschoolImg from "@/assets/preschool.jpeg.asset.json";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Magic Tracing Book Pakistan" },
      { name: "description", content: "Review your Reusable Magic Tracing Book order and proceed to Cash on Delivery checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { qty, increment, decrement, set, remove } = useCart();
  const navigate = useNavigate();
  const subtotal = qty * PRODUCT.price;
  const compareTotal = qty * PRODUCT.compareAt;
  const savings = compareTotal - subtotal;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-background to-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Continue shopping
          </Link>
          <h1 className="text-lg font-bold">Your Cart</h1>
          <div className="w-32 text-right text-sm text-muted-foreground">{qty} item{qty === 1 ? "" : "s"}</div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {qty === 0 ? <EmptyCart /> : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="relative w-full overflow-hidden rounded-2xl bg-sky-50 sm:size-40 sm:shrink-0">
                  <img src={preschoolImg.url} alt={PRODUCT.name} loading="lazy" className="size-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold leading-snug">{PRODUCT.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{PRODUCT.subtitle}</p>
                      <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        In Stock — Cash on Delivery
                      </p>
                    </div>
                    <button onClick={remove} aria-label="Remove item" className="rounded-full p-2 text-muted-foreground transition hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="inline-flex items-center rounded-full border border-border bg-background">
                      <button onClick={decrement} aria-label="Decrease quantity" className="grid size-10 place-items-center rounded-full hover:bg-muted">
                        <Minus className="size-4" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={qty}
                        onChange={(e) => set(parseInt(e.target.value || "0", 10))}
                        className="w-12 bg-transparent text-center text-base font-semibold outline-none"
                      />
                      <button onClick={increment} aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full hover:bg-muted">
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatPKR(subtotal)}</div>
                      <div className="text-xs text-muted-foreground line-through">{formatPKR(compareTotal)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center text-xs text-muted-foreground">
                <div className="flex flex-col items-center gap-1"><Truck className="size-4 text-primary" /> Fast Delivery</div>
                <div className="flex flex-col items-center gap-1"><ShieldCheck className="size-4 text-emerald-600" /> COD Available</div>
                <div className="flex flex-col items-center gap-1"><RefreshCw className="size-4 text-amber-600" /> Easy Returns</div>
              </div>
            </section>

            <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border lg:sticky lg:top-24">
              <h3 className="text-base font-bold">Order Summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{formatPKR(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">You save</dt><dd className="font-semibold text-emerald-600">−{formatPKR(savings)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="font-semibold">Calculated at checkout</dd></div>
              </dl>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-2xl font-extrabold">{formatPKR(subtotal)}</span>
              </div>

              <button
                onClick={() => navigate({ to: "/checkout" })}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-cta/30 transition hover:scale-[1.02] hover:bg-cta-dark"
              >
                <ShoppingBag className="size-5" /> Proceed to Checkout
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Pay on delivery — no advance payment</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-border">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-sky-50">
        <ShoppingBag className="size-10 text-primary" />
      </div>
      <h2 className="mt-5 text-xl font-bold">Your cart is empty</h2>
      <p className="mt-2 text-sm text-muted-foreground">Add the Magic Tracing Book to get started.</p>
      <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        Browse Product
      </Link>
    </div>
  );
}
