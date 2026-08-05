import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const WHATSAPP_NUMBER = "923022060216";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I have a question.")}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Little Learners PK | WhatsApp Order & Support" },
      { name: "description", content: "Get in touch with Little Learners PK. Order on WhatsApp, call or email us. Fast Cash on Delivery all over Pakistan." },
      { property: "og:title", content: "Contact - Little Learners PK" },
      { property: "og:description", content: "Reach us on WhatsApp, phone or email. Cash on Delivery in Pakistan." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-background to-background">
      <header className="border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-2xl bg-brand-green text-lg">📘</div>
            <span className="font-display text-lg font-bold">Little Learners PK</span>
          </Link>
          <nav className="flex gap-1">
            <Link to="/" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted">Home</Link>
            <Link to="/" hash="products" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted">Shop</Link>
            <Link to="/contact" activeProps={{ className: "bg-brand-green/10 text-brand-green-dark" }} className="rounded-full px-4 py-2 text-sm font-semibold">Contact</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-green/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green-dark">
            Get in touch
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">We'd love to hear from you</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            The fastest way to reach us is WhatsApp - we usually reply within minutes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="grid size-14 place-items-center rounded-2xl bg-cta text-primary-foreground"><MessageCircle className="size-7" /></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</div>
              <div className="text-lg font-bold">+92 304 2175897</div>
              <div className="text-sm text-muted-foreground">Tap to chat and order</div>
            </div>
          </a>
          <a href="tel:+923022060216" className="group flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="grid size-14 place-items-center rounded-2xl bg-brand-green text-white"><Phone className="size-7" /></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Call</div>
              <div className="text-lg font-bold">+92 304 2175897</div>
              <div className="text-sm text-muted-foreground">Mon–Sat, 10am–8pm</div>
            </div>
          </a>
          <a href="mailto:hello@littlelearners.pk" className="group flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><Mail className="size-7" /></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</div>
              <div className="text-lg font-bold">hello@littlelearners.pk</div>
              <div className="text-sm text-muted-foreground">We reply within 24 hours</div>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border">
            <div className="grid size-14 place-items-center rounded-2xl bg-brand-purple/20 text-brand-purple"><MapPin className="size-7" /></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Delivery</div>
              <div className="text-lg font-bold">All Over Pakistan 🇵🇰</div>
              <div className="text-sm text-muted-foreground">Cash on Delivery in 2–4 days</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 px-5 py-3 text-sm font-bold text-white shadow-md hover:scale-105">
            <Instagram className="size-4" /> Instagram
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-3 text-sm font-bold text-white shadow-md hover:scale-105">
            <Facebook className="size-4" /> Facebook
          </a>
        </div>
      </section>
    </main>
  );
}
