import { z } from "zod";
import { ageGroups, focusAreas, formats, times } from "@/content/lesson";

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

const digits = (s: string) => s.replace(/\D/g, "");

/** Shared by the client (per-step checks) and the server action (the real gate). */
export const lessonSchema = z.object({
  age: z.enum(values(ageGroups), { error: "Choose the player's age group." }),
  focus: z.enum(values(focusAreas), { error: "Choose what the player wants to work on." }),
  format: z.enum(values(formats), { error: "Choose a training format." }),
  parentName: z.string().trim().min(2, "Enter your name.").max(80, "That name is too long."),
  playerName: z.string().trim().max(80, "That name is too long.").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const d = digits(v);
      return d.length === 10 || (d.length === 11 && d.startsWith("1"));
    }, "Enter a 10-digit phone number."),
  email: z.email("Enter a valid email, or leave it blank.").max(120).optional().or(z.literal("")),
  times: z.array(z.enum(values(times))).max(3).default([]),
  note: z.string().trim().max(1000, "Keep the note under 1,000 characters.").optional().or(z.literal("")),
});

export type LessonRequest = z.infer<typeof lessonSchema>;
export type LessonField = keyof LessonRequest;

export const stepFields: LessonField[][] = [["age", "focus"], ["format"], ["parentName", "phone", "email", "note", "playerName"]];

export function formatPhone(raw: string) {
  const d = digits(raw).slice(-10);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw;
}
