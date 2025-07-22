'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Award, CheckCircle } from 'lucide-react';
import { forwardRef } from 'react';

const Amenities = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    return (
      <section
        ref={ref}
        id="amenities"
        className="max-w-7xl mx-auto px-4 space-y-10 py-16"
      >
        <h3 className="text-3xl font-bold center-both text-yellow-500">
          <Star className="w-6 h-6 mr-3" />
          Tiện ích & Đặc điểm
        </h3>

        <div className="grid lg:grid-cols-2 gap-8">
          {property.amenityClusters.map((cluster: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl group shadow-lg"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={cluster.image || '/placeholder.svg'}
                  alt={cluster.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-3">{cluster.title}</h4>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3">
                  {cluster.description.trim()}
                </p>

                {cluster.icons && cluster.icons.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cluster.icons.map((icon: any, iconIdx: any) => {
                      const IconComponent = icon.component;
                      return (
                        <div
                          key={iconIdx}
                          className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs"
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{icon.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

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
);

Amenities.displayName = 'Amenities';
export default Amenities;
