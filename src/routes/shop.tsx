import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import preschoolImg from "@/assets/child-learning.png.asset.json";

type Product = {
  slug: "preschool-learning-cards" | "finger-painting-kit" | "interactive-busy-book";
  name: string;
  tagline: string;
  price: number;
  compareAt: number;
  image: string;
  href?: "/products/preschool-learning-cards";
  comingSoon?: boolean;
};

const PRODUCTS: Product[] = [
  {
    slug: "preschool-learning-cards",
    name: "Reusable Preschool Learning Cards Set",
    tagline: "64 wipe-clean activities • Ages 3+",
    price: 1499,
    compareAt: 2499,
    image: preschoolImg.url,
    href: "/products/preschool-learning-cards",
  },
  {
    slug: "finger-painting-kit",
    name: "Kids Finger Painting Kit",
    tagline: "Mess-free creativity for little artists",
    price: 1499,
    compareAt: 2499,
    image: preschoolImg.url,
    comingSoon: true,
  },
  {
    slug: "interactive-busy-book",
    name: "Kids Interactive Busy Book",
    tagline: "Hands-on learning that keeps them engaged",
    price: 1499,
    compareAt: 2499,
    image: preschoolImg.url,
    comingSoon: true,
  },
];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop - Little Learners PK | Screen-Free Learning Toys" },
      { name: "description", content: "Shop our full range of screen-free learning toys for kids - reusable activity sets, painting kits and interactive busy books. Cash on Delivery all over Pakistan." },
      { property: "og:title", content: "Shop - Little Learners PK" },
      { property: "og:description", content: "Screen-free learning toys for Pakistani kids. Cash on Delivery." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
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
            <Link to="/shop" activeProps={{ className: "bg-brand-green/10 text-brand-green-dark" }} className="rounded-full px-4 py-2 text-sm font-semibold">Shop</Link>
            <Link to="/contact" className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-muted">Contact</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-green/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green-dark">
            Our Collection
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Screen-Free Learning Toys</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Thoughtfully designed toys that help Pakistani kids learn through play - not screens.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={p.slug} className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square overflow-hidden bg-sky-50">
                <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                {p.comingSoon && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-yellow/95 px-3 py-1 text-xs font-bold text-foreground shadow">
                    Coming Soon
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold leading-snug">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold">PKR {p.price.toLocaleString("en-PK")}</span>
                  <span className="text-sm text-muted-foreground line-through">PKR {p.compareAt.toLocaleString("en-PK")}</span>
                </div>
                <div className="mt-5 flex-1" />
                {p.href ? (
                  <Link
                    to={p.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                  >
                    View Product <ArrowRight className="size-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-bold text-muted-foreground"
                  >
                    <ShoppingBag className="size-4" /> Coming Soon
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
