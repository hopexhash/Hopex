/**
 * Continuously scrolling strip of words.
 *
 * The track holds the list twice and animates to exactly -50%, so the second
 * copy lands where the first started and the loop is invisible. Duplicating
 * once is enough for any list wider than the viewport; more copies just cost
 * layout.
 */
export default function Ticker({
  items,
  reverse = false,
  seconds = 32,
  className = '',
}: {
  items: string[];
  reverse?: boolean;
  seconds?: number;
  className?: string;
}) {
  const run = [...items, ...items];

  return (
    <div aria-hidden="true" className={`ticker-mask overflow-hidden ${className}`}>
      <div className={`ticker-track ${reverse ? 'reverse' : ''}`} style={{ animationDuration: `${seconds}s` }}>
        {run.map((word, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="px-6 font-black uppercase tracking-tight sm:px-9">{word}</span>
            <span className="text-[color:var(--magenta)]" aria-hidden="true">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
