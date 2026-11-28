import { motion, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li';
}

/** Fades + lifts its children into view once, the first time they scroll on-screen. */
export function Reveal({ children, delay = 0, y = 24, as = 'div', ...rest }: RevealProps) {
  const Component = (as === 'li' ? motion.li : motion.div) as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
