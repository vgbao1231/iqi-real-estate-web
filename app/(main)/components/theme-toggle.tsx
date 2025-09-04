'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ThemeToggle({ isDark }: { isDark: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'hover:bg-orange-300/10 dark:hover:bg-orange-900/20 bg-transparent',
            isDark
              ? 'text-white border-white/60 hover:text-white'
              : 'text-black dark:text-white border-black/30 dark:border-white/60'
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] bg-card/60">
        {[
          { label: 'Light Mode', value: 'light', icon: Sun },
          { label: 'Dark Mode', value: 'dark', icon: Moon },
          { label: 'System', value: 'system', icon: Monitor },
        ].map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn('cursor-pointer', theme === value && 'bg-accent/40')}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{label}</span>
            {theme === value && (
              <span className="ml-auto text-orange-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
