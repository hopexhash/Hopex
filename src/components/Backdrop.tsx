/**
 * The living background: three drifting colour fields under a film-grain layer.
 *
 * Fixed rather than per-section, so the colour moves continuously behind the
 * whole page instead of restarting at every section boundary. `pointer-events:
 * none` keeps it out of the way of everything above it.
 */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="orb"
        style={{
          top: '-10%',
          left: '-5%',
          width: '52vw',
          height: '52vw',
          background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)',
          animation: 'drift-a 28s ease-in-out infinite',
        }}
      />
      <div
        className="orb"
        style={{
          top: '25%',
          right: '-12%',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, rgba(233,53,199,0.45) 0%, rgba(233,53,199,0) 70%)',
          animation: 'drift-b 34s ease-in-out infinite',
        }}
      />
      <div
        className="orb"
        style={{
          bottom: '-15%',
          left: '20%',
          width: '48vw',
          height: '48vw',
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0) 70%)',
          animation: 'drift-c 40s ease-in-out infinite',
        }}
      />
      {/* Floor of darkness so text never sits on a bright field. */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 40%, rgba(8,8,10,0.25) 0%, rgba(8,8,10,0.85) 100%)' }} />
    </div>
  );
}
