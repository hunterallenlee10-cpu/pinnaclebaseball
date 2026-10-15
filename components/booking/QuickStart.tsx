"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { ageGroups, focusAreas } from "@/content/lesson";

/**
 * Step one of the lesson request, embedded anywhere. It carries the answers into
 * the full request on the contact page so the parent never answers twice.
 * Works without JavaScript as a plain GET form.
 */
export function QuickStart({ defaultFocus, source }: { defaultFocus?: string; source: string }) {
  const router = useRouter();
  const [age, setAge] = useState<string>("");
  const [focus, setFocus] = useState<string>(defaultFocus ?? "");

  return (
    <form
      action="/contact/"
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (age) params.set("age", age);
        if (focus) params.set("focus", focus);
        params.set("from", source);
        track("lesson_quickstart", { source, age: age || "none", focus: focus || "none" });
        router.push(`/contact/?${params.toString()}#book`);
      }}
      className="flex flex-col gap-8"
    >
      <input type="hidden" name="from" value={source} />
      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-[0.2em] text-mist">Player age</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ageGroups.map((a) => (
            <label key={a.value} className="cursor-pointer">
              <input
                type="radio"
                name="age"
                value={a.value}
                checked={age === a.value}
                onChange={() => setAge(a.value)}
                className="peer sr-only"
              />
              <span className="stat inline-flex h-11 items-center border border-chalk/20 px-4 text-sm text-chalk transition-colors hover:border-chalk peer-checked:border-sky peer-checked:bg-sky peer-checked:text-night peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky">
                {a.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-[0.2em] text-mist">Focus</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {focusAreas.map((f) => (
            <label key={f.value} className="cursor-pointer">
              <input
                type="radio"
                name="focus"
                value={f.value}
                checked={focus === f.value}
                onChange={() => setFocus(f.value)}
                className="peer sr-only"
              />
              <span className="inline-flex h-11 items-center border border-chalk/20 px-4 text-sm text-chalk transition-colors hover:border-chalk peer-checked:border-sky peer-checked:bg-sky peer-checked:text-night peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky">
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <Button type="submit">
          Continue <ArrowRight size={18} weight="bold" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
