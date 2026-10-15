import type { Metadata } from "next";
import { TunnelHero } from "@/components/home/TunnelHero";
import { ProofBar } from "@/components/home/ProofBar";
import { ProgramIndex } from "@/components/home/ProgramIndex";
import { CoachSection } from "@/components/home/CoachSection";
import { VelocityGauge } from "@/components/home/VelocityGauge";
import { Pipeline } from "@/components/home/Pipeline";
import { FacilityBento } from "@/components/home/FacilityBento";
import { BookCTA } from "@/components/booking/BookCTA";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/Reveal";
import { programs } from "@/content/programs";
import { alumni } from "@/content/alumni";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <TunnelHero />
      <ProofBar />

      <section aria-labelledby="programs-title" className="py-24 sm:py-32 lg:py-40">
        <Container>
          <LineReveal
            id="programs-title"
            className="display max-w-4xl text-[clamp(3.25rem,8vw,7rem)] text-chalk"
            lines={["Training for", <span key="b" className="text-sky">every player.</span>]}
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            Every player, at any age or skill level, has something to gain. Pick the format that fits yours.
          </p>
          <div className="mt-14 lg:mt-20">
            <ProgramIndex programs={programs} />
          </div>
        </Container>
      </section>

      <CoachSection />
      <VelocityGauge />
      <Pipeline alumni={alumni} />
      <FacilityBento />
      <BookCTA source="home" />
    </>
  );
}
