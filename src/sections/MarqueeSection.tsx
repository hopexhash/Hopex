import { useEffect, useRef, useState } from 'react';

/**
 * Words rather than track titles: these are all things that are actually true
 * of HOPEX, so the strip reads as a statement instead of a colour swatch —
 * without inventing a discography.
 */
const TILES = [
  { img: './assets/art/tile-01.webp', label: 'Electronic' },
  { img: './assets/art/tile-02.webp', label: 'Trap' },
  { img: './assets/art/tile-03.webp', label: 'Future Bass' },
  { img: './assets/art/tile-04.webp', label: 'Amsterdam' },
  { img: './assets/art/tile-05.webp', label: 'Producer' },
  { img: './assets/art/tile-06.webp', label: 'DJ' },
  { img: './assets/art/tile-07.webp', label: 'Mixing' },
  { img: './assets/art/tile-08.webp', label: 'Mastering' },
  { img: './assets/art/tile-09.webp', label: 'Sound Design' },
  { img: './assets/art/tile-10.webp', label: 'Remixes' },
  { img: './assets/art/tile-11.webp', label: 'Beats' },
  { img: './assets/art/tile-12.webp', label: 'Studio' },
];

const ROW_1 = TILES.slice(0, 6);
const ROW_2 = TILES.slice(6);

function Row({ tiles }: { tiles: typeof TILES }) {
  return (
    <div className="flex gap-3" style={{ willChange: 'transform' }}>
      {[...tiles, ...tiles, ...tiles].map((t, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl"
          style={{ width: 'clamp(220px, 46vw, 420px)', height: 'clamp(150px, 30vw, 270px)', flex: 'none' }}
        >
          <img src={t.img} alt="" loading="lazy" className="h-full w-full object-cover" />
          {/* Scrim: the tiles are light in places, and white-on-gradient alone
              is not reliably legible across twelve different artworks. */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(12,12,12,0) 35%, rgba(12,12,12,0.75) 100%)' }}
          />
          <span
            className="absolute bottom-4 left-5 font-black uppercase leading-none tracking-tight text-white sm:bottom-5 sm:left-6"
            style={{ fontSize: 'clamp(1.1rem, 3.4vw, 2.25rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Two rows that slide in opposite directions as the page scrolls past. */
export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const shift = offset - 200;

  return (
    <section
      ref={ref}
      // Each label appears three times over, so this is decoration for a
      // screen reader even though it now carries words.
      aria-hidden="true"
      className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ background: '#0C0C0C' }}
    >
      <div style={{ transform: `translateX(${shift}px)`, willChange: 'transform' }}>
        <Row tiles={ROW_1} />
      </div>
      <div style={{ transform: `translateX(${-shift}px)`, willChange: 'transform' }}>
        <Row tiles={ROW_2} />
      </div>
    </section>
  );
}
