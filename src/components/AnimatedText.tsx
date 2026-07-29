import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/** One character, brightening as the paragraph passes through the viewport. */
function Char({ char, range, progress }: { char: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: 'relative' }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity }}>{char}</motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = [...text];

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((c, i) => (
        <Char
          key={i}
          char={c}
          progress={scrollYProgress}
          range={[i / chars.length, (i + 1) / chars.length]}
        />
      ))}
    </p>
  );
}
