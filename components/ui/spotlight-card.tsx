'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SpotlightCard({
  children,
  className,
  onClick,
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from mouse to card center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      // Define proximity threshold (in pixels)
      const maxDistance = 400;

      // Calculate opacity based on distance (closer = more visible)
      let calculatedOpacity = 0;
      if (distance < maxDistance) {
        calculatedOpacity = 1 - distance / maxDistance;
      }

      setMousePosition({ x, y });
      setOpacity(calculatedOpacity);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const spotlightColor =
    theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)';

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden rounded-lg', className)}
      onClick={onClick}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
          opacity: opacity,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
