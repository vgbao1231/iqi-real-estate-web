'use client';

import type React from 'react';

import { useState, useRef, type MouseEvent } from 'react';
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
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const spotlightColor =
    theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)';

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-lg cursor-pointer transition-all',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
