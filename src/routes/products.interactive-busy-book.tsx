import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle, Star, ShoppingCart, Plus, Minus, ArrowRight,
  Hand, Brain, Heart, Eye, Puzzle, BookOpen, Target, Sparkles, Package,
  Truck, ShieldCheck, Users, Gift, Check, ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { formatPKR } from "@/lib/product";
import {
  AnnouncementBar, SiteHeader, TrustMarquee, Newsletter, SiteFooter,
  FloatingWhatsApp, useReveal,
} from "@/components/site-chrome";
import mainImg from "@/assets/bb-main.jpg.asset.json";
import themesImg from "@/assets/bb-themes.jpg.asset.json";
import peekInsideImg from "@/assets/bb-peek-inside.jpg.asset.json";
import interactiveImg from "@/assets/bb-interactive.jpg.asset.json";
import bannerImg from "@/assets/busy-book-banner.png.asset.json";
import littleHandsImg from "@/assets/bb-little-hands.jpg.asset.json";
import skillsImg from "@/assets/bb-skills.jpg.asset.json";
import engagedImg from "@/assets/bb-engaged.jpg.asset.json";

const WA_ORDER = encodeURIComponent(
  "Hi! I want to order the Kids Interactive Busy Book (4 themes, hands-on activities).\n\nMy Name:\nCity:\nQuantity:\n\nPlease guide me."
);
const waOrderLink = `https://wa.me/923022060216?text=${WA_ORDER}`;

export const Route = createFileRoute("/products/interactive-busy-book")({
  head: () => ({
    meta: [
      { title: "Kids Interactive Busy Book - Hands-On Learning Book | Funtaleem" },
      { name: "description", content: "Reusable busy book with 4 themes - dinosaurs, vehicles, animals & weather. Match, stick and play with peel-off pieces. Screen-free learning for ages 2+. Cash on Delivery all over Pakistan." },
      { property: "og:title", content: "Kids Interactive Busy Book - Hands-On Learning" },
      { property: "og:description", content: "4 themes, dozens of peel-and-stick pieces, thick easy-flip pages. Cash on Delivery in Pakistan." },
      { property: "og:image", content: mainImg.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: mainImg.url },
    ],
  }),
  component: ProductPage,
});

/* ---------- Reusable bits ---------- */

function FullWidthBanner() {
  const { product: shopifyProduct } = useShopifyProduct("interactive-busy-book");
  const livePrice = shopifyProduct?.price ?? 2061;

  return (
    <section className="relative w-full overflow-hidden rise-in" data-reveal>
      <div className="relative aspect-[21/9] w-full min-h-[400px]">
        <img 
          src={bannerImg.url} 
          alt="Reusable Learning Fun for Little Explorers" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for visibility if needed, but the image has text. 
            However, we want the product title/price visible too as requested. 
            The image already has text, so we'll place our info carefully.
        */}
        <div className="absolute inset-0 bg-black/5 flex flex-col justify-center px-4 sm:px-12 md:px-20">
          <div className="max-w-2xl text-[#0a2647]">
            <Eyebrow>Featured Product</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl md:text-6xl text-[#0a2647]">
              Interactive Busy Book
            </h2>
            <p className="mt-6 text-lg sm:text-xl font-semibold max-w-lg">
              Hands-on screen-free learning with 4 fun themes and reusable peel-and-stick pieces.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <span className="font-display text-4xl font-black">{formatPKR(livePrice)}</span>
              <PrimaryCTA label="Shop Now" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


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
      <FullWidthBanner />
      <FourThemes />
      <PeekInside />
      <InteractivePlay />
      <EverydaySkills />
      <KeepEngaged />
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
  const { product: shopifyProduct } = useShopifyProduct("interactive-busy-book");
  const livePrice = shopifyProduct?.price ?? 2061;
  const liveCompare = shopifyProduct?.compareAt ?? 2499;
  const navigate = useNavigate();
  const PRODUCT_ID = "interactive-busy-book";
  const handleAdd = () => { add(PRODUCT_ID, count); navigate({ to: "/cart" }); };
  const [count, setCount] = useState(1);


  return (
    <section className="relative overflow-hidden bg-white text-[#0a2647] pb-20 pt-10 sm:pt-16">
      {/* Banner image instead of box */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden w-full">
          <img src={mainImg.url} alt="Kids Interactive Busy Book" className="w-full h-auto object-cover rounded-none" />
        </div>
      </div>
      
      {/* Info section below banner */}
      <div className="mx-auto mt-10 max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
        <div className="rise-in">
          <div className="flex items-center gap-3">
            <Eyebrow>New · Ages 2+</Eyebrow>
            <div className="flex items-center gap-1 text-[#f39c12]">
              {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              <span className="ml-1 text-xs font-semibold text-muted-foreground">(760+ parents)</span>
            </div>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Interactive Busy Book
          </h1>
          <p className="mt-3 text-lg font-semibold text-[#0a2647]/80">4 themed books with peel-and-stick pieces to match, play and learn</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-black text-[#0a2647]">{formatPKR(livePrice)}</span>
            <span className="text-lg text-muted-foreground line-through">{formatPKR(liveCompare)}</span>
            <span className="rounded-none bg-[#f39c12]/15 px-2.5 py-1 text-xs font-bold text-[#f39c12]">Save 40%</span>
          </div>

          <ul className="mt-6 space-y-2 text-sm font-medium text-foreground/85">
            {[
              "4 themes: Dinosaurs, Vehicles, Animals and Weather",
              "Dozens of reusable peel-and-stick pieces for matching games",
              "Thick, rounded-corner pages built for little hands",
              "Easy-flip binder rings - a full library in one compact set",
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
        </div>
      </div>
    </section>
  );
}

/* ---------- 4 Themes ---------- */
function FourThemes() {
  const themes = [
    { emoji: "🦕", label: "Dinosaurs", desc: "Hello, prehistoric friends", color: "bg-[#26c6da]/15 text-[#26c6da]" },
    { emoji: "🚒", label: "Vehicles", desc: "Cars, trucks and trains", color: "bg-[#f39c12]/15 text-[#f39c12]" },
    { emoji: "🦒", label: "Animals", desc: "Jungle, farm and safari", color: "bg-[#1e88e5]/15 text-[#1e88e5]" },
    { emoji: "☀️", label: "Weather", desc: "Sunny, rainy, snowy days", color: "bg-[#0a2647]/10 text-[#0a2647]" },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="4 Fun Themes"
          title={<>One book set, <span className="text-[#26c6da]">four worlds</span> to explore</>}
          subtitle="Each themed book keeps curiosity alive with new characters, colors and matching challenges."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={themesImg.url} alt="Four busy book themes - dinosaurs, vehicles, animals and weather" className="w-full object-contain p-4" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {themes.map((t, i) => (
              <div
                key={t.label}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group flex items-start gap-4 rounded-none bg-white p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`grid size-14 shrink-0 place-items-center rounded-none text-3xl ${t.color} transition group-hover:scale-110 group-hover:rotate-6`}>
                  {t.emoji}
                </div>
                <div>
                  <div className="font-display text-lg font-bold">{t.label}</div>
                  <div className="text-xs font-semibold text-muted-foreground">{t.desc}</div>
                </div>
              </div>
            ))}
            <div className="rounded-none bg-gradient-to-br from-[#0a2647] to-[#1e88e5] p-5 text-white shadow-lg sm:col-span-2" data-reveal>
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-none bg-white/15 text-2xl">🔢</div>
                <div>
                  <div className="font-display text-lg font-bold">Bonus number pages</div>
                  <div className="text-sm text-white/80">Extra pages teach counting from 1 to 10 with friendly farm animals.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Peek Inside ---------- */
function PeekInside() {
  const items = [
    { icon: Puzzle, label: "Matching Fun", desc: "Sort fruits, vegetables and animals into the right spot." },
    { icon: Hand, label: "Animal Play", desc: "Move giraffes, monkeys and pandas across the jungle scene." },
    { icon: Target, label: "Number Learning", desc: "Place numbers 1-10 with friendly farm scenes." },
  ];
  return (
    <section className="relative bg-[#eaf7fb]/50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Peek Inside"
          title={<>Pages packed with <span className="text-[#26c6da]">hands-on</span> fun</>}
          subtitle="Every spread invites your child to touch, move and match. No batteries, no screens - just play."
        />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            {items.map((it, i) => (
              <div
                key={it.label}
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
                className="group flex items-start gap-5 rounded-none bg-white p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid size-14 shrink-0 place-items-center rounded-none bg-[#26c6da]/15 text-[#0a2647] transition group-hover:scale-110 group-hover:rotate-6">
                  <it.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{it.label}</h3>
                  <p className="mt-1 text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative" data-reveal>
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={peekInsideImg.url} alt="Inside the busy book - matching, animal play and number pages" className="w-full object-contain p-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function InteractivePlay() {
  const bits = [
    { emoji: "🧩", label: "Match Pieces" },
    { emoji: "✋", label: "Hands-on Play" },
    { emoji: "🌞", label: "Bright Pages" },
    { emoji: "♻️", label: "Reusable Stickers" },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Interactive Play"
          title={<>Peel, stick, <span className="text-[#26c6da]">play again</span></>}
          subtitle="Every piece attaches with soft velcro dots so your child can play the same page again and again."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={interactiveImg.url} alt="Interactive busy book with peel and stick pieces" className="w-full object-contain p-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bits.map((b, i) => (
              <div
                key={b.label}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group rounded-none bg-white p-6 text-center shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-5xl transition group-hover:scale-125 group-hover:-rotate-6">{b.emoji}</div>
                <div className="mt-3 font-display text-base font-bold">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Made for Little Hands ---------- */
function LittleHands() {
  const facts = [
    { n: "21", u: "cm", label: "Width" },
    { n: "14", u: "cm", label: "Height" },
    { n: "3.5", u: "cm", label: "Depth" },
  ];
  const features = [
    { icon: Sparkles, title: "Rounded corners", desc: "Safe, gentle edges for little hands." },
    { icon: BookOpen, title: "Thick pages", desc: "Sturdy board that won't tear or bend." },
    { icon: Package, title: "Easy-flip rings", desc: "Kids can turn pages on their own." },
  ];
  return (
    <section className="relative bg-[#eaf7fb]/50 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Made for Little Hands"
          title={<>Built <span className="text-[#26c6da]">tough</span> for everyday play</>}
          subtitle="Compact, sturdy and thoughtfully designed so kids stay independent and parents stay relaxed."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={littleHandsImg.url} alt="Busy book with rounded corners, thick pages and easy-flip rings" className="w-full object-contain p-4" />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="rounded-none bg-white p-5 text-center shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="font-display text-3xl font-black text-[#0a2647]">
                    {f.n}<span className="text-base font-bold text-muted-foreground">{f.u}</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {features.map((h, i) => (
                <div
                  key={h.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 100}ms` }}
                  className="group flex items-start gap-4 rounded-none bg-white p-5 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-none bg-[#26c6da]/15 text-[#0a2647] transition group-hover:scale-110 group-hover:rotate-6">
                    <h.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold">{h.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Everyday Skills ---------- */
function EverydaySkills() {
  const skills = [
    { icon: Hand, label: "Fine Motor Skills" },
    { icon: Puzzle, label: "Matching & Sorting" },
    { icon: Target, label: "Focus & Attention" },
    { icon: Eye, label: "Hand-Eye Coordination" },
    { icon: Brain, label: "Early Vocabulary" },
    { icon: Heart, label: "Independent Play" },
  ];
  return (
    <section className="relative bg-[#0a2647] px-4 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(38,198,218,0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgba(243,156,18,0.35), transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center" data-reveal>
          <span className="inline-block rounded-none bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#26c6da]">
            Build Everyday Skills
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A playful path to <br className="hidden sm:block" /> early learning wins</h2>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
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
          <div className="relative" data-reveal>
            <div className="relative overflow-hidden rounded-none bg-white shadow-2xl ring-1 ring-white tilt-hover">
              <img src={skillsImg.url} alt="Skills the busy book builds - fine motor, matching, focus, hand-eye" className="w-full object-contain p-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Keep Kids Engaged ---------- */
function KeepEngaged() {
  const highlights = [
    { icon: Users, title: "Solo or Together", desc: "Perfect for quiet solo play or bonding time with parents." },
    { icon: Sparkles, title: "Zero Screens", desc: "Real, hands-on learning instead of another tablet game." },
    { icon: Gift, title: "Thoughtful Gift", desc: "Beautifully finished - the birthday gift parents secretly want." },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Keep Kids Happily Engaged"
          title={<>Quiet time <span className="text-[#26c6da]">parents love</span></>}
          subtitle="Perfect for long car rides, restaurants, plane trips or rainy afternoons at home."
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="relative overflow-hidden rounded-none bg-white shadow-xl ring-1 ring-border tilt-hover">
              <img src={engagedImg.url} alt="Child happily engaged with the interactive busy book" className="w-full object-contain p-4" />
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
              <Link to="/" hash="products" className="inline-flex items-center gap-2 rounded-none bg-white px-6 py-3.5 text-sm font-bold text-[#0a2647] ring-1 ring-border transition hover:ring-[#0a2647]">
                Browse all toys <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Specs ---------- */
function Specs() {
  const specs = [
    { k: "Ages", v: "2+ years" },
    { k: "Themes", v: "Dinosaurs, Vehicles, Animals, Weather" },
    { k: "Pieces", v: "Dozens of peel-and-stick" },
    { k: "Book Size", v: "21 × 14 × 3.5 cm" },
    { k: "Pages", v: "Thick, rounded-corner board" },
    { k: "Binder", v: "Easy-flip rings" },
    { k: "Materials", v: "Non-toxic, child-safe" },
    { k: "Delivery", v: "2-4 days nationwide" },
  ];
  return (
    <section className="relative bg-[#eaf7fb]/40 px-4 py-20 sm:py-28">
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
    { q: "What age is this best for?", a: "Ages 2 and up. Toddlers love matching the peel-and-stick pieces, while older kids enjoy the counting, vocabulary and theme play." },
    { q: "How do I order?", a: "Tap any WhatsApp button on this page, share your name, city and quantity, and we'll confirm the order. Cash on Delivery all over Pakistan." },
    { q: "Are the pieces reusable?", a: "Yes. Every piece attaches with soft velcro dots so your child can peel, stick and play the same page again and again." },
    { q: "Is the book safe?", a: "Absolutely. Thick board pages have rounded corners, colors are non-toxic and pieces are sized for safe toddler play." },
    { q: "How long does delivery take?", a: "Most orders reach you in 2-4 working days across Pakistan. We ship from Karachi with trusted courier partners." },
    { q: "Can I return it?", a: "If your book arrives damaged, message us within 48 hours on WhatsApp and we'll replace it, no questions asked." },
  ];
  return (
    <section className="relative px-4 py-20 sm:py-28">
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
      <div className="pointer-events-none absolute -left-10 top-10 text-[8rem] opacity-10 floaty">📖</div>
      <div className="pointer-events-none absolute -right-6 bottom-10 text-[8rem] opacity-10 floaty" style={{ animationDelay: "-2s" }}>🦕</div>
      <div className="relative mx-auto max-w-3xl">
        <Sparkles className="mx-auto size-10 text-[#f39c12]" />
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">The busy book they'll ask for every day</h2>
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
