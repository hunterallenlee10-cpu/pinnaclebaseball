export type Coach = {
  slug: string;
  name: string;
  role: string;
  portrait: { src: string; alt: string; width: number; height: number } | null;
  bio: string[];
};

export const stowe = {
  name: "Chris Stowe",
  role: "Founder & Head Instructor",
  position: "RHP",
  hometown: "Fredericksburg, Virginia",
  highSchool: "Chancellor High School",
  draft: {
    team: "Montreal Expos",
    year: 1997,
    round: "1st Round",
    pick: "#37",
  },
  /** Stat line when drafted, exactly as published on the original site. */
  draftStats: [
    { label: "Age", value: "18" },
    { label: "Height", value: "6'3\"" },
    { label: "Weight", value: "175" },
    { label: "K / IP", value: "345/250" },
    { label: "W-L", value: "33-4" },
    { label: "Career ERA", value: "0.94" },
  ],
  feats: [
    "3 no-hitters in high school",
    "2 perfect games in American Legion",
    "No hits allowed until his 3rd start as a senior",
    "No losing decisions after his first start as a sophomore",
  ],
  honors: [
    "First Team All-District",
    "All-State",
    "All-Metropolitan",
    "All-American",
    "1997 District Player of the Year",
    "1997 Metropolitan Player of the Year",
  ],
  scoutQuote: {
    text: "He is one of the most polished high school pitchers I have ever seen. He has a very high ceiling. His mechanics are clean and there are not too many glitches.",
    author: "Mark Leavitt",
    role: "Montreal Expos Scout",
  },
  peakQuote:
    "I believe every player has a peak ability, unfortunately most players never find it. My job will always be to place the players that I work with on the right path, so they can find their true ability and peak.",
  passionQuote:
    "The passion I carried as a player has continued as an instructor; I am excited to continue to positively impact the players that I coach.",
  bio: [
    "Chris was born in Fredericksburg, Virginia, where he began playing organized baseball at the age of 11. Most of his early childhood was spent around ballfields watching his father play softball.",
    "As a four-year starter at Chancellor High School, Chris went 33-4. He pitched 250 innings with 345 strikeouts and a 0.94 ERA. As a senior he did not allow a hit until his third start. He threw three no-hitters in high school and two perfect games in American Legion ball, and had no losing decisions after his first start as a sophomore.",
    "He was named First Team All-District, All-State, All-Metropolitan and All-American, and was the 1997 District and Metropolitan Player of the Year. That success earned him a first-round selection by the Montreal Expos.",
    "When injury ended his playing career, Chris came home with a desire to pass along what he knew and help other players reach their dreams. He has since worked as an Associate Scout for two MLB organizations and as Scouting Director for Dynamic Baseball, and founded Pinnacle Baseball Academy.",
  ],
  career: [
    { label: "Associate Scout", detail: "Two MLB organizations" },
    { label: "Scouting Director", detail: "Dynamic Baseball" },
    { label: "Travel program", detail: "Ran a highly successful travel program for 11 years" },
  ],
  images: {
    cardFront: {
      src: "/images/coach/stowe-card-front.jpg",
      alt: "Chris Stowe's 1997 Bowman rookie card, Montreal Expos",
      width: 374,
      height: 500,
    },
    cardBack: {
      src: "/images/coach/stowe-card-back.jpg",
      alt: "Back of Chris Stowe's 1997 Bowman card with his scouting report and high school pitching record",
      width: 500,
      height: 361,
    },
    portrait: {
      src: "/images/coach/stowe-portrait.jpg",
      alt: "Chris Stowe at Pinnacle Baseball Academy",
      width: 947,
      height: 1718,
    },
  },
};

/**
 * Additional staff. Coach Josh is named in Seneca Gregory's testimonial but has no
 * profile on the original site. [NEEDS INPUT] full name, role, bio, photo.
 * Entries with `ready: false` are not rendered.
 */
export const staff: (Coach & { ready: boolean })[] = [
  {
    slug: "coach-josh",
    name: "Coach Josh",
    role: "Instructor",
    portrait: null,
    bio: [],
    ready: false,
  },
];
