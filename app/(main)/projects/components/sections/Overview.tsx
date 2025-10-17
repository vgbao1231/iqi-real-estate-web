'use client';

import Image from 'next/image';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SlideIn } from '@/components/common/animations';
import { cn, convertToEmbedUrl, formatVnCurrencyShort } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const Overview = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
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

  const inforColumns = data.basicInfo
    ?.filter((item: any) => !item.hidden) // Filter by 'id'
    .map((item: any) => {
      let value = item.value;

      if (item.type === 'range' && Array.isArray(value)) {
        value = `${value[0]} - ${value[1]}`;
      }

      if (item.type === 'number') {
        value = Number(value)?.toLocaleString();
      }

      if (item.type === 'select') {
        value = item.options.find((opt: any) => opt.value === value).label;
      }

      // Custom logic using 'id'
      if (item.id === 'status') {
        // Use item.id === 'status'
        value = <Badge>{item.value}</Badge>;
      }

      if (item.id === 'land_area') {
        // Use item.id === 'land_area'
        value = `${item.value} ${data.basicInfo.find((i: any) => i.id === 'measurement_unit').value === 'sqm' ? 'm²' : 'ft²'}`;
      }

      if (item.id === 'price') {
        value = `Từ ${formatVnCurrencyShort(item.value[0])}`;
      }

      return {
        label: item.key, // Keep item.key for the display label
        value,
      };
    });

  const half = Math.ceil(inforColumns.length / 2);
  const columns = [inforColumns.slice(0, half), inforColumns.slice(half)];

  return (
    <section ref={ref} id="overview" className="relative">
      {/* Sub section 1 */}
      <div className="relative bg-gradient-to-r from-orange-50 via-white to-green-50 py-12 md:py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-8 px-4 py-8 md:flex-row md:gap-20 md:px-8">
          {/* Overview Description */}
          <div
            dangerouslySetInnerHTML={{ __html: data.overviewDescription }}
            className="text-muted-foreground text-lg space-y-4 w-full md:w-1/2"
          />

          {/* Image Carousel */}
          <SlideIn
            direction="right"
            className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-orange-300/30"
          >
            <Carousel
              className="w-full"
              setApi={setCarouselApi}
              opts={{ loop: true }}
            >
              <CarouselContent>
                {data.overviewImages.map((img: any, idx: number) => (
                  <CarouselItem key={idx} className="h-full pl-0">
                    <Image
                      src={img?.url || 'placeholder.svg'}
                      alt={`Ảnh ${idx + 1}`}
                      width={800}
                      height={800}
                      className="max-w-full h-auto"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {data.overviewImages.map((_: any, i: any) => (
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
      </div>

      {/* Sub section 2 */}
      <div className="relative py-12 md:py-20 px-4 md:px-8 lg:px-16 overflow-hidden center-both">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-accent/30" />
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-accent/20"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-[85vw] gap-12">
          {/* Left content */}
          <SlideIn
            direction="left"
            className="relative h-[50vh] w-full md:h-[80vh] md:w-1/2"
          >
            <Image
              src={data.overviewImage?.url || '/placeholder.svg'}
              alt="Eco Retreat Experience Background"
              fill
              className="object-cover md:object-contain"
              priority
            />
          </SlideIn>

          {/* Right content */}
          <div className="w-full md:w-1/2 space-y-6">
            <SlideIn direction="right">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold italic text-orange-300 mb-8">
                  Thông tin tổng quan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                  {columns.map((column, colIdx) => (
                    <div key={colIdx}>
                      {column.map(({ label, value }: any, idx: any) => {
                        const globalIndex = colIdx * column.length + idx;
                        return (
                          <SlideIn
                            direction="right"
                            key={idx}
                            delay={globalIndex * 0.05}
                            className={`flex justify-between items-center py-3 gap-4 ${
                              idx !== column.length - 1
                                ? 'border-b border-border'
                                : 'border-b border-border md:border-0'
                            }`}
                          >
                            <span className="text-muted-foreground font-medium text-nowrap">
                              {label}
                            </span>
                            <TooltipProvider delayDuration={300}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="font-semibold text-right truncate whitespace-nowrap max-w-[60%] cursor-pointer">
                                    {value}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="max-w-xs break-words"
                                >
                                  {value}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </SlideIn>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
});

Overview.displayName = 'Overview';
export default Overview;
