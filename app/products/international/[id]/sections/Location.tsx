'use client';

import { FadeIn, SlideIn } from '@/components/common/animations';
import Image from 'next/image';
import { forwardRef } from 'react';

const Location = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  return (
    <section ref={ref} id="location">
      <div className="relative min-h-screen center-both py-16">
        {/* Background image full screen */}
        <Image
          src={data.backgroundImage}
          alt="Eco Retreat Background"
          fill
          className="object-cover object-right"
          priority
        />

        {/* Content */}
        <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 gap-6">
          {/* Left content */}
          <FadeIn className="md:w-1/2 space-y-4 leading-relaxed text-white">
            <div dangerouslySetInnerHTML={{ __html: data.title }} />
            <div
              className="space-y-4 text-lg text-white/90"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </FadeIn>

          {/* Right hero image */}
          <SlideIn
            direction="right"
            className="relative md:w-1/2 w-full h-[85vh] center-both"
          >
            <Image
              src={data.locationImage}
              alt="Eco Retreat Hero"
              fill
              className="object-contain shadow-lg rounded-sm"
              priority
            />
          </SlideIn>
        </div>
      </div>
    </section>
  );
});

Location.displayName = 'Location';
export default Location;
