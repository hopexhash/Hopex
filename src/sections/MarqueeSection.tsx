import { useEffect, useRef, useState } from 'react';

const TILES = Array.from({ length: 12 }, (_, i) => `./assets/art/tile-${String(i + 1).padStart(2, '0')}.webp`);
const ROW_1 = TILES.slice(0, 6);
const ROW_2 = TILES.slice(6);

function Row({ images, direction }: { images: string[]; direction: 1 | -1 }) {
  return (
    <div className="flex gap-3" style={{ willChange: 'transform' }}>
      {[...images, ...images, ...images].map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="rounded-2xl object-cover"
          style={{ width: 420, height: 270, flex: 'none' }}
          data-dir={direction}
        />
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
        <Row images={ROW_1} direction={1} />
      </div>
      <div style={{ transform: `translateX(${-shift}px)`, willChange: 'transform' }}>
        <Row images={ROW_2} direction={-1} />
      </div>
    </section>
  );
}
