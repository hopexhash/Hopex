import { motion, useReducedMotion } from 'framer-motion';
import FitText from '../components/FitText';
import Magnet from '../components/Magnet';

const NAV = [
  { label: 'Music', href: '#music' },
  { label: 'About', href: '#about' },
  { label: 'Listen', href: '#listen' },
  { label: 'Booking', href: '#booking' },
];

export default function Hero() {
  const still = useReducedMotion();
  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col">
      <motion.header
        {...rise(0)}
        className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7 md:px-12"
      >
        <a href="#top" aria-label="HOPEX — top of page" className="shrink-0">
          <img src="./assets/img/hopex-mark.webp" alt="" width={38} height={38} className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
        </a>

        <nav className="flex items-center gap-4 sm:gap-8">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="wipe text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--mist)]/70 transition-colors duration-300 hover:text-[color:var(--mist)] sm:text-xs md:text-sm"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </motion.header>

      {/* Nudged above centre: dead-centre in a 100svh box leaves a large void
          under the buttons on a phone, which reads as an unfinished page. */}
      <div className="flex flex-1 flex-col justify-center px-5 pb-20 pt-6 sm:px-8 sm:pb-24 md:px-12">
        <motion.p
          {...rise(0.12)}
          className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.42em] text-[color:var(--mist)]/55 sm:mb-7 sm:text-xs"
        >
          Amsterdam — Producer &amp; DJ
        </motion.p>

        <motion.div {...rise(0.2)}>
          <FitText text="HOPEX" className="shine block font-black uppercase leading-[0.82] tracking-tighter" />
        </motion.div>

        <motion.p
          {...rise(0.34)}
          className="mx-auto mt-6 max-w-lg text-center text-sm font-light leading-relaxed text-[color:var(--mist)]/65 sm:mt-8 sm:text-base md:text-lg"
        >
          Electronic, trap and future bass — records built to hit hard on a system
          and stay with you after.
        </motion.p>

        <motion.div {...rise(0.46)} className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <Magnet padding={80} strength={5}>
            <a
              href="#music"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03] sm:px-9 sm:py-4 sm:text-sm"
              style={{
                background: 'linear-gradient(103deg, #7c3aed 0%, #e935c7 55%, #ff8a3d 100%)',
                boxShadow: '0 8px 40px -8px rgba(233,53,199,0.65)',
              }}
            >
              Listen now
            </a>
          </Magnet>

          <Magnet padding={80} strength={5}>
            <a
              href="#booking"
              className="inline-flex items-center rounded-full border border-[color:var(--mist)]/25 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--mist)] transition-colors duration-300 hover:border-[color:var(--mist)]/70 hover:bg-[color:var(--mist)]/5 sm:px-9 sm:py-4 sm:text-sm"
            >
              Bookings
            </a>
          </Magnet>
        </motion.div>
      </div>

      <div className="nudge flex justify-center pb-7 text-[10px] uppercase tracking-[0.3em] text-[color:var(--mist)]/40">
        Scroll
      </div>
    </section>
  );
}
