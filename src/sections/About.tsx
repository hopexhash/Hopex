import Reveal from '../components/Reveal';

const WORK = [
  { k: '01', name: 'Production', copy: 'Original records built from the ground up — arrangement, sound design, mixdown.' },
  { k: '02', name: 'Mix & Master', copy: 'Masters that translate: club systems, headphones, every streaming platform.' },
  { k: '03', name: 'Remixes', copy: 'Reworks that keep what makes a record recognisable and rebuild the rest for the floor.' },
  { k: '04', name: 'DJ Sets', copy: 'Club and festival sets — Amsterdam, across Europe, anywhere the booking makes sense.' },
];

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <Reveal>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--mist)]/45">
                About
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display font-black uppercase leading-[0.85] tracking-tighter" style={{ fontSize: 'clamp(2.75rem, 9vw, 5.5rem)' }}>
                Behind
                <br />
                the desk
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            <Reveal delay={0.14}>
              <p className="text-lg font-light leading-relaxed text-[color:var(--mist)]/75 sm:text-xl md:text-2xl">
                Seven years in, working out of Amsterdam. I make{' '}
                <span className="accent-text font-medium">electronic, trap and future bass</span> — records
                with weight to them, built to move a room and hold up on a pair of headphones the
                morning after.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-base font-light leading-relaxed text-[color:var(--mist)]/50">
                Open to collaborations, remixes and label work. If you want something that stands
                apart, get in touch.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          {WORK.map((w, i) => (
            <Reveal key={w.k} delay={i * 0.07}>
              <div className="group flex items-baseline gap-5 border-t border-[color:var(--mist)]/12 py-6 transition-colors duration-500 hover:border-[color:var(--mist)]/35 sm:gap-10 sm:py-8">
                <span className="shrink-0 font-mono text-xs text-[color:var(--mist)]/35 transition-colors duration-500 group-hover:text-[color:var(--magenta)]">
                  {w.k}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold uppercase tracking-wide text-[color:var(--mist)] transition-transform duration-500 group-hover:translate-x-1.5" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.9rem)' }}>
                    {w.name}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm font-light leading-relaxed text-[color:var(--mist)]/45 sm:text-base">
                    {w.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[color:var(--mist)]/12" />
        </div>
      </div>
    </section>
  );
}
