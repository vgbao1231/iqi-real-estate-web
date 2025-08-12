'use client';

import Image from 'next/image';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import { cn, convertToEmbedUrl } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/common/animations';

const Introduction = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const embedUrl = useMemo(
    () => convertToEmbedUrl(data.introductionVideo),
    [data.introductionVideo]
  );

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
    <section ref={ref} id="introduction" className="space-y-8 md:space-y-20">
      {/* Sub section 1 */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <Image
          src={data.introductionBackground}
          alt="Eco Retreat Background"
          fill
          className="object-cover object-center" // Changed to object-center for better mobile framing
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>{' '}
        {/* Optional overlay for better text readability */}
        {/* Content */}
        <div className="relative z-20 flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-8 md:flex-row md:px-8">
          {/* Left content */}
          <div className="w-full space-y-4 text-white md:w-1/2">
            {/* Logo/title image - Responsive Height */}
            <FadeIn className="relative h-48 w-full md:h-64">
              <Image
                src={data.titleImage}
                alt="Eco Retreat Title"
                fill
                className="object-contain"
                priority
              />
            </FadeIn>
            <div
              className="space-y-4 text-base leading-relaxed md:text-lg"
              dangerouslySetInnerHTML={{ __html: data.introductionDescription }}
            />
          </div>

          {/* Right hero image - Responsive Height */}
          <SlideIn
            direction="right"
            className="relative h-[50vh] w-full md:h-[70vh] md:w-1/2"
          >
            <Image
              src={data.introductionImage}
              alt="Eco Retreat Hero"
              fill
              className="rounded-lg object-cover shadow-2xl md:object-contain" // Use object-cover for mobile
              priority
            />
          </SlideIn>
        </div>
      </div>

      {/* Sub section 2 */}
      <div className="relative flex min-h-screen items-center justify-center bg-gray-50">
        <div className="relative z-20 flex w-full max-w-7xl flex-col-reverse items-center gap-8 px-4 py-8 md:flex-row md:gap-12 md:px-8">
          {/* Left content (Carousel) - Responsive Height */}
          <SlideIn
            direction="left"
            className="relative h-[60vh] w-full md:h-[75vh] md:w-1/2"
          >
            <Carousel
              className="h-full w-full"
              setApi={setCarouselApi}
              opts={{ loop: true }}
            >
              <CarouselContent className="h-full">
                {data.launchImages.map((img: any, idx: number) => (
                  <CarouselItem key={idx} className="h-full pl-0">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={img || '/placeholder-2.webp'}
                        alt={`Ảnh ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {data.launchImages.map((_: any, i: any) => (
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

          {/* Right content - Responsive Text Alignment and Padding */}
          <FadeIn className="w-full space-y-6 text-center md:w-1/2 md:text-left">
            <div className="space-y-4 leading-relaxed">
              <div className="space-y-2">
                {/* Tên sản phẩm */}
                <div
                  className="text-2xl font-bold italic md:text-3xl"
                  dangerouslySetInnerHTML={{ __html: data.launchTitle }}
                />
              </div>
              {/* Danh sách mô tả chi tiết */}
              <div
                className="text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: data.launchDescription }}
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Sub section 3 (Video) */}
      <div className="w-full bg-background">
        {embedUrl ? (
          <div className="aspect-video w-full overflow-hidden shadow-2xl">
            <iframe
              src={embedUrl}
              title="Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="h-48 center-both rounded-lg bg-gray-100 text-red-500">
            Invalid YouTube URL
          </div>
        )}
      </div>
    </section>
  );
});

Introduction.displayName = 'Introduction';
export default Introduction;
