import commUnsc from "@/assets/comm-unsc.jpg";
import commUnhrc from "@/assets/comm-unhrc.jpg";
import commAippm from "@/assets/comm-loksabha.jpg";
import commIpc from "@/assets/comm-media.jpg";
import commEcosoc from "@/assets/comm-ecosoc.jpg";
import unscIntroAudio from "@/assets/unsc-intro.mp3.asset.json";
import unhrcIntroAudio from "@/assets/unhrc-intro.mp3.asset.json";
import aippmIntroAudio from "@/assets/aippm-intro.mp3.asset.json";
import ipjIntroAudio from "@/assets/ipj-intro.mp3.asset.json";
import ippIntroAudio from "@/assets/ipp-intro.mp3.asset.json";
import ecosocIntroAudio from "@/assets/ecosoc-intro.mp3.asset.json";

export type CommitteeSlug = "unsc" | "unhrc" | "aippm" | "ipc" | "ecosoc";

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
  tracks?: {
    code: string;
    name: string;
    blurb: string;
    intro?: { audioUrl: string; segments: string[] };
  }[];
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
    intro: {
      audioUrl: unhrcIntroAudio.url,
      segments: [
        "Welcome to the United Nations Human Rights Council—",
        "the moral compass of the international community",
        "and the beating conscience of our Model UN.",
        "Here, the veil of state sovereignty is drawn back",
        "to confront the most profound injustices of our time,",
        "tasking member states with investigating systemic abuses",
        "and drafting universal resolutions",
        "that protect the vulnerable and condemn the oppressor.",
        "This is a diplomatic battleground not of military might,",
        "but of truth and accountability,",
        "where the defense of human dignity",
        "often clashes directly with political ambition.",
        "Standing alongside the voting bloc are the observer nations—",
        "vital voices from the periphery who, while without a formal vote,",
        "shine a relentless spotlight on hidden atrocities,",
        "command the floor with critical testimonies,",
        "and lobby fiercely to hold the council to its highest ideals.",
        "As the stories of the silenced echo through this chamber,",
        "voting powers and observers alike",
        "must navigate a sweeping symphony of advocacy and statecraft—",
        "because here, you are not simply defending borders;",
        "you are defending humanity itself.",
      ],
    },
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
    intro: {
      audioUrl: aippmIntroAudio.url,
      segments: [
        "Welcome to the All India Political Parties Meet—",
        "the ideological crucible of the world's largest democracy",
        "and the defining national stage of our Model UN.",
        "In this vibrant chamber,",
        "the rigid bounds of standard parliamentary procedure",
        "give way to the raw, unyielding clash of political doctrine,",
        "tasking leaders from the ruling bloc and the opposition",
        "with forging consensus on the nation's most critical internal crises.",
        "This is a profound test of statecraft",
        "where national interests collide with regional demands,",
        "and where sweeping policy decisions",
        "must be negotiated across deep partisan divides.",
        "Adding to this complex tapestry",
        "are the independent observers and regional representatives—",
        "vital voices from the periphery who wield the immense power",
        "to sway the public narrative,",
        "broker crucial alliances,",
        "and hold the major coalitions accountable.",
        "As the weight of a billion voices echoes through the room,",
        "you must navigate a soaring symphony of debate, strategy, and coalition-building,",
        "knowing that the destiny of the republic",
        "rests entirely on your ability to unite a fractured political landscape.",
      ],
    },
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
      {
        code: "IPP",
        name: "International Press Photography",
        blurb: "Capture the moment a resolution dies. The handshake. The walkout. Visual record of the floor.",
        intro: {
          audioUrl: ippIntroAudio.url,
          segments: [
            "Welcome to the International Press Corps—",
            "the unseen observers of global diplomacy",
            "and the visual historians of our Model UN.",
            "While the council chambers echo with sweeping speeches and political maneuvering,",
            "the truest story is often found in the silent moments that words cannot capture:",
            "the tension of a whispered alliance in a hallway,",
            "the exhaustion of a deadlocked debate,",
            "and the raw emotion of a final, historic vote.",
            "As a photojournalist,",
            "you are tasked with freezing these fleeting moments in time,",
            "cutting through the carefully crafted diplomatic facades",
            "to reveal the unvarnished human reality of the conference.",
            "Armed with your lens,",
            "you command the profound power to frame the narrative without uttering a single word,",
            "capturing the defining images that will stand",
            "as the ultimate, undeniable record of our shared history.",
            "Step into the corridors of power,",
            "for the world is waiting to see the truth through your eyes.",
          ],
        },
      },
      {
        code: "IPJ",
        name: "International Press Journalism",
        blurb: "Editorials, op-eds, breaking bulletins. File copy on deadline. Hold the dais to account.",
        intro: {
          audioUrl: ipjIntroAudio.url,
          segments: [
            "Welcome to the International Press Corps—",
            "the relentless watchdogs of global diplomacy",
            "and the narrative engine of our Model UN.",
            "While delegates maneuver for power behind closed doors",
            "and draft the policies of tomorrow,",
            "it is the journalists who hold them to the absolute truth.",
            "In this dynamic arena,",
            "you are armed not with votes or vetoes,",
            "but with the profound power of the written word—",
            "tasked with investigating hidden agendas,",
            "conducting high-stakes interviews,",
            "and publishing the breaking reports",
            "that can instantly shift the balance of power across every committee.",
            "You are the vital link between the secret corridors of statecraft and the public eye,",
            "wielding the authority to expose hypocrisy,",
            "elevate the unheard,",
            "and shape the definitive history of this conference as it unfolds.",
            "In a world driven by perception,",
            "your questions are your weapons,",
            "and your stories will dictate the legacy of every leader.",
          ],
        },
      },
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
  {
    slug: "ecosoc",
    n: "05",
    name: "ECOSOC",
    fullForm: "Economic and Social Council",
    tag: "Progress, prosperity, policy.",
    description:
      "The ECOSOC is the architect of global progress — shaping economic, social, and environmental policy. It bridges divides between developed and developing nations and designs the blueprint of human prosperity.",
    agenda: "TBA",
    board: "TBA",
    img: commEcosoc,
    intro: {
      audioUrl: ecosocIntroAudio.url,
      segments: [
        "Welcome to the Economic and Social Council—",
        "the architect of global progress",
        "and the foundational pillar of our Model UN.",
        "In this sweeping chamber,",
        "the world's most intricate and interconnected challenges—",
        "from sudden economic collapse to sustainable development and global health—",
        "converge on a single diplomatic stage.",
        "As voting delegates,",
        "your mandate is to look beyond immediate conflict",
        "and forge the comprehensive financial and social frameworks",
        "that bridge the deep divides between emerging and developed economies.",
        "Enriching this complex tapestry are the observer nations;",
        "though they sit without a formal vote,",
        "they act as the vital conscience of the international community,",
        "wielding the quiet power to inject unique regional realities into the debate,",
        "shape crucial economic coalitions,",
        "and steer the allocation of global resources from the periphery.",
        "Together, as you navigate a soaring symphony of economic diplomacy and humanitarian foresight,",
        "you carry the profound responsibility of designing the very blueprint of human prosperity,",
        "ensuring that no nation is left behind",
        "in the march toward a secure future.",
      ],
    },
    portfolios: [
      "United States", "United Kingdom", "France", "Germany",
      "Japan", "India", "Brazil", "China",
      "Saudi Arabia", "South Africa", "Argentina", "Bangladesh",
    ].map(country),
  },
];


export function getCommittee(slug: string): Committee | undefined {
  return COMMITTEES.find((c) => c.slug === slug);
}

export function getPortfolio(committee: Committee, portfolioSlug: string): Portfolio | undefined {
  return committee.portfolios.find((p) => p.slug === portfolioSlug);
}

export const INSTAGRAM_URL = "https://www.instagram.com/docmunsoc/";