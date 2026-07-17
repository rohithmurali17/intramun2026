import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import { getCommittee, INSTAGRAM_URL, type Committee } from "@/data/committees";
import { IntroPlayer } from "@/components/IntroPlayer";
import { BgmPlayer } from "@/components/BgmPlayer";

export const Route = createFileRoute("/committees/ipc/track/$trackCode")({
  loader: ({ params }) => {
    const committee = getCommittee("ipc");
    if (!committee) throw notFound();
    const track = committee.tracks?.find(
      (t) => t.code.toLowerCase() === params.trackCode.toLowerCase()
    );
    if (!track) throw notFound();
    return { committee, track };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.committee;
    const t = loaderData?.track;
    const title =
      c && t ? `${t.name} · ${c.name} | INTRA MUN 2026` : "Track | INTRA MUN 2026";
    const desc = t ? t.blurb : "IPC track details.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: TrackPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary">404</p>
        <h1 className="mt-4 font-serif text-4xl">Track not found</h1>
        <Link
          to="/committees/$slug"
          params={{ slug: "ipc" }}
          className="mt-6 inline-block font-mono text-xs tracking-widest uppercase text-primary border-b border-primary"
        >
          Back to IPC
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <p className="font-mono text-sm">Something went wrong: {error.message}</p>
    </div>
  ),
});

type Track = NonNullable<Committee["tracks"]>[number];

function TrackPage() {
  const { committee, track } = Route.useLoaderData() as {
    committee: Committee;
    track: Track;
  };

  const isPhoto = track.code === "IPP";
  const filteredPortfolios = isPhoto
    ? committee.portfolios.filter((p) => p.role === "Photography")
    : committee.portfolios.filter((p) => p.role !== "Photography");

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[oklch(0.15_0.045_190/0.7)] border-b border-border/60">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="DOC MUN Society"
              className="h-9 w-9 rounded-full ring-1 ring-primary/40"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary/80">
                DOC · MUN · SOCIETY
              </p>
              <p className="font-serif italic text-sm">Intra MUN / 2026</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <BgmPlayer className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--mun-gold)]/40 bg-background/70 backdrop-blur-md transition-all hover:border-[color:var(--mun-gold)] hover:shadow-[var(--shadow-gold)]" />
            <Link
              to="/committees/$slug"
              params={{ slug: committee.slug }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground/70 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {committee.name}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border">
        <img
          src={committee.img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.045_190/0.7)] to-[oklch(0.15_0.045_190)]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
            Committee · {committee.n} · {track.code}
          </p>
          <h1 className="mt-4 font-display tracking-tight text-[14vw] md:text-[10rem] leading-[0.85] text-foreground">
            {track.code}
          </h1>
          <p className="mt-4 font-serif italic text-2xl md:text-3xl text-primary">
            {track.name}
          </p>
          <p className="mt-2 font-mono text-xs tracking-widest uppercase text-foreground/60">
            {isPhoto ? "Individual Representation" : "News Agency Representation"}
          </p>
          {track.intro ? (
            <IntroPlayer
              audioUrl={track.intro.audioUrl}
              segments={track.intro.segments}
              autoPlay={true}
            />
          ) : (
            <p className="mt-6 max-w-2xl text-foreground/80 leading-relaxed">
              {track.blurb}
            </p>
          )}
        </div>
      </section>

      {track.eb && track.eb.length > 0 && (
        <section className="py-20 md:py-24 bg-[oklch(0.16_0.045_190)] border-y border-border">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">The Executive Board</p>
                <h2 className="mt-3 font-serif text-4xl md:text-6xl tracking-tight">Meet your <span className="italic text-primary">dais.</span></h2>
              </div>
              <p className="max-w-sm text-sm text-foreground/60">The editors of the record. Their pens shape the proceedings.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {track.eb.map((m) => (
                <article
                  key={m.name}
                  className="group relative overflow-hidden border border-border bg-background/60 backdrop-blur-sm transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">{m.role}</p>
                      <h3 className="mt-1 font-serif text-2xl leading-tight">{m.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-foreground/75 whitespace-pre-line">{m.writeUp}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
                Portfolio Matrix
              </p>
              <h2 className="mt-3 font-serif text-4xl md:text-6xl tracking-tight">
                Choose your <span className="italic text-primary">seat.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-foreground/60">
              Click a portfolio to read its position on the agenda within this
              track.
            </p>
          </div>

          {filteredPortfolios.length === 0 ? (
            <div className="border border-border bg-background p-10 md:p-14">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">
                Independent Allocation
              </p>
              <p className="mt-4 font-serif text-2xl md:text-3xl leading-snug max-w-3xl">
                {isPhoto
                  ? "Photographers in IPP participate as independent individuals — no agency, no affiliation. Assignments are issued on-site by the Executive Board."
                  : "Journalists in IPJ are allocated to news agencies by the Executive Board at the start of the conference. No pre-declared roster."}
              </p>
              <p className="mt-4 text-sm text-foreground/60 max-w-2xl">
                Portfolios will be confirmed after registration closes. Reach out via the contact section on the home page for anything urgent.
              </p>
            </div>
          ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {filteredPortfolios.map((p, i) => (
              <Link
                key={p.slug}
                to="/committees/$slug/$country"
                params={{ slug: committee.slug, country: p.slug }}
                className="group bg-background p-7 flex items-center justify-between hover:bg-secondary/40 transition-colors"
              >
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-serif text-2xl leading-tight">
                    {p.name}
                  </p>
                  {p.role && (
                    <p className="mt-1 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50">
                      {p.role}
                    </p>
                  )}
                </div>
                <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all" />
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      <footer className="bg-[oklch(0.11_0.045_190)] py-10 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50">
          <span>© 2026 DOC MUN Society</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            @docmunsoc
          </a>
        </div>
      </footer>
    </div>
  );
}
