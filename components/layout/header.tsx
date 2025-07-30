import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/common/theme-toggle';
import {
  Phone,
  ChevronDown,
  Building2,
  Clock4,
  Globe,
  Landmark,
  Newspaper,
  TreePalm,
  TrendingUp,
  Users,
  Menu,
  Smile,
  Languages,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FadeIn } from '../common/animations';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Header({
  enableHidden = true,
  enableToggleDark = true,
  className,
}: any) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState('vi');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const navMenus = [
    {
      label: 'Giới thiệu',
      items: [
        {
          label: 'Hình thành & Sứ mệnh',
          description: 'Tìm hiểu về sứ mệnh và tầm nhìn của chúng tôi',
          icon: <Users className="w-5 h-5 text-blue-500" />,
          href: '/about/mission',
        },
        {
          label: 'Juwai IQI và IQI Atlas',
          description: 'Hành trình hình thành và phát triển của IQI',
          icon: <Clock4 className="w-5 h-5 text-yellow-500" />,
          href: '/about/juwai',
        },
        {
          label: 'Đội ngũ',
          description: 'Gặp gỡ đội ngũ chuyên gia của chúng tôi',
          icon: <Landmark className="w-5 h-5 text-green-500" />,
          href: '/team',
        },
        {
          label: 'Văn hóa và môi trường',
          description: 'Khám phá môi trường làm việc và văn hóa tại IQI',
          icon: <Smile className="w-5 h-5 text-pink-500" />,
          href: '/about/culture',
        },
        {
          label: 'Thông tin liên hệ',
          description: 'Liên hệ với chúng tôi để được hỗ trợ nhanh chóng',
          icon: <Phone className="w-5 h-5 text-red-500" />,
          href: '/contact',
        },
      ],
    },
    {
      label: 'Sản phẩm',
      items: [
        {
          label: 'BDS Quốc tế',
          description: 'Bất động sản cao cấp tại các quốc gia phát triển',
          icon: <Globe className="w-5 h-5 text-blue-500" />,
          href: '/products/international',
        },
        {
          label: 'BDS Việt Nam',
          description: 'Căn hộ, nhà phố, đất nền tại TP.HCM và Hà Nội',
          icon: <Building2 className="w-5 h-5 text-orange-500" />,
          href: '/products/vietnam',
        },
        {
          label: 'BDS Nghỉ dưỡng',
          description: 'Resort, biệt thự biển, condotel cao cấp',
          icon: <TreePalm className="w-5 h-5 text-green-500" />,
          href: '/products/resort',
        },
      ],
    },
    {
      label: 'Tin tức',
      items: [
        {
          label: 'Thị trường',
          description: 'Cập nhật tin tức thị trường bất động sản',
          icon: <Newspaper className="w-5 h-5 text-red-500" />,
          href: '/market',
        },
        {
          label: 'Tin tức BDS',
          description: 'Tổng hợp thông tin mới nhất về bất động sản',
          icon: <Building2 className="w-5 h-5 text-blue-600" />,
          href: '/news',
        },
        {
          label: 'Xu hướng',
          description: 'Những xu hướng bất động sản nổi bật hiện nay',
          icon: <TrendingUp className="w-5 h-5 text-teal-500" />,
          href: '/trends',
        },
      ],
    },
    {
      label: 'Đối tác',
      href: '/partners',
    },
    {
      label: 'Cơ hội nghề nghiệp',
      href: '/careers',
    },
  ];

  const languages = [
    { code: 'vi', label: 'Tiếng Việt', icon: '🇻🇳' },
    { code: 'en', label: 'English', icon: '🇺🇸' },
    { code: 'ja', label: '日本語', icon: '🇯🇵' },
    { code: 'ko', label: '한국어', icon: '🇰🇷' },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'vi';
    setLanguage(savedLang);
  }, []);

  const handleChangeLang = (code: string) => {
    localStorage.setItem('language', code);
    setLanguage(code);

    document.cookie = `googtrans=/vi/${code}; path=/`;
    window.location.reload();
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Header scroll behavior
  useEffect(() => {
    if (!enableHidden) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
        setIsMobileMenuOpen(false);
      }

      setLastScrollY(currentScrollY);

      // Set header bgcolor for hero section
      const heroHeight = document.getElementById('hero')?.offsetHeight || 0;
      setIsDark(window.scrollY < heroHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, enableHidden]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isHeaderVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 z-50 w-full border-b border-gray-400/30 backdrop-blur-sm transition-all',
        enableToggleDark && isDark
          ? 'supports-[backdrop-filter]:bg-[#262626]/10 text-white'
          : 'supports-[backdrop-filter]:bg-white/10',
        className
      )}
    >
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Hamburger menu for mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              <Menu />
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="center-both hover:scale-105 relative w-[140px] h-[64px]"
          >
            {/* Logo for dark mode */}
            <Image
              src="/logo-detail-light.png"
              alt="logo"
              fill
              className="object-contain hidden dark:block"
            />
            <Image
              src={
                enableToggleDark && isDark
                  ? '/logo-detail-light.png'
                  : '/logo-detail-dark.png'
              }
              alt="logo"
              fill
              className="object-contain dark:hidden"
            />
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navMenus.map((menu) =>
              menu.items ? (
                <div key={menu.label} className="relative group">
                  <button className="flex items-center space-x-1 group/menu hover:text-orange-500 transition-all duration-300">
                    <span className="relative">
                      {menu.label}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r !from-orange-500 !to-orange-600 transition-all duration-300 group-hover/menu:w-full"></div>
                    </span>
                    <ChevronDown className="w-4 h-4 transition-all duration-300 group-hover/menu:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-72 bg-card/85 border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-foreground">
                    <div className="py-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group/item block transition-all duration-300 hover:bg-card/50"
                        >
                          <div className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              {item.icon}
                              <div className="relative">
                                <p className="font-medium text-sm group-hover/item:text-orange-500">
                                  {item.label}
                                </p>
                                {/* Underline hiệu ứng cho item.label */}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r !from-orange-500 !to-orange-600 transition-all duration-300 group-hover/item:w-full"></div>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={menu.label}
                  href={menu.href}
                  className="hover:text-orange-500 transition-all duration-300 relative group"
                >
                  {menu.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r !from-orange-500 !to-orange-600 transition-all group-hover:w-full duration-300"></div>
                </Link>
              )
            )}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <Phone
                  className={cn(
                    'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4',
                    enableToggleDark && isDark
                      ? 'text-white'
                      : 'dark:text-white'
                  )}
                />
                <Input
                  placeholder="Hotline: 0764 155 155"
                  className={cn(
                    'pl-10 w-52 bg-transparent',
                    enableToggleDark && isDark
                      ? 'placeholder:text-white text-white border-white/60'
                      : 'dark:placeholder:text-white border-black/30 dark:border-white/60'
                  )}
                  readOnly
                />
              </div>
            </div>
            <ThemeToggle isDark={enableToggleDark && isDark} />
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'hover:bg-orange-300/10 dark:hover:bg-orange-900/20 bg-transparent',
                      isDark
                        ? 'text-white border-white/60'
                        : 'text-black dark:text-white border-black/30 dark:border-white/60'
                    )}
                  >
                    <Languages className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {languages.find((l) => l.code === language)?.label ??
                        language}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] bg-card/60"
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

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                {isLanguageMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && isHeaderVisible && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#262626]/60 border-t border-border/80 shadow-xl rounded-b-xl overflow-hidden backdrop-blur-md"
          >
            <div className="flex flex-col space-y-4 px-5 py-4">
              {navMenus.map((menu, index) => (
                <FadeIn key={menu.label} delay={index * 0.1} direction="up">
                  {menu.items ? (
                    <div className="mb-1">
                      <p className="font-semibold text-lg text-white">
                        {menu.label}
                      </p>
                      <div className="flex flex-col ml-4 mt-1 space-y-2">
                        {menu.items.map((item, idx) => (
                          <FadeIn
                            key={item.href}
                            delay={0.1 + idx * 0.05}
                            direction="up"
                          >
                            <Link
                              href={item.href}
                              className="text-lg text-gray-200 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 pl-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          </FadeIn>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/careers"
                      className="font-semibold text-lg text-white hover:text-orange-400 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {menu.label}
                    </Link>
                  )}
                </FadeIn>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
