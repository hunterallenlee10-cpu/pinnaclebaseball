import { Counter } from "@/components/motion/Counter";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  { value: 200, suffix: "+", label: "Players coached who went on to play college baseball" },
  { value: 3, suffix: "", label: "State Players of the Year coached and developed" },
  { value: 100, suffix: "%", label: "Of Chris's players since 2017 had the chance to play in college" },
  { value: 1997, suffix: "", label: "Montreal Expos first-round pick. Your head instructor.", plain: true },
];

/** "The Climb." Program results in a scoreboard strip. Every number is from the academy's own record. */
export function ProofBar() {
  return (
    <section aria-label="Results" className="relative border-y border-chalk/8 bg-night">
      <Container className="px-0! sm:px-0! lg:px-10!">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`flex flex-col justify-between gap-6 border-chalk/8 p-6 sm:p-8 lg:py-12 ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
            >
              <dt className="order-2 max-w-[22ch] text-sm leading-snug text-mist sm:text-base">{s.label}</dt>
              <dd className="order-1 display flex items-start text-[clamp(3.5rem,8vw,6.5rem)] leading-none text-chalk">
                {s.plain ? <span>{s.value}</span> : <Counter value={s.value} />}
                {s.suffix && <span className="text-sky">{s.suffix}</span>}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
