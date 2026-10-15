export type Program = {
  id: "indv-lessons" | "small-group" | "team-training" | "camps-clinics";
  name: string;
  short: string;
  summary: string;
  body: string;
  facts: { label: string; detail: string }[];
  image: { src: string; alt: string; width: number; height: number };
  gallery: { src: string; alt: string; width: number; height: number }[];
  /** Value preselected in the lesson request form. */
  format: "individual" | "small-group" | "team" | "camp";
  /** [NEEDS INPUT] Pricing. Hidden while null. */
  price: string | null;
};

const weekdays = {
  label: "Weekdays",
  detail: "Monday to Friday evenings, with occasional openings during the day.",
};
const weekends = {
  label: "Weekends",
  detail: "Saturday and Sunday morning workouts. Ask us for current availability.",
};

export const programs: Program[] = [
  {
    id: "indv-lessons",
    name: "Individual Lessons",
    short: "One-on-one",
    summary: "Pitching, hitting and fielding for players ages 8 to 18+.",
    body: "Private lessons put one instructor on one player for as long as you choose. We set short, mid and long-term goals and keep a laser focus on them. Many players train weekly or every other week and work on what they learned between sessions.",
    facts: [{ label: "Ages", detail: "8 to 18+" }, weekdays, weekends],
    image: {
      src: "/images/lesson-mound.jpg",
      alt: "An instructor working with a young pitcher on the mound inside the Pinnacle facility",
      width: 1550,
      height: 2048,
    },
    gallery: [
      { src: "/images/facility/receiving.jpg", alt: "A catcher receiving a pitch in the training tunnel", width: 585, height: 874 },
      { src: "/images/facility/cage-hitter.jpg", alt: "A hitter taking swings in the batting cage", width: 1162, height: 1715 },
      { src: "/images/facility/catch-play.jpg", alt: "A player playing catch inside the facility", width: 584, height: 880 },
    ],
    format: "individual",
    price: null,
  },
  {
    id: "small-group",
    name: "Small Group Lessons",
    short: "2 to 8 players",
    summary: "Train with teammates or friends in a group of 2 to 8 players.",
    body: "Small group lessons cover the skill areas you choose, with the same short, mid and long-term goal setting as a private lesson. Many groups train weekly or every other week and bring the work home between sessions.",
    facts: [{ label: "Group size", detail: "2 to 8 players" }, weekdays, weekends],
    image: {
      src: "/images/facility/tee-work.jpg",
      alt: "Players doing tee work inside the Pinnacle training tunnel",
      width: 1800,
      height: 2400,
    },
    gallery: [
      { src: "/images/facility/tee-work.jpg", alt: "Players working off the tee", width: 1800, height: 2400 },
      { src: "/images/facility/agility.jpg", alt: "A small group running agility work on the turf", width: 1800, height: 2400 },
      { src: "/images/facility/tunnel-long.jpg", alt: "The long training tunnel with turf and netting", width: 1800, height: 2400 },
    ],
    format: "small-group",
    price: null,
  },
  {
    id: "team-training",
    name: "Team Training",
    short: "We come to you",
    summary: "Bring your team to our facility, or we come to your field.",
    body: "Any coach who wants our instructors to work with several or all of their players in a focus area can book team training. We run it at our facility in Spotsylvania or at your practice.",
    facts: [
      {
        label: "Availability",
        detail: "Any day of the week. Weekdays are usually evenings unless we arrange otherwise.",
      },
      { label: "Location", detail: "Our Spotsylvania facility, or your practice field." },
    ],
    image: {
      src: "/images/team.jpg",
      alt: "A Pinnacle team in light blue jerseys posing on the field",
      width: 1800,
      height: 2400,
    },
    gallery: [
      { src: "/images/team.jpg", alt: "A Pinnacle team on the field", width: 1800, height: 2400 },
      { src: "/images/stadium.jpg", alt: "Pinnacle players on a college field", width: 1800, height: 2400 },
      { src: "/images/dugout.jpg", alt: "Players watching from the dugout", width: 1747, height: 2162 },
    ],
    format: "team",
    price: null,
  },
  {
    id: "camps-clinics",
    name: "Camps & Clinics",
    short: "Seasonal",
    summary: "Skills camps and clinics, or host one for your team or league.",
    body: "From time to time we run skills camps and clinics. If your team, group or league wants to host a camp or clinic taught by our coaches, send us a message and we'll talk through the possibilities.",
    facts: [{ label: "Hosting", detail: "Teams, groups and leagues can book a clinic taught by our coaches." }],
    image: {
      src: "/images/clinic.jpg",
      alt: "A large group of young players gathered on the field at a Pinnacle clinic",
      width: 1170,
      height: 520,
    },
    gallery: [],
    format: "camp",
    price: null,
  },
];

/** [NEEDS INPUT] Upcoming camps and clinics. An empty list shows a "none scheduled" state. */
export const upcomingEvents: { name: string; date: string; location: string; href?: string }[] = [];
