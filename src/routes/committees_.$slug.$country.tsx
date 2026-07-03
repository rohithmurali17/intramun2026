import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import { getCommittee, getPortfolio, INSTAGRAM_URL, type Committee, type Portfolio } from "@/data/committees";

export const Route = createFileRoute("/committees_/$slug/$country")({
  loader: ({ params }) => {
    const committee = getCommittee(params.slug);
    if (!committee) throw notFound();
    const portfolio = getPortfolio(committee, params.country);
    if (!portfolio) throw notFound();
    return { committee, portfolio };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.committee;
    const p = loaderData?.portfolio;
    const title = c && p ? `${p.name} · ${c.name} | INTRA MUN 2026` : "Portfolio | INTRA MUN 2026";
    const desc = p ? `${p.name}'s position in ${c?.fullForm}.` : "Portfolio details.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: CountryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary">404</p>
        <h1 className="mt-4 font-serif text-4xl">Portfolio not found</h1>
        <Link to="/" className="mt-6 inline-block font-mono text-xs tracking-widest uppercase text-primary border-b border-primary">Back home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <p className="font-mono text-sm">Something went wrong: {error.message}</p>
    </div>
  ),
});

function CountryPage() {
  const { committee, portfolio } = Route.useLoaderData() as { committee: Committee; portfolio: Portfolio };
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[oklch(0.15_0.045_190/0.7)] border-b border-border/60">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="DOC MUN Society" className="h-9 w-9 rounded-full ring-1 ring-primary/40" />
            <div className="hidden sm:block leading-tight">
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary/80">DOC · MUN · SOCIETY</p>
              <p className="font-serif italic text-sm">Intra MUN / 2026</p>
            </div>
          </Link>
          <Link
            to="/committees/$slug"
            params={{ slug: committee.slug }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground/70 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {committee.name}
          </Link>
        </div>
      </header>

      <section className="relative pt-36 pb-20 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.17_75/0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1100px] px-6">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
            {committee.name} · Portfolio
          </p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl tracking-tight leading-[1]">{portfolio.name}</h1>
          {portfolio.role && <p className="mt-3 font-mono text-xs tracking-[0.25em] uppercase text-foreground/60">{portfolio.role}</p>}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-6 grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">On the Agenda</p>
            <p className="mt-3 font-serif italic text-2xl">{committee.agenda}</p>
            <p className="mt-6 text-sm text-foreground/60 leading-relaxed">{committee.fullForm}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Position</p>
            <p className="mt-4 font-serif text-xl md:text-2xl leading-relaxed text-foreground/90">{portfolio.position}</p>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border bg-[oklch(0.16_0.045_190)]">
        <div className="mx-auto max-w-[1100px] px-6 flex flex-wrap items-center justify-between gap-6">
          <Link
            to="/committees/$slug"
            params={{ slug: committee.slug }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground hover:text-primary border-b border-foreground/40 hover:border-primary pb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to {committee.name} portfolios
          </Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase text-foreground/60 hover:text-primary">
            @docmunsoc
          </a>
        </div>
      </section>
    </div>
  );
}