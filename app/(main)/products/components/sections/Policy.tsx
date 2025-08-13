'use client';

import { FadeIn } from '@/components/common/animations';
import Image from 'next/image';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Policy = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  return (
    <FadeIn delay={0.3}>
      <section
        ref={ref}
        id="policy"
        // Thêm padding ngang cho mobile và tablet
        className="bg-background mx-auto w-full min-h-screen center-both py-8 md:py-16 px-4 sm:px-6 lg:px-8"
      >
        {data.policyText ? (
          <div className="h-full w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center py-8 gap-8">
            {/* Left content */}
            <div className="relative w-full h-[45vh] md:h-[85vh] center-both">
              {/* GIẢM chiều cao trên mobile, GIỮ NGUYÊN trên desktop */}
              <Image
                src={data.policyImage}
                alt="Eco Retreat Policy Background"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Right content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-4xl md:text-5xl italic font-bold text-orange-300 mb-8">
                    {/* GIẢM cỡ chữ trên mobile, GIỮ NGUYÊN trên desktop */}
                    {data.title}
                  </h3>

                  <div
                    className="text-base md:text-lg text-foreground" // Có thể giảm nhẹ cỡ chữ cho dễ đọc hơn
                    dangerouslySetInnerHTML={{ __html: data.policyText }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full max-w-6xl center-both flex-col md:flex-row py-8 gap-8">
            {/* Áp dụng thay đổi tương tự cho phần này */}
            <div className="relative w-full h-[45vh] md:h-[85vh] center-both">
              <Image
                src={data.policyImage}
                alt="Eco Retreat Experience Background"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
      </section>
    </FadeIn>
  );
});
Policy.displayName = 'Policy';
export default Policy;
