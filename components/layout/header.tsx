import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/common/theme-toggle';
import {
  Search,
  Phone,
  ChevronDown,
  Building2,
  Clock4,
  Globe,
  Landmark,
  Newspaper,
  ShieldCheck,
  TreePalm,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDark, setIsDark] = useState(true);

  const navMenus = [
    {
      label: 'Giới thiệu',
      items: [
        {
          label: 'Về IQI Vietnam',
          description: 'Tìm hiểu về sứ mệnh và tầm nhìn của chúng tôi',
          icon: <Users className="w-5 h-5 text-blue-500" />,
          href: '/about',
        },
        {
          label: 'Đội ngũ',
          description: 'Gặp gỡ đội ngũ chuyên gia của chúng tôi',
          icon: <Landmark className="w-5 h-5 text-green-500" />,
          href: '/team',
        },
        {
          label: 'Lịch sử phát triển',
          description: 'Hành trình hình thành và phát triển của IQI',
          icon: <Clock4 className="w-5 h-5 text-yellow-500" />,
          href: '/about/history',
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
        {
          label: 'Đối tác',
          description: 'Mạng lưới đối tác quốc tế và trong nước',
          icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
          href: '/partners',
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
          href: '/news/market',
        },
        {
          label: 'Tin tức BDS',
          description: 'Tổng hợp thông tin mới nhất về bất động sản',
          icon: <Building2 className="w-5 h-5 text-blue-600" />,
          href: '/news/real-estate',
        },
        {
          label: 'Xu hướng',
          description: 'Những xu hướng bất động sản nổi bật hiện nay',
          icon: <TrendingUp className="w-5 h-5 text-teal-500" />,
          href: '/news/trends',
        },
      ],
    },
    {
      label: 'Tuyển dụng',
    },
  ];

  // Header scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);

      // Set header bgcolor for hero section
      const heroHeight = document.getElementById('hero')?.offsetHeight || 0;
      setIsDark(window.scrollY < heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHeaderVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx(
        'fixed top-0 z-50 w-full border-b border-gray-400/30 backdrop-blur-sm transition-all',
        isDark
          ? 'supports-[backdrop-filter]:bg-[#262626]/10 text-white'
          : 'supports-[backdrop-filter]:bg-white/10'
      )}
    >
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center"
            >
              {/* Logo for dark mode */}
              <Image
                src="/logo-dark.svg"
                alt="logo"
                width={100}
                height={40}
                className="hidden dark:block"
              />

              {/* Logo for light mode */}
              <Image
                src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
                alt="logo"
                width={100}
                height={40}
                className="dark:hidden"
              />
            </motion.div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navMenus.map((menu) =>
              menu.items ? (
                <div key={menu.label} className="relative group">
                  <button className="flex items-center space-x-1 group/menu hover:text-orange-500 transition-all duration-300">
                    <span className="relative">
                      {menu.label}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover/menu:w-full"></div>
                    </span>
                    <ChevronDown className="w-4 h-4 transition-all duration-300 group-hover/menu:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-72 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group/item block transition-all duration-300 hover:bg-muted"
                        >
                          <div className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              {item.icon}
                              <p className="font-medium text-sm text-gray-800 group-hover/item:text-orange-500 relative">
                                {item.label}
                                {/* Underline hiệu ứng cho item.label */}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover/item:w-full"></div>
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
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
                  href="/careers"
                  className="hover:text-orange-500 transition-all duration-300 relative group"
                >
                  {menu.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all group-hover:w-full duration-300"></div>
                </Link>
              )
            )}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <Search
                  className={clsx(
                    'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4',
                    isDark ? 'text-white' : 'dark:text-white'
                  )}
                />
                <Input
                  placeholder="Tìm nhanh..."
                  className={clsx(
                    'pl-10 w-48 bg-transparent transition-all',
                    isDark
                      ? 'placeholder:text-white text-white border-white/60 hover:bg-black/20 focus:bg-black/20'
                      : ' dark:placeholder:text-white border-black/30 dark:border-white/60 dark:hover:bg-black/20 dark:focus:bg-black/20'
                  )}
                />
              </div>
              <div className="relative">
                <Phone
                  className={clsx(
                    'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4',
                    isDark ? 'text-white' : 'dark:text-white'
                  )}
                />
                <Input
                  placeholder="Hotline: 1900 1234"
                  className={clsx(
                    'pl-10 w-48 bg-transparent',
                    isDark
                      ? 'placeholder:text-white text-white border-white/60'
                      : 'dark:placeholder:text-white border-black/30 dark:border-white/60'
                  )}
                  readOnly
                />
              </div>
            </div>
            <ThemeToggle isDark={isDark} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
