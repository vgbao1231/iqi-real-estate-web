'use client';

import Image from 'next/image';
import { Home } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const Production = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
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

    // Auto slide every 3 seconds
    const interval = setInterval(() => {
      if (!carouselApi.canScrollNext()) {
        carouselApi.scrollTo(0); // Quay lại ảnh đầu nếu hết
      } else {
        carouselApi.scrollNext();
      }
    }, 5000);

    return () => {
      carouselApi.off('select', onSelect);
      carouselApi.off('reInit', onSelect);
      clearInterval(interval);
    };
  }, [carouselApi]);

  return (
    <section ref={ref} id="production">
      {/* Sub section 1 */}
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12 md:py-24">
        <h3 className="text-3xl md:text-5xl font-bold mb-8 center-both text-orange-400 text-center">
          <Home className="w-8 h-8 md:w-10 md:h-10 mr-3" />
          Sản phẩm & Loại hình
        </h3>
        <div className="center-both flex-wrap gap-8">
          {data.products.map((product: any, index: any) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group shadow-lg min-w-full md:min-w-[45%] md:max-w-[60%] md:max-h-[500px] flex-1"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={product.image || '/placeholder-2.webp'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2 text-orange-300">
                  {product.name}
                </h4>
                <div
                  className="text-shadow-md"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sub section 2 */}
      <div className="md:min-h-screen w-full center-both">
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {data.furnitureImages.map((img: any, idx: number) => (
              <CarouselItem key={idx} className="pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.4 }}
                  className="relative h-[60vh] md:h-screen w-full overflow-hidden"
                >
                  <Image
                    src={img || '/placeholder-2.webp'}
                    alt={`Ảnh ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {data.furnitureImages.map((_: any, i: any) => (
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
      </div>
    </section>
  );
});

Production.displayName = 'Production';
export default Production;
