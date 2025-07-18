'use client';

import { Separator } from '@/components/ui/separator';
import { Info, Camera } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function Introduction({ property }: any) {
  return (
    <section id="introduction" className="max-w-7xl mx-auto px-4">
      <h3 className="text-2xl font-bold flex items-center text-blue-700 dark:text-blue-500">
        <Info className="w-6 h-6 mr-3" />
        Giới thiệu dự án
      </h3>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative h-[60vh] w-full rounded-lg overflow-hidden"
        >
          <Image
            src={property.introductionMainImage || '/placeholder-2.webp'}
            alt="Giới thiệu chính"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed whitespace-pre-line text-muted-foreground"
        >
          {property.introductionText}
        </motion.p>
      </div>

      <Separator className="my-8" />

      <h4 className="text-xl font-bold mb-4 flex items-center text-foreground">
        <Camera className="w-5 h-5 mr-2" />
        Hình ảnh tổng quan
      </h4>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {property.introductionGallery.map((img: any, idx: any) => (
            <CarouselItem key={idx} className="pl-2 md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="relative h-[50vh] w-full rounded-lg overflow-hidden"
              >
                <Image
                  src={img || '/placeholder-2.webp'}
                  alt={`Giới thiệu ảnh ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
