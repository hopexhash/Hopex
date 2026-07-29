import { useEffect, useRef, useState } from 'react';
import RemoteImg from '../components/RemoteImg';
import { MARQUEE } from '../assets';

// Split per the spec: row one takes the first eleven, row two the remaining ten.
const ROW_1 = MARQUEE.slice(0, 11);
const ROW_2 = MARQUEE.slice(11);

/** Local artwork stands in for any preview whose host stops serving it. */
const localFallback = (i: number) => `./assets/art/tile-${String((i % 12) + 1).padStart(2, '0')}.webp`;

function Row({ tiles, seed }: { tiles: string[]; seed: number }) {
  return (
    <div className="flex gap-3" style={{ willChange: 'transform' }}>
      {[...tiles, ...tiles, ...tiles].map((src, i) => (
        <div key={i} className="overflow-hidden rounded-2xl" style={{ width: 420, height: 270, flex: 'none' }}>
          <RemoteImg
            src={src}
            fallback={localFallback(seed + i)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
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
      aria-hidden="true"
      className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ background: '#0C0C0C' }}
    >
      <div style={{ transform: `translateX(${shift}px)`, willChange: 'transform' }}>
        <Row tiles={ROW_1} seed={0} />
      </div>
      <div style={{ transform: `translateX(${-shift}px)`, willChange: 'transform' }}>
        <Row tiles={ROW_2} seed={5} />
      </div>
    </section>
  );
}
