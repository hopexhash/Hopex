import BrandIcon from '../components/BrandIcons';
import FadeIn from '../components/FadeIn';

/**
 * `c` is the platform's own brand colour, used for the hover/focus glow only —
 * the resting state stays monochrome so eight buttons don't turn into confetti.
 */
const PLATFORMS = [
  { name: 'Spotify', icon: 'spotify', c: '#1ED760', url: 'https://open.spotify.com/artist/0dE2azLipjakJifWO2xrOO' },
  { name: 'Apple Music', icon: 'applemusic', c: '#FA243C', url: 'https://music.apple.com/us/artist/hopex/1211296904' },
  { name: 'SoundCloud', icon: 'soundcloud', c: '#FF5500', url: 'https://soundcloud.com/prodhopex' },
  { name: 'Beatport', icon: 'beatport', c: '#01FF95', url: 'https://www.beatport.com/artist/hopex/704053' },
  { name: 'YouTube', icon: 'youtube', c: '#FF0000', url: 'https://www.youtube.com/@HOPEX' },
  { name: 'Instagram', icon: 'instagram', c: '#E1306C', url: 'https://www.instagram.com/prodhopex/' },
  { name: 'X', icon: 'x', c: '#FFFFFF', url: 'https://x.com/prodhopex' },
  { name: 'Facebook', icon: 'facebook', c: '#0866FF', url: 'https://www.facebook.com/prodhopex/' },
  // TikTok is ready to go — drop the handle in and uncomment:
  // { name: 'TikTok', icon: 'tiktok', c: '#25F4EE', url: 'https://www.tiktok.com/@HANDLE' },
];

function PlatformButton({ p }: { p: (typeof PLATFORMS)[number] }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ['--c' as string]: p.c }}
      className="platform-btn group flex min-h-[104px] flex-col items-center justify-center gap-3 rounded-3xl border border-[#D7E2EA]/15 bg-[#141414] px-4 py-6 text-[#D7E2EA] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--c)] hover:text-[color:var(--c)] focus-visible:-translate-y-1 focus-visible:border-[color:var(--c)] focus-visible:text-[color:var(--c)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--c)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
    >
      <BrandIcon name={p.icon} className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10" />
      <span className="text-center text-sm font-medium uppercase tracking-wide sm:text-base">{p.name}</span>
    </a>
  );
}

export default function FooterSection() {
  return (
    <footer id="contact" className="px-5 pb-14 pt-24 sm:px-8 sm:pt-28 md:px-10 md:pt-32" style={{ background: '#0C0C0C' }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn
          as="h2"
          className="hero-heading mb-4 text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 11vw, 140px)' }}
        >
          Listen
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-center text-base uppercase tracking-wide text-[#D7E2EA]/60 sm:mb-16 sm:text-lg">
            Everywhere you stream
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <nav aria-label="Streaming and social platforms">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {PLATFORMS.map((p) => (
                <li key={p.name}>
                  <PlatformButton p={p} />
                </li>
              ))}
            </ul>
          </nav>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-14 border-t border-[#D7E2EA]/10 pt-10 text-center sm:mt-20">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/50">Bookings &amp; demos</p>
            <a
              href="mailto:prodhopex@gmail.com"
              className="inline-block break-all rounded-full px-2 font-medium text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-8 transition hover:decoration-[#D7E2EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C]"
              style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.75rem)' }}
            >
              prodhopex@gmail.com
            </a>
            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/35">
              HOPEX — Amsterdam
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
