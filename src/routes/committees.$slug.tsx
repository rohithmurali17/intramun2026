import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import { getCommittee, INSTAGRAM_URL, type Committee } from "@/data/committees";
import { IntroPlayer } from "@/components/IntroPlayer";
import { BgmPlayer } from "@/components/BgmPlayer";
import { useAllocations, normalizeName } from "@/lib/allocations";

export const Route = createFileRoute("/committees/$slug")({
  loader: ({ params }) => {
    const committee = getCommittee(params.slug);
    if (!committee) throw notFound();
    return { committee };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.committee;
    const title = c ? `${c.name} — ${c.fullForm} | INTRA MUN 2026` : "Committee | INTRA MUN 2026";
    const desc = c ? c.description : "Committee details for INTRA MUN 2026.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: CommitteePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary">404</p>
        <h1 className="mt-4 font-serif text-4xl">Committee not found</h1>
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

function CommitteePage() {
  const { committee } = Route.useLoaderData() as { committee: Committee };
  const { data: allocated } = useAllocations(committee.slug);
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
          <div className="flex items-center gap-3">
            <BgmPlayer className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--mun-gold)]/40 bg-background/70 backdrop-blur-md transition-all hover:border-[color:var(--mun-gold)] hover:shadow-[var(--shadow-gold)]" />
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground/70 hover:text-primary">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border">
        <img src={committee.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.045_190/0.7)] to-[oklch(0.15_0.045_190)]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Committee · {committee.n}</p>
          <h1 className="mt-4 font-display tracking-tight text-[14vw] md:text-[10rem] leading-[0.85] text-foreground">{committee.name}</h1>
          <p className="mt-4 font-serif italic text-2xl md:text-3xl text-primary">{committee.fullForm}</p>
          {committee.intro ? (
            <IntroPlayer audioUrl={committee.intro.audioUrl} segments={committee.intro.segments} />
          ) : (
            <p className="mt-6 max-w-2xl text-foreground/80 leading-relaxed">{committee.description}</p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 grid md:grid-cols-3 gap-px bg-border border border-border">
          <Info label="Agenda" value={committee.agenda} />
          <Info label="Executive Board" value={committee.board} />
          <Info
            label="Background Guide"
            value={committee.guideUrl ? "Download" : "TBA"}
            href={committee.guideUrl}
          />
        </div>
      </section>

      {committee.slug === "ipc" ? (
        <section className="py-16 md:py-20 bg-[oklch(0.16_0.045_190)] border-y border-border">
          <div className="mx-auto max-w-[1400px] px-6">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary mb-6">Choose your track</p>
            <div className="grid md:grid-cols-2 gap-6">
              {committee.tracks?.map((t) => (
                <Link
                  key={t.code}
                  to="/committees/ipc/track/$trackCode"
                  params={{ trackCode: t.code.toLowerCase() }}
                  className="group block bg-background p-8 md:p-10 border border-border hover:border-primary/60 transition-colors"
                >
                  <p className="font-mono text-xs tracking-widest text-primary">{t.code}</p>
                  <h3 className="mt-2 font-serif text-3xl">{t.name}</h3>
                  <p className="mt-3 text-foreground/70 leading-relaxed">{t.blurb}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-primary">
                    Enter track <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                  </div>
                  <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-foreground/40">
                    {t.code === "IPP" ? "Individual Representation" : "News Agency Representation"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {committee.tracks && (
            <section className="py-16 md:py-20 bg-[oklch(0.16_0.045_190)] border-y border-border">
              <div className="mx-auto max-w-[1400px] px-6">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary mb-6">Two Tracks</p>
                <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
                  {committee.tracks.map((t) => (
                    <div key={t.code} className="bg-background p-8 md:p-10">
                      <p className="font-mono text-xs tracking-widest text-primary">{t.code}</p>
                      <h3 className="mt-2 font-serif text-3xl">{t.name}</h3>
                      <p className="mt-3 text-foreground/70 leading-relaxed">{t.blurb}</p>
                      {t.intro && (
                        <IntroPlayer audioUrl={t.intro.audioUrl} segments={t.intro.segments} autoPlay={false} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="py-20 md:py-24">
            <div className="mx-auto max-w-[1400px] px-6">
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Portfolio Matrix</p>
                  <h2 className="mt-3 font-serif text-4xl md:text-6xl tracking-tight">Choose your <span className="italic text-primary">seat.</span></h2>
                </div>
                <p className="max-w-sm text-sm text-foreground/60">Click a portfolio to read its position on the agenda within this committee.</p>
              </div>

              {(() => {
                type Group = { label: string; items: { p: (typeof committee.portfolios)[number]; index: number }[] };
                const groups: Group[] = [];
                committee.portfolios.forEach((p, index) => {
                  if (p.groupStart || groups.length === 0) {
                    groups.push({ label: p.groupStart ?? "", items: [] });
                  }
                  groups[groups.length - 1].items.push({ p, index });
                });
                return (
                  <div className="space-y-12">
                    {groups.map((g) => (
                      <div key={g.label || "default"}>
                        {g.label && (
                          <div className="mb-4 flex items-center gap-4">
                            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">{g.label}</p>
                            <span className="h-px flex-1 bg-border" />
                            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40">{g.items.length}</p>
                          </div>
                        )}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                          {g.items.map(({ p, index }) => (
                            <Link
                              key={p.slug}
                              to="/committees/$slug/$country"
                              params={{ slug: committee.slug, country: p.slug }}
                              className="group relative isolate overflow-hidden bg-background p-7 min-h-[168px] flex items-center justify-between transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.09] hover:z-20 hover:shadow-[0_30px_80px_-40px_oklch(0_0_0/0.85)] hover:border hover:border-primary/60"
                            >
                              {(p.flagCode || p.flagUrl) ? (
                                <>
                                  <img
                                    src={p.flagUrl ?? `https://flagcdn.com/w640/${p.flagCode}.png`}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 saturate-[0.85] transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-95 group-hover:saturate-100 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/70 to-background/30 transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:from-background/70 group-hover:via-background/35 group-hover:to-background/10" />
                                </>
                              ) : p.bgColor ? (
                                <>
                                  <div
                                    aria-hidden="true"
                                    className="absolute inset-0 -z-10 transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-40"
                                    style={{
                                      background: `linear-gradient(120deg, ${p.bgColor} 0%, ${p.bgColor}cc 45%, oklch(0.15 0.045 190) 100%)`,
                                      opacity: 0.55,
                                    }}
                                  />
                                  {p.badge && (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 -z-10 font-serif font-black tracking-tight text-white/15 select-none transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:text-white/30"
                                      style={{ fontSize: "5rem", lineHeight: 1 }}
                                    >
                                      {p.badge}
                                    </span>
                                  )}
                                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/60 to-background/20 transition-all duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:from-background/70 group-hover:via-background/35 group-hover:to-background/10" />
                                </>
                              ) : null}
                              <div className="relative">
                                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">{String(index + 1).padStart(2, "0")}</p>
                                <p className="mt-3 font-serif text-2xl leading-tight drop-shadow-[0_2px_8px_oklch(0.15_0.045_190/0.9)]">{p.name}</p>
                                {p.role && <p className="mt-1 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/70">{p.role}</p>}
                                {(p.party || p.state) && (
                                  <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/50">
                                    {p.party}
                                    {p.party && p.state ? " · " : ""}
                                    {p.state}
                                  </p>
                                )}
                              </div>
                              <ArrowUpRight className="relative h-5 w-5 text-foreground/60 group-hover:text-primary group-hover:rotate-45 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </section>
        </>
      )}

      <footer className="bg-[oklch(0.11_0.045_190)] py-10 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50">
          <span>© 2026 DOC MUN Society</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">@docmunsoc</a>
        </div>
      </footer>
    </div>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <>
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">{label}</p>
      <p className="mt-3 font-serif text-2xl">{value}</p>
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bg-background p-8 hover:bg-secondary/40 transition-colors">
      {inner}
    </a>
  ) : (
    <div className="bg-background p-8">{inner}</div>
  );
}