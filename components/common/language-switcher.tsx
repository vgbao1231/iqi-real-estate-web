import { cn } from '@/lib/utils';

import { Languages, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function LanguageSwitcher({ isDark = false, className = '' }) {
  const [language, setLanguage] = useState('vi');

  const languages = [
    { code: 'vi', label: 'Tiếng Việt', icon: '🇻🇳' },
    { code: 'en', label: 'English', icon: '🇺🇸' },
    { code: 'ja', label: '日本語', icon: '🇯🇵' },
    { code: 'ko', label: '한국어', icon: '🇰🇷' },
  ];

  useEffect(() => {
    const cookie = document.cookie.match(/googtrans=\/vi\/(\w+)/);
    const langFromCookie = cookie?.[1] || 'vi';
    setLanguage(langFromCookie);
  }, []);

  const handleChangeLang = (code: string) => {
    document.cookie = `googtrans=/vi/${code}; path=/`;
    window.location.reload();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'hover:bg-orange-300/10 dark:hover:bg-orange-900/20 bg-transparent',
            isDark
              ? 'text-white border-white/60 hover:text-white'
              : 'text-black dark:text-white border-black/30 dark:border-white/60'
          )}
        >
          <Languages className="h-4 w-4 hidden md:block" />
          <span className="text-sm font-medium center-both">
            {/* Mobile: chỉ hiện icon */}
            <span className="text-lg md:hidden leading-none mb-0.5">
              {languages.find((l) => l.code === language)?.icon}
            </span>

            {/* Desktop: hiện label */}
            <span className="hidden md:inline">
              {languages.find((l) => l.code === language)?.label ?? language}
            </span>
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn('min-w-[160px] bg-card/60', className)}
      >
        {languages.map(({ code, label, icon }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleChangeLang(code)}
            className={cn(
              'cursor-pointer',
              language === code && 'bg-accent/40'
            )}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
