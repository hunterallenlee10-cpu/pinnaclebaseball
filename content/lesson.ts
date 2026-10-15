/** Options for the lesson request flow. Shared by the quick start and the full form. */
export const ageGroups = [
  { value: "8-10", label: "8 to 10" },
  { value: "11-13", label: "11 to 13" },
  { value: "14-18", label: "14 to 18" },
  { value: "18+", label: "18+" },
] as const;

export const focusAreas = [
  { value: "pitching", label: "Pitching" },
  { value: "hitting", label: "Hitting" },
  { value: "fielding", label: "Fielding" },
  { value: "velocity365", label: "Velocity365" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const formats = [
  { value: "individual", label: "Individual", detail: "One player, one instructor" },
  { value: "small-group", label: "Small Group", detail: "2 to 8 players" },
  { value: "team", label: "Team", detail: "Your team, here or at your field" },
  { value: "camp", label: "Camp or Clinic", detail: "Host or join a clinic" },
] as const;

export const times = [
  { value: "weekday-evenings", label: "Weekday evenings" },
  { value: "weekend-mornings", label: "Weekend mornings" },
  { value: "flexible", label: "Flexible" },
] as const;

export type AgeGroup = (typeof ageGroups)[number]["value"];
export type FocusArea = (typeof focusAreas)[number]["value"];
export type Format = (typeof formats)[number]["value"];
export type TimePref = (typeof times)[number]["value"];
