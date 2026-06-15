import commUnsc from "@/assets/comm-unsc.jpg";
import commUnhrc from "@/assets/comm-unhrc.jpg";
import commAippm from "@/assets/comm-loksabha.jpg";
import commIpc from "@/assets/comm-media.jpg";
import unscIntroAudio from "@/assets/unsc-intro.mp3.asset.json";

export type CommitteeSlug = "unsc" | "unhrc" | "aippm" | "ipc";

export type Portfolio = {
  slug: string;
  name: string;
  role?: string;
  position: string;
};

export type Committee = {
  slug: CommitteeSlug;
  n: string;
  name: string;
  fullForm: string;
  tag: string;
  description: string;
  agenda: string;
  board: string;
  guideUrl?: string;
  img: string;
  tracks?: { code: string; name: string; blurb: string }[];
  portfolios: Portfolio[];
  intro?: {
    audioUrl: string;
    segments: string[];
  };
};

const placeholder = (name: string) =>
  `${name}'s position on the agenda is being finalised by the Executive Board. Detailed portfolio matrix, foreign policy stance, and historical context will be published with the official background guide.`;

const country = (name: string): Portfolio => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name,
  position: placeholder(name),
});

export const COMMITTEES: Committee[] = [
  {
    slug: "unsc",
    n: "01",
    name: "UNSC",
    fullForm: "United Nations Security Council",
    tag: "Peace and security. Veto power. No veto on voice.",
    description:
      "The UNSC is the most powerful organ of the United Nations — charged with maintaining international peace and security. Fifteen seats. Five permanent members with the veto. Every word on the record.",
    agenda: "TBA",
    board: "TBA",
    img: commUnsc,
    intro: {
      audioUrl: unscIntroAudio.url,
      segments: [
        "Welcome to the United Nations Security Council—",
        "the highest echelon of international diplomacy",
        "and the defining theater of our Model UN.",
        "In this chamber, fifteen voting nations are tasked with the ultimate mandate:",
        "confronting imminent threats to global stability",
        "and forging binding resolutions that carry the force of international law—",
        "a delicate machinery of peace",
        "constantly balanced against the absolute power of the veto.",
        "Sharpening this tension are the observer nations;",
        "though they sit without a vote,",
        "they wield the quiet, formidable power of global conscience,",
        "using their voice to shape the narrative,",
        "build coalitions,",
        "and alter the strategy of the fifteen from the periphery.",
        "Together, as crises unfold in real-time,",
        "voting powers and observer nations alike",
        "must navigate a sweeping symphony of statecraft,",
        "knowing that in this room,",
        "the fragile line between order and chaos",
        "rests entirely in your hands.",
      ],
    },
    portfolios: [
      "United States", "Russia", "China", "United Kingdom", "France",
      "India", "Brazil", "Japan", "Germany", "South Africa",
      "United Arab Emirates", "Mexico",
    ].map(country),
  },
  {
    slug: "unhrc",
    n: "02",
    name: "UNHRC",
    fullForm: "United Nations Human Rights Council",
    tag: "Human rights, weaponised.",
    description:
      "The UNHRC investigates, condemns, and recommends — turning testimony into doctrine. Forty-seven members, one mandate: hold states accountable to the rights they swore to protect.",
    agenda: "TBA",
    board: "TBA",
    img: commUnhrc,
    portfolios: [
      "United States", "China", "India", "Pakistan", "Saudi Arabia",
      "Iran", "Israel", "Germany", "France", "United Kingdom",
      "Brazil", "Qatar",
    ].map(country),
  },
  {
    slug: "aippm",
    n: "03",
    name: "AIPPM",
    fullForm: "All India Political Parties Meet",
    tag: "The Republic, in the same room.",
    description:
      "AIPPM brings every major Indian political party to a single table — to debate the most consequential domestic questions of the day. No diplomacy. Just politics, sharpened.",
    agenda: "TBA",
    board: "TBA",
    img: commAippm,
    portfolios: [
      "Bharatiya Janata Party", "Indian National Congress", "Aam Aadmi Party",
      "Dravida Munnetra Kazhagam", "All India Trinamool Congress",
      "Samajwadi Party", "Communist Party of India (Marxist)",
      "Rashtriya Janata Dal", "Shiv Sena (UBT)", "Janata Dal (United)",
      "Telugu Desam Party", "Nationalist Congress Party",
    ].map(country),
  },
  {
    slug: "ipc",
    n: "04",
    name: "IPC",
    fullForm: "International Press Corps",
    tag: "Camera & Journalism. Frame it. File it. Own it.",
    description:
      "The IPC is the lens and the pen of the conference. Photographers chase the frame; journalists chase the story. Two tracks, one newsroom, every committee under watch.",
    agenda: "Live coverage of all four committees",
    board: "TBA",
    img: commIpc,
    tracks: [
      { code: "IPP", name: "International Press Photography", blurb: "Capture the moment a resolution dies. The handshake. The walkout. Visual record of the floor." },
      { code: "IPJ", name: "International Press Journalism", blurb: "Editorials, op-eds, breaking bulletins. File copy on deadline. Hold the dais to account." },
    ],
    portfolios: [
      { slug: "reuters", name: "Reuters", role: "Wire Service", position: placeholder("Reuters") },
      { slug: "ap", name: "Associated Press", role: "Wire Service", position: placeholder("Associated Press") },
      { slug: "bbc", name: "BBC News", role: "Broadcast", position: placeholder("BBC News") },
      { slug: "al-jazeera", name: "Al Jazeera", role: "Broadcast", position: placeholder("Al Jazeera") },
      { slug: "the-hindu", name: "The Hindu", role: "Print", position: placeholder("The Hindu") },
      { slug: "the-indian-express", name: "The Indian Express", role: "Print", position: placeholder("The Indian Express") },
      { slug: "new-york-times", name: "The New York Times", role: "Print", position: placeholder("The New York Times") },
      { slug: "magnum", name: "Magnum Photos", role: "Photography", position: placeholder("Magnum Photos") },
      { slug: "getty", name: "Getty Images", role: "Photography", position: placeholder("Getty Images") },
      { slug: "afp-photo", name: "AFP Photo", role: "Photography", position: placeholder("AFP Photo") },
    ],
  },
];

export function getCommittee(slug: string): Committee | undefined {
  return COMMITTEES.find((c) => c.slug === slug);
}

export function getPortfolio(committee: Committee, portfolioSlug: string): Portfolio | undefined {
  return committee.portfolios.find((p) => p.slug === portfolioSlug);
}

export const INSTAGRAM_URL = "https://www.instagram.com/docmunsoc/";