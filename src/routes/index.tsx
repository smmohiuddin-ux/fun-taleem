import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, MessageCircle, Star, Sparkles, Truck,
  ShieldCheck, RefreshCw, Instagram, Facebook, Music2, Phone, Mail,
  MapPin, Heart,
} from "lucide-react";
import { formatPKR } from "@/lib/product";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { AnnouncementBar, SiteHeader } from "@/components/site-chrome";
import logo from "@/assets/funtaleem-logo.png.asset.json";
import childLearning from "@/assets/child-learning.png.asset.json";
import fingerFamily from "@/assets/finger-painting-family.png.asset.json";
import fingerColors from "@/assets/finger-painting-colors.jpg.asset.json";
import activityCards from "@/assets/activity-cards.jpg.asset.json";
import busyBookHands from "@/assets/busy-book-hands.jpg.asset.json";
import busyBookInteractive from "@/assets/busy-book-interactive.jpg.asset.json";
import busyBookCollection from "@/assets/busy-book-collection.jpg.asset.json";

const WHATSAPP_NUMBER = "923022060216";
const waMsg = encodeURIComponent("Hi Funtaleem! I'd like to know more about your learning toys.");
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

type ProductCard = {
  name: string;
  tagline: string;
  price: number;
  compare: number;
  image: string;
  badge: string;
  badgeTone: "green" | "coral" | "purple";
  slug?: string;
  href?: "/products/preschool-learning-cards" | "/products/finger-painting-kit" | "/products/interactive-busy-book";
  comingSoon?: boolean;
};

const PRODUCTS: ProductCard[] = [
  {
    name: "Magical Tracing Book",
    tagline: "64 wipe-clean activities • Ages 3+",
    price: 1450,
    compare: 2499,
    image: activityCards.url,
    badge: "Bestseller",
    badgeTone: "green",
    slug: "preschool-learning-cards",
    href: "/products/preschool-learning-cards",
  },
  {
    name: "Kids Finger Painting Kit",
    tagline: "12 colors • 30 art cards • Ages 3+",
    price: 2220,
    compare: 2499,
    image: fingerColors.url,
    badge: "New",
    badgeTone: "coral",
    slug: "finger-painting-kit",
    href: "/products/finger-painting-kit",
  },
  {
    name: "Kids Interactive Busy Book",
    tagline: "Hands-on montessori activities",
    price: 2061,
    compare: 2499,
    image: busyBookCollection.url,
    badge: "New",
    badgeTone: "purple",
    slug: "interactive-busy-book",
    href: "/products/interactive-busy-book",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Funtaleem - Interactive Learning Toys for Kids in Pakistan" },
      { name: "description", content: "Funtaleem brings premium screen-free learning toys to Pakistani kids - reusable activity cards, finger painting kits, busy books and more. Cash on Delivery all over Pakistan." },
      { name: "keywords", content: "Funtaleem, Kids Learning Toys Pakistan, Educational Toys Pakistan, Montessori Toys Pakistan, Screen Free Learning, Preschool Toys, Finger Painting Kit, Busy Book, Learning Cards" },
      { property: "og:title", content: "Funtaleem - Learning Through Play" },
      { property: "og:description", content: "Premium interactive learning toys for Pakistani kids. Cash on Delivery." },
      { property: "og:image", content: fingerFamily.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: fingerFamily.url },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useReveal();
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <AnnouncementBar />
      <SiteHeader />
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <WhyFuntaleem />
      <SpotlightBanner />
      <AgeCollections />
      <BrandStory />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-reveal", "in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Header + announcement bar are imported from site-chrome */

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eaf7fb] via-white to-white px-4 pb-20 pt-10 sm:pt-16">
      {/* decorative blobs */}
      <div className="blob -left-24 top-10 size-[420px] bg-[#26c6da]/40" />
      <div className="blob -right-32 top-32 size-[460px] bg-[#f39c12]/25" />
      <div className="blob bottom-0 left-1/3 size-[300px] bg-[#0a2647]/10" />

      {/* floating emoji */}
      <div className="pointer-events-none absolute left-[8%] top-24 text-5xl floaty">🎨</div>
      <div className="pointer-events-none absolute right-[6%] top-40 text-5xl floaty" style={{ animationDelay: "-1.5s" }}>🧩</div>
      <div className="pointer-events-none absolute left-[15%] bottom-10 text-4xl floaty" style={{ animationDelay: "-3s" }}>⭐</div>
      <div className="pointer-events-none absolute right-[18%] bottom-24 text-5xl floaty" style={{ animationDelay: "-4.2s" }}>🚀</div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div className="rise-in text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-none bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2647] shadow-sm ring-1 ring-[#26c6da]/40">
            <Sparkles className="size-4 text-[#f39c12]" /> Premium Learning Toys for Kids
          </span>

          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Learning through{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#0a2647] via-[#1e88e5] to-[#26c6da] bg-clip-text text-transparent">Play</span>
              <svg
                aria-hidden viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-[#f39c12]"
              >
                <path d="M2 8 Q 50 -2, 100 6 T 198 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="text-foreground">not through screens.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground sm:text-lg md:mx-0">
            Funtaleem crafts joyful, hands-on toys that help Pakistani children discover
            colors, letters, numbers, and creativity - one delightful moment at a time.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              to="/" hash="products"
              className="group inline-flex items-center gap-2 rounded-none bg-[#0a2647] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#0a2647]/25 transition hover:scale-[1.03] hover:bg-[#0f3560] shine-on-hover"
            >
              Shop Collection
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-none bg-white px-6 py-4 text-base font-semibold text-foreground shadow ring-1 ring-border transition hover:scale-[1.03] hover:ring-[#26c6da]"
            >
              <MessageCircle className="size-5 text-[#f39c12]" /> Chat on WhatsApp
            </a>
          </div>


          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground md:justify-start">
            <div className="flex -space-x-2">
              {["🧒","👧","👦","👶"].map((e,i) => (
                <div key={i} className="grid size-9 place-items-center rounded-full bg-white text-xl shadow ring-2 ring-white">{e}</div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#f39c12]">
                {[...Array(5)].map((_,i)=><Star key={i} className="size-4 fill-current"/>)}
              </div>
              <p className="mt-1">Loved by 5,000+ Pakistani families</p>
            </div>
          </div>
        </div>

        {/* Hero image collage */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/40 via-[#1e88e5]/20 to-[#f39c12]/25 blur-2xl" />
          <Link to="/products/interactive-busy-book" className="relative block aspect-square overflow-hidden rounded-none bg-white shadow-2xl ring-1 ring-white tilt-hover transition duration-300 hover:shadow-primary/20">
            <img src={busyBookHands.url} alt="Interactive busy book made for little hands" className="size-full object-contain p-4 transition duration-700 hover:scale-105" />
          </Link>


          {/* small floating cards */}
          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-none bg-white p-3 shadow-xl ring-1 ring-border floaty">
            <div className="grid size-11 place-items-center rounded-none bg-[#26c6da]/20 text-2xl">🎨</div>
            <div>
              <div className="text-xs font-bold text-muted-foreground">Creativity</div>
              <div className="text-sm font-bold">+12 skills</div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 flex items-center gap-3 rounded-none bg-white p-3 shadow-xl ring-1 ring-border floaty" style={{ animationDelay: "-2s" }}>
            <div className="grid size-11 place-items-center rounded-none bg-[#f39c12]/20 text-2xl">🏆</div>
            <div>
              <div className="text-xs font-bold text-muted-foreground">Rated</div>
              <div className="flex items-center gap-0.5 text-[#f39c12]">{[...Array(5)].map((_,i)=><Star key={i} className="size-3 fill-current"/>)}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
    { icon: Truck, label: "Cash on Delivery" },
    { icon: ShieldCheck, label: "Safe & Non-toxic" },
    { icon: RefreshCw, label: "Reusable Materials" },
    { icon: Star, label: "5,000+ Happy Parents" },
    { icon: Heart, label: "Curated by Educators" },
    { icon: MapPin, label: "Delivered Pakistan-wide" },
  ];
  const row = [...items, ...items];
  return (
    <section className="border-y border-border bg-white py-4">
      <div className="mx-auto max-w-full overflow-hidden">
        <div className="flex w-max gap-10 marquee">
          {row.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground/70">
              <Icon className="size-4 text-[#26c6da]" /> {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured products ---------- */
function FeaturedProducts() {
  const { bySlug } = useShopifyProducts();
  return (
    <section id="products" className="relative scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center" data-reveal>
          <span className="inline-block rounded-none bg-[#26c6da]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2647]">
            Our Toys
          </span>

          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Made to spark <span className="text-[#26c6da]">tiny imaginations</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Every Funtaleem product is designed with love, tested with real kids, and built to be reused for years.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.name}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="group relative flex flex-col overflow-hidden rounded-none bg-white shadow-sm ring-1 ring-border tilt-hover"

            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#eaf7fb] to-white">
                {p.href ? (
                  <Link to={p.href} className="block size-full group">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="size-full object-contain p-4 transition duration-700 group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="size-full object-contain p-4 transition duration-700 group-hover:scale-105"
                  />
                )}

                <span
                  className={`absolute left-4 top-4 rounded-none px-3 py-1 text-xs font-bold text-white shadow ${
                    p.badgeTone === "green" ? "bg-[#0a2647]" :
                    p.badgeTone === "coral" ? "bg-[#f39c12]" : "bg-[#26c6da]"
                  }`}
                >
                  {p.badge}
                </span>

                {/* quick-view floating action */}
                {p.href && (
                  <Link
                    to={p.href}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-none bg-white px-3.5 py-2 text-xs font-bold text-[#0a2647] opacity-0 shadow-lg transition group-hover:opacity-100"
                  >
                    Quick view <ArrowRight className="size-3.5" />
                  </Link>
                )}

              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold leading-snug">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-extrabold">{formatPKR((p.slug && bySlug[p.slug]?.price) || p.price)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPKR((p.slug && bySlug[p.slug]?.compareAt) || p.compare)}</span>
                </div>
                <div className="mt-5 flex-1" />
                {p.href ? (
                  <Link
                    to={p.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a2647] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f3560]"
                  >
                    Shop Now <ArrowRight className="size-4" />
                  </Link>
                ) : (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-bold text-foreground/70 transition hover:bg-[#26c6da]/20"
                  >
                    Notify Me
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center" data-reveal>
          <Link to="/" hash="products" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2647] hover:text-[#1e88e5]">
            View all products <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Funtaleem ---------- */
function WhyFuntaleem() {
  const pillars = [
    { emoji: "📵", title: "Screen-Free", text: "Every toy is designed for hands-on play - kids stay off phones and tablets." },
    { emoji: "🧠", title: "Educator-Curated", text: "Activities built with early-childhood educators to grow real cognitive skills." },
    { emoji: "♻️", title: "Reusable Forever", text: "Wipe-clean, sturdy materials mean one toy plays hundreds of times." },
    { emoji: "🇵🇰", title: "Made for Pakistan", text: "Fast Cash on Delivery, local support, WhatsApp-friendly ordering." },
  ];
  return (
    <section className="relative bg-[#0a2647] px-4 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(38,198,218,0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgba(243,156,18,0.35), transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center" data-reveal>
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#26c6da]">
            Why Funtaleem
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A brand built by parents, for parents</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 hover:ring-[#26c6da]/50"
            >
              <div className="grid size-14 place-items-center rounded-2xl bg-[#26c6da]/20 text-3xl transition group-hover:scale-110 group-hover:rotate-6">
                {p.emoji}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/70">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Spotlight banner (Finger painting) ---------- */
function SpotlightBanner() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="w-full">
        <div className="grid overflow-hidden bg-gradient-to-br from-[#eaf7fb] via-white to-[#fff6e5] shadow-xl md:grid-cols-2" data-reveal>
          <div className="relative min-h-[380px] overflow-hidden bg-white">
            <img src={fingerColors.url} alt="Finger painting kit with 12 colors and stamp cards" className="absolute inset-0 size-full object-contain p-6 transition duration-700 hover:scale-105" />
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0a2647] shadow">Coming Soon</span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="inline-block w-fit rounded-full bg-[#f39c12]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f39c12]">
              Spotlight
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Finger Painting Kit</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              12 washable colors, 30 pre-printed art cards, and endless family bonding. Mess-free, mind-full creativity for ages 3+.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {["Non-toxic washable inks","30 cute themed art cards","Perfect for gifts","Ages 3+"].map((f) => (
                <li key={f} className="flex items-center gap-2 font-medium">
                  <span className="grid size-5 place-items-center rounded-full bg-[#26c6da] text-white text-[10px] font-black">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#f39c12] px-6 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#e08e0a] shine-on-hover">
                <MessageCircle className="size-4" /> Pre-order on WhatsApp
              </a>
              <Link to="/" hash="products" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-foreground ring-1 ring-border transition hover:ring-[#0a2647]">
                Browse all toys
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Age collections ---------- */
function AgeCollections() {
  const cols = [
    { age: "Ages 2–3", title: "Toddlers", desc: "First words, sensory play, colors", emoji: "🐣", tone: "from-[#eaf7fb] to-white" },
    { age: "Ages 3–5", title: "Preschool", desc: "Tracing, shapes, early writing", emoji: "🎨", tone: "from-[#fff6e5] to-white" },
    { age: "Ages 5–7", title: "Early School", desc: "Numbers, reading, problem solving", emoji: "🧠", tone: "from-[#f0eafe] to-white" },
  ];
  return (
    <section className="relative bg-[#eaf7fb]/40 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center" data-reveal>
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2647] shadow-sm">
            Shop by Age
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Perfect toys, at every stage</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cols.map((c, i) => (
            <Link
              key={c.title}
              to="/" hash="products"
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.tone} p-8 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="text-6xl transition-transform group-hover:scale-125 group-hover:-rotate-6">{c.emoji}</div>
              <div className="mt-6 text-xs font-bold uppercase tracking-wider text-[#26c6da]">{c.age}</div>
              <h3 className="mt-1 font-display text-2xl font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0a2647]">
                Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Brand story ---------- */
function BrandStory() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="relative" data-reveal>
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#26c6da]/25 via-transparent to-[#f39c12]/25 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <img src={activityCards.url} alt="Reusable activity cards" className="aspect-square w-full bg-white object-contain p-3 shadow-lg tilt-hover" />
            <img src={busyBookInteractive.url} alt="Interactive busy book play" className="mt-8 aspect-square w-full bg-white object-contain p-3 shadow-lg tilt-hover" />
            <img src={fingerColors.url} alt="Finger painting kit colors" className="aspect-square w-full bg-white object-contain p-3 shadow-lg tilt-hover" />
            <img src={busyBookHands.url} alt="Busy book made for little hands" className="mt-8 aspect-square w-full bg-white object-contain p-3 shadow-lg tilt-hover" />
          </div>
        </div>
        <div data-reveal>
          <span className="inline-block rounded-full bg-[#26c6da]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2647]">
            Our Story
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            We believe every child deserves
            <span className="block bg-gradient-to-r from-[#0a2647] to-[#26c6da] bg-clip-text text-transparent">joyful learning.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Funtaleem started when two parents in Karachi couldn't find educational toys that felt as premium
            and thoughtful as international brands - at a price Pakistani families could love. So we built one.
          </p>
          <p className="mt-3 text-muted-foreground">
            Today, thousands of families across Pakistan trust Funtaleem to keep their little learners
            engaged, curious, and off screens.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: "5,000+", l: "Happy families" },
              { n: "3", l: "Products & growing" },
              { n: "100%", l: "COD nationwide" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-border">
                <div className="font-display text-2xl font-black text-[#0a2647]">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { name: "Ayesha K.", city: "Karachi", text: "My son used to snatch my phone every 10 minutes. Now he asks for his Funtaleem cards. Life-changing!", emoji: "👩🏻" },
    { name: "Bilal R.", city: "Lahore", text: "Delivered in 2 days, packaging was premium, and my daughter is obsessed. Worth every rupee.", emoji: "👨🏽" },
    { name: "Sana M.", city: "Islamabad", text: "Finally an educational brand made in Pakistan that feels world-class. Ordering again for my niece.", emoji: "👩🏽" },
  ];
  return (
    <section className="relative bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center" data-reveal>
          <div className="flex items-center justify-center gap-1 text-[#f39c12]">
            {[...Array(5)].map((_,i)=><Star key={i} className="size-5 fill-current"/>)}
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Loved by Pakistani parents</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <blockquote
              key={t.name}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="rounded-3xl bg-gradient-to-br from-[#eaf7fb] to-white p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-1 text-[#f39c12]">
                {[...Array(5)].map((_,i)=><Star key={i} className="size-4 fill-current"/>)}
              </div>
              <p className="mt-4 text-base text-foreground/80">"{t.text}"</p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-white text-xl shadow ring-1 ring-border">{t.emoji}</div>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Instagram grid ---------- */
function InstagramGrid() {
  const shots = [busyBookCollection.url, activityCards.url, fingerColors.url, busyBookInteractive.url, childLearning.url, fingerFamily.url];
  return (
    <section className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center" data-reveal>
          <span className="inline-block rounded-full bg-[#26c6da]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0a2647]">
            @funtaleem.pk
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Real kids. Real moments.</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {shots.map((s, i) => (
            <a
              key={i}
              href="#"
              data-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
              className="group relative aspect-square overflow-hidden bg-white shadow-sm"
            >
              <img src={s} alt="Instagram post" loading="lazy" className="size-full object-contain p-2 transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 grid place-items-center bg-[#0a2647]/0 transition group-hover:bg-[#0a2647]/50">
                <Instagram className="size-8 text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Newsletter CTA ---------- */
function Newsletter() {
  return (
    <section className="relative overflow-hidden gradient-animate bg-[linear-gradient(120deg,#0a2647,#1e88e5,#26c6da,#0a2647)] py-20 text-center text-white sm:py-28">
      <div className="pointer-events-none absolute -top-16 left-8 text-[10rem] opacity-10 floaty">🎁</div>
      <div className="pointer-events-none absolute -bottom-16 right-10 text-[9rem] opacity-10 floaty" style={{ animationDelay: "-2s" }}>🎈</div>
      <div className="relative mx-auto max-w-3xl px-4">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">Get 10% off your first order</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          Join the Funtaleem family. New toy drops, parenting tips, and exclusive discounts, straight to your inbox.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email" required placeholder="your@email.com"
            className="flex-1 rounded-full bg-white/95 px-5 py-3.5 text-sm font-medium text-foreground outline-none ring-2 ring-transparent focus:ring-[#f39c12]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#f39c12] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#e08e0a]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative bg-white px-4 pt-16 pb-8 text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="Funtaleem" className="h-16 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground">
            Premium screen-free learning toys for Pakistani kids. Made with love. Delivered nationwide.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[#0a2647]">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" hash="products" className="hover:text-[#1e88e5]">All Products</Link></li>
            <li><Link to="/products/preschool-learning-cards" className="hover:text-[#1e88e5]">Learning Cards</Link></li>
            <li><Link to="/products/finger-painting-kit" className="hover:text-[#1e88e5]">Finger Painting Kit</Link></li>
            <li><Link to="/products/interactive-busy-book" className="hover:text-[#1e88e5]">Busy Book</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#0a2647]">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-[#1e88e5]">Contact</Link></li>
            <li><a href={waLink} className="hover:text-[#1e88e5]">WhatsApp Us</a></li>
            <li><Link to="/cart" className="hover:text-[#1e88e5]">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#0a2647]">Get in touch</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="size-4 text-[#1e88e5]"/> <a href="tel:+923022060216" className="hover:text-[#0a2647]">+92 302 2060216</a></li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-[#1e88e5]"/> hello@funtaleem.pk</li>
            <li className="flex items-center gap-2"><MapPin className="size-4 text-[#1e88e5]"/> Karachi, Pakistan</li>
          </ul>
          <div className="mt-4 flex gap-2">
            {[Instagram, Facebook, Music2, MessageCircle].map((I, i) => (
              <a key={i} href={i === 3 ? waLink : "#"} target={i === 3 ? "_blank" : undefined} rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full bg-[#eaf7fb] text-[#0a2647] transition hover:scale-110 hover:bg-[#26c6da] hover:text-white">
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Funtaleem. Learning through play. Made in Pakistan 🇵🇰
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */
function FloatingWhatsApp() {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-16 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 btn-pulse"
    >
      <MessageCircle className="size-8" strokeWidth={2.5} />
    </a>
  );
}
