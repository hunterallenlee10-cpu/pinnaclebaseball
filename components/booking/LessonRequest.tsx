"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, WarningCircle } from "@phosphor-icons/react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";
import { ageGroups, focusAreas, formats, times } from "@/content/lesson";
import { site } from "@/content/site";
import { lessonSchema, stepFields, type LessonField } from "@/lib/lesson-schema";
import { submitLessonRequest, type LessonState } from "@/app/contact/actions";

const steps = [
  { label: "Player", title: "Who's training?" },
  { label: "Format", title: "What format fits?" },
  { label: "Contact", title: "How do we reach you?" },
];

const pick = <T extends readonly { value: string }[]>(list: T, v: string | null) =>
  list.some((o) => o.value === v) ? (v as string) : "";

type Errors = Partial<Record<LessonField, string>>;

function Choice({
  name,
  value,
  checked,
  onChange,
  children,
  type = "radio",
  invalid,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  type?: "radio" | "checkbox";
  invalid?: boolean;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-invalid={invalid || undefined}
        className="peer sr-only"
      />
      <span className="flex h-full min-h-12 items-center border border-chalk/20 px-4 py-3 text-chalk transition-colors hover:border-chalk peer-checked:border-sky peer-checked:bg-sky peer-checked:text-night peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sky">
        {children}
      </span>
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-[#ff9b8a]">
      <WarningCircle size={16} weight="bold" aria-hidden />
      {message}
    </p>
  );
}

const inputClass =
  "mt-2 h-13 w-full border border-chalk/25 bg-navy px-4 text-chalk placeholder:text-haze transition-colors hover:border-chalk/50 focus:border-sky focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky aria-[invalid=true]:border-[#ff9b8a]";

export function LessonRequest() {
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [state, formAction, pending] = useActionState<LessonState, FormData>(submitLessonRequest, { status: "idle" });

  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    age: pick(ageGroups, params.get("age")),
    focus: pick(focusAreas, params.get("focus")),
    format: pick(formats, params.get("format")),
    parentName: "",
    playerName: "",
    phone: "",
    email: "",
    note: "",
    times: [] as string[],
  });
  const [errors, setErrors] = useState<Errors>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const source = params.get("from")?.replace(/[^a-z0-9-]/gi, "") || "contact";

  // Server-side errors: show them and jump back to the first step that has one.
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    if (state.status === "error" && state.fieldErrors) {
      setErrors(state.fieldErrors);
      const firstBad = stepFields.findIndex((fields) => fields.some((f) => state.fieldErrors?.[f]));
      if (firstBad >= 0) setStep(firstBad);
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);

  useEffect(() => {
    if (state.status === "success") track("lesson_submitted", { format: values.format, focus: values.focus, source });
    // values are read at the moment of success only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  const set = (key: keyof typeof values, value: string | string[]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as LessonField]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (index: number) => {
    const fields = stepFields[index];
    const shape = Object.fromEntries(fields.map((f) => [f, true])) as Record<LessonField, true>;
    const result = lessonSchema.pick(shape).safeParse(values);
    if (result.success) return true;
    const next: Errors = {};
    for (const issue of result.error.issues) next[issue.path[0] as LessonField] ??= issue.message;
    setErrors(next);
    return false;
  };

  const next = () => {
    if (!validate(step)) return;
    track("lesson_step", { step: step + 1, source });
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  if (state.status === "success") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-6 border border-sky/40 bg-navy-2 p-8 sm:p-12"
      >
        <CheckCircle size={56} weight="fill" className="text-sky" aria-hidden />
        <h3 className="display text-5xl text-chalk sm:text-6xl">
          {state.firstName ? `Thanks, ${state.firstName}.` : "Thanks."}
          <br />
          <span className="text-sky">Request received.</span>
        </h3>
        <p className="max-w-lg text-lg text-mist">
          Coach Stowe will reach out {site.responseTime ?? "as soon as he can"} to set up the first session. If it&apos;s
          time-sensitive, give us a call.
        </p>
        <a href={site.phone.href} className="stat inline-flex items-center gap-2 text-xl text-chalk hover:text-sky">
          <Phone size={20} weight="bold" aria-hidden /> {site.phone.display}
        </a>
      </motion.div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(e) => {
        if (!validate(2)) e.preventDefault();
      }}
      className="border border-chalk/12 bg-navy-2"
    >
      {/* Answers from earlier steps travel with the final submit. */}
      <input type="hidden" name="age" value={values.age} />
      <input type="hidden" name="focus" value={values.focus} />
      <input type="hidden" name="format" value={values.format} />
      <input type="hidden" name="from" value={source} />
      {values.times.map((t) => (
        <input key={t} type="hidden" name="times" value={t} />
      ))}
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <ol aria-label="Progress" className="grid grid-cols-3 border-b border-chalk/12">
        {steps.map((s, i) => (
          <li
            key={s.label}
            aria-current={i === step ? "step" : undefined}
            className={`relative px-4 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] sm:px-6 ${
              i <= step ? "text-chalk" : "text-haze"
            }`}
          >
            <span className="stat mr-2 text-sky">{i + 1}</span>
            {s.label}
            <span
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-sky transition-transform duration-500 ease-out-expo ${
                i <= step ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </li>
        ))}
      </ol>

      <div className="p-6 sm:p-10">
        <h3 ref={heading} tabIndex={-1} className="display text-[clamp(2.5rem,5vw,3.75rem)] text-chalk focus:outline-none">
          {steps[step].title}
        </h3>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            {step === 0 && (
              <div className="space-y-9">
                <fieldset aria-describedby={errors.age ? "err-age" : undefined}>
                  <legend className="font-medium text-chalk">Player&apos;s age</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {ageGroups.map((a) => (
                      <Choice key={a.value} name="age-choice" value={a.value} checked={values.age === a.value} onChange={() => set("age", a.value)} invalid={!!errors.age}>
                        <span className="stat">{a.label}</span>
                      </Choice>
                    ))}
                  </div>
                  <FieldError id="err-age" message={errors.age} />
                </fieldset>
                <fieldset aria-describedby={errors.focus ? "err-focus" : undefined}>
                  <legend className="font-medium text-chalk">What do they want to work on?</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {focusAreas.map((f) => (
                      <Choice key={f.value} name="focus-choice" value={f.value} checked={values.focus === f.value} onChange={() => set("focus", f.value)} invalid={!!errors.focus}>
                        {f.label}
                      </Choice>
                    ))}
                  </div>
                  <FieldError id="err-focus" message={errors.focus} />
                </fieldset>
              </div>
            )}

            {step === 1 && (
              <fieldset aria-describedby={errors.format ? "err-format" : undefined}>
                <legend className="sr-only">Training format</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {formats.map((f) => (
                    <Choice key={f.value} name="format-choice" value={f.value} checked={values.format === f.value} onChange={() => set("format", f.value)} invalid={!!errors.format}>
                      <span className="flex flex-col py-2">
                        <span className="display text-2xl">{f.label}</span>
                        <span className="text-sm opacity-80">{f.detail}</span>
                      </span>
                    </Choice>
                  ))}
                </div>
                <FieldError id="err-format" message={errors.format} />
              </fieldset>
            )}

            {step === 2 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="parentName" className="font-medium text-chalk">
                    Your name
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    autoComplete="name"
                    value={values.parentName}
                    onChange={(e) => set("parentName", e.target.value)}
                    aria-invalid={!!errors.parentName}
                    aria-describedby={errors.parentName ? "err-parentName" : undefined}
                    className={inputClass}
                  />
                  <FieldError id="err-parentName" message={errors.parentName} />
                </div>
                <div>
                  <label htmlFor="playerName" className="font-medium text-chalk">
                    Player&apos;s name <span className="font-normal text-haze">(optional)</span>
                  </label>
                  <input
                    id="playerName"
                    name="playerName"
                    value={values.playerName}
                    onChange={(e) => set("playerName", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="font-medium text-chalk">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "err-phone" : "hint-phone"}
                    className={inputClass}
                  />
                  {errors.phone ? (
                    <FieldError id="err-phone" message={errors.phone} />
                  ) : (
                    <p id="hint-phone" className="mt-2 text-sm text-haze">
                      We&apos;ll call or text to schedule.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="font-medium text-chalk">
                    Email <span className="font-normal text-haze">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={inputClass}
                  />
                  <FieldError id="err-email" message={errors.email} />
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="font-medium text-chalk">
                    Best times <span className="font-normal text-haze">(optional)</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {times.map((t) => (
                      <Choice
                        key={t.value}
                        type="checkbox"
                        name="times-choice"
                        value={t.value}
                        checked={values.times.includes(t.value)}
                        onChange={() =>
                          set(
                            "times",
                            values.times.includes(t.value) ? values.times.filter((x) => x !== t.value) : [...values.times, t.value],
                          )
                        }
                      >
                        {t.label}
                      </Choice>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <label htmlFor="note" className="font-medium text-chalk">
                    Anything we should know? <span className="font-normal text-haze">(optional)</span>
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    value={values.note}
                    onChange={(e) => set("note", e.target.value)}
                    aria-invalid={!!errors.note}
                    aria-describedby={errors.note ? "err-note" : undefined}
                    className={`${inputClass} h-auto py-3`}
                  />
                  <FieldError id="err-note" message={errors.note} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {state.status === "error" && (
          <p role="alert" className="mt-8 flex items-start gap-2 border border-[#ff9b8a]/40 bg-[#ff9b8a]/10 p-4 text-chalk">
            <WarningCircle size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-[#ff9b8a]" />
            {state.message}
          </p>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-chalk/10 pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex h-12 items-center gap-2 px-2 text-mist transition-colors hover:text-chalk"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden /> Back
            </button>
          ) : (
            <span className="text-sm text-haze">Takes about a minute.</span>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              Continue <ArrowRight size={18} weight="bold" aria-hidden />
            </Button>
          ) : (
            <Button type="submit" disabled={pending}>
              {pending ? "Sending..." : "Send request"}
              {!pending && <ArrowRight size={18} weight="bold" aria-hidden />}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

/** Same footprint as the form, shown while search params resolve. */
export function LessonRequestSkeleton() {
  return (
    <div aria-hidden className="border border-chalk/12 bg-navy-2">
      <div className="h-[52px] border-b border-chalk/12" />
      <div className="space-y-6 p-6 sm:p-10">
        <div className="h-12 w-2/3 animate-pulse bg-chalk/8" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse bg-chalk/8" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse bg-chalk/8" />
          ))}
        </div>
      </div>
    </div>
  );
}
