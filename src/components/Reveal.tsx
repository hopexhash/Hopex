import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * Scroll-triggered entrance.
 *
 * `amount: 0` with a positive root margin fires as soon as any part of the
 * element is near the viewport. Waiting for a fraction of a tall element to be
 * visible means a full-height section only animates once you have already
 * scrolled past its top edge, which looks like nothing happened.
 *
 * With Reduce Motion on it renders in place at full opacity rather than
 * animating — no travel, but nothing hidden either.
 */
export default function Reveal({ children, delay = 0, y = 24, className, once = true }: Props) {
  const still = useReducedMotion();

  if (still) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -60px 0px', amount: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
