'use client';

import { forwardRef, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/common/animations';

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
    <section
      ref={ref}
      id="amenity"
      className="relative py-12 md:py-20 px-4 md:px-8 lg:px-16 overflow-hidden center-both"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-accent/30" />
      <div
        className="absolute top-0 left-0 w-1/2 h-full bg-accent/20"
        style={{ clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0% 100%)' }}
      />

      <div className="relative z-20 flex w-full flex-col-reverse items-center gap-8 px-4 py-8 md:flex-row md:gap-20 md:px-16">
        {/* Left content (Carousel) - Responsive Height */}
        <FadeIn className="w-full space-y-6 text-center md:w-2/5 md:text-left">
          <div className="space-y-8 leading-relaxed">
            <h2 className="text-4xl md:text-5xl font-bold italic text-foreground">
              Tiện Ích <span className="text-orange-300">Đẳng Cấp</span>
            </h2>
            {/* Danh sách mô tả chi tiết */}
            <div
              className="text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: data.featureDescription }}
            />
            <div className="relative">
              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-orange-400" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-orange-400" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 dark:border-border/40">
                {data.projectFeatures.map((feature: any, index: any) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-3 p-2 group"
                  >
                    <span className="text-orange-400 text-2xl flex-shrink-0 group-hover:rotate-180 transition-transform duration-500">
                      ✦
                    </span>
                    <p className="text-foreground leading-relaxed font-medium text-start">
                      {feature}
                    </p>
                    {/* Hover accent line */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        {/* Right content - Responsive Text Alignment and Padding */}
        <SlideIn
          direction="right"
          className="relative w-full md:w-3/5 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-orange-300/30"
        >
          <Carousel
            className="w-full"
            setApi={setCarouselApi}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {data.amenityImages.map((img: any, idx: number) => (
                <CarouselItem key={idx} className="h-full pl-0">
                  <Image
                    src={img?.url || 'placeholder.svg'}
                    alt={`Ảnh ${idx + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-auto"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {data.amenityImages.map((_: any, i: any) => (
                <div
                  key={i}
                  className={cn(
                    'h-2 w-2 rounded-full bg-white/70 transition-all duration-300',
                    i === currentImageIndex
                      ? 'w-5 bg-white'
                      : 'hover:bg-white/90'
                  )}
                />
              ))}
            </div>
          </Carousel>
        </SlideIn>
      </div>
    </section>
  );
});

Amenity.displayName = 'Amenity';
export default Amenity;
