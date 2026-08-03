import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import BrandIcon from '../components/BrandIcons';

const ARTIST = '0dE2azLipjakJifWO2xrOO';
const PROFILE = `https://open.spotify.com/artist/${ARTIST}`;

/**
 * A cross-origin iframe paints its own canvas, and that canvas is white. On a
 * black page a blocked Spotify embed is not a subtle degradation — it is a
 * full-width white slab. `color-scheme: dark` does not help, and neither does
 * the load event: a blocked frame fires `load` exactly like a good one
 * (verified), so there is nothing to react to after the fact.
 *
 * So the reachability question gets asked before the frame is ever mounted. If
 * the probe fails — blocker, privacy extension, offline — the embed is simply
 * never created and a dark card takes its place.
 */
export default function Music() {
  const [reachable, setReachable] = useState<boolean | null>(null);

  useEffect(() => {
    let live = true;
    fetch('https://open.spotify.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' })
      .then(() => live && setReachable(true))
      .catch(() => live && setReachable(false));
    return () => {
      live = false;
    };
  }, []);

  return (
    <section id="music" className="relative px-5 py-24 sm:px-8 sm:py-32 md:px-12">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--mist)]/45">
            Now playing
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="display mb-10 font-black uppercase leading-[0.85] tracking-tighter sm:mb-14"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 7.5rem)' }}
          >
            The music
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div
            className="flex items-center justify-center overflow-hidden rounded-3xl border border-[color:var(--mist)]/12"
            style={{ background: '#101014', minHeight: 420 }}
          >
            {reachable === true && (
              // Live from Spotify, so it updates itself when a record drops —
              // no hand-maintained tracklist to go stale.
              <iframe
                title="HOPEX on Spotify"
                src={`https://open.spotify.com/embed/artist/${ARTIST}?utm_source=generator&theme=0`}
                width="100%"
                height="420"
                style={{ border: 0, display: 'block', colorScheme: 'dark' }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            )}

            {reachable === false && (
              <div className="flex flex-col items-center gap-6 px-6 py-16 text-center">
                <BrandIcon name="spotify" className="h-12 w-12 text-[#1ED760]" />
                <p className="max-w-xs text-sm font-light leading-relaxed text-[color:var(--mist)]/55">
                  The Spotify player is blocked in this browser — the music is one tap away.
                </p>
                <a
                  href={PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#1ED760] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-[1.04]"
                >
                  Play on Spotify
                </a>
              </div>
            )}

            {reachable === null && (
              <div className="h-2 w-24 overflow-hidden rounded-full bg-[color:var(--mist)]/10">
                <div className="h-full w-1/3 rounded-full bg-[color:var(--mist)]/40" style={{ animation: 'ticker 1.1s linear infinite' }} />
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-[color:var(--mist)]/45">
            <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="wipe text-[color:var(--mist)]">
              Open full profile on Spotify
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
