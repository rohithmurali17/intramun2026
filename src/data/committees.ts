import commUnsc from "@/assets/comm-unsc.jpg";
import commUnhrc from "@/assets/comm-unhrc.jpg";
import commAippm from "@/assets/comm-loksabha.jpg";
import commIpc from "@/assets/comm-media.jpg";
import unscIntroAudio from "@/assets/unsc-intro.mp3.asset.json";
import unhrcIntroAudio from "@/assets/unhrc-intro.mp3.asset.json";
import aippmIntroAudio from "@/assets/aippm-intro.mp3.asset.json";
import ipjIntroAudio from "@/assets/ipj-intro.mp3.asset.json";
import ippIntroAudio from "@/assets/ipp-intro.mp3.asset.json";
import ebUnscAdithya from "@/assets/eb-unsc-adithya.jpeg.asset.json";
import ebUnscSunaada from "@/assets/eb-unsc-sunaada.jpeg.asset.json";
import ebUnscRohith from "@/assets/eb-unsc-rohith.jpeg.asset.json";
import ebUnhrcVarna from "@/assets/eb-unhrc-varna.jpeg.asset.json";
import ebUnhrcJay from "@/assets/eb-unhrc-jay.jpeg.asset.json";
import ebUnhrcDhruv from "@/assets/eb-unhrc-dhruv.jpeg.asset.json";
import ebAippmShakeib from "@/assets/eb-aippm-shakeib.jpeg.asset.json";
import ebAippmAdharsh from "@/assets/eb-aippm-adharsh.jpeg.asset.json";
import ebAippmRamkumar from "@/assets/eb-aippm-ramkumar.jpeg.asset.json";

export type CommitteeSlug = "unsc" | "unhrc" | "aippm" | "ipc";

export type Portfolio = {
  slug: string;
  name: string;
  role?: string;
  position: string;
  flagCode?: string;
  groupStart?: string;
  party?: string;
  state?: string;
  flagUrl?: string;
  bgColor?: string;
  badge?: string;
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
  eb?: {
    name: string;
    role: string;
    photoUrl: string;
    writeUp: string;
  }[];
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
    agenda: "Deliberating on the complexities concerning Iran's Nuclear enrichment program and its Implications for International Peace and Security",
    board: "Adithya Krishna · Sunaada S Acharya · Rohith M",
    img: commUnsc,
    eb: [
      {
        name: "Adithya Krishna",
        role: "Chairperson",
        photoUrl: ebUnscAdithya.url,
        writeUp: "Never leave a rose garden without blood on your hands.",
      },
      {
        name: "Sunaada S Acharya",
        role: "Vice Chairperson",
        photoUrl: ebUnscSunaada.url,
        writeUp:
          "स्थितप्रज्ञस्य का भाषा समाधिस्थस्य केशव | स्थितधी: किं प्रभाषेत किमासीत व्रजेत किम्\n\nA dedicated cricketer and passionate follower of Formula 1, Sunaada discovered Model UN after stepping into his undergraduation. Initially finding his footing in the circuit, he soon carved out his space, winning at prestigious conferences like CUBS, BMSCE, Future MUN and many more within just one year. He served as Charge de Affaires of JIGYASA 4.0 and is one of the core secretariat members of the JU MUN Society for academic year 2026-27. Now, as an Executive Board member, he is eager to foster a sharp and engaging committee. He is a keen observer of global geopolitics and is always ready for the next learning opportunity. Presenting Sunaada S Acharya, Vice Chairperson UNSC.",
      },
      {
        name: "Rohith M",
        role: "Moderator",
        photoUrl: ebUnscRohith.url,
        writeUp: "Play The Perfect Courtier.",
      },
    ],
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
    portfolios: (
      [
        // Permanent Members (P5)
        ["United States of America", "us", "P5", "Permanent Members"],
        ["United Kingdom of Great Britain and Northern Ireland", "gb", "P5"],
        ["French Republic", "fr", "P5"],
        ["Russian Federation", "ru", "P5"],
        ["People's Republic of China", "cn", "P5"],
        // Non-Permanent Members (NP10)
        ["Kingdom of Bahrain", "bh", "Non-Permanent Member", "Non-Permanent Members"],
        ["Republic of Colombia", "co", "Non-Permanent Member"],
        ["Democratic Republic of the Congo", "cd", "Non-Permanent Member"],
        ["Kingdom of Denmark", "dk", "Non-Permanent Member"],
        ["Hellenic Republic", "gr", "Non-Permanent Member"],
        ["Republic of Latvia", "lv", "Non-Permanent Member"],
        ["Republic of Liberia", "lr", "Non-Permanent Member"],
        ["Islamic Republic of Pakistan", "pk", "Non-Permanent Member"],
        ["Republic of Panama", "pa", "Non-Permanent Member"],
        ["Federal Republic of Somalia", "so", "Non-Permanent Member"],
        // Observer Nations
        ["Islamic Republic of Iran", "ir", "Observer", "Observer Nations"],
        ["State of Israel", "il", "Observer"],
        ["Kingdom of Saudi Arabia", "sa", "Observer"],
        ["United Arab Emirates", "ae", "Observer"],
        ["Federal Republic of Germany", "de", "Observer"],
        ["State of Qatar", "qa", "Observer"],
        ["Republic of Türkiye", "tr", "Observer"],
        ["Republic of Iraq", "iq", "Observer"],
        ["Republic of India", "in", "Observer"],
        ["Japan", "jp", "Observer"],
      ] as [string, string, string, string?][]
    ).map(([name, code, role, groupStart]): Portfolio => ({
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      name,
      role,
      position: placeholder(name),
      flagCode: code,
      groupStart,
    })),
  },
  {
    slug: "unhrc",
    n: "02",
    name: "UNHRC",
    fullForm: "United Nations Human Rights Council",
    tag: "Human rights, weaponised.",
    description:
      "The UNHRC investigates, condemns, and recommends — turning testimony into doctrine. Forty-seven members, one mandate: hold states accountable to the rights they swore to protect.",
    agenda: "Addressing the Ongoing State Affairs In Sudan, including Allegations of Genocide and Systemically Induced Starvation.",
    board: "Varna V Hegde · Jay Krishna · Dhruv S. Dali",
    img: commUnhrc,
    eb: [
      {
        name: "Varna V Hegde",
        role: "Chairperson",
        photoUrl: ebUnhrcVarna.url,
        writeUp:
          "A fourth-year BA Psychology student at JAIN (Deemed-to-be University), Varna V Hegde has been active in the MUN circuit for over three years, earning multiple awards across conferences in Bangalore and appearing most frequently in UNHRC committees. With a strong interest in psychology, she values clarity, balance, and substance in committee discussions.",
      },
      {
        name: "Jay Krishna",
        role: "Co-Vice Chairperson",
        photoUrl: ebUnhrcJay.url,
        writeUp:
          "Jay is a thorough researcher whose insatiable thirst for knowledge guides him through his MUN journey. Pouring hours and hours into the most niche topics just to satisfy his quench for knowing more makes him a capable opponent for anyone who seeks to challenge his ideas. With a passion for perfection in all work he partakes in, Jay has exemplified the \"Let's get it done\" spirit. Stepping onto the Executive Board as the Vice-Chairperson of UNHRC, he brings a demeanour that combines authority with approachability to ensure a committee that thrives on both discipline and diplomacy.",
      },
      {
        name: "Dhruv Sujayendra Dali",
        role: "Co-Vice Chairperson",
        photoUrl: ebUnhrcDhruv.url,
        writeUp:
          "Dhruv S. Dali is an enthusiastic and diplomatic student at Christ University, possessing deep and nuanced knowledge of geopolitics. Guided by the principle, \"A wrathful man stirreth up strife: but he that is slow to anger appeaseth strife,\" he approaches deliberation with composure, balance, and emotional maturity. His temperament and expertise enable him to facilitate structured, respectful, and solution-oriented debate, making him a strong and reliable candidate for the position of Vice Chairperson.",
      },
    ],
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
      // Member Nations
      ["Republic of Angola", "ao"], ["Republic of Benin", "bj"], ["Republic of Burundi", "bi"],
      ["Republic of Côte d'Ivoire", "ci"], ["Democratic Republic of the Congo", "cd"],
      ["Arab Republic of Egypt", "eg"], ["Federal Democratic Republic of Ethiopia", "et"],
      ["Republic of the Gambia", "gm"], ["Republic of Ghana", "gh"], ["Republic of Kenya", "ke"],
      ["Republic of Malawi", "mw"], ["Republic of Mauritius", "mu"], ["Republic of South Africa", "za"],
      ["People's Republic of China", "cn"], ["Republic of Cyprus", "cy"], ["Republic of India", "in"],
      ["Republic of Indonesia", "id"], ["Republic of Iraq", "iq"], ["Japan", "jp"],
      ["State of Kuwait", "kw"], ["Republic of the Marshall Islands", "mh"],
      ["Islamic Republic of Pakistan", "pk"], ["State of Qatar", "qa"], ["Republic of Korea", "kr"],
      ["Kingdom of Thailand", "th"], ["Socialist Republic of Viet Nam", "vn"],
      ["Republic of Albania", "al"], ["Republic of Bulgaria", "bg"], ["Czech Republic", "cz"],
      ["Republic of Estonia", "ee"], ["Republic of North Macedonia", "mk"], ["Republic of Slovenia", "si"],
      ["Plurinational State of Bolivia", "bo"], ["Federative Republic of Brazil", "br"],
      ["Republic of Cuba", "cu"], ["Dominican Republic", "do"], ["Republic of Ecuador", "ec"],
      ["United Mexican States", "mx"], ["French Republic", "fr"], ["Republic of Iceland", "is"],
      ["Italian Republic", "it"], ["Kingdom of the Netherlands", "nl"], ["Kingdom of Spain", "es"],
      ["Swiss Confederation", "ch"], ["United Kingdom of Great Britain and Northern Ireland", "gb"],
      // Observer Nations
      ["Republic of the Sudan", "sd"], ["Republic of South Sudan", "ss"], ["Republic of Chad", "td"],
      ["Central African Republic", "cf"], ["State of Libya", "ly"], ["State of Eritrea", "er"],
      ["United Arab Emirates", "ae"], ["Kingdom of Saudi Arabia", "sa"], ["Russian Federation", "ru"],
      ["Islamic Republic of Iran", "ir"], ["Republic of Türkiye", "tr"], ["United States of America", "us"],
    ].map(([name, code], idx): Portfolio => ({
      slug: (name as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      name: name as string,
      role: idx < 45 ? "Member Nation" : "Observer Nation",
      position: placeholder(name as string),
      flagCode: code as string,
      groupStart: idx === 0 ? "Member Nations" : idx === 45 ? "Observer Nations" : undefined,
    })),
  },
  {
    slug: "aippm",
    n: "03",
    name: "AIPPM",
    fullForm: "All India Political Parties Meet",
    tag: "The Republic, in the same room.",
    description:
      "AIPPM brings every major Indian political party to a single table — to debate the most consequential domestic questions of the day. No diplomacy. Just politics, sharpened.",
    agenda: "Discussion on Center - State relations and Federalism (Article 356's misuse, Governors Role).",
    board: "Shakeib · Adharsh Arjun · Ramkumar K S",
    img: commAippm,
    eb: [
      {
        name: "Shakeib",
        role: "Moderator",
        photoUrl: ebAippmShakeib.url,
        writeUp: "Hey! I am Shakaib. The circuit knows the rest.",
      },
      {
        name: "Adharsh Arjun",
        role: "Deputy Moderator",
        photoUrl: ebAippmAdharsh.url,
        writeUp:
          "Adharsh Arjun B, an ACCA student at Christ University, finds his spark in the world of Indian politics and law. Ever since he stepped into MUNs in his first year, he's been drawn to the beauty of polarized minds sharing one room and challenging each other's ideas. To him, an AIPPM delegate isn't just a role, it's a glimpse of what a better, more thoughtful politician could be and that's where real learning begins.",
      },
      {
        name: "Ramkumar K S",
        role: "Scribe",
        photoUrl: ebAippmRamkumar.url,
        writeUp:
          "\"Debate in a democracy is not just about confrontation; it is the ultimate tool for consensus and progress.\"\n\nRamkumar KS is a B.Com student at Christ University, driven by a deep curiosity about the mechanisms that shape our society. He possesses a keen interest in geopolitics, public policy, economics, and local governance, constantly analyzing how macroeconomic trends and legislative decisions impact community development. Beyond his academic pursuits, Ramkumar is committed to personal growth and self-discipline, consistently seeking avenues to sharpen his analytical and leadership skills. He embraces challenges with a solution-oriented mindset, believing that a strong foundation in economic principles and parliamentary thought is key to driving meaningful change. With a natural drive for innovation, a focus on team-building, and strong decision-making abilities, he aims to channel his diverse knowledge into impactful future ventures.",
      },
    ],
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
    portfolios: ((): Portfolio[] => {
      const rows: { name: string; state: string; party: string; alliance: "NDA" | "INDIA" | "Unaligned/Other"; position: string }[] = [
        { name: "Narendra Modi", state: "Uttar Pradesh", party: "BJP", alliance: "NDA", position: "Prime Minister" },
        { name: "Amit Shah", state: "Gujarat", party: "BJP", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Rajnath Singh", state: "Uttar Pradesh", party: "BJP", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Nitin Jairam Gadkari", state: "Maharashtra", party: "BJP", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Shivraj Singh Chouhan", state: "Madhya Pradesh", party: "BJP", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Manohar Lal Khattar", state: "Haryana", party: "BJP", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "H.D. Kumaraswamy", state: "Karnataka", party: "Janata Dal (Secular)", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Dharmendra Pradhan", state: "Odisha", party: "BJP", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Rajiv Ranjan Singh", state: "Bihar", party: "Janata Dal (United)", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Kinjarapu Rammohan Naidu", state: "Andhra Pradesh", party: "Telugu Desam Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Pralhad Joshi", state: "Karnataka", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Giriraj Singh", state: "Bihar", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Jyotiraditya M Scindia", state: "Madhya Pradesh", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Gajendra Singh Shekhawat", state: "Rajasthan", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Annpurna Devi", state: "Jharkhand", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Kiren Rijiju", state: "Arunachal Pradesh", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "G Kishan Reddy", state: "Telangana", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Chirag Paswan", state: "Bihar", party: "Lok Janshakti Party (Ram Vilas)", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Bhupender Yadav", state: "Rajasthan", party: "Bharatiya Janata Party", alliance: "NDA", position: "Union Cabinet Minister" },
        { name: "Basavaraj Bommai", state: "Karnataka", party: "Bharatiya Janata Party", alliance: "NDA", position: "Member of Parliament" },
        { name: "Tejasvi Surya", state: "Karnataka", party: "Bharatiya Janata Party", alliance: "NDA", position: "Member of Parliament" },
        { name: "Anupriya Patel", state: "Uttar Pradesh", party: "Apna Dal (Soneylal)", alliance: "NDA", position: "Minister of State" },
        { name: "Sukanta Majumdar", state: "West Bengal", party: "Bharatiya Janata Party", alliance: "NDA", position: "Minister of State" },
        { name: "Pankaj Choudhary", state: "Uttar Pradesh", party: "Bharatiya Janata Party", alliance: "NDA", position: "Minister of State" },
        { name: "Chandra Sekhar Pemmasani", state: "Andhra Pradesh", party: "Telugu Desam Party", alliance: "NDA", position: "Minister of State" },
        { name: "Rahul Gandhi", state: "Uttar Pradesh", party: "Indian National Congress", alliance: "INDIA", position: "Leader of Opposition" },
        { name: "Aashtikar Patil Nagesh Bapurao", state: "Maharashtra", party: "Shiv Sena (Uddhav Balasaheb Thackeray)", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Abhay Kumar Sinha", state: "Bihar", party: "Rashtriya Janata Dal", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Abhishek Banerjee", state: "West Bengal", party: "All India Trinamool Congress", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Kodikunnil Suresh", state: "Kerala", party: "Indian National Congress", alliance: "INDIA", position: "Member of Parliament" },
        { name: "T.R. Baalu", state: "Tamil Nadu", party: "DMK", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Sudip Bandyopadhyay", state: "West Bengal", party: "All India Trinamool Congress", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Kanimozhi Karunanidhi", state: "Tamil Nadu", party: "DMK", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Gaurav Gogoi", state: "Assam", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Manish Tewari", state: "Chandigarh", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "K.C. Venugopal", state: "Kerala", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Supriya Sule", state: "Maharashtra", party: "NCP", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Priyanka Gandhi", state: "Kerala", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "D.K. Shivakumar", state: "Karnataka", party: "INC", alliance: "INDIA", position: "Member of Legislative Assembly" },
        { name: "Alfred Kanngam S. Arthur", state: "Manipur", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Angomcha Bimol Akoijam", state: "Manipur", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "S. Supongmeren Jamir", state: "Assam", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Saleng A. Sangma", state: "Meghalaya", party: "INC", alliance: "INDIA", position: "Member of Parliament" },
        { name: "Asaduddin Owaisi", state: "Telangana", party: "All India Majlis-E-Ittehadul Muslimeen", alliance: "Unaligned/Other", position: "Member of Parliament" },
      ];
      const partyFlag: Record<string, string> = {
        // Verified via Commons Special:FilePath (redirects to a cache-friendly URL).
        "BJP": "https://commons.wikimedia.org/wiki/Special:FilePath/Logo%20of%20the%20Bharatiya%20Janata%20Party.svg?width=640",
        "Bharatiya Janata Party": "https://commons.wikimedia.org/wiki/Special:FilePath/Logo%20of%20the%20Bharatiya%20Janata%20Party.svg?width=640",
        "Indian National Congress": "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20National%20Congress%20hand%20logo.svg?width=640",
        "INC": "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20National%20Congress%20hand%20logo.svg?width=640",
        "Janata Dal (United)": "https://commons.wikimedia.org/wiki/Special:FilePath/Janata%20Dal%20%28United%29%20Flag.svg?width=640",
        "Janata Dal (Secular)": "https://commons.wikimedia.org/wiki/Special:FilePath/Janata%20Dal%20%28Secular%29%20flag%20%281%29.svg?width=640",
        "Shiv Sena (Uddhav Balasaheb Thackeray)": "https://commons.wikimedia.org/wiki/Special:FilePath/Shiv%20Sena%20%28UBT%29%20Logo.png?width=640",
        "Rashtriya Janata Dal": "https://commons.wikimedia.org/wiki/Special:FilePath/RJD%20Flag.svg?width=640",
        "All India Trinamool Congress": "https://commons.wikimedia.org/wiki/Special:FilePath/All%20India%20Trinamool%20Congress%20flag%20%282%29.svg?width=640",
        "NCP": "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Nationalist%20Congress%20Party.svg?width=640",
      };
      // Parties without a hotlink-friendly image: fall back to a party-colored gradient.
      const partyColor: Record<string, { color: string; badge: string }> = {
        "Telugu Desam Party": { color: "#f7c722", badge: "TDP" },
        "TDP": { color: "#f7c722", badge: "TDP" },
        "Lok Janshakti Party (Ram Vilas)": { color: "#0a4d8c", badge: "LJP(RV)" },
        "Apna Dal (Soneylal)": { color: "#c9a24b", badge: "AD(S)" },
        "DMK": { color: "#e2231a", badge: "DMK" },
        "All India Majlis-E-Ittehadul Muslimeen": { color: "#0a7a3b", badge: "AIMIM" },
      };
      let currentAlliance = "";
      return rows.map((r) => {
        const groupStart = r.alliance !== currentAlliance ? r.alliance : undefined;
        currentAlliance = r.alliance;
        const fallback = partyColor[r.party];
        return {
          slug: r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: r.name,
          role: r.position,
          position: placeholder(r.name),
          party: r.party,
          state: r.state,
          flagUrl: partyFlag[r.party],
          bgColor: fallback?.color,
          badge: fallback?.badge,
          groupStart,
        };
      });
    })(),
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
    portfolios: [],
  },
];


export function getCommittee(slug: string): Committee | undefined {
  return COMMITTEES.find((c) => c.slug === slug);
}

export function getPortfolio(committee: Committee, portfolioSlug: string): Portfolio | undefined {
  return committee.portfolios.find((p) => p.slug === portfolioSlug);
}

export const INSTAGRAM_URL = "https://www.instagram.com/docmunsoc/";