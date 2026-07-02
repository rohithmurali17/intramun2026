import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.asset.json";
import heroCrowd from "@/assets/hero-crowd.jpg";
import heroVideo from "@/assets/un-vid.mp4.asset.json";
import munHall from "@/assets/mun-hall.jpg";
import gavel from "@/assets/gavel.jpg";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
import { COMMITTEES, INSTAGRAM_URL } from "@/data/committees";
import { CommitteeExpandGrid } from "@/components/CommitteeExpandGrid";
import { LegacyVideo } from "@/components/LegacyVideo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INTRA MUN 2026 | DOC MUN Society" },
      { name: "description", content: "INTRA MUN 2026 by the Department of Commerce MUN Society. 20–21 July 2026. ₹10,000 cash prize. Register as Individual or Delegation." },
      { property: "og:title", content: "INTRA MUN 2026 | DOC MUN Society" },
      { property: "og:description", content: "Diplomacy. Debate. Distinction. 20–21 July 2026 — ₹10,000 cash prize." },
    ],
  }),
  component: Index,
});

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdQAYZW8GmzOW_Xky8vpt4g8wQSdWJVYTZQOc8sA59stS2pEg/viewform?usp=dialog";

const NAV = [
  { href: "#society", label: "Society" },
  { href: "#mun", label: "MUN" },
  { href: "#committees", label: "Committees" },
  { href: "#board", label: "Board" },
  { href: "#process", label: "Process" },
  { href: "#process", label: "Process" },
  { href: "#register", label: "Register" },
  { href: "#contact", label: "Contact" },
];

const HEADS = [
  { n: "01", name: "Bharanidharan TH", phone: "+91 88676 20512" },
  { n: "02", name: "Dhruv S Dali", phone: "+91 99729 67558" },
  { n: "03", name: "Hayati Podugu", phone: "+91 63015 92872" },
  { n: "04", name: "Nihal P Patil", phone: "+91 93533 45923" },
  { n: "05", name: "Rohith M", phone: "+91 84959 12380" },
];

const PROCESS = [
  { n: "01", when: "Now Open", title: "Registration Live", body: "Apply as an individual or assemble a delegation of seven or more." },
  { n: "02", when: "19 July · 12:00 PM", title: "Applications Close", body: "Last call. No extensions. The gate locks at noon." },
  { n: "03", when: "20 July", title: "Day One · Opening", body: "Ceremony, committee sessions, the first vote on the floor." },
  { n: "04", when: "21 July", title: "Day Two · Verdict", body: "Final sessions, closing remarks, the ₹10,000 cash prize awarded." },
];

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function TopBar() {
  const p = useScrollProgress();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${p}%` }} />
      </div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[oklch(0.15_0.09_300/0.6)] border-b border-border/60">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3 group">
            <img src={logoAsset.url} alt="DOC MUN Society" className="h-9 w-9 rounded-full ring-1 ring-primary/40" />
            <div className="hidden sm:block leading-tight">
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary/80">DOC · MUN · SOCIETY</p>
              <p className="font-serif italic text-sm text-foreground">Intra MUN / 2026</p>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest uppercase">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="text-foreground/70 hover:text-primary transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram @docmunsoc" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/70 hover:text-primary hover:border-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-mono tracking-widest uppercase text-primary-foreground hover:opacity-90">
              Apply <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden flex flex-col">
      <video
        src={heroVideo.url}
        poster={heroCrowd}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-110 will-change-transform animate-[kenburns_22s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.09_300/0.78)] via-[oklch(0.18_0.09_300/0.65)] to-[oklch(0.15_0.09_300)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.17_75/0.18),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 pt-28 pb-10 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-foreground/70">
        <span>066 <span className="text-primary">MUNSOC</span> / 2026</span>
        <span className="hidden sm:inline">Vol. 26 · Presented by DOC MUNSOC</span>
      </div>

      <div className="relative flex-1 mx-auto max-w-[1400px] w-full px-6 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Registration Live</span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground/60">· Bengaluru · India</span>
        </div>
        <h1 className="font-display tracking-[-0.02em] leading-[0.82] text-[18vw] sm:text-[16vw] md:text-[13vw] lg:text-[180px] text-foreground">
          INTRA
          <br />
          <span className="text-primary italic font-serif font-light pr-3"></span>
          <span className="text-primary">MUN</span>
        </h1>
        <p className="mt-8 max-w-xl font-serif text-xl md:text-2xl italic text-foreground/85 leading-snug">
          Diplomacy. Debate. Distinction.
        </p>
        <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/70 leading-relaxed">
          The 2026 edition of INTRA MUN is open. Four committees. Two days. One ₹10,000 cash prize. Step forward, or stand aside.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 font-mono text-xs tracking-widest uppercase text-primary-foreground hover:gap-5 transition-all">
            Apply Now <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#society" className="font-mono text-xs tracking-widest uppercase text-foreground/70 hover:text-primary border-b border-foreground/30 hover:border-primary pb-1 transition-colors">
            Scroll ↓
          </a>
        </div>
      </div>

      <div className="relative border-t border-border/60 bg-[oklch(0.15_0.09_300/0.5)] backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60 text-xs font-mono uppercase tracking-widest">
          {[
            ["Dates", "20–21 Jul"],
            ["Prize", "₹10,000"],
            ["Deadline", "19 Jul · 12PM"],
            ["Venue", "TBA"],
          ].map(([k, v], i) => (
            <div key={k} className="px-4 py-5">
              <p className="text-foreground/50 text-[10px]">{k}</p>
              <p className="text-foreground mt-1 text-sm">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["UNSC", "UNHRC", "AIPPM", "IPC", "Diplomacy", "Debate", "Distinction"];
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y border-border bg-[oklch(0.20_0.10_300)] overflow-hidden py-5">
      <div className="flex gap-10 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
        {row.map((t, i) => (
          <span key={i} className="font-display text-3xl md:text-4xl tracking-wider text-foreground/40 inline-flex items-center gap-10">
            {t}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.3333%)}}`}</style>
    </div>
  );
}

function SectionNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] uppercase text-primary mb-10">
      <span>{n}</span>
      <span className="h-px w-12 bg-primary/50" />
      <span className="text-foreground/70">{label}</span>
    </div>
  );
}

function Society() {
  const stats = [
    ["5+", "Years Strong"],
    ["4", "Committees"],
    ["10K", "Cash Prize"],
    ["150+", "Delegates"],
  ];
  return (
    <section id="society" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionNumber n="001" label="The Society" />
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl">
          We don't run <span className="italic text-primary">a club.</span> We run <span className="italic text-primary">a delegation.</span>
        </h2>
        <div className="mt-14 grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-5 text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl">
            <p>Within the Department of Commerce, the MUN Society stands as a premier forum for diplomacy, debate, and global affairs — fostering a culture of research, rhetoric, and leadership.</p>
            <p>We don't gather to participate. We gather to set the standard the rest follow.</p>
            <p>INTRA MUN is our flagship internal conference — the proving ground where new delegates discover their voice and veterans defend their record.</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border border border-border self-start">
            {stats.map(([v, l]) => (
              <div key={l} className="bg-background p-8">
                <p className="font-display text-6xl md:text-7xl text-primary leading-none">{v}</p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIsMun() {
  return (
    <section id="mun" className="relative py-24 md:py-32 bg-[oklch(0.16_0.09_300)] border-y border-border">
      <img src={munHall} alt="" width={1600} height={900} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.16_0.09_300/0.6)] to-[oklch(0.16_0.09_300)]" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionNumber n="002" label="The Practice" />
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl">
          So, <span className="italic text-primary">what is</span> Model UN?
        </h2>
        <p className="mt-8 max-w-2xl text-lg text-foreground/75 leading-relaxed">
          A simulation. A stress test. A theatre where eighteen-year-olds defend nations, draft policy, and learn that conviction is the rarest currency in the room.
        </p>
        <div className="mt-16 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
          {[
            { n: "I.", title: "Represent", body: "You're not yourself in committee. You're a country, a delegate, a foreign policy. Speak only as they would." },
            { n: "II.", title: "Resolve", body: "Build coalitions. Draft working papers. Negotiate amendments until a resolution passes — or doesn't." },
            { n: "III.", title: "Recognise", body: "Best Delegate, High Commendation, Special Mention. The dais watches everything." },
          ].map((b) => (
            <div key={b.title} className="p-8 md:p-10 bg-background/40 backdrop-blur-sm">
              <p className="font-serif italic text-3xl text-primary">{b.n}</p>
              <h3 className="mt-4 font-display text-3xl tracking-wider">{b.title}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Committees() {
  return (
    <section id="committees" className="bg-background overflow-x-hidden">
      <div className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionNumber n="003" label="The Floor" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Four <span className="italic text-primary">committees.</span>
            </h2>
            <p className="max-w-md text-foreground/70 text-base">
              Four battlegrounds. Four sets of rules. Hover a committee to expand it, then click through for its portfolio matrix.
            </p>
          </div>
          <CommitteeExpandGrid committees={COMMITTEES} />
        </div>
      </div>

      <div className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-border pt-8">
            <div>
              <p className="font-mono text-xs tracking-widest text-primary">04</p>
              <h3 className="mt-2 font-serif text-3xl md:text-4xl tracking-tight italic">Your portfolio awaits.</h3>
            </div>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-primary hover:gap-4 transition-all">
              Register <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Board() {
  return (
    <section id="board" className="py-24 md:py-32 bg-[oklch(0.16_0.09_300)] border-y border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionNumber n="004" label="The Dais" />
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <h2 className="md:col-span-7 font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            The Executive <span className="italic text-primary">Board.</span>
          </h2>
          <p className="md:col-span-5 text-foreground/70">The dais decides the tempo. Names of our chairs, vice-chairs, and rapporteurs across all four committees are unveiled in the coming weeks.</p>
        </div>
        <div className="mt-14 border border-primary/40 px-8 py-16 text-center bg-background/40 backdrop-blur-sm">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Announcement Pending</p>
          <p className="mt-4 font-serif italic text-3xl md:text-5xl text-foreground/90">"The board is being assembled."</p>
          <p className="mt-6 font-mono text-xs tracking-widest uppercase text-foreground/50">Stay tuned · Reveal Soon</p>
        </div>
      </div>
    </section>
  );
}


function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-[oklch(0.16_0.09_300)] border-y border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionNumber n="006" label="The Process" />
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl">
          The road to <span className="italic text-primary">the floor.</span>
        </h2>
        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border border border-border">
          {PROCESS.map((p) => (
            <div key={p.n} className="bg-background p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-widest text-primary">{p.n} /</span>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/60">{p.when}</span>
              </div>
              <h3 className="mt-6 font-serif text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section id="register" className="relative py-24 md:py-32 overflow-hidden">
      <img src={gavel} alt="" width={1200} height={800} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-[oklch(0.15_0.09_300/0.92)]" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <SectionNumber n="007" label="Final Call" />
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight max-w-6xl">
          Apply. <span className="italic text-primary">Before</span><br /> 19 . 07 . 2026.
        </h2>

        <div className="mt-12 inline-flex flex-wrap items-center gap-6 border border-primary/50 px-7 py-5 bg-background/40 backdrop-blur-sm">
          <span className="font-display text-5xl md:text-6xl text-primary leading-none">₹10,000</span>
          <span className="font-serif italic text-foreground/80">cash prize · winning delegation</span>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
          <div className="group bg-background p-8 md:p-12">
            <p className="font-mono text-xs tracking-widest text-primary">A.</p>
            <h3 className="mt-4 font-serif text-4xl md:text-5xl">Individual</h3>
            <p className="mt-4 text-foreground/70 leading-relaxed">Apply alone. We allocate you to a committee and portfolio. You walk in, you walk out — entirely your own.</p>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-foreground border-b border-foreground/40 hover:border-primary hover:text-primary group-hover:gap-5 pb-1 transition-all">
              Register as Individual <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="group bg-[oklch(0.22_0.10_300)] p-8 md:p-12 relative">
            <span className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.25em] uppercase text-primary border border-primary/60 px-2 py-1">Min · 7</span>
            <p className="font-mono text-xs tracking-widest text-primary">B.</p>
            <h3 className="mt-4 font-serif text-4xl md:text-5xl">Delegation</h3>
            <p className="mt-4 text-foreground/70 leading-relaxed">Bring your crew. Seven members minimum. Compete together. Win together. The ₹10,000 cash prize is built for you.</p>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-foreground border-b border-primary pb-1 group-hover:gap-5 transition-all">
              Register as Delegation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-10 font-mono text-xs tracking-[0.25em] uppercase text-foreground/60">
          Deadline · 19 . 07 . 2026 · 12:00 PM IST
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[oklch(0.13_0.08_300)] border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionNumber n="008" label="Reach Out" />
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl">
          Questions? <span className="italic text-primary">Call us.</span>
        </h2>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {HEADS.map((h) => (
            <a key={h.name} href={`tel:${h.phone.replace(/\s/g, "")}`} className="group bg-background p-7 flex items-center justify-between hover:bg-secondary/40 transition-colors">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary">{h.n} · Event Head</p>
                <p className="mt-2 font-serif text-2xl">{h.name}</p>
                <p className="mt-1 font-mono text-sm text-foreground/60">{h.phone}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.11_0.07_300)] py-14 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 grid md:grid-cols-3 gap-10 items-start">
        <div className="flex items-center gap-4">
          <img src={logoAsset.url} alt="DOC MUN Society" className="h-14 w-14 rounded-full ring-1 ring-primary/40" />
          <div>
            <p className="font-display tracking-wider text-primary text-lg">DOC MUN SOCIETY</p>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/60 mt-1">Department of Commerce</p>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50 mb-4">Sections</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm text-foreground/70">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-primary transition-colors">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50 mb-4">Edition</p>
          <p className="font-serif italic text-2xl text-foreground">Intra MUN / 2026</p>
          <p className="mt-2 font-mono text-xs tracking-widest uppercase text-foreground/60">20–21 July · Bengaluru</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground/70 hover:text-primary">
            <Instagram className="h-4 w-4" /> @docmunsoc
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 mt-14 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/50">
        <span>© 2026 DOC MUN Society</span>
        <span>All rights reserved · Designed with diplomacy</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full max-w-[100vw]" style={{ fontFamily: "var(--font-sans)" }}>
      <style>{`
        html{scroll-behavior:smooth}
        body{font-feature-settings:"ss01","cv11";letter-spacing:-0.005em}
        .font-display{font-family:var(--font-display)}
        .font-serif{font-family:var(--font-serif)}
        .font-mono{font-family:var(--font-mono)}
        @keyframes kenburns{0%{transform:scale(1.1) translate3d(0,0,0)}100%{transform:scale(1.18) translate3d(-1%,-2%,0)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        main section:not(#top):not(#committees){opacity:0;transform:translateY(28px);transition:opacity 1s cubic-bezier(.22,.61,.36,1),transform 1s cubic-bezier(.22,.61,.36,1)}
        main section:not(#top):not(#committees).in-view{opacity:1;transform:none}
        section#top,section#committees{opacity:1;transform:none}
        h2,h3,p,article,a,div[class*="grid"]>*{transition:transform .5s ease,color .35s ease,background-color .35s ease,border-color .35s ease,opacity .5s ease}
        a:hover{letter-spacing:.005em}
        img{transition:transform .8s cubic-bezier(.22,.61,.36,1),filter .6s ease}
      `}</style>
      <TopBar />
      <main>
        <Hero />
        <Marquee />
        <Society />
        <WhatIsMun />
        <Committees />
        <Board />
        <Process />
        <LegacyVideo />
        <Register />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  );
}

function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("main section");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
