'use client';

import { FadeIn } from '@/components/common/animations';
import Image from 'next/image';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Agency = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  return (
    <FadeIn delay={0.3}>
      <section
        ref={ref}
        id="agency"
        className="bg-background mx-auto w-full min-h-screen center-both py-16"
      >
        <div className="h-full w-full max-w-7xl center-both flex-col md:flex-row py-8 gap-8">
          {/* Left content */}
          <div className="relative w-full md:w-1/2 h-[85vh] center-both">
            <Image
              src={data.agencyImage}
              alt="Eco Retreat Experience Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right content */}
          <div className="md:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-5xl italic text-lime-500 mb-2">
                  {data.title}
                </h3>
                <div
                  className="space-y-2 text-lg text-foreground"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
});
Agency.displayName = 'Agency';
export default Agency;
