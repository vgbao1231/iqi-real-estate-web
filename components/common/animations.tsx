'use client';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  delay = 0,
  direction = 'left',
  className = '',
}: FadeInProps) {
  const directions = {
    up: { y: 100, x: 0 },
    down: { y: -100, x: 0 },
    left: { y: 0, x: -100 },
    right: { y: 0, x: 100 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps extends ComponentProps<typeof motion.div> {
  children: ReactNode;
  delay?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  className = '',
  ...rest
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

import { useEffect, useState } from 'react';

export function CountUp({
  end,
  duration = 2,
  delay = 0,
}: {
  end: number;
  duration?: number;
  delay?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const controls = animate(count, end, {
        duration,
        delay,
        onComplete: () => setHasAnimated(true),
      });
      return controls.stop; // cleanup
    }
  }, [count, end, duration, delay, hasAnimated]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
}
