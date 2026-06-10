import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.asset.json";
import heroBg from "@/assets/hero-bg.jpg";
import munHall from "@/assets/mun-hall.jpg";
import gavel from "@/assets/gavel.jpg";
import { Award, Users, User, Calendar, MapPin, Phone, Gavel, Globe2, Scale, Trophy, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INTRA MUN 2026 | DOC MUN Society" },
      { name: "description", content: "INTRA MUN 2026 by the Department of Commerce MUN Society. 20–21 July 2026. ₹10,000 cash prize. Register as an individual or a delegation of 7+." },
      { property: "og:title", content: "INTRA MUN 2026 | DOC MUN Society" },
      { property: "og:description", content: "Diplomacy. Debate. Distinction. 20–21 July 2026 — ₹10,000 cash prize." },
    ],
  }),
  component: Index,
});

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdQAYZW8GmzOW_Xky8vpt4g8wQSdWJVYTZQOc8sA59stS2pEg/viewform?usp=dialog";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#what", label: "What is MUN" },
  { href: "#committees", label: "Committees" },
  { href: "#eb", label: "Executive Board" },
  { href: "#heads", label: "Event Heads" },
  { href: "#register", label: "Register" },
  { href: "#contact", label: "Contact" },
];

const COMMITTEES = [
  { name: "UNHRC", full: "United Nations Human Rights Council", icon: Globe2 },
  { name: "CCC", full: "Continuous Crisis Committee", icon: Scale },
  { name: "Lok Sabha", full: "Indian Parliament — Lower House", icon: Gavel },
  { name: "IPC — Media", full: "International Press Corps · Media", icon: Users },
  { name: "IPC — Journalism", full: "International Press Corps · Journalism", icon: Users },
];

const HEADS = [
  { name: "Bharanitharan TH", phone: "+91 88676 20512" },
  { name: "Dhruv S Dali", phone: "+91 99729 67558" },
  { name: "Hayati Podugu", phone: "+91 63015 92872" },
  { name: "Nihal P Patil", phone: "+91 93533 45923" },
  { name: "Rohith M", phone: "+91 84959 12380" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.09_300/0.85)] border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="DOC MUN Society logo" className="h-10 w-10 rounded-full" />
          <span className="font-display tracking-wider text-lg text-primary hidden sm:inline">DOC MUN SOCIETY</span>
        </a>
        <ul className="hidden lg:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-foreground/80 hover:text-primary transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
          Register
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.15 0.09 300 / 0.6) 0%, oklch(0.18 0.09 300) 100%)" }} />
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
        <img src={logoAsset.url} alt="DOC MUN Society logo" className="mx-auto h-32 w-32 md:h-40 md:w-40 drop-shadow-2xl mb-8" />
        <p className="text-primary font-semibold tracking-[0.3em] text-sm md:text-base mb-4">DEPARTMENT OF COMMERCE MUN SOCIETY PRESENTS</p>
        <h1 className="font-display text-7xl md:text-9xl tracking-wider text-primary leading-none drop-shadow-[0_4px_30px_oklch(0.78_0.17_75/0.4)]">
          INTRA MUN
        </h1>
        <p className="font-display text-3xl md:text-5xl tracking-widest text-foreground mt-2">2026</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-foreground/90">
          <span className="inline-flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> 20 – 21 July 2026</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Venue: TBA</span>
          <span className="inline-flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> ₹10,000 Cash Prize</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-gold)] hover:translate-y-[-2px] transition-transform">
            Register Now
          </a>
          <a href="#about" className="rounded-full border border-primary/60 px-8 py-3 font-semibold text-primary hover:bg-primary/10 transition-colors">
            Learn More
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground inline-flex items-center gap-2 justify-center">
          <Clock className="h-4 w-4" /> Registration closes 12:00 PM, 19 July 2026
        </p>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-primary tracking-[0.3em] text-xs font-semibold mb-3">{kicker}</p>
      <h2 className="font-display text-5xl md:text-6xl tracking-wider text-foreground">{title}</h2>
      <div className="mx-auto mt-4 h-[2px] w-24 bg-primary" />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 container mx-auto px-4">
      <SectionTitle kicker="WHO WE ARE" title="About Us" />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img src={munHall} alt="MUN conference hall" width={1600} height={900} loading="lazy" className="rounded-2xl border border-border shadow-2xl" />
        <div className="space-y-5 text-lg text-foreground/90 leading-relaxed">
          <p>The <span className="text-primary font-semibold">Department of Commerce MUN Society</span> is a student-run diplomatic forum committed to nurturing tomorrow's leaders through rigorous debate, research, and global affairs.</p>
          <p>Through simulations of international and national bodies, we equip delegates with the art of negotiation, the rigor of policy, and the courage of conviction.</p>
          <p>INTRA MUN is our flagship internal conference — a launchpad for first-time delegates and a battleground for seasoned ones.</p>
        </div>
      </div>
    </section>
  );
}

function WhatIsMUN() {
  return (
    <section id="what" className="py-24 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <SectionTitle kicker="THE EXPERIENCE" title="What is MUN?" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Globe2, title: "Simulate the UN", body: "Step into the shoes of diplomats and represent nations on issues that shape our world." },
            { icon: Scale, title: "Debate & Negotiate", body: "Defend foreign policy, draft resolutions, and find consensus across competing interests." },
            { icon: Award, title: "Win Recognition", body: "Awards for Best Delegate, High Commendation, and Special Mention across every committee." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-8 hover:border-primary/60 transition-colors">
              <c.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-display text-2xl tracking-wider text-foreground mb-2">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Committees() {
  return (
    <section id="committees" className="py-24 container mx-auto px-4">
      <SectionTitle kicker="THE FLOOR" title="Committees" />
      <p className="text-center text-muted-foreground -mt-6 mb-12">Five committees. One arena. Agendas to be announced.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMITTEES.map((c) => (
          <div key={c.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary transition-all hover:shadow-[var(--shadow-gold)]">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors" />
            <c.icon className="relative h-10 w-10 text-primary mb-4" />
            <h3 className="relative font-display text-3xl tracking-wider text-foreground">{c.name}</h3>
            <p className="relative text-muted-foreground mt-2">{c.full}</p>
            <p className="relative mt-4 text-xs font-semibold tracking-widest text-primary/80">AGENDA · TBA</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExecutiveBoard() {
  return (
    <section id="eb" className="py-24 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <SectionTitle kicker="THE DAIS" title="Executive Board" />
        <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-12 text-center">
          <Gavel className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="font-display text-3xl tracking-wider text-foreground mb-3">To Be Announced</h3>
          <p className="text-muted-foreground">Our distinguished Executive Board for INTRA MUN 2026 will be revealed soon. Stay tuned across our channels.</p>
        </div>
      </div>
    </section>
  );
}

function EventHeads() {
  return (
    <section id="heads" className="py-24 container mx-auto px-4">
      <SectionTitle kicker="BEHIND THE SCENES" title="Event Heads" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {HEADS.map((h) => (
          <div key={h.name} className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary transition-colors">
            <div className="mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--gradient-gold)" }}>
              <span className="font-display text-2xl text-[oklch(0.18_0.09_300)]">
                {h.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
            </div>
            <h3 className="font-semibold text-foreground">{h.name}</h3>
            <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="mt-2 inline-flex items-center justify-center gap-1 text-xs text-primary hover:underline">
              <Phone className="h-3 w-3" /> {h.phone}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Registration() {
  return (
    <section id="register" className="relative py-24 overflow-hidden">
      <img src={gavel} alt="" width={1200} height={800} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-[oklch(0.15_0.09_300/0.9)]" />
      <div className="relative container mx-auto px-4">
        <SectionTitle kicker="JOIN THE CONFERENCE" title="Registration" />

        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary p-6 mb-12 text-center" style={{ background: "var(--gradient-gold)" }}>
          <Trophy className="h-10 w-10 mx-auto text-[oklch(0.18_0.09_300)]" />
          <p className="font-display text-4xl md:text-5xl tracking-wider text-[oklch(0.18_0.09_300)] mt-2">₹10,000 CASH PRIZE</p>
          <p className="text-[oklch(0.18_0.09_300)]/80 font-semibold">For the winning delegation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-8">
            <User className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-display text-3xl tracking-wider text-foreground mb-2">Individual</h3>
            <p className="text-muted-foreground mb-6">Register on your own and get allocated to a committee and portfolio of your choice.</p>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Register as Individual →
            </a>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-[var(--shadow-gold)]">
            <Users className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-display text-3xl tracking-wider text-foreground mb-2">Delegation</h3>
            <p className="text-muted-foreground mb-6">Bring your crew. <span className="text-primary font-semibold">Minimum 7 members</span> per delegation. Compete together for the cash prize.</p>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Register as Delegation →
            </a>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
          <div className="rounded-xl border border-border bg-card p-4">
            <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">DATES</p>
            <p className="font-semibold text-foreground text-sm">20 – 21 July 2026</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">DEADLINE</p>
            <p className="font-semibold text-foreground text-sm">12:00 PM, 19 July</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">VENUE</p>
            <p className="font-semibold text-foreground text-sm">To be announced</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4">
        <SectionTitle kicker="REACH OUT" title="Contact" />
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {HEADS.map((h) => (
            <a key={h.name} href={`tel:${h.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors">
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
                <Phone className="h-4 w-4 text-[oklch(0.18_0.09_300)]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{h.name}</p>
                <p className="text-sm text-muted-foreground">{h.phone}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.12_0.08_300)] py-10 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="DOC MUN Society" className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-display tracking-wider text-primary">DOC MUN SOCIETY</p>
            <p className="text-xs text-muted-foreground">Department of Commerce · MUN Society</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 DOC MUN Society. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans scroll-smooth" style={{ fontFamily: "var(--font-sans)" }}>
      <style>{`html{scroll-behavior:smooth}.font-display{font-family:var(--font-display)}`}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIsMUN />
        <Committees />
        <ExecutiveBoard />
        <EventHeads />
        <Registration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
