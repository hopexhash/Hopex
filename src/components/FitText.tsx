import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Sizes a single line of text so it exactly spans its container.
 *
 * A fixed `vw` font-size can't do this reliably: the right value depends on the
 * character count and on how wide the typeface is. "Hi, i'm hopex" in Kanit
 * needs a different vw than the same line in the fallback face, so a hard-coded
 * size either overflows or leaves a gap. Measuring sidesteps both, and
 * re-measuring on `fonts.ready` catches the moment Kanit swaps in.
 *
 * Deliberately no React state: measuring has to put a probe size on the element,
 * and if the computed result matched the previous state React would skip the
 * re-render and leave the probe size sitting in the DOM. Writing the final size
 * straight to the node makes the operation idempotent.
 */
export default function FitText({ text, className }: { text: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  const fit = () => {
    const w = wrap.current;
    const l = line.current;
    if (!w || !l) return;

    const available = w.clientWidth;
    if (!available) return;

    // The span is inline-block on purpose: it shrink-wraps its content and is
    // free to overflow the parent, so offsetWidth is the true text width.
    // A block span would be clamped to the container and every measurement
    // would come back equal to the space available, fitting nothing.
    const PROBE = 100;
    l.style.fontSize = `${PROBE}px`;
    const natural = l.offsetWidth;
    if (natural > 0) l.style.fontSize = `${(PROBE * available) / natural}px`;
  };

  useLayoutEffect(fit, [text]);

  useEffect(() => {
    window.addEventListener('resize', fit, { passive: true });
    document.fonts?.ready.then(fit).catch(() => {});
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div ref={wrap} className="w-full">
      <span
        ref={line}
        className={className}
        style={{ display: 'inline-block', whiteSpace: 'nowrap', fontSize: '13vw' }}
      >
        {text}
      </span>
    </div>
  );
}
