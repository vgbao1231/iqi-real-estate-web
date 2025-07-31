'use client';

import { Fragment, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Arsenal } from 'next/font/google';

import Introduction from './sections/Introduction';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Overview from './sections/Overview';
import Contact from './sections/Contact';
import Location from './sections/Location';
import Production from './sections/Production';
import Amenity from './sections/Amenity';
import Policy from './sections/Policy';
import Timeline from './sections/Timeline';
import Agency from './sections/Agency';
import Cover from './sections/Cover';
import { properties } from '@/lib/property-data';

const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'], // Chỉ định độ đậm
  style: ['normal', 'italic'], // Thêm kiểu thường và nghiêng
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*                         DUMMY PROPERTY – STATIC DATA                       */
/* -------------------------------------------------------------------------- */
const property = properties[0];

/* -------------------------------------------------------------------------- */

export default function VietnamProductDetailPage() {
  /* ---------- Local state ---------- */
  const sections = useMemo(
    () => [
      {
        id: 'introduction',
        content: <Introduction data={property.introduction} />,
        label: 'Giới thiệu',
      },
      {
        content: (
          <Contact
            data={property.contact}
            products={property.production.products}
          />
        ),
      },
      {
        id: 'overview',
        content: <Overview data={property.overview} />,
        label: 'Tổng quan',
      },
      { content: <SectionBreak data={property.other.breakImages[0]} /> },
      {
        id: 'location',
        content: <Location data={property.location} />,
        label: 'Vị trí',
      },
      { content: <SectionBreak data={property.other.breakImages[1]} /> },
      {
        id: 'production',
        content: <Production data={property.production} />,
        label: 'Sản phẩm',
      },
      {
        content: (
          <Contact
            data={property.contact}
            products={property.production.products}
          />
        ),
      },
      { content: <SectionBreak data={property.other.breakImages[2]} /> },
      {
        id: 'amenity',
        content: <Amenity data={property.amenity} />,
        label: 'Tiện ích',
      },
      { content: <SectionBreak data={property.other.breakImages[3]} /> },
      {
        id: 'policy',
        content: <Policy data={property.other.policy} />,
        label: 'Chính sách',
      },
      {
        id: 'timeline',
        content: <Timeline data={property.other.timeline} />,
        label: 'Tiến độ',
      },
      { content: <SectionBreak data={property.other.breakImages[4]} /> },
      {
        id: 'agency',
        content: <Agency data={property.contact} />,
        label: 'Đại lý',
      },
      {
        content: (
          <Contact
            data={property.contact}
            products={property.production.products}
          />
        ),
      },
    ],
    []
  );

  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-r from-gray-50 to-white overflow-x-clip',
        arsenal.className
      )}
    >
      {/* ----------------------------------------------------------------------- */}
      {/* Cover – Header IQI                                                      */}
      {/* ----------------------------------------------------------------------- */}
      <Cover data={property.introduction} />

      {/* ----------------------------------------------------------------------- */}
      {/* Header – transparent overlay                                            */}
      {/* ----------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full bg-accent-card py-2 shadow-md">
        <div className="mx-auto overflow-x-auto px-4 scrollbar-hide">
          <div className="flex items-center justify-between">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-24 h-14 relative center-both ml-32 cursor-pointer"
            >
              <Image
                src={property.introduction.logoImages[0]}
                alt="Eco Retreat Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <nav className="flex justify-end mr-24">
              {sections.map(
                (item) =>
                  item.label && (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="text-foreground text-base font-bold hover:bg-transparent uppercase p-2"
                      onClick={() => {
                        const section = document.getElementById(item.id);
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.label}
                    </Button>
                  )
              )}
            </nav>
          </div>
        </div>
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
    <section className="relative min-h-screen center-both">
      <Image
        src={data}
        alt="Break Image"
        fill
        className="object-cover"
        priority
      />
    </section>
  );
