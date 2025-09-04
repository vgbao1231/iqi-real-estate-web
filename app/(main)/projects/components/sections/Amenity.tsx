'use client';

import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DoorOpen, FadeIn } from '@/components/common/animations';

const Amenity = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentImageIndex(index);
    };

    onSelect();
    carouselApi.on('select', onSelect);
    carouselApi.on('reInit', onSelect);

    // // Auto slide every 3 seconds
    // const interval = setInterval(() => {
    //   if (!carouselApi.canScrollNext()) {
    //     carouselApi.scrollTo(0); // Quay lại ảnh đầu nếu hết
    //   } else {
    //     carouselApi.scrollNext();
    //   }
    // }, 5000);

    return () => {
      carouselApi.off('select', onSelect);
      carouselApi.off('reInit', onSelect);
      // clearInterval(interval);
    };
  }, [carouselApi]);

  return (
    <section
      ref={ref}
      id="amenity"
      className="max-w-7xl min-h-screen mx-auto center-both flex-col gap-8 pt-12 md:py-24"
    >
      <DoorOpen>
        <div
          className="text-center px-4"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
      </DoorOpen>
      <div
        className="max-w-4xl text-center text-foreground/80 space-y-2 px-4"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
      <FadeIn
        delay={0.5}
        className="relative w-full h-auto center-both md:min-h-[70vh]"
      >
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {data.amenityImages.map((img: any, idx: number) => (
              <CarouselItem key={idx} className="pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.4 }}
                  className="relative h-auto overflow-hidden md:min-h-[70vh]"
                >
                  <Image
                    src={img || '/placeholder-2.webp'}
                    alt={`Ảnh ${idx + 1}`}
                    width={800}
                    height={600}
                    className="object-contain w-auto h-full"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {data.amenityImages.map((_: any, i: any) => (
              <div
                key={i}
                className={cn(
                  'h-2 w-2 rounded-full bg-white transition-all',
                  i === currentImageIndex ? 'w-4' : 'bg-gray-300'
                )}
              />
            ))}
          </div>
        </Carousel>
      </FadeIn>
    </section>
  );
});

Amenity.displayName = 'Amenity';
export default Amenity;
