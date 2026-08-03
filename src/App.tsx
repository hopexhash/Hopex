import Backdrop from './components/Backdrop';
import Ticker from './components/Ticker';
import Hero from './sections/Hero';
import Music from './sections/Music';
import About from './sections/About';
import Listen from './sections/Listen';
import Booking from './sections/Booking';

const WORDS = ['Electronic', 'Trap', 'Future Bass', 'Amsterdam', 'Producer', 'DJ'];

export default function App() {
  return (
    <div id="top" style={{ background: 'var(--ink)', overflowX: 'clip' }}>
      <Backdrop />

      {/* Everything above the fixed backdrop. */}
      <div className="relative z-10">
        <Hero />

        <div className="border-y border-[color:var(--mist)]/10 py-5 sm:py-7" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <Ticker items={WORDS} seconds={30} className="text-[color:var(--mist)]/70" />
        </div>

        <Music />
        <About />

        <div className="border-y border-[color:var(--mist)]/10 py-5 sm:py-7" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <Ticker items={WORDS} reverse seconds={38} className="text-[color:var(--mist)]/40" />
        </div>

        <Listen />
        <Booking />
      </div>
    </div>
  );
}
