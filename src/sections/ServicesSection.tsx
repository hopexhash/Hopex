import FadeIn from '../components/FadeIn';

const SERVICES = [
  { n: '01', name: 'Production', copy: 'Full original productions built from the ground up — arrangement, sound design and mixdown, delivered release-ready.' },
  { n: '02', name: 'Mix & Master', copy: 'Clean, loud, translation-tested masters that hold up on club systems, headphones and every streaming platform.' },
  { n: '03', name: 'Remixes', copy: 'Reworks that keep what makes a record recognisable and rebuild everything around it for the floor.' },
  { n: '04', name: 'Ghost Production', copy: 'Finished tracks produced under your name, with full rights transferred and complete confidentiality.' },
  { n: '05', name: 'DJ Sets', copy: 'Club and festival sets — Amsterdam, across Europe, and anywhere the booking makes sense.' },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="mb-16 text-center font-black uppercase sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0C0C0C' }}
      >
        Services
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((s, i) => (
          <FadeIn
            key={s.n}
            delay={i * 0.1}
            className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12"
            style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0C0C0C' }}>
              {s.n}
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', color: '#0C0C0C' }}>
                {s.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', color: '#0C0C0C', opacity: 0.6 }}
              >
                {s.copy}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
