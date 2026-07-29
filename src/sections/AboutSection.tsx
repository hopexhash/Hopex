import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import { ContactButton } from '../components/Buttons';
import RemoteImg from '../components/RemoteImg';
import { ABOUT_DECOR } from '../assets';

const ABOUT =
  "With more than seven years behind the desk, i focus on electronic, trap and future bass — records built to hit hard on a system and stay with you after. I love working with artists who want something that stands apart. Let's build something incredible together!";

/** The four floating 3D marks in the corners. */
const CORNERS = [
  { src: ABOUT_DECOR.moon, fb: './assets/art/tile-01.webp', cls: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]', delay: 0.1, x: -80 },
  { src: ABOUT_DECOR.object, fb: './assets/art/tile-05.webp', cls: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]', delay: 0.25, x: -80 },
  { src: ABOUT_DECOR.lego, fb: './assets/art/tile-08.webp', cls: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]', delay: 0.15, x: 80 },
  { src: ABOUT_DECOR.group, fb: './assets/art/tile-11.webp', cls: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]', delay: 0.3, x: 80 },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10">
      {CORNERS.map((c) => (
        <FadeIn key={c.cls} delay={c.delay} x={c.x} y={0} duration={0.9} className={`pointer-events-none absolute ${c.cls}`}>
          <RemoteImg src={c.src} fallback={c.fb} alt="" loading="lazy" className="w-full" />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </FadeIn>

        <AnimatedText
          text={ABOUT}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>

      <div className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
