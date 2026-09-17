import { Reveal } from "@/components/Reveal";

export default function Statement() {
  return (
    <section className="bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-8xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-mute">
              The Problem
            </span>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-8">
            <p className="font-serif-display font-medium leading-[1.16] tracking-[-0.01em] text-[clamp(28px,4.4vw,52px)] text-ink">
              A hotel&rsquo;s best information lives everywhere except where
              the guest is standing.{" "}
              <span className="italic text-ink-mute">
                A folder in the room. A tired PDF. A question the front desk
                answers forty times a day.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
