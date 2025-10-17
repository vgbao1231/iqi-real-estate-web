'use client';

import { Fragment, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Arsenal } from 'next/font/google';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import Introduction from '@/app/(main)/projects/components/sections/Introduction';
import Amenity from '@/app/(main)/projects/components/sections/Amenity';
import Cover from '@/app/(main)/projects/components/sections/Cover';
import Overview from '@/app/(main)/projects/components/sections/Overview';
import Production from '@/app/(main)/projects/components/sections/Production';
import Siteplan from '@/app/(main)/projects/components/sections/Siteplan';
import Location from '@/app/(main)/projects/components/sections/Location';
// import Contact from '@/app/(main)/projects/components/sections/Contact';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useGetPublicProjectByIdQuery } from '@/features/project/projectApi';
import LoadingScreen from '@/components/common/loading-screen';
import { mockProject } from '@/constants/mock-project';
import Contact from '@/app/(main)/projects/components/sections/Contact';

const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'], // Chỉ định độ đậm
  style: ['normal', 'italic'], // Thêm kiểu thường và nghiêng
  display: 'swap',
});

//TODO: xóa mock data khi deploy production
export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project = mockProject } = useGetPublicProjectByIdQuery(
    id as string,
    {
      skip: !id,
    }
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = (item: any) => {
    if (item.dropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    } else if (item.href) {
      window.open(item.href, '_blank');
    } else {
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.location.hash = item.id;
      }
      setIsMenuOpen(false); // Close menu after clicking a link
    }
  };

  /* ---------- Local state ---------- */
  const pathname = usePathname();

  const sections: any = useMemo(() => {
    if (!project) return [];

    // sections cơ bản theo thứ tự
    return [
      {
        id: 'introduction',
        content: <Introduction data={project.introduction} />,
        label: 'Giới thiệu',
      },
      {
        id: 'overview',
        content: <Overview data={project.overview} />,
        label: 'Tổng quan',
      },
      {
        id: 'amenity',
        content: <Amenity data={project.amenity} />,
        label: 'Tiện ích',
      },
      {
        id: 'location',
        content: <Location data={project.location} />,
        label: 'Vị trí',
      },
      {
        id: 'siteplan',
        content: <Siteplan data={project.siteplan} />,
        label: 'Mặt bằng',
      },
      {
        id: '360-view',
        href: project.siteplan.view360,
        label: '360 View',
      },
      {
        id: 'production',
        content: <Production data={project.production} />,
        label: 'Sản phẩm',
      },
      { id: 'contact', content: <Contact /> },
    ];
  }, [project]);

  if (!project)
    return <LoadingScreen loadingText="Đang tải thông tin chi tiết dự án" />;

  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-r from-gray-50 to-white overflow-x-clip',
        arsenal.className
      )}
    >
      {/* ----------------------------------------------------------------------- */}
      {/* Cover - Header IQI                                                      */}
      {/* ----------------------------------------------------------------------- */}
      <Cover data={project.introduction} />

      {/* ----------------------------------------------------------------------- */}
      {/* Header - transparent overlay                                            */}
      {/* ----------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 shadow-md backdrop-blur">
        <div className="container mx-auto flex h-12 md:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative h-14 w-24 cursor-pointer"
          >
            <Image
              src={
                project.introduction.logoImages[
                  project.introduction.headerLogoIndex
                ]?.url || 'placeholder.svg'
              }
              alt="Eco Retreat Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden items-center gap-2 md:flex">
            {sections.map(
              (item: any) =>
                item.label && (
                  <div className="relative group" key={item.id}>
                    <Button
                      variant="ghost"
                      className="text-sm font-bold uppercase p-2 hover:bg-accent/20 hover:text-accent-foreground lg:text-base group/menu"
                      onClick={() => handleLinkClick(item)}
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDown className="w-4 h-4 transition-all duration-300 group-hover/menu:rotate-180" />
                      )}
                    </Button>
                    {item.dropdown && (
                      <div className="absolute top-full left-0 w-fit bg-background border rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-foreground">
                        <div className="py-2">
                          {item.dropdown.map((subnav: any) => (
                            <Link
                              key={subnav.href}
                              href={subnav.href}
                              className="group/item block py-2 px-4"
                            >
                              <p className="font-bold text-nowrap uppercase group-hover/item:text-orange-500">
                                {subnav.label}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </nav>

          {/* Mobile Menu Button (Hidden on Desktop) */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Appears when isMenuOpen is true) */}
        {isMenuOpen && (
          <nav className="absolute left-0 top-full flex w-full flex-col border-t bg-background p-4 shadow-lg md:hidden">
            {sections.map(
              (item: any) =>
                item.label && (
                  <div key={`mobile-${item.id}`}>
                    <Button
                      variant="ghost"
                      className="justify-start p-4 text-base font-semibold"
                      onClick={() => handleLinkClick(item)}
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDown
                          className={cn('w-4 h-4 transition-all duration-300', {
                            'rotate-180': isDropdownOpen,
                          })}
                        />
                      )}
                    </Button>
                    {item.dropdown && isDropdownOpen && (
                      <div className="pl-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                        {item.dropdown.map((subnav: any) => (
                          <Link
                            key={subnav.href}
                            href={`${pathname}${subnav.href}`}
                            className="block text-gray-600 py-2 text-sm font-bold"
                          >
                            {subnav.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
            )}
          </nav>
        )}
      </header>

      {/* ----------------------------------------------------------------------- */}
      {/* Conditional sections                                                    */}
      {/* ----------------------------------------------------------------------- */}
      {sections.map(
        (section: any, idx: any) =>
          section.content && (
            <Fragment key={section.id || idx}>{section.content}</Fragment>
          )
      )}
    </div>
  );
}
