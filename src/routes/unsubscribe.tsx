import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnnouncementBar, SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({
    meta: [
      { title: "Unsubscribe | Funtaleem" },
      { name: "description", content: "Manage your Funtaleem email preferences and unsubscribe from future emails." },
      { property: "og:title", content: "Unsubscribe | Funtaleem" },
      { property: "og:description", content: "Manage your Funtaleem email preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnsubscribePage,
});

type State = "loading" | "valid" | "invalid" | "used" | "working" | "done" | "error";

function UnsubscribePage() {
  const [state, setState] = useState<State>("loading");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    setToken(t);
    if (!t) {
      setState("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.valid === false) {
          setState(data?.reason === "already_used" || data?.used ? "used" : "invalid");
          return;
        }
        setState("valid");
      })
      .catch(() => setState("error"));
  }, []);

  async function confirm() {
    if (!token) return;
    setState("working");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Email preferences</h1>

        {state === "loading" && <p className="mt-4 text-muted-foreground">Checking your link…</p>}

        {state === "valid" && (
          <>
            <p className="mt-4 text-muted-foreground">
              Click below to stop receiving emails from Funtaleem at this address.
            </p>
            <button
              onClick={confirm}
              className="mt-8 inline-flex items-center justify-center bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105"
            >
              Confirm unsubscribe
            </button>
          </>
        )}

        {state === "working" && <p className="mt-4 text-muted-foreground">Updating your preferences…</p>}

        {state === "done" && (
          <p className="mt-4 text-muted-foreground">
            You have been unsubscribed. You will no longer receive these emails.
          </p>
        )}

        {state === "used" && (
          <p className="mt-4 text-muted-foreground">This link has already been used. You are unsubscribed.</p>
        )}

        {state === "invalid" && (
          <p className="mt-4 text-muted-foreground">This unsubscribe link is invalid or has expired.</p>
        )}

        {state === "error" && (
          <p className="mt-4 text-muted-foreground">Something went wrong. Please try again later.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
