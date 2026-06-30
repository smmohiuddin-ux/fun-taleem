import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle, ArrowUp, Play, Truck, Star, RefreshCw, Package,
  Sparkles, Brain, PencilLine, Palette, Smile,
  Phone, Mail, Instagram, Facebook, Music2, Check, X, ChevronDown, MapPin,
  Eye, Hand, Trophy, Lightbulb, Target,
} from "lucide-react";
import heroAsset from "@/assets/hero-product.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magic Tracing Book Pakistan | Reusable Screen-Free Learning Book for Kids 3+" },
      { name: "description", content: "Reusable Magic Tracing Book — screen-free learning, handwriting, numbers, shapes & drawing for kids 3+. Cash on Delivery all over Pakistan. Order on WhatsApp today." },
      { name: "keywords", content: "Reusable Magic Book Pakistan, Kids Learning Book Pakistan, Tracing Book Pakistan, Montessori Toys Pakistan, Educational Toys Pakistan, Screen Free Learning, Kids Activity Book, Handwriting Practice Book, Preschool Learning Toys" },
      { property: "og:title", content: "Magic Tracing Book Pakistan | Screen-Free Learning for Kids" },
      { property: "og:description", content: "Help your child learn through fun, not screens. Reusable workbook + markers. Cash on Delivery in Pakistan." },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:image", content: heroAsset.url },
    ],
  }),
  component: LandingPage,
});

// ---- Config ----
const WHATSAPP_NUMBER = "923000000000"; // TODO: replace with real number
const WA_MESSAGE = encodeURIComponent(
  "Hi! I want to order the Reusable Magic Tracing Book.\n\nMy Name:\nCity:\nQuantity:\n\nPlease guide me."
);
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`;

// ---- Reusable bits ----
function WhatsAppButton({
  size = "md",
  label = "Order on WhatsApp",
  pulse = true,
  className = "",
}: { size?: "sm" | "md" | "lg"; label?: string; pulse?: boolean; className?: string }) {
  const sizeCls =
    size === "lg" ? "px-8 py-5 text-lg" :
    size === "sm" ? "px-4 py-2.5 text-sm" :
    "px-6 py-3.5 text-base";
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-green text-white font-semibold shadow-lg shadow-brand-green/30 transition hover:scale-[1.03] hover:bg-brand-green-dark ${sizeCls} ${pulse ? "btn-pulse" : ""} ${className}`}
    >
      <MessageCircle className="size-5" strokeWidth={2.5} />
      {label}
    </a>
  );
}

function SectionTitle({
  eyebrow, title, subtitle, center = true,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-brand-yellow/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg text-muted-foreground ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Doodle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`pointer-events-none absolute select-none ${className}`}>{children}</div>;
}

// Placeholder colored block representing an image
function ImgPlaceholder({
  label, gradient, emoji, className = "", aspect = "aspect-square",
}: { label: string; gradient: string; emoji: string; className?: string; aspect?: string }) {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-3xl ${gradient} flex items-center justify-center ${className}`}>
      <div className="text-7xl drop-shadow-sm" aria-hidden>{emoji}</div>
      <div className="absolute bottom-3 left-3 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground/80">
        {label}
      </div>
    </div>
  );
}

// ---- Page ----
function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <UrgencyBar />
      <Hero />
      <TrustBar />
      <WhyParentsLove />
      <ProductShowcase />
      <WhatsIncluded />
      <LearningCategories />
      <ComparisonSection />
      <EducationalBenefits />
      <HowItWorks />
      <CTASection
        title="Help Your Child Learn While Having Fun"
        subtitle="Limited stock available — order today with Cash on Delivery."
      />
      <OrderProcess />
      <WhyBuyFromUs />
      <Testimonials />
      <InstagramGallery />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyButtons />
    </main>
  );
}

// ---- Urgency Bar ----
function UrgencyBar() {
  return (
    <div className="relative z-10 bg-gradient-to-r from-brand-coral via-brand-orange to-brand-yellow py-2.5 text-center text-sm font-semibold text-white">
      <span className="animate-pulse">🔥</span> Limited Stock Available — Cash on Delivery All Over Pakistan 🇵🇰
    </div>
  );
}

// ---- Hero ----
function Hero() {
  return (
    <section className="relative isolate px-4 pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="blob -top-20 -left-20 size-[420px] bg-brand-green/40" />
      <div className="blob top-40 -right-20 size-[420px] bg-brand-sky/40" />
      <div className="blob bottom-0 left-1/3 size-[300px] bg-brand-yellow/30" />

      <Doodle className="top-10 left-1/4 text-4xl float-slow">☁️</Doodle>
      <Doodle className="top-20 right-1/3 text-3xl float-med">⭐</Doodle>
      <Doodle className="bottom-32 left-10 text-4xl float-slow">🌈</Doodle>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div className="rise-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green-dark">
            <Sparkles className="size-4" /> Ages 3+ • Reusable
          </span>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            Screen-Free{" "}
            <span className="text-brand-green">Learning</span>{" "}
            <span className="block">that Kids{" "}
              <span className="bg-gradient-to-r from-brand-coral via-brand-orange to-brand-purple bg-clip-text text-transparent">Love</span>
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Help your child learn through fun instead of mobile screens. Reusable pages, magic markers, and endless smiles.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base">
            {["Reusable Pages","Improves Handwriting","Builds Focus","Fun Learning","Safe for Kids"].map((b) => (
              <li key={b} className="flex items-center gap-2 font-medium">
                <span className="grid size-5 place-items-center rounded-full bg-brand-green text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton size="lg" />
            <a href="#showcase" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-foreground shadow-md ring-1 ring-border transition hover:scale-[1.03]">
              <Play className="size-5 text-brand-coral" /> Watch Product
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["🧒","👧","👦","👶"].map((e,i) => (
                <div key={i} className="grid size-9 place-items-center rounded-full bg-white text-xl ring-2 ring-white shadow">{e}</div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-brand-yellow">
                {[...Array(5)].map((_,i)=><Star key={i} className="size-4 fill-current"/>)}
              </div>
              <p>Loved by 5,000+ Pakistani parents</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand-green/30 via-brand-sky/30 to-brand-yellow/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-border">
            <img
              src={heroAsset.url}
              alt="Child using the Reusable Magic Tracing Book"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <Doodle className="-top-6 -left-6 text-5xl float-med">🔤</Doodle>
          <Doodle className="-bottom-6 -right-6 text-5xl float-slow">🔢</Doodle>
          <Doodle className="top-10 -right-10 text-4xl spin-slow">✏️</Doodle>
        </div>
      </div>
    </section>
  );
}

// ---- Trust Bar ----
function TrustBar() {
  const items = [
    { icon: Truck, label: "Cash on Delivery" },
    { icon: MapPin, label: "All Over Pakistan" },
    { icon: Star, label: "Parent Approved" },
    { icon: Smile, label: "Ages 3+" },
    { icon: RefreshCw, label: "Reusable" },
    { icon: Package, label: "Premium Quality" },
  ];
  return (
    <section className="relative z-10 -mt-2 px-4">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-4 sm:p-6 shadow-xl ring-1 ring-border">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="grid size-12 place-items-center rounded-2xl bg-brand-green/10 text-brand-green">
                <Icon className="size-6" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Why Parents Love It ----
function WhyParentsLove() {
  const cards = [
    { emoji: "📵", title: "Screen-Free Learning", color: "bg-brand-green/10 text-brand-green" },
    { emoji: "♻️", title: "Reusable Forever", color: "bg-brand-sky/15 text-brand-sky" },
    { emoji: "✍️", title: "Develops Writing Skills", color: "bg-brand-coral/15 text-brand-coral" },
    { emoji: "🎨", title: "Builds Creativity", color: "bg-brand-purple/15 text-brand-purple" },
    { emoji: "🎯", title: "Boosts Focus", color: "bg-brand-orange/15 text-brand-orange" },
    { emoji: "😊", title: "Fun Daily Activity", color: "bg-brand-yellow/20 text-brand-orange" },
    { emoji: "🧼", title: "No Mess", color: "bg-brand-green/10 text-brand-green" },
    { emoji: "🌱", title: "Eco Friendly", color: "bg-brand-sky/15 text-brand-sky" },
  ];
  return (
    <section className="relative px-4 py-20">
      <div className="blob top-20 -left-32 size-[400px] bg-brand-coral/20" />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Why parents love it"
          title="A toy that does the teaching for you"
          subtitle="Designed by educators, loved by little learners. Every page is built to delight, develop, and reuse."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="card-lift group rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-border">
              <div className={`mx-auto grid size-16 place-items-center rounded-2xl ${c.color} text-3xl transition group-hover:scale-110`}>
                {c.emoji}
              </div>
              <h3 className="mt-4 text-base font-bold sm:text-lg">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Product Showcase ----
function ProductShowcase() {
  const gallery = [
    { label: "Inside the Box", emoji: "📦", gradient: "bg-gradient-to-br from-brand-green/30 to-brand-sky/30" },
    { label: "Workbook Pages", emoji: "📖", gradient: "bg-gradient-to-br from-brand-yellow/30 to-brand-orange/30" },
    { label: "Markers Included", emoji: "🖍️", gradient: "bg-gradient-to-br from-brand-coral/30 to-brand-purple/30" },
    { label: "Close-up Pages", emoji: "🔍", gradient: "bg-gradient-to-br from-brand-sky/30 to-brand-green/30" },
    { label: "Child Using It", emoji: "🧒", gradient: "bg-gradient-to-br from-brand-purple/30 to-brand-coral/30" },
    { label: "Premium Packaging", emoji: "🎁", gradient: "bg-gradient-to-br from-brand-orange/30 to-brand-yellow/30" },
  ];
  return (
    <section id="showcase" className="relative px-4 py-20 bg-brand-cream">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Product showcase"
          title="See it in your child's hands"
          subtitle="Premium quality, vibrant colors, and pages that wipe clean — over and over again."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g) => (
            <div key={g.label} className="card-lift">
              <ImgPlaceholder {...g} aspect="aspect-[4/3]" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <WhatsAppButton size="lg" label="Order Now on WhatsApp" />
        </div>
      </div>
    </section>
  );
}

// ---- What's Included ----
function WhatsIncluded() {
  const items = [
    { name: "Reusable Book", emoji: "📘", color: "bg-brand-green/15" },
    { name: "Markers", emoji: "🖊️", color: "bg-brand-coral/15" },
    { name: "Magic Pen", emoji: "✨", color: "bg-brand-purple/15" },
    { name: "Cleaning Sponge", emoji: "🧽", color: "bg-brand-yellow/20" },
    { name: "Practice Pages", emoji: "📄", color: "bg-brand-sky/15" },
  ];
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="What's inside"
          title="Everything your child needs in one box"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {items.map((i) => (
            <div key={i.name} className="card-lift rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-border">
              <div className={`mx-auto grid size-20 place-items-center rounded-3xl ${i.color} text-4xl`}>
                {i.emoji}
              </div>
              <h3 className="mt-4 font-bold">{i.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Learning Categories ----
function LearningCategories() {
  const cats = [
    { name: "Alphabet", emoji: "🔤", bg: "bg-brand-coral/15" },
    { name: "Numbers", emoji: "🔢", bg: "bg-brand-sky/15" },
    { name: "Shapes", emoji: "🔷", bg: "bg-brand-purple/15" },
    { name: "Animals", emoji: "🐘", bg: "bg-brand-orange/15" },
    { name: "Drawing", emoji: "🎨", bg: "bg-brand-yellow/20" },
    { name: "Tracing", emoji: "✏️", bg: "bg-brand-green/15" },
    { name: "Matching", emoji: "🧩", bg: "bg-brand-coral/15" },
    { name: "Patterns", emoji: "🌀", bg: "bg-brand-sky/15" },
  ];
  return (
    <section className="relative px-4 py-20 bg-brand-cream">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Learning categories" title="8 ways to learn, play & grow" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cats.map((c) => (
            <div key={c.name} className={`card-lift rounded-3xl ${c.bg} p-8 text-center`}>
              <div className="text-6xl">{c.emoji}</div>
              <h3 className="mt-3 font-bold text-lg">{c.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Comparison ----
function ComparisonSection() {
  const mobile = ["Too much screen time", "Eye strain & headaches", "Addictive habits", "Passive learning"];
  const magic = ["Hands-on learning", "Better focus & calm", "Boosts creativity", "Real writing skills", "Reusable & eco-friendly", "Family interaction time"];
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Better than screens"
          title="Why this beats a mobile phone"
          subtitle="A side-by-side look at what your child gets — and what they avoid."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-destructive/10 to-destructive/5 p-8 ring-1 ring-destructive/20">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-destructive/15 text-destructive text-2xl">📱</div>
              <h3 className="text-2xl font-bold">Mobile Phone</h3>
            </div>
            <ul className="space-y-3">
              {mobile.map((m) => (
                <li key={m} className="flex items-start gap-3 text-base">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
                    <X className="size-4" strokeWidth={3} />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-green/15 to-brand-sky/15 p-8 ring-2 ring-brand-green/40 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-brand-green/20 text-brand-green text-2xl">📘</div>
              <h3 className="text-2xl font-bold">Magic Tracing Book</h3>
            </div>
            <ul className="space-y-3">
              {magic.map((m) => (
                <li key={m} className="flex items-start gap-3 text-base font-medium">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-green text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Educational Benefits ----
function EducationalBenefits() {
  const benefits = [
    { icon: Hand, label: "Fine Motor Skills", color: "bg-brand-green/15 text-brand-green" },
    { icon: PencilLine, label: "Handwriting", color: "bg-brand-coral/15 text-brand-coral" },
    { icon: Target, label: "Concentration", color: "bg-brand-orange/15 text-brand-orange" },
    { icon: Brain, label: "Memory", color: "bg-brand-purple/15 text-brand-purple" },
    { icon: Lightbulb, label: "Problem Solving", color: "bg-brand-yellow/20 text-brand-orange" },
    { icon: Palette, label: "Creativity", color: "bg-brand-sky/15 text-brand-sky" },
    { icon: Trophy, label: "Confidence", color: "bg-brand-green/15 text-brand-green" },
    { icon: Eye, label: "Recognition Skills", color: "bg-brand-coral/15 text-brand-coral" },
  ];
  return (
    <section className="relative px-4 py-20 bg-brand-cream">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Educational benefits" title="8 skills your child will build" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {benefits.map(({ icon: Icon, label, color }) => (
            <div key={label} className="card-lift rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-border">
              <div className={`mx-auto grid size-14 place-items-center rounded-2xl ${color}`}>
                <Icon className="size-7" />
              </div>
              <p className="mt-3 text-sm font-bold sm:text-base">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- How It Works ----
function HowItWorks() {
  const steps = [
    { n: 1, title: "Open Book", emoji: "📖", color: "bg-brand-green" },
    { n: 2, title: "Trace", emoji: "✏️", color: "bg-brand-sky" },
    { n: 3, title: "Erase", emoji: "🧽", color: "bg-brand-coral" },
    { n: 4, title: "Repeat", emoji: "🔁", color: "bg-brand-purple" },
  ];
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="How it works" title="Learning in 4 simple steps" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card-lift relative rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-border">
              <div className={`absolute -top-5 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full ${s.color} text-xl font-bold text-white shadow-lg`}>
                {s.n}
              </div>
              <div className="pt-4 text-6xl">{s.emoji}</div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Generic CTA Banner ----
function CTASection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative px-4 py-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-green via-brand-sky to-brand-purple p-8 sm:p-14 text-center text-white shadow-xl">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 2px), radial-gradient(circle at 80% 60%, white 1px, transparent 2px)", backgroundSize: "40px 40px" }} />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">{subtitle}</p>
          <div className="mt-7">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-pulse inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-green-dark shadow-xl transition hover:scale-105">
              <MessageCircle className="size-6" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Order Process ----
function OrderProcess() {
  const steps = [
    { n: 1, title: "Click WhatsApp", desc: "Tap the green button below", emoji: "💬" },
    { n: 2, title: "Send Your Name", desc: "Tell us who you are", emoji: "📝" },
    { n: 3, title: "Share Address", desc: "Your delivery details", emoji: "🏠" },
    { n: 4, title: "Cash on Delivery", desc: "Pay when it arrives", emoji: "💰" },
  ];
  return (
    <section className="relative px-4 py-20 bg-gradient-to-b from-brand-green/10 to-brand-sky/10">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Easy ordering" title="How to Order" subtitle="It only takes 30 seconds. No payment online — pay when you receive." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card-lift rounded-3xl bg-white p-6 text-center shadow-md ring-1 ring-border">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand-green text-xl font-bold text-white">{s.n}</div>
              <div className="mt-3 text-4xl">{s.emoji}</div>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <WhatsAppButton size="lg" label="Start Order on WhatsApp" />
        </div>
      </div>
    </section>
  );
}

// ---- Why Buy From Us ----
function WhyBuyFromUs() {
  const items = [
    { emoji: "🇵🇰", title: "Made for Pakistan" },
    { emoji: "🚚", title: "Fast Delivery" },
    { emoji: "💵", title: "Cash on Delivery" },
    { emoji: "✅", title: "Trusted Seller" },
    { emoji: "🎁", title: "Premium Packaging" },
    { emoji: "📞", title: "Quick Support" },
    { emoji: "🔄", title: "Easy Returns" },
    { emoji: "❤️", title: "5,000+ Happy Parents" },
  ];
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Why buy from us" title="Trusted by parents across Pakistan" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((i) => (
            <div key={i.title} className="card-lift rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl">{i.emoji}</div>
              <p className="mt-3 font-bold text-sm sm:text-base">{i.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials ----
function Testimonials() {
  const reviews = [
    { name: "Ayesha K.", city: "Karachi", emoji: "👩", child: "🧒", text: "My son stopped using mobile after getting this. He loves tracing every evening!" },
    { name: "Sara M.", city: "Lahore", emoji: "👩‍🦰", child: "👧", text: "Excellent quality. Worth every rupee. Delivery was super fast." },
    { name: "Hina A.", city: "Islamabad", emoji: "🧕", child: "👦", text: "Very useful for handwriting. My daughter's writing improved in just two weeks." },
    { name: "Bilal R.", city: "Rawalpindi", emoji: "👨", child: "🧒", text: "Highly recommended. The best educational gift I've bought." },
  ];
  return (
    <section className="relative px-4 py-20 bg-brand-cream">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Real reviews" title="Thousands of happy parents" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <div key={r.name} className="card-lift rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border">
              <div className="flex items-center gap-1 text-brand-yellow">
                {[...Array(5)].map((_,i)=><Star key={i} className="size-4 fill-current"/>)}
              </div>
              <p className="mt-3 text-sm leading-relaxed">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative">
                  <div className="grid size-12 place-items-center rounded-full bg-brand-green/15 text-2xl">{r.emoji}</div>
                  <div className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-white text-sm ring-2 ring-white">{r.child}</div>
                </div>
                <div>
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}, Pakistan</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Instagram Gallery ----
function InstagramGallery() {
  const posts = [
    { emoji: "🧒", gradient: "bg-gradient-to-br from-brand-green/40 to-brand-sky/40" },
    { emoji: "👧", gradient: "bg-gradient-to-br from-brand-coral/40 to-brand-purple/40" },
    { emoji: "📘", gradient: "bg-gradient-to-br from-brand-yellow/40 to-brand-orange/40" },
    { emoji: "✏️", gradient: "bg-gradient-to-br from-brand-purple/40 to-brand-sky/40" },
    { emoji: "🎨", gradient: "bg-gradient-to-br from-brand-orange/40 to-brand-coral/40" },
    { emoji: "👦", gradient: "bg-gradient-to-br from-brand-sky/40 to-brand-green/40" },
  ];
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="@magictracing.pk"
          title="See it on Instagram"
          subtitle="Real kids. Real moments. Real learning."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {posts.map((p, i) => (
            <a key={i} href="#" className="card-lift block">
              <ImgPlaceholder label="@magictracing.pk" emoji={p.emoji} gradient={p.gradient} />
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-coral via-brand-purple to-brand-orange px-6 py-3.5 font-semibold text-white shadow-lg transition hover:scale-105">
            <Instagram className="size-5" /> Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- FAQ ----
function FAQ() {
  const faqs = [
    { q: "Is it really reusable?", a: "Yes! Wipe pages clean with the included sponge and reuse them forever. The special markers are designed for the wipe-clean surface." },
    { q: "How many pages does it have?", a: "The book includes 30+ activity pages covering alphabets, numbers, shapes, patterns, drawing and more." },
    { q: "What age is it for?", a: "Recommended for children aged 3 to 6 years. Perfect for preschool and early learning at home." },
    { q: "How long does delivery take?", a: "We deliver across Pakistan in 2–4 business days. Major cities often receive within 48 hours." },
    { q: "Is Cash on Delivery available?", a: "Yes! Pay only when the parcel reaches your doorstep. Available all over Pakistan." },
    { q: "How do I order?", a: "Click any WhatsApp button on this page, share your name, city and quantity — we'll handle the rest." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative px-4 py-20 bg-brand-cream">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="FAQ" title="Questions, answered" />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
              >
                <span>{f.q}</span>
                <ChevronDown className={`size-5 shrink-0 text-brand-green transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Final CTA ----
function FinalCTA() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-gradient-to-br from-brand-yellow via-brand-orange to-brand-coral p-10 sm:p-16 text-center text-white shadow-2xl">
        <div className="text-5xl">🎁</div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold">Screen-Free Learning Starts Here</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/95">
          The premium educational gift your child will use every single day. Limited stock — order today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-pulse inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-brand-coral shadow-xl transition hover:scale-105">
            <MessageCircle className="size-6" /> Order on WhatsApp
          </a>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-3 text-sm font-semibold backdrop-blur">
            <Truck className="size-4" /> Cash on Delivery
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="relative bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid size-10 place-items-center rounded-2xl bg-brand-green text-xl">📘</div>
              <span className="font-display text-xl font-bold">Magic Tracing</span>
            </div>
            <p className="mt-4 text-sm text-white/70">Screen-free learning toys for happy Pakistani kids. Made with love. Loved by thousands.</p>
          </div>
          <div>
            <h4 className="font-bold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#showcase" className="hover:text-brand-yellow">Product</a></li>
              <li><a href="#" className="hover:text-brand-yellow">Reviews</a></li>
              <li><a href="#" className="hover:text-brand-yellow">FAQ</a></li>
              <li><a href={waLink} className="hover:text-brand-yellow">Order Now</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Follow Us</h4>
            <div className="mt-4 flex gap-3">
              {[Instagram, Facebook, Music2, MessageCircle].map((I, i) => (
                <a key={i} href={i === 3 ? waLink : "#"} className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-brand-green">
                  <I className="size-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2"><Phone className="size-4 text-brand-green"/> +92 300 000 0000</li>
              <li className="flex items-center gap-2"><Mail className="size-4 text-brand-green"/> hello@magictracing.pk</li>
              <li className="flex items-center gap-2"><MapPin className="size-4 text-brand-green"/> Pakistan 🇵🇰</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Magic Tracing Pakistan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ---- Sticky Buttons ----
function StickyButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="btn-pulse fixed bottom-5 right-5 z-50 grid size-16 place-items-center rounded-full bg-brand-green text-white shadow-2xl transition hover:scale-110"
      >
        <MessageCircle className="size-8" strokeWidth={2.5} />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-5 left-5 z-50 grid size-12 place-items-center rounded-full bg-white text-foreground shadow-xl ring-1 ring-border transition hover:scale-110 ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowUp className="size-5" />
      </button>
    </>
  );
}
