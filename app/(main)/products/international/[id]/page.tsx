'use client';

import { Fragment, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Arsenal } from 'next/font/google';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { properties } from '@/lib/property-data';
import { usePathname, useRouter } from 'next/navigation';
import Introduction from '@/app/(main)/products/components/sections/Introduction';
import Agency from '@/app/(main)/products/components/sections/Agency';
import Amenity from '@/app/(main)/products/components/sections/Amenity';
import Cover from '@/app/(main)/products/components/sections/Cover';
import Overview from '@/app/(main)/products/components/sections/Overview';
import Policy from '@/app/(main)/products/components/sections/Policy';
import Production from '@/app/(main)/products/components/sections/Production';
import Siteplan from '@/app/(main)/products/components/sections/Siteplan';
import Timeline from '@/app/(main)/products/components/sections/Timeline';
import Location from '@/app/(main)/products/components/sections/Location';
import Contact from '@/app/(main)/products/components/sections/Contact';
import { Menu, X } from 'lucide-react';

const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'], // Chỉ định độ đậm
  style: ['normal', 'italic'], // Thêm kiểu thường và nghiêng
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*                         DUMMY PROPERTY - STATIC DATA                       */
/* -------------------------------------------------------------------------- */
const property = properties[0];

/* -------------------------------------------------------------------------- */

export default function ProductDetailPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  /* ---------- Local state ---------- */
  const router = useRouter();
  const pathname = usePathname();

  const sections = useMemo(
    () => [
      {
        id: 'introduction',
        content: <Introduction data={property.introduction} />,
        label: 'Giới thiệu',
      },
      { content: <SectionBreak data={property.other.breakImages[0]} /> },
      {
        id: 'overview',
        content: <Overview data={property.overview} />,
        label: 'Tổng quan',
      },
      { content: <SectionBreak data={property.other.breakImages[1]} /> },
      {
        content: <Contact data={property.contact} />,
      },
      {
        id: 'amenity',
        content: <Amenity data={property.amenity} />,
        label: 'Tiện ích',
      },
      { content: <SectionBreak data={property.other.breakImages[2]} /> },
      {
        id: 'location',
        content: <Location data={property.location} />,
        label: 'Vị trí',
      },
      { content: <SectionBreak data={property.other.breakImages[3]} /> },
      {
        id: 'siteplan',
        content: <Siteplan data={property.siteplan} />,
        label: 'Mặt bằng',
      },
      ...(property.siteplan?.view360?.length > 0
        ? [
            {
              id: '360-view',
              content: <></>,
              label: '360 View',
              action: () => router.push(`${pathname}/360-view`),
            },
          ]
        : []),
      {
        id: 'production',
        content: <Production data={property.production} />,
        label: 'Sản phẩm',
      },
      {
        content: <Contact data={property.contact} />,
      },
      { content: <SectionBreak data={property.other.breakImages[4]} /> },

      {
        id: 'policy',
        content: <Policy data={property.other.policy} />,
        label: 'Chính sách',
      },
      { content: <SectionBreak data={property.other.breakImages[5]} /> },
      {
        id: 'timeline',
        content: <Timeline data={property.other.timeline} />,
        label: 'Tiến độ',
      },
      { content: <SectionBreak data={property.other.breakImages[6]} /> },
      {
        id: 'agency',
        content: <Agency data={property.other.agency} />,
        label: 'Đại lý',
      },
      {
        content: <Contact data={property.contact} />,
      },
    ],
    [pathname, router]
  );

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
      <Cover data={property.introduction} />

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
                property.introduction.logoImages[
                  property.introduction.headerLogoIndex
                ]
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
              (item) =>
                item.label && (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="text-sm font-bold uppercase p-2 hover:bg-accent hover:text-accent-foreground lg:text-base"
                    onClick={() => handleLinkClick(item)}
                  >
                    {item.label}
                  </Button>
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
              (item) =>
                item.label && (
                  <Button
                    key={`mobile-${item.id}`}
                    variant="ghost"
                    className="justify-start p-4 text-base font-semibold"
                    onClick={() => handleLinkClick(item)}
                  >
                    {item.label}
                  </Button>
                )
            )}
          </nav>
        )}
      </header>

      {/* ----------------------------------------------------------------------- */}
      {/* Conditional sections                                                    */}
      {/* ----------------------------------------------------------------------- */}
      {sections.map((section, idx) => (
        <Fragment key={section.id || idx}>{section.content}</Fragment>
      ))}
    </div>
  );
}

const SectionBreak = ({ data }: { data: string }) =>
  data && (
    <section className="w-full">
      <Image
        src={data}
        alt="Break Image"
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
    </section>
  );
