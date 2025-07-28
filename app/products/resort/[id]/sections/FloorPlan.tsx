'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { LayoutGrid, Map } from 'lucide-react';
import { forwardRef } from 'react';

const FloorPlan = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    return (
      <section
        ref={ref}
        id="floorplans"
        className="max-w-7xl mx-auto px-4 space-y-8 py-16"
      >
        <h3 className="text-3xl font-bold mb-4 center-both text-purple-600">
          <Map className="w-6 h-6 mr-3 " />
          Mặt bằng & Quy hoạch
        </h3>
        {/* Mặt bằng tổng */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-semibold text-2xl mb-4 flex items-center text-purple-500">
            <LayoutGrid className="w-5 h-5 mr-2" />
            Mặt bằng tổng thể
          </h4>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[60vh] w-full rounded-lg overflow-hidden">
              <Image
                src={property.overallFloorPlan.image || '/placeholder-2.webp'}
                alt="Mặt bằng tổng thể"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4 flex items-center text-foreground">
                Tổng thể dự án
              </h4>
              <p className="text-lg text-muted-foreground">
                {property.overallFloorPlan.description}
              </p>
            </div>
          </div>
        </motion.div>

        <Separator className="my-8" />

        {/* Mặt bằng phân khu */}
        <h4 className="font-semibold text-2xl mb-4 flex items-center text-purple-500">
          <Map className="w-5 h-5 mr-2" />
          Mặt bằng các phân khu
        </h4>
        <div className="grid lg:grid-cols-2 gap-8">
          {property.subAreaFloorPlans.map((subArea: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={subArea.image || '/placeholder-2.webp'}
                  alt={subArea.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {subArea.name}
                  </h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed line-clamp-4">
                  {subArea.description.trim()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }
);

FloorPlan.displayName = 'FloorPlan';
export default FloorPlan;
