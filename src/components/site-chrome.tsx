import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle, ShoppingCart, Menu, X, Truck, ShieldCheck, RefreshCw,
  Star, Heart, MapPin, Phone, Mail, Instagram, Facebook, Music2,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/funtaleem-logo.png.asset.json";

export const WHATSAPP_NUMBER = "923022060216";
export const WA_HELLO = encodeURIComponent("Hi Funtaleem! I'd like to know more about your learning toys.");
export const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_HELLO}`;

export function useReveal() {
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

export function AnnouncementBar() {
  return (
    <div className="relative z-20 gradient-animate bg-[linear-gradient(90deg,#0a2647,#1e88e5,#26c6da,#0a2647)] py-2 text-center text-xs font-semibold text-white sm:text-sm">
      <span className="mr-2 inline-block animate-pulse">✨</span>
      Free shipping over PKR 3,000 • Cash on Delivery All Over Pakistan 🇵🇰
    </div>
  );
}

export const SHOP_PRODUCTS = [
  { to: "/products/preschool-learning-cards" as const, label: "Reusable Preschool Learning Cards", emoji: "🔤" },
  { to: "/products/finger-painting-kit" as const, label: "Kids Finger Painting Kit", emoji: "🎨" },
  { to: "/products/interactive-busy-book" as const, label: "Kids Interactive Busy Book", emoji: "📖" },
];

function ShopDropdown() {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const openNow = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon} onFocus={openNow} onBlur={closeSoon}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-[#26c6da] after:transition-transform hover:text-[#0a2647] hover:after:scale-x-100 aria-expanded:text-[#0a2647] aria-expanded:after:scale-x-100"
      >
        Shop <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 mt-2 w-80 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 origin-top rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-border transition ${open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      >
        {SHOP_PRODUCTS.map((p) => (
          <Link
            key={p.to}
            to={p.to}
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground/80 transition hover:bg-[#eaf7fb] hover:text-[#0a2647]"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf7fb] text-lg">{p.emoji}</span>
            <span className="min-w-0 flex-1">{p.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { qty } = useCart();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-white/90 shadow-sm backdrop-blur-lg" : "bg-white/70 backdrop-blur"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 md:grid-cols-3">
        <div className="flex items-center gap-1">
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full text-foreground hover:bg-muted md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[#0a2647] after:scale-x-100" }}
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-[#26c6da] after:transition-transform hover:text-[#0a2647] hover:after:scale-x-100"
            >
              Home
            </Link>
            <ShopDropdown />
            <Link
              to="/contact"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[#0a2647] after:scale-x-100" }}
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-[#26c6da] after:transition-transform hover:text-[#0a2647] hover:after:scale-x-100"
            >
              Contact
            </Link>
          </nav>
        </div>

        <Link to="/" className="flex items-center justify-center wiggle-hover md:justify-self-center">
          <img src={logo.url} alt="Funtaleem" className="h-12 w-auto sm:h-14" />
        </Link>

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-10 place-items-center rounded-full bg-muted text-foreground transition hover:scale-105 hover:bg-[#0a2647]/10"
          >
            <ShoppingCart className="size-5" />
            {qty > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#f39c12] text-[10px] font-bold text-white ring-2 ring-white">
                {qty}
              </span>
            )}
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#0a2647] px-4 py-2 text-sm font-bold text-white transition hover:scale-[1.03] hover:bg-[#0f3560] sm:inline-flex"
          >
            <MessageCircle className="size-4" /> Chat
          </a>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-[#26c6da]/10 text-[#0a2647]" }}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground/80"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setShopOpen((s) => !s)}
              aria-expanded={shopOpen}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-foreground/80 hover:bg-muted"
            >
              <span>Shop</span>
              <ChevronDown className={`size-4 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
            </button>
            {shopOpen && (
              <div className="ml-2 flex flex-col gap-1 border-l-2 border-[#26c6da]/30 pl-2">
                {SHOP_PRODUCTS.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    onClick={() => { setOpen(false); setShopOpen(false); }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/75 hover:bg-[#eaf7fb] hover:text-[#0a2647]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#eaf7fb] text-base">{p.emoji}</span>
                    <span className="min-w-0 flex-1">{p.label}</span>
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              activeProps={{ className: "bg-[#26c6da]/10 text-[#0a2647]" }}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground/80"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function TrustMarquee() {
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

export function Newsletter() {
  return (
    <section className="relative overflow-hidden gradient-animate bg-[linear-gradient(120deg,#0a2647,#1e88e5,#26c6da,#0a2647)] py-20 text-center text-white sm:py-28 rounded-none">
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
          <input type="email" required placeholder="your@email.com"
            className="flex-1 rounded-full bg-white/95 px-5 py-3.5 text-sm font-medium text-foreground outline-none ring-2 ring-transparent focus:ring-[#f39c12]" />
          <button type="submit"
            className="rounded-none bg-[#f39c12] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#e08e0a]">
            Subscribe
          </button>
        </form>
      </div>
    </section>

  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-white px-4 pt-16 pb-8 text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="Funtaleem" className="h-12 w-auto" />
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
              <a key={i} href={i === 3 ? waLink : "#"} target={i === 3 ? "_blank" : undefined} rel="noopener noreferrer" className="grid size-10 place-items-center rounded-none bg-[#eaf7fb] text-[#0a2647] transition hover:scale-110 hover:bg-[#26c6da] hover:text-white">
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

export function FloatingWhatsApp() {
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
