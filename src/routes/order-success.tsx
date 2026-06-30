import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { WHATSAPP_NUMBER } from "@/lib/product";

const search = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/order-success")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Order Placed — Magic Tracing Book" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-emerald-50 via-sky-50 to-background px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-border">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-12 text-emerald-600" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold">Order Placed!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We've opened WhatsApp with your order details. Please send the message to confirm.
        </p>
        {id && (
          <div className="mt-5 rounded-2xl bg-sky-50 p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Order ID</div>
            <div className="text-lg font-bold tracking-wider">{id}</div>
          </div>
        )}
        <div className="mt-6 space-y-3 text-left text-sm">
          {[
            "Our team will call you to confirm within 24 hours.",
            "Your order will be delivered in 2–5 business days.",
            "Pay cash when the parcel arrives at your doorstep.",
          ].map((t) => (
            <div key={t} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span className="text-foreground/80">{t}</span>
            </div>
          ))}
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-cta/30 hover:bg-cta-dark"
        >
          <MessageCircle className="size-5" /> Reopen WhatsApp
        </a>
        <Link to="/" className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-border hover:bg-muted">
          Continue Shopping
        </Link>
        <p className="mt-5 inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="size-3.5" /> Need help? +92 304 2175897
        </p>
      </div>
    </main>
  );
}
