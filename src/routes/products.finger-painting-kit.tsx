import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle, Star, Truck, ShieldCheck, RefreshCw, Package, Gift,
  Sparkles, Check, ShoppingCart, Plus, Minus, ChevronDown, ArrowRight,
  Palette, Hand, Users, Brain, Heart, Smile, Droplet,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { formatPKR } from "@/lib/product";
import {
  AnnouncementBar, SiteHeader, TrustMarquee, Newsletter, SiteFooter,
  FloatingWhatsApp, useReveal,
} from "@/components/site-chrome";
import mainImg from "@/assets/fpk-main.jpg.asset.json";
import creativePlayImg from "@/assets/fpk-creative-play.jpg.asset.json";
import colorsImg from "@/assets/fpk-12colors.jpg.asset.json";
import compactImg from "@/assets/fpk-compact.jpg.asset.json";
import familyImg from "@/assets/fpk-family.jpg.asset.json";
import completeImg from "@/assets/fpk-complete.jpg.asset.json";
import cardsImg from "@/assets/fpk-cards.jpg.asset.json";

const PRICE = 2220;
const COMPARE = 2499;

const WA_ORDER = encodeURIComponent(
  "Hi! I want to order the Kids Finger Painting Kit (12 colors + 30 activity cards).\n\nMy Name:\nCity:\nQuantity:\n\nPlease guide me."
);
const waOrderLink = `https://wa.me/923022060216?text=${WA_ORDER}`;

export const Route = createFileRoute("/products/finger-painting-kit")({
  head: () => ({
    meta: [
      { title: "Kids Finger Painting Kit - 12 Washable Colors & 30 Activity Cards | Funtaleem" },
      { name: "description", content: "Mess-free DIY finger painting kit with 12 washable colors, 30 activity cards, ink pads and a compact travel box. Screen-free creativity for ages 3+. Cash on Delivery all over Pakistan." },
      { property: "og:title", content: "Kids Finger Painting Kit - Creative Play for Ages 3+" },
      { property: "og:description", content: "12 washable colors, 30 activity cards, compact box. The perfect creative gift. Cash on Delivery in Pakistan." },
      { property: "og:image", content: mainImg.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: mainImg.url },
    ],
  }),
  component: ProductPage,
});

/* ---------- Reusable bits ---------- */

function PrimaryCTA({ label = "Order on WhatsApp", size = "md" }: { label?: string; size?: "md" | "lg" }) {
  const cls = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3.5 text-sm";
  return (
    <a
      href={waOrderLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-none bg-[#f39c12] font-bold text-white shadow-lg shadow-[#f39c12]/30 transition hover:scale-[1.03] hover:bg-[#e08e0a] shine-on-hover btn-pulse ${cls}`}
    >
      <MessageCircle className="size-5" strokeWidth={2.5} />
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SecondaryCTA({ label, size = "md", onClick }: { label: string; size?: "md" | "lg"; onClick?: () => void }) {
  const cls = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3.5 text-sm";
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-none bg-[#0a2647] font-bold text-white shadow-lg shadow-[#0a2647]/25 transition hover:scale-[1.03] hover:bg-[#0f3560] ${cls}`}
    >
      <ShoppingCart className="size-5" />
      {label}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-none bg-[#26c6da]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2647]">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-12 text-center" data-reveal>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ---------- Page ---------- */

function ProductPage() {
  useReveal();
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <AnnouncementBar />
      <SiteHeader />
      <Hero />
      <TrustMarquee />
      <WhatsInside />
      <TwelveColors />
      <ActivityCards />
      <CreativePlay />
      <FamilyFun />
      <Compact />
      <Specs />
      <FAQ />
      <FinalCTA />
      <Newsletter />
      <SiteFooter />
      <FloatingWhatsApp />
    </main>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { qty, add } = useCart();
  const { product: shopifyProduct } = useShopifyProduct("finger-painting-kit");
  const livePrice = shopifyProduct?.price ?? 2220;
  const liveCompare = shopifyProduct?.compareAt ?? 2499;
  const navigate = useNavigate();
  const PRODUCT_ID = "finger-painting-kit";
  const handleAdd = () => { add(PRODUCT_ID, count); navigate({ to: "/cart" }); };
  const [count, setCount] = useState(1);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eaf7fb] via-white to-white px-4 pb-20 pt-10 sm:pt-16">
      <div className="blob -left-24 top-10 size-[420px] bg-[#26c6da]/40" />
      <div className="blob -right-32 top-32 size-[460px] bg-[#f39c12]/25" />
      <div className="pointer-events-none absolute left-[6%] top-24 text-5xl floaty">🎨</div>
      <div className="pointer-events-none absolute right-[8%] top-32 text-5xl floaty" style={{ animationDelay: "-1.5s" }}>👆</div>
      <div className="pointer-events-none absolute left-[18%] bottom-10 text-4xl floaty" style={{ animationDelay: "-3s" }}>🌈</div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        {/* Product image */}
        <div className="relative order-1 mx-auto w-full max-w-lg md:order-none">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/40 via-[#1e88e5]/20 to-[#f39c12]/25 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-none bg-white shadow-2xl ring-1 ring-white tilt-hover group cursor-default">
            <img src={mainImg.url} alt="Kids Finger Painting Kit with 12 colors and 30 activity cards" className="size-full object-contain p-4 transition duration-700 hover:scale-105" />
          </div>

          <div className="absolute -top-4 -left-4 flex items-center gap-3 rounded-none bg-white p-3 shadow-xl ring-1 ring-border floaty">
            <div className="grid size-11 place-items-center rounded-none bg-[#26c6da]/20 text-2xl">🎨</div>

            <div>
              <div className="text-xs font-bold text-muted-foreground">12 washable</div>
              <div className="text-sm font-bold">Colors</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-none bg-white p-3 shadow-xl ring-1 ring-border floaty" style={{ animationDelay: "-2s" }}>
            <div className="grid size-11 place-items-center rounded-none bg-[#f39c12]/20 text-2xl">🖐️</div>

            <div>
              <div className="text-xs font-bold text-muted-foreground">Mess-free</div>
              <div className="text-sm font-bold">Creative Fun</div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rise-in">
          <div className="flex items-center gap-3">
            <Eyebrow>New · Ages 3+</Eyebrow>
            <div className="flex items-center gap-1 text-[#f39c12]">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              <span className="ml-1 text-xs font-semibold text-muted-foreground">(890+ parents)</span>
            </div>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Kids Finger <span className="bg-gradient-to-r from-[#0a2647] via-[#1e88e5] to-[#26c6da] bg-clip-text text-transparent">Painting Kit</span>
          </h1>
          <p className="mt-3 text-lg font-semibold text-[#0a2647]/80">12 washable colors + 30 activity cards for endless creative play</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-black text-[#0a2647]">{formatPKR(livePrice)}</span>
            <span className="text-lg text-muted-foreground line-through">{formatPKR(liveCompare)}</span>
            <span className="rounded-none bg-[#f39c12]/15 px-2.5 py-1 text-xs font-bold text-[#f39c12]">Save 40%</span>
          </div>

          <ul className="mt-6 space-y-2 text-sm font-medium text-foreground/85">
            {[
              "12 vibrant washable ink pads - safe, non-toxic, easy to clean",
              "30 pre-printed activity cards to stamp trees, animals & shapes",
              "DIY finger stamping builds fine motor skills and imagination",
              "Compact travel box - perfect for home, school or gifting",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-none bg-[#26c6da] text-white text-[10px] font-black">✓</span>
                {f}
              </li>
            ))}
          </ul>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-none bg-white p-1 shadow ring-1 ring-border">
              <button aria-label="Decrease" onClick={() => setCount((c) => Math.max(1, c - 1))} className="grid size-10 place-items-center rounded-none text-foreground/70 hover:bg-muted">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-bold">{count}</span>
              <button aria-label="Increase" onClick={() => setCount((c) => Math.min(10, c + 1))} className="grid size-10 place-items-center rounded-none text-foreground/70 hover:bg-muted">
                <Plus className="size-4" />
              </button>
            </div>

            <PrimaryCTA size="lg" />
            <SecondaryCTA label={qty > 0 ? "Add More · Checkout" : "Add to Cart"} size="lg" onClick={handleAdd} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-foreground/70">
            <div className="rounded-none bg-white p-3 shadow-sm ring-1 ring-border">
              <Truck className="mx-auto mb-1 size-5 text-[#1e88e5]" /> Cash on Delivery
            </div>
            <div className="rounded-none bg-white p-3 shadow-sm ring-1 ring-border">
              <ShieldCheck className="mx-auto mb-1 size-5 text-[#1e88e5]" /> Non-toxic Safe
            </div>
            <div className="rounded-none bg-white p-3 shadow-sm ring-1 ring-border">
              <Droplet className="mx-auto mb-1 size-5 text-[#1e88e5]" /> Washable Colors
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- What's Inside ---------- */
function WhatsInside() {
  const items = [
    { icon: Palette, count: "12", label: "Washable Ink Pads" },
    { icon: Package, count: "30", label: "Activity Cards" },
    { icon: Hand, count: "DIY", label: "Finger Stamping Fun" },
    { icon: Gift, count: "1", label: "Compact Gift Box" },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="What's Inside"
          title={<>Everything in <span className="text-[#26c6da]">one box</span></>}
          subtitle="Open the pack and start creating right away. No brushes, no mess, no setup."
        />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/25 to-[#f39c12]/20 blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={completeImg.url} alt="Complete finger painting kit contents" className="size-full object-contain p-4" />

            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((it, i) => (
              <div
                key={it.label}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group rounded-none bg-white p-6 text-center shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto grid size-14 place-items-center rounded-none bg-[#26c6da]/15 text-[#0a2647] transition group-hover:scale-110 group-hover:rotate-6">

                  <it.icon className="size-6" />
                </div>
                <div className="mt-4 font-display text-3xl font-black text-[#0a2647]">{it.count}</div>
                <div className="mt-1 text-sm font-semibold text-foreground/80">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 12 Colors ---------- */
function TwelveColors() {
  const swatches = [
    "#e74c3c", "#e91e63", "#9c27b0", "#673ab7",
    "#3f51b5", "#1e88e5", "#26c6da", "#009688",
    "#8bc34a", "#f39c12", "#795548", "#212121",
  ];
  return (
    <section className="relative bg-[#eaf7fb]/50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="12 Vibrant Colors"
          title={<>A rainbow of <span className="text-[#26c6da]">washable</span> fun</>}
          subtitle="Twelve rich, non-toxic ink pads let little fingers mix, match and create endless colorful masterpieces."
        />
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative" data-reveal>
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/25 to-[#f39c12]/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={colorsImg.url} alt="12 washable finger painting colors" className="w-full object-contain p-4" />

            </div>
          </div>
          <div>
            <div className="grid grid-cols-6 gap-3" data-reveal>
              {swatches.map((c, i) => (
                <div
                  key={c}
                  style={{ background: c, transitionDelay: `${i * 40}ms` }}
                  className="aspect-square rounded-none shadow-md ring-2 ring-white transition hover:-translate-y-1 hover:scale-110 hover:rotate-3"
                />
              ))}
            </div>
            <div className="mt-6 rounded-none bg-gradient-to-br from-[#0a2647] to-[#1e88e5] p-5 text-white shadow-lg" data-reveal>
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-none bg-white/15 text-2xl">💧</div>

                <div>
                  <div className="font-display text-lg font-bold">Washable & non-toxic</div>
                  <div className="text-sm text-white/80">Wipes off skin and clothes with water, so play stays worry-free.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 30 Activity Cards ---------- */
function ActivityCards() {
  const themes = [
    { emoji: "🦔", label: "Animals" },
    { emoji: "🌳", label: "Trees & Nature" },
    { emoji: "🦋", label: "Butterflies" },
    { emoji: "🎠", label: "Carousels" },
    { emoji: "🌸", label: "Flowers" },
    { emoji: "⭐", label: "Stars & Shapes" },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="30 Activity Cards"
          title={<>Stamp, create, <span className="text-[#26c6da]">imagine</span></>}
          subtitle="Each card is a printed template - your child adds fingerprint stamps to bring animals, trees and shapes to life."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {themes.map((t, i) => (
              <div
                key={t.label}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                className="group flex flex-col items-center justify-center rounded-none bg-white p-5 text-center shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-4xl transition group-hover:scale-125 group-hover:-rotate-6">{t.emoji}</div>
                <div className="mt-2 font-display text-sm font-bold">{t.label}</div>
              </div>
            ))}
          </div>
          <div className="relative" data-reveal>
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#f39c12]/25 to-[#26c6da]/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">

              <img src={cardsImg.url} alt="30 activity cards with printed templates" className="w-full object-contain p-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Creative Play ---------- */
function CreativePlay() {
  const skills = [
    { icon: Hand, label: "Fine Motor Skills" },
    { icon: Palette, label: "Color Recognition" },
    { icon: Brain, label: "Imagination" },
    { icon: Sparkles, label: "Focus & Patience" },
    { icon: Heart, label: "Self-Expression" },
    { icon: Smile, label: "Confidence" },
  ];
  return (
    <section className="relative bg-[#0a2647] px-4 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(38,198,218,0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgba(243,156,18,0.35), transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center" data-reveal>
          <span className="inline-block rounded-none bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#26c6da]">
            Creative Play
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Real creativity, <br className="hidden sm:block" /> not another screen</h2>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative" data-reveal>
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/40 to-[#f39c12]/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-none bg-white shadow-2xl ring-1 ring-white tilt-hover">
              <img src={creativePlayImg.url} alt="Child enjoying creative finger painting play" className="w-full object-contain p-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={{ transitionDelay: `${i * 70}ms` }}
                className="group rounded-none bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 hover:ring-[#26c6da]/60"
              >
                <div className="grid size-12 place-items-center rounded-none bg-[#26c6da]/20 text-[#26c6da] transition group-hover:scale-110 group-hover:rotate-6">

                  <s.icon className="size-6" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold">{s.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Family Fun ---------- */
function FamilyFun() {
  const highlights = [
    { icon: Users, title: "Bond as a Family", desc: "Sit together, stamp together. Screen-free time your kids will remember." },
    { icon: Sparkles, title: "Zero Setup", desc: "Open the box, dip a finger, start creating. No brushes or water needed." },
    { icon: Gift, title: "Perfect Gift", desc: "Beautifully boxed - the birthday gift every parent secretly wants." },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Family Fun"
          title={<>Playtime the <span className="text-[#26c6da]">whole family</span> loves</>}
          subtitle="Perfect for weekends, rainy afternoons or the classroom. Kids stay engaged, parents stay relaxed."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#f39c12]/25 to-[#26c6da]/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">

              <img src={familyImg.url} alt="Mother and child painting together" className="w-full object-contain p-4" />
            </div>
          </div>
          <div className="space-y-4">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className="group flex items-start gap-4 rounded-none bg-white p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid size-14 shrink-0 place-items-center rounded-none bg-[#26c6da]/15 text-[#0a2647] transition group-hover:scale-110 group-hover:rotate-6">

                  <h.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{h.title}</h3>
                  <p className="mt-1 text-muted-foreground">{h.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryCTA />
              <Link to="/" hash="products" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0a2647] ring-1 ring-border transition hover:ring-[#0a2647]">
                Browse all toys <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Compact Box ---------- */
function Compact() {
  const facts = [
    { n: "22", u: "cm", label: "Width" },
    { n: "14", u: "cm", label: "Height" },
    { n: "3.5", u: "cm", label: "Depth" },
  ];
  return (
    <section className="relative bg-[#eaf7fb]/50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Compact & Portable"
          title={<>Take creativity <span className="text-[#26c6da]">anywhere</span></>}
          subtitle="A slim, sturdy box that slips into a school bag, car pocket or gift wrap."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/25 to-[#0a2647]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={compactImg.url} alt="Compact travel box with dimensions" className="w-full object-contain p-4" />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="font-display text-3xl font-black text-[#0a2647]">
                    {f.n}<span className="text-base font-bold text-muted-foreground">{f.u}</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</div>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-sm font-medium text-foreground/85">
              {[
                "Easy to carry - fits into any bag or backpack",
                "Sturdy lid keeps ink pads clean and dry",
                "Ready to gift - no wrapping needed",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-5 shrink-0 text-[#26c6da]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Specs ---------- */
function Specs() {
  const specs = [
    { k: "Ages", v: "3+ years" },
    { k: "Ink Pads", v: "12 washable colors" },
    { k: "Activity Cards", v: "30 pre-printed cards" },
    { k: "Box Size", v: "22 × 14 × 3.5 cm" },
    { k: "Safety", v: "Non-toxic, food-grade" },
    { k: "Clean-up", v: "Washes off with water" },
    { k: "Package", v: "Compact gift box" },
    { k: "Delivery", v: "2-4 days nationwide" },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Product Specs" title={<>Every detail, thought through</>} />
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border" data-reveal>
          <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x">
            {specs.map((s, i) => (
              <div key={s.k} className={`flex items-baseline justify-between gap-4 p-5 ${i >= 2 ? "sm:border-t sm:border-border" : ""}`}>
                <dt className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.k}</dt>
                <dd className="font-display text-lg font-bold text-[#0a2647]">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border transition hover:shadow-md" data-reveal>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-display text-lg font-bold text-[#0a2647]">{q}</span>
        <ChevronDown className={`size-5 shrink-0 text-[#1e88e5] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-muted-foreground">{a}</div>}
    </div>
  );
}
function FAQ() {
  const items = [
    { q: "What age is this best for?", a: "Ages 3 and up. Little ones love the stamping motion, while older kids get creative mixing colors and inventing scenes." },
    { q: "Is the ink safe for kids?", a: "Yes. All 12 colors are non-toxic, water-based and washable - safe for little hands and easy to clean off skin and clothes." },
    { q: "How do I order?", a: "Tap any WhatsApp button on this page, share your name, city and quantity, and we'll confirm the order. Cash on Delivery all over Pakistan." },
    { q: "Is it really mess-free?", a: "Kids stamp directly with their fingers onto the printed cards, so ink stays on the cards - not the table. Any color on hands wipes off with water." },
    { q: "How long does delivery take?", a: "Most orders reach you in 2-4 working days across Pakistan. We ship from Karachi with trusted courier partners." },
    { q: "Can I return it?", a: "If your kit arrives damaged, message us within 48 hours on WhatsApp and we'll replace it, no questions asked." },
  ];
  return (
    <section className="relative bg-[#eaf7fb]/40 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Questions Parents Ask" title={<>Everything you need to know</>} />
        <div className="space-y-3">
          {items.map((it) => <FAQItem key={it.q} {...it} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2647] via-[#1e88e5] to-[#26c6da] px-4 py-20 text-center text-white sm:py-24">
      <div className="pointer-events-none absolute -left-10 top-10 text-[8rem] opacity-10 floaty">🎨</div>
      <div className="pointer-events-none absolute -right-6 bottom-10 text-[8rem] opacity-10 floaty" style={{ animationDelay: "-2s" }}>🖐️</div>
      <div className="relative mx-auto max-w-3xl">
        <Sparkles className="mx-auto size-10 text-[#f39c12]" />
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">The creative gift they'll never forget</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Limited stock at this launch price. Order today with Cash on Delivery, no advance payment.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryCTA size="lg" label="Order Now on WhatsApp" />
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/40 backdrop-blur transition hover:scale-[1.03] hover:bg-white/20">
            <ShoppingCart className="size-5" /> View Cart
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-white/80">
          <span className="flex items-center gap-1.5"><Check className="size-4 text-[#26c6da]" /> Cash on Delivery</span>
          <span className="flex items-center gap-1.5"><Check className="size-4 text-[#26c6da]" /> 2-4 day shipping</span>
          <span className="flex items-center gap-1.5"><Check className="size-4 text-[#26c6da]" /> Loved by 5,000+ families</span>
        </div>
      </div>
    </section>
  );
}
