import BrandIcon from '../components/BrandIcons';
import Reveal from '../components/Reveal';

/**
 * `c` is each platform's own brand colour, used only for the hover and focus
 * state. Eight saturated tiles sitting lit at rest would read as confetti.
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
  // TikTok is ready — drop in the handle and uncomment:
  // { name: 'TikTok', icon: 'tiktok', c: '#25F4EE', url: 'https://www.tiktok.com/@HANDLE' },
];

export default function Listen() {
  return (
    <section id="listen" className="relative px-5 py-24 sm:px-8 sm:py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--mist)]/45">
            Everywhere you stream
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mb-12 text-center font-black uppercase leading-[0.85] tracking-tighter sm:mb-16" style={{ fontSize: 'clamp(2.75rem, 11vw, 7.5rem)' }}>
            Listen
          </h2>
        </Reveal>

        <nav aria-label="Streaming and social platforms">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {PLATFORMS.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.05}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ['--c' as string]: p.c }}
                    className="group flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-2xl border border-[color:var(--mist)]/12 px-3 py-6 text-[color:var(--mist)]/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--c)] hover:text-[color:var(--c)] focus-visible:-translate-y-1.5 focus-visible:border-[color:var(--c)] focus-visible:text-[color:var(--c)]"
                  >
                    <BrandIcon name={p.icon} className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
                    <span className="text-center text-[11px] font-medium uppercase tracking-[0.12em] sm:text-xs">
                      {p.name}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
