import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Banknote, CheckCircle2, Lock, MessageCircle, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { WHATSAPP_NUMBER, formatPKR } from "@/lib/product";
import { AnnouncementBar, SiteHeader, SiteFooter } from "@/components/site-chrome";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Cash on Delivery | Funtaleem" },
      { name: "description", content: "Place your order with Cash on Delivery all over Pakistan. Pay only when your order arrives." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala","Hyderabad","Bahawalpur","Sargodha","Other"];
const PROVINCES = ["Sindh","Punjab","Khyber Pakhtunkhwa","Balochistan","Islamabad Capital Territory","Azad Kashmir","Gilgit-Baltistan"];

function CheckoutPage() {
  const { items, qty, subtotal, clear, hydrated } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && qty === 0) navigate({ to: "/cart" });
  }, [hydrated, qty, navigate]);

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", address: "", city: "Karachi", province: "Sindh", postalCode: "", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const shipping = useMemo(() => (subtotal >= 3000 ? 0 : 200), [subtotal]);
  const total = subtotal + shipping;

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = "Please enter your full name";
    if (!/^(\+?92|0)?3\d{2}[- ]?\d{7}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid Pakistani mobile (e.g. 03XX XXXXXXX)";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address";
    if (!form.address.trim() || form.address.trim().length < 8) e.address = "Please enter full shipping address";
    if (!form.city.trim()) e.city = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const orderId = "FT-" + Math.random().toString(36).slice(2, 7).toUpperCase();

    const { error: saveError } = await supabase.from("orders").insert({
      order_ref: orderId,
      full_name: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      address: form.address.trim(),
      city: form.city,
      province: form.province,
      postal_code: form.postalCode.trim() || null,
      notes: form.notes.trim() || null,
      items: items.map((it) => ({ id: it.id, name: it.name, qty: it.qty, price: it.price, line_total: it.lineTotal })),
      subtotal,
      shipping,
      total,
      payment_method: "COD",
      status: "new",
    });

    if (saveError) {
      setSubmitting(false);
      toast.error("Could not place your order. Please try again or message us on WhatsApp.");
      return;
    }
    toast.success("Order placed! Confirming on WhatsApp…");
    const lines = items.map((it) => `• ${it.name} × ${it.qty} — ${formatPKR(it.lineTotal)}`).join("\n");
    const message =
`Hi Funtaleem! I want to place an order (Cash on Delivery).

Order #${orderId}
${lines}

Subtotal: ${formatPKR(subtotal)}
Shipping: ${shipping === 0 ? "FREE" : formatPKR(shipping)}
Total: ${formatPKR(total)}

Name: ${form.fullName}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}Address: ${form.address}
City: ${form.city}, ${form.province}${form.postalCode ? ` ${form.postalCode}` : ""}
${form.notes ? `Notes: ${form.notes}` : ""}

Please confirm my order. Thank you!`;
    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    try { window.open(wa, "_blank", "noopener,noreferrer"); } catch { /* ignore */ }
    setPlaced(true);
    clear();
    setSubmitting(false);
    navigate({ to: "/order-success", search: { id: orderId } });
  }

  if (!hydrated || (qty === 0 && !placed)) return null;


  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eaf7fb] via-white to-white pb-24">
      <AnnouncementBar />
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-[#1e88e5]">
            <ArrowLeft className="size-4" /> Back to cart
          </Link>
          <h1 className="font-display text-2xl font-bold text-[#0a2647]">Checkout</h1>
          <div className="hidden w-40 items-center justify-end gap-1 text-xs text-muted-foreground sm:inline-flex">
            <Lock className="size-3.5" /> Secure Checkout
          </div>
        </div>

        <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <Section title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" error={errors.fullName} required>
                  <input value={form.fullName} onChange={(ev) => update("fullName", ev.target.value)} placeholder="Ayesha Khan" className="input" autoComplete="name" />
                </Field>
                <Field label="Mobile Number" error={errors.phone} required>
                  <input value={form.phone} onChange={(ev) => update("phone", ev.target.value)} placeholder="03XX XXXXXXX" inputMode="tel" autoComplete="tel" className="input" />
                </Field>
                <Field label="Email Address" error={errors.email} className="sm:col-span-2">
                  <input value={form.email} onChange={(ev) => update("email", ev.target.value)} placeholder="you@example.com" type="email" autoComplete="email" className="input" />
                </Field>
              </div>
            </Section>

            <Section title="Shipping Address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Complete Address" error={errors.address} required className="sm:col-span-2">
                  <textarea value={form.address} onChange={(ev) => update("address", ev.target.value)} rows={3} placeholder="House #, Street, Area, Landmark" autoComplete="street-address" className="input" />
                </Field>
                <Field label="City" error={errors.city} required>
                  <select value={form.city} onChange={(ev) => update("city", ev.target.value)} className="input">
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Province" required>
                  <select value={form.province} onChange={(ev) => update("province", ev.target.value)} className="input">
                    {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Postal Code (optional)" className="sm:col-span-2">
                  <input value={form.postalCode} onChange={(ev) => update("postalCode", ev.target.value)} placeholder="e.g. 75500" autoComplete="postal-code" className="input" />
                </Field>
                <Field label="Order Notes (optional)" className="sm:col-span-2">
                  <textarea value={form.notes} onChange={(ev) => update("notes", ev.target.value)} rows={2} placeholder="Any special instructions for delivery" className="input" />
                </Field>
              </div>
            </Section>

            <Section title="Payment Method">
              <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-[#1e88e5] bg-[#eaf7fb]/60 p-4">
                <input type="radio" checked readOnly className="mt-1 size-4 accent-[#1e88e5]" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Banknote className="size-5 text-emerald-600" />
                    <span className="font-bold text-[#0a2647]">Cash on Delivery (COD)</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">RECOMMENDED</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Pay in cash when your order is delivered to your doorstep. No advance payment required.</p>
                </div>
              </label>
            </Section>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f39c12] px-6 py-5 text-base font-bold text-white shadow-lg shadow-[#f39c12]/30 transition hover:scale-[1.01] hover:bg-[#e67e22] disabled:opacity-60 lg:hidden"
            >
              <MessageCircle className="size-5" /> Place Order — {formatPKR(total)}
            </button>
          </div>

          <aside className="h-fit space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border lg:sticky lg:top-24">
            <h3 className="text-base font-bold text-[#0a2647]">Order Summary</h3>
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 rounded-2xl bg-[#eaf7fb]/60 p-3">
                  <img src={it.image} alt={it.name} className="size-16 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-semibold text-[#0a2647]">{it.name}</div>
                    <div className="text-xs text-muted-foreground">Qty: {it.qty}</div>
                    <div className="mt-1 text-sm font-bold">{formatPKR(it.lineTotal)}</div>
                  </div>
                </div>
              ))}
            </div>
            <dl className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPKR(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="font-semibold text-emerald-600">FREE</span> : formatPKR(shipping)}</dd></div>
            </dl>
            <div className="flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold">Total (PKR)</span>
              <span className="font-display text-2xl font-extrabold text-[#0a2647]">{formatPKR(total)}</span>
            </div>
            <button type="submit" disabled={submitting} className="hidden w-full items-center justify-center gap-2 rounded-full bg-[#f39c12] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#f39c12]/30 transition hover:scale-[1.02] hover:bg-[#e67e22] disabled:opacity-60 lg:inline-flex">
              <MessageCircle className="size-5" /> Place Order — {formatPKR(total)}
            </button>
            <ul className="space-y-1.5 pt-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-emerald-600" /> Cash on Delivery — pay on arrival</li>
              <li className="flex items-center gap-2"><Truck className="size-3.5 text-[#1e88e5]" /> Delivery in 2–5 business days</li>
              <li className="flex items-center gap-2"><Lock className="size-3.5 text-muted-foreground" /> Order confirmation sent via WhatsApp</li>
            </ul>
          </aside>
        </form>
      </div>

      <SiteFooter />

      <style>{`
        .input { width:100%; border-radius:0.75rem; border:1px solid hsl(var(--border)); background:white; padding:0.65rem 0.85rem; font-size:0.9rem; outline:none; transition:border-color .15s, box-shadow .15s; }
        .input:focus { border-color: #1e88e5; box-shadow: 0 0 0 3px rgba(30,136,229,0.18); }
      `}</style>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border sm:p-6">
      <h2 className="mb-4 text-base font-bold text-[#0a2647]">{title}</h2>
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
