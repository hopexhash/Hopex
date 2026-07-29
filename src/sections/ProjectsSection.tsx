import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { LiveProjectButton } from '../components/Buttons';
import RemoteImg from '../components/RemoteImg';
import { PROJECT_IMAGES } from '../assets';

const PROJECTS = [
  {
    n: '01',
    kind: 'Release',
    name: 'Conquer',
    href: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO',
    images: PROJECT_IMAGES[0],
    fallbacks: ['./assets/art/work-01.webp', './assets/art/work-02.webp', './assets/art/work-03.webp'],
  },
  {
    n: '02',
    kind: 'Release',
    name: 'Inferno',
    href: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO',
    images: PROJECT_IMAGES[1],
    fallbacks: ['./assets/art/work-04.webp', './assets/art/work-05.webp', './assets/art/work-06.webp'],
  },
  {
    n: '03',
    kind: 'Release',
    name: 'Fuego',
    href: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO',
    images: PROJECT_IMAGES[2],
    fallbacks: ['./assets/art/work-07.webp', './assets/art/work-08.webp', './assets/art/work-09.webp'],
  },
];

function Card({ p, index, total, progress }: { p: (typeof PROJECTS)[number]; index: number; total: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  // Cards further up the stack shrink as the ones below slide over them.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        style={{ scale, top: `${index * 28}px`, background: '#0C0C0C' }}
        className="relative w-full rounded-[40px] border-2 border-[#D7E2EA] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}>
              {p.n}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">{p.kind}</span>
              <span className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2rem)' }}>
                {p.name}
              </span>
            </div>
          </div>
          <LiveProjectButton href={p.href} />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <RemoteImg src={p.images[0]} fallback={p.fallbacks[0]} alt="" loading="lazy" className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <RemoteImg src={p.images[1]} fallback={p.fallbacks[1]} alt="" loading="lazy" className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          <div className="w-[60%]">
            <RemoteImg src={p.images[2]} fallback={p.fallbacks[2]} alt="" loading="lazy" className="h-full w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section
      id="releases"
      ref={ref}
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {PROJECTS.map((p, i) => (
          <Card key={p.n} p={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
