'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatVnCurrencyShort } from '@/lib/utils';

const Introduction = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    return (
      <section ref={ref} id="introduction" className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src={property.introductionMainImage || '/placeholder.svg'}
            alt={`${property.name} Introduction`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="w-full text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl"
            >
              <div className="mb-8">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    {property.name}
                  </span>
                </h2>
                <p className="text-2xl text-blue-100 mb-8">
                  {property.propertyType} tại {property.city}
                </p>
              </div>

              <div className="space-y-6 text-lg leading-relaxed mb-12">
                {property.introductionText
                  ?.split('\n\n')
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-200">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    value: formatVnCurrencyShort(property.minPrice),
                    label: 'Giá từ',
                    color: 'text-green-400',
                  },
                  {
                    value: `${property.landArea}${
                      property.measurementUnit === 'sqm' ? 'm²' : 'ft²'
                    }`,
                    label: 'Diện tích',
                    color: 'text-yellow-400',
                  },
                  {
                    value: `${property.minBedroom}-${property.maxBedroom}`,
                    label: 'Phòng ngủ',
                    color: 'text-blue-400',
                  },
                  {
                    value: `${property.minBathroom}-${property.maxBathroom}`,
                    label: 'Phòng tắm',
                    color: 'text-purple-400',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-300">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

Introduction.displayName = 'Introduction';
export default Introduction;
