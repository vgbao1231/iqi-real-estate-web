'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Palette, Award, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Amenities({ property }: any) {
  return (
    <section id="amenities" className="max-w-7xl mx-auto px-4 space-y-6">
      <h3 className="text-2xl font-bold flex items-center text-yellow-500">
        <Star className="w-6 h-6 mr-3" />
        Tiện ích & Đặc điểm
      </h3>

      {property.amenityClusters.map((cluster: any, index: any) => (
        <div key={index} className="space-y-6">
          <h4 className="text-xl font-bold flex items-center text-foreground">
            <Palette className="w-5 h-5 mr-2" />
            {cluster.title}
          </h4>
          <div
            className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:grid-flow-col-dense'}`}
          >
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.15 }}
              className="relative h-[60vh] w-full rounded-lg overflow-hidden"
            >
              <Image
                src={cluster.image || '/placeholder-2.webp'}
                alt={cluster.title}
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="space-y-4"
            >
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {cluster.description}
              </p>
              {cluster.icons && cluster.icons.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {cluster.icons.map((icon: any, iconIdx: any) => {
                    const IconComponent = icon.component;
                    return (
                      <Badge
                        key={iconIdx}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm"
                      >
                        <IconComponent className="w-4 h-4 text-blue-500" />
                        {icon.name}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
          {index < property.amenityClusters.length - 1 && (
            <Separator className="my-8" />
          )}
        </div>
      ))}

      <Separator className="my-8" />

      <h4 className="text-xl font-bold mb-4 flex items-center text-foreground">
        <Award className="w-5 h-5 mr-2" />
        Đặc điểm nổi bật
      </h4>
      <div className="grid md:grid-cols-2 gap-6">
        {property.features.map((feature: any, index: any) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.3 }}
            className="flex items-start space-x-4 p-5 bg-card shadow-md rounded-lg border-l-4 border-green-500"
          >
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-base text-muted-foreground">{feature}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
