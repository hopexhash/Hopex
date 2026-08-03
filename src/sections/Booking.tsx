import Reveal from '../components/Reveal';
import Magnet from '../components/Magnet';
import FitText from '../components/FitText';

const MAIL = 'prodhopex@gmail.com';

export default function Booking() {
  return (
    <footer id="booking" className="relative px-5 pb-12 pt-24 sm:px-8 sm:pt-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--mist)]/45">
            Bookings &amp; demos
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <FitText text="GET IN TOUCH" className="display block font-black uppercase leading-[0.85] tracking-tighter" />
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex justify-center sm:mt-16">
            <Magnet padding={90} strength={5}>
              <a
                href={`mailto:${MAIL}`}
                className="inline-flex items-center rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03] sm:px-12 sm:py-5 sm:text-sm"
                style={{
                  background: 'linear-gradient(103deg, #7c3aed 0%, #e935c7 55%, #ff8a3d 100%)',
                  boxShadow: '0 8px 44px -8px rgba(233,53,199,0.6)',
                }}
              >
                {MAIL}
              </a>
            </Magnet>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center gap-3 border-t border-[color:var(--mist)]/10 pt-8 sm:mt-28 sm:flex-row sm:justify-between">
          <img src="./assets/img/hopex-mark.webp" alt="" width={28} height={28} className="h-7 w-7 object-contain opacity-60" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--mist)]/35">
            HOPEX — Amsterdam
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--mist)]/35">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
