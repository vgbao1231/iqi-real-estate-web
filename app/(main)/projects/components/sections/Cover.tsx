'use client';

import { DoorOpen, FadeIn } from '@/components/common/animations';
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
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen center-both overflow-hidden" // Use flex for better centering
    >
      {/* Header */}
      {!isEmbedded && (
        <Header enableHidden={false} className={inter.className} />
      )}
      {/* Background image full screen */}
      <Image
        src={data.coverImage}
        alt="Eco Retreat Cover Background"
        fill
        className="object-cover" // Removed text/shadow classes
        priority
      />

      <div className="bg-gradient-to-b from-transparent via-black/20 to-transparent absolute inset-0 z-10"></div>

      {/* Main content container with responsive padding and gap */}
      <div className="relative z-20 flex flex-col items-center gap-4 p-4 text-center text-white md:p-8">
        {/* Logo with responsive sizing */}
        <FadeIn className="relative w-48 h-32 md:w-72 md:h-44">
          <Image
            src={data.logoImages[data.coverLogoIndex]}
            alt="Eco Retreat Logo"
            fill
            className="object-contain"
            priority
          />
        </FadeIn>

        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-4 mx-auto text-center text-white">
          <DoorOpen
            // Text wraps on mobile, becomes nowrap on medium screens and up.
            // Font size is already responsive (3xl on mobile, 5xl on medium+)
            className="text-3xl drop-shadow-lg md:text-5xl text-wrap md:text-nowrap py-4 font-bold bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent"
          >
            {data.coverTitle}
          </DoorOpen>
        </div>
      </div>
    </section>
  );
});
Cover.displayName = 'Cover';
export default Cover;
