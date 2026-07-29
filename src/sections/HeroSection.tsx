import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import FitText from '../components/FitText';
import { ContactButton } from '../components/Buttons';
import RemoteImg from '../components/RemoteImg';
import { HERO_PORTRAIT } from '../assets';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Releases', href: '#releases' },
  // Points at the footer rather than straight to mailto: the footer holds both
  // the booking address and every platform link, so it answers more intents.
  { label: 'Contact', href: '#contact' },
];

export default function HeroSection() {
  return (
    <section className="flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {n.label}
          </a>
        ))}
      </FadeIn>

      <div className="overflow-hidden px-6 md:px-10">
        <FadeIn as="h1" delay={0.15} y={40} className="mt-6 sm:mt-4 md:-mt-5">
          <FitText
            text="Hi, i'm hopex"
            className="hero-heading font-black uppercase leading-none tracking-tight"
          />
        </FadeIn>
      </div>

      <div className="relative flex flex-1 items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          a producer &amp; dj driven by crafting striking and unforgettable records
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
              {/* Spec's hero portrait. To go back to the HOPEX monogram,
                  point src at './assets/img/hopex-mark.webp'. */}
              <RemoteImg
                src={HERO_PORTRAIT}
                fallback="./assets/img/hopex-mark.webp"
                alt=""
                className="w-full"
                style={{ filter: 'drop-shadow(0 0 60px rgba(187, 204, 215, 0.35))' }}
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
