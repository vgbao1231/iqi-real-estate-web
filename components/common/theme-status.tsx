'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon } from 'lucide-react';

export function ThemeStatus() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Badge
        variant="outline"
        className="rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 flex items-center gap-2 hover:bg-muted transition-colors"
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
        <span className="capitalize">{resolvedTheme}</span>
      </Badge>
    </div>
  );
}
