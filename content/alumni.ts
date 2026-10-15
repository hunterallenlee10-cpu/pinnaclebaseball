export type Alum = {
  slug: string;
  first: string;
  last: string;
  /** A short excerpt (max ~3 lines) for cards. Taken word for word from the full quote. */
  excerpt: string;
  quote: string;
  image: { src: string; alt: string; width: number; height: number; position?: string };
  /** [NEEDS INPUT] College or pro destination. Hidden while null. */
  destination: string | null;
};

export const alumni: Alum[] = [
  {
    slug: "max-harper",
    first: "Max",
    last: "Harper",
    excerpt:
      "Not only has he helped me become the best player I can be, but more importantly, the best person I can be.",
    quote:
      "Without Coach Stowe I don't think I'd be where I am today. Not only has he helped me become the best player I can be, but more importantly, the best person I can be. His dedication to the sport and the athletes he works with is unparalleled. I am grateful for the countless hours he's devoted to me as well as others and cannot emphasize enough how grateful I am to have had him as a coach and mentor.",
    image: { src: "/images/alumni/max-harper.jpg", alt: "Max Harper swinging at a pitch in a game", width: 1024, height: 682, position: "60% 40%" },
    destination: null,
  },
  {
    slug: "miles-levere",
    first: "Miles",
    last: "Levere",
    excerpt: "Playing for Pinnacle allowed me to receive multiple Division 1 offers.",
    quote:
      "My baseball career completely changed when I joined Pinnacle as a sophomore. Coach Stowe does a tremendous job developing young players looking to play the game at a high level. He creates an environment that allows players to showcase the best parts of their game in their own individual way, and that is what separates Pinnacle from the rest of the travel programs out there today. Playing for Pinnacle allowed me to receive multiple Division 1 offers, and I would not have been able to do that without Coach Stowe's dedication to getting his players recruited. Without Coach Stowe and Pinnacle Baseball, I can confidently say I would not be where I am today.",
    image: { src: "/images/alumni/miles-levere.jpg", alt: "Miles Levere delivering a pitch", width: 640, height: 428, position: "45% 40%" },
    destination: null,
  },
  {
    slug: "seneca-gregory",
    first: "Seneca",
    last: "Gregory",
    excerpt:
      "Coach Josh and Coach Stowe instilled in me a work ethic that serves me both on and off the field.",
    quote:
      "Pinnacle Baseball is a great organization run by passionate and experienced coaches who want to personally see every player grow and accomplish their dreams. Coach Josh and Coach Stowe instilled in me a work ethic that serves me both on and off the field. Playing for Pinnacle Baseball had a significant impact on making me the player I am today and I couldn't recommend a better organization to learn and grow with.",
    image: { src: "/images/alumni/seneca-gregory.jpg", alt: "Seneca Gregory pitching from the stretch", width: 937, height: 626, position: "35% 40%" },
    destination: null,
  },
  {
    slug: "carson-bell",
    first: "Carson",
    last: "Bell",
    excerpt:
      "I gained valuable experience and a strong work ethic that prepared me to excel at the next level.",
    quote:
      "I consider myself very fortunate to have played for Pinnacle Baseball under Head Coach Chris Stowe. I gained valuable experience and a strong work ethic that prepared me to excel at the next level. I'm forever grateful for my time at Pinnacle Baseball Academy and the confidence that Coach Stowe instilled in me.",
    image: { src: "/images/alumni/carson-bell.jpg", alt: "Carson Bell celebrating while running the bases", width: 512, height: 725, position: "50% 25%" },
    destination: null,
  },
  {
    slug: "tristan-mcalister",
    first: "Tristan",
    last: "McAlister",
    excerpt:
      "He taught me my work ethic, how to compete, and pushed me to become a better person on and off the field.",
    quote:
      "I thank God for putting Coach Stowe in my life. He is one of the biggest reasons why I've got to the level I'm at right now. He taught me my work ethic, how to compete, and pushed me to become a better person on and off the field. There was not a better person I could have asked to guide me in my journey. I will always be thankful for him.",
    image: { src: "/images/alumni/tristan-mcalister.jpg", alt: "Tristan McAlister fielding a ball", width: 570, height: 426, position: "50% 35%" },
    destination: null,
  },
  {
    slug: "billy-fluharty",
    first: "Billy",
    last: "Fluharty",
    excerpt: "We would all run through a brick wall for Coach Stowe.",
    quote:
      "Coach Stowe, you've made such a huge impact on my life on the baseball field. However, it's way more than just that. You have been a role model for me in my life outside of baseball as well. You always instilled in us having integrity, making the right decisions, working hard to earn what we want in life, and most importantly teaching us to believe in ourselves. I can speak for myself and teammates on this; we would all run through a brick wall for Coach Stowe. Thanks for everything, Coach.",
    image: { src: "/images/alumni/billy-fluharty.jpg", alt: "Billy Fluharty in uniform holding a bat across his shoulders", width: 1365, height: 2048, position: "50% 20%" },
    destination: null,
  },
];

/** Program-wide results, as published on the original About page. */
export const results = [
  { value: 200, suffix: "+", label: "Players coached who went on to play college baseball" },
  { value: 3, suffix: "", label: "State Players of the Year coached and developed" },
  { value: 2017, suffix: "", label: "Every player under Chris since 2017 has had the chance to play in college", prefix: "Since" },
] as const;

/** [NEEDS INPUT] Names and years of the 3 State Players of the Year. */
export const statePlayersOfTheYear: { name: string; year: number }[] = [];
