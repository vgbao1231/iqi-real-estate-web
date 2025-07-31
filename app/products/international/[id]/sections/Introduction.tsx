'use client';

import Image from 'next/image';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/common/animations';

const Introduction = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const embedUrl = useMemo(
    () => convertToEmbedUrl(data.introductionVideo),
    [data.introductionVideo]
  );

  function convertToEmbedUrl(url: any) {
    try {
      const ytUrl = new URL(url);

      // Lấy videoId từ ?v= trên youtube.com hoặc từ path trên youtu.be
      const videoId = ytUrl.hostname.includes('youtu.be')
        ? ytUrl.pathname.slice(1)
        : ytUrl.searchParams.get('v');

      // Lấy thời gian bắt đầu nếu có (t=94s hoặc t=94)
      const tParam = ytUrl.searchParams.get('t');
      const startTime = tParam ? parseInt(tParam.replace('s', '')) : null;

      if (!videoId) return null;

      // Tạo query string
      const params = new URLSearchParams();
      params.set('autoplay', '1');
      params.set('mute', '1'); // tránh bị chặn bởi trình duyệt
      if (startTime) {
        params.set('start', startTime.toString());
      }

      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    } catch (err) {
      return null;
    }
  }

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
    <section ref={ref} id="introduction">
      {/* Sub section 1 */}
      <div className="relative min-h-screen center-both py-20">
        {/* Background image full screen */}
        <Image
          src={data.backgroundImage}
          alt="Eco Retreat Background"
          fill
          className="object-cover object-left"
          priority
        />

        {/* Content */}
        <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 gap-6">
          {/* Left content */}
          <div className="md:w-1/2 text-white space-y-4">
            {/* Logo/title image */}
            <FadeIn className="relative w-100 h-64">
              <Image
                src={data.titleImage}
                alt="Eco Retreat Title"
                fill
                className="object-contain"
                priority
              />
            </FadeIn>
            <div
              className="text-lg space-y-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          {/* Right hero image */}
          <SlideIn
            direction="right"
            className="relative md:w-1/2 w-full h-[80vh] center-both"
          >
            <Image
              src={data.introductionImage}
              alt="Eco Retreat Hero"
              fill
              className="object-contain shadow-lg rounded-sm"
              priority
            />
          </SlideIn>
        </div>
      </div>

      {/* Sub section 2 */}
      <div className="relative min-h-screen center-both">
        <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 gap-6">
          {/* Left content */}
          <SlideIn
            direction="left"
            className="relative md:w-1/2 w-full h-[80vh] center-both"
          >
            <Carousel
              className="w-full"
              setApi={setCarouselApi}
              opts={{ loop: true }}
            >
              <CarouselContent>
                {data.launchImages.map((img: any, idx: number) => (
                  <CarouselItem key={idx} className="pl-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 + 0.4 }}
                      className="relative h-[80vh] w-full overflow-hidden"
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
                {data.launchImages.map((_: any, i: any) => (
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
          </SlideIn>

          {/* Right content */}
          <FadeIn className="md:w-1/2 space-y-6">
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="text-center space-y-1">
                <h3 className="text-orange-400 font-bold text-3xl uppercase tracking-wide">
                  Chính thức ra mắt
                </h3>

                {/* Tên sản phẩm */}
                <h2 className="text-lime-500 text-4xl md:text-6xl font-bold italic">
                  {data.launchTitle}
                </h2>

                {/* Sub title */}
                <h3 className="text-lime-500 text-2xl md:text-3xl italic font-semibold">
                  {data.launchSubtitle}
                </h3>
              </div>

              {/* Danh sách mô tả chi tiết */}
              <div
                className="text-lg ml-4 text-center"
                dangerouslySetInnerHTML={{ __html: data.launchDescription }}
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Sub section 3 */}
      <div className="relative min-h-screen w-full mx-auto">
        {embedUrl ? (
          <div className="w-full aspect-video">
            <iframe
              src={embedUrl}
              title="Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full shadow-lg"
            />
          </div>
        ) : (
          <div className="text-red-500">Invalid YouTube URL</div>
        )}
      </div>
    </section>
  );
});

Introduction.displayName = 'Introduction';
export default Introduction;
