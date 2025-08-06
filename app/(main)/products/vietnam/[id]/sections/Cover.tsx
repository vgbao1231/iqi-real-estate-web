'use client';

import { FadeIn } from '@/components/common/animations';
import Header from '@/app/(main)/layout/header';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Cover = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    if (window !== window.parent) {
      setIsEmbedded(true); // đang được nhúng trong iframe
    }
  }, []);

  return (
    <div>
      {/* Header */}
      {!isEmbedded && (
        <Header enableHidden={false} className={inter.className} />
      )}

      <section
        ref={ref}
        id="hero"
        className="relative min-h-screen center-both"
      >
        {/* Background image full screen */}
        <Image
          src={data.coverImage}
          alt="Eco Retreat Cover Background"
          fill
          className="object-cover text-shadow-lg shadow-md"
          priority
        />

        <div className="bg-gradient-to-b from-transparent via-black/20 to-transparent absolute inset-0 z-10"></div>
        <div className="relative z-20 center-both flex-col gap-2 p-8 text-center text-white">
          {/* Logo */}
          <FadeIn className="w-72 h-44 relative center-both">
            <Image
              src={data.logoImages[data.coverLogoIndex]}
              alt="Eco Retreat Logo"
              fill
              className="object-contain"
              priority
            />
          </FadeIn>

          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-4xl mx-auto">
            <FadeIn
              delay={0.2}
              className="text-3xl drop-shadow-lg md:text-5xl text-nowrap py-4 font-bold bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent"
            >
              {data.coverTitle}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
});
Cover.displayName = 'Cover';
export default Cover;
