'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { LayoutGrid, Map } from 'lucide-react';

export default function FloorPlan({ property }: any) {
  return (
    <section id="floorplans" className="max-w-7xl mx-auto px-4 space-y-8">
      {/* Mặt bằng tổng */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h4 className="font-semibold text-2xl mb-4 flex items-center text-orange-500">
          <LayoutGrid className="w-5 h-5 mr-2" />
          Mặt bằng tổng thể
        </h4>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[60vh] w-full rounded-lg overflow-hidden">
            <Image
              src={property.overallFloorPlan.image || '/placeholder-2.webp'}
              alt="Mặt bằng tổng thể"
              fill
              className="object-contain"
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
      <h4 className="font-semibold text-2xl mb-4 flex items-center text-orange-500">
        <Map className="w-5 h-5 mr-2" />
        Mặt bằng các phân khu
      </h4>
      <div className="space-y-12">
        {property.subAreaFloorPlans.map((plan: any, index: any) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:grid-flow-col-dense'}`}
          >
            <div className="relative h-[60vh] w-full rounded-lg overflow-hidden">
              <Image
                src={plan.image || '/placeholder-2.webp'}
                alt={plan.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-2xl text-foreground">
                {plan.name}
              </h4>
              <p className="text-lg text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
