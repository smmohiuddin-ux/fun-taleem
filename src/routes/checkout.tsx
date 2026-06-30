import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Banknote, CheckCircle2, Lock, MessageCircle, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { PRODUCT, WHATSAPP_NUMBER, formatPKR } from "@/lib/product";
import preschoolImg from "@/assets/preschool.jpeg.asset.json";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Cash on Delivery | Magic Tracing Book" },
      { name: "description", content: "Place your order with Cash on Delivery all over Pakistan. Pay only when your order arrives." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala","Hyderabad","Bahawalpur","Sargodha","Other"];

function CheckoutPage() {
  const { qty, remove } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (qty === 0) navigate({ to: "/cart" });
  }, [qty, navigate]);

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", address: "", city: "Karachi", province: "Sindh", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = qty * PRODUCT.price;
  const shipping = useMemo(() => (subtotal >= 3000 ? 0 : 200), [subtotal]);
  const total = subtotal + shipping;

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!/^(\+?92|0)?3\d{2}[- ]?\d{7}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid Pakistani mobile";
    if (!form.address.trim() || form.address.trim().length < 8) e.address = "Please enter full address";
    if (!form.city.trim()) e.city = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const orderId = "MTB-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const message =
`Hi! I want to place an order (Cash on Delivery).

Order #${orderId}
Product: ${PRODUCT.name}
Quantity: ${qty}
Subtotal: ${formatPKR(subtotal)}
Shipping: ${shipping === 0 ? "FREE" : formatPKR(shipping)}
Total: ${formatPKR(total)}

Name: ${form.fullName}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}Address: ${form.address}
City: ${form.city}, ${form.province}
${form.notes ? `Notes: ${form.notes}` : ""}

Please confirm my order. Thank you!`;
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    try { window.open(wa, "_blank", "noopener,noreferrer"); } catch {}
    remove();
    navigate({ to: "/order-success", search: { id: orderId } });
  }

  if (qty === 0) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-background to-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to cart
          </Link>
          <h1 className="text-lg font-bold">Checkout</h1>
          <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
            <Lock className="size-3.5" /> Secure
          </div>
        </div>
      </header>

      <form onSubmit={placeOrder} className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Section title="Contact & Shipping">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" error={errors.fullName} required>
                <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Ayesha Khan" className="input" />
              </Field>
              <Field label="Mobile Number" error={errors.phone} required>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="03XX XXXXXXX" inputMode="tel" className="input" />
              </Field>
              <Field label="Email (optional)">
                <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" type="email" className="input" />
              </Field>
              <Field label="City" error={errors.city} required>
                <select value={form.city} onChange={(e) => update("city", e.target.value)} className="input">
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Province">
                <select value={form.province} onChange={(e) => update("province", e.target.value)} className="input">
                  {["Sindh","Punjab","Khyber Pakhtunkhwa","Balochistan","Islamabad Capital Territory","Azad Kashmir","Gilgit-Baltistan"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Complete Address" error={errors.address} required className="sm:col-span-2">
                <textarea value={form.address} onChange={(e) => update("address", e.target.value)} rows={3} placeholder="House #, Street, Area, Landmark" className="input" />
              </Field>
              <Field label="Order Notes (optional)" className="sm:col-span-2">
                <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2} placeholder="Any special instructions" className="input" />
              </Field>
            </div>
          </Section>

          <Section title="Payment Method">
            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-primary bg-sky-50/60 p-4">
              <input type="radio" checked readOnly className="mt-1 size-4 accent-primary" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Banknote className="size-5 text-emerald-600" />
                  <span className="font-bold">Cash on Delivery (COD)</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">RECOMMENDED</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Pay in cash when your order is delivered to your doorstep. No advance payment required.</p>
              </div>
            </label>
          </Section>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-5 text-base font-bold text-primary-foreground shadow-lg shadow-cta/30 transition hover:scale-[1.01] hover:bg-cta-dark disabled:opacity-60 lg:hidden"
          >
            <MessageCircle className="size-5" /> Place Order — {formatPKR(total)}
          </button>
        </div>

        <aside className="h-fit space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border lg:sticky lg:top-24">
          <h3 className="text-base font-bold">Order Summary</h3>
          <div className="flex gap-3 rounded-2xl bg-sky-50/60 p-3">
            <img src={preschoolImg.url} alt={PRODUCT.name} className="size-16 rounded-xl object-cover" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-semibold">{PRODUCT.name}</div>
              <div className="text-xs text-muted-foreground">Qty: {qty}</div>
              <div className="mt-1 text-sm font-bold">{formatPKR(subtotal)}</div>
            </div>
          </div>
          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPKR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="font-semibold text-emerald-600">FREE</span> : formatPKR(shipping)}</dd></div>
          </dl>
          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm font-semibold">Total (PKR)</span>
            <span className="text-2xl font-extrabold">{formatPKR(total)}</span>
          </div>
          <button type="submit" disabled={submitting} className="hidden w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-cta/30 transition hover:scale-[1.02] hover:bg-cta-dark disabled:opacity-60 lg:inline-flex">
            <MessageCircle className="size-5" /> Place Order via WhatsApp
          </button>
          <ul className="space-y-1.5 pt-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-emerald-600" /> Cash on Delivery — pay on arrival</li>
            <li className="flex items-center gap-2"><Truck className="size-3.5 text-primary" /> Delivery in 2–5 business days</li>
            <li className="flex items-center gap-2"><Lock className="size-3.5 text-muted-foreground" /> Your info is sent securely to WhatsApp</li>
          </ul>
        </aside>
      </form>

      <style>{`
        .input { width:100%; border-radius:0.75rem; border:1px solid hsl(var(--border)); background:white; padding:0.65rem 0.85rem; font-size:0.9rem; outline:none; transition:border-color .15s, box-shadow .15s; }
        .input:focus { border-color: hsl(var(--primary)); box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15); }
      `}</style>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border sm:p-6">
      <h2 className="mb-4 text-base font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children, error, required, className = "" }: { label: string; children: React.ReactNode; error?: string; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}
