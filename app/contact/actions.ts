"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { formatPhone, lessonSchema, type LessonField, type LessonRequest } from "@/lib/lesson-schema";
import { ageGroups, focusAreas, formats, times } from "@/content/lesson";
import { site } from "@/content/site";

export type LessonState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<LessonField, string>> };

/*
  Basic per-IP rate limit: 5 requests per 10 minutes. It lives in memory, so on serverless it
  is per instance. That is enough to blunt a bot hammering the form; it is not a hard quota.
*/
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const label = <T extends readonly { value: string; label: string }[]>(list: T, v: string) =>
  list.find((o) => o.value === v)?.label ?? v;

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function summarize(r: LessonRequest) {
  return [
    ["Parent", r.parentName],
    ["Player", r.playerName || "Not given"],
    ["Phone", formatPhone(r.phone)],
    ["Email", r.email || "Not given"],
    ["Age group", label(ageGroups, r.age)],
    ["Focus", label(focusAreas, r.focus)],
    ["Format", label(formats, r.format)],
    ["Best times", r.times.length ? r.times.map((t) => label(times, t)).join(", ") : "Not given"],
    ["Note", r.note || "None"],
  ] as const;
}

async function deliver(r: LessonRequest, source: string) {
  const rows = summarize(r);
  const subject = `Lesson request: ${r.parentName} (${label(formats, r.format)}, ${label(focusAreas, r.focus)})`;
  const channels: Promise<unknown>[] = [];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LESSON_TO_EMAIL;
  if (apiKey && to) {
    const resend = new Resend(apiKey);
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nSent from: ${source}`;
    const html = `<h2 style="font-family:sans-serif">New lesson request</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top"><b>${k}</b></td><td style="padding:6px 0">${escape(v)}</td></tr>`,
      )
      .join("")}</table><p style="font-family:sans-serif;color:#888">Sent from the ${escape(source)} page of ${site.url}</p>`;
    channels.push(
      resend.emails
        .send({
          from: process.env.LESSON_FROM_EMAIL ?? "Pinnacle Website <onboarding@resend.dev>",
          to: to.split(",").map((s) => s.trim()),
          replyTo: r.email || undefined,
          subject,
          text,
          html,
        })
        .then((res) => {
          if (res.error) throw new Error(res.error.message);
        }),
    );
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    channels.push(
      fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...r, phone: formatPhone(r.phone), source, receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      }).then((res) => {
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      }),
    );
  }

  if (!channels.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lesson-request] No delivery channel configured. Request:", Object.fromEntries(rows));
      return true;
    }
    console.error("[lesson-request] No delivery channel configured. Set RESEND_API_KEY + LESSON_TO_EMAIL or LEAD_WEBHOOK_URL.");
    return false;
  }

  // Succeed if at least one channel delivered.
  const results = await Promise.allSettled(channels);
  results.forEach((res) => res.status === "rejected" && console.error("[lesson-request] Delivery failed:", res.reason));
  return results.some((res) => res.status === "fulfilled");
}

export async function submitLessonRequest(_prev: LessonState, formData: FormData): Promise<LessonState> {
  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", firstName: "" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (limited(ip)) {
    return {
      status: "error",
      message: `Too many requests in a short time. Please call us at ${site.phone.display}.`,
    };
  }

  const parsed = lessonSchema.safeParse({
    age: formData.get("age"),
    focus: formData.get("focus"),
    format: formData.get("format"),
    parentName: formData.get("parentName") ?? "",
    playerName: formData.get("playerName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    times: formData.getAll("times"),
    note: formData.get("note") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<LessonField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LessonField;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const source = String(formData.get("from") ?? "contact").slice(0, 40).replace(/[^a-z0-9-]/gi, "") || "contact";
  const ok = await deliver(parsed.data, source);
  if (!ok) {
    return {
      status: "error",
      message: `We couldn't send your request just now. Please call us at ${site.phone.display} and we'll get you set up.`,
    };
  }

  return { status: "success", firstName: parsed.data.parentName.split(/\s+/)[0] };
}
