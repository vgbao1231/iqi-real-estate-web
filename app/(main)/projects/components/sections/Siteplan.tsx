'use client';

import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';

import { forwardRef, useEffect, useState } from 'react';

const Siteplan = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
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
      if (!isHovered) {
        if (!carouselApi.canScrollNext()) {
          carouselApi.scrollTo(0); // Quay lại ảnh đầu nếu hết
        } else {
          carouselApi.scrollNext();
        }
      }
    }, 5000);

    return () => {
      carouselApi.off('select', onSelect);
      carouselApi.off('reInit', onSelect);
      clearInterval(interval);
    };
  }, [carouselApi, isHovered]);

  return (
    data && (
      <section ref={ref} id="siteplan" className="w-full relative">
        <Gallery>
          {data.siteplanImages.length > 1 ? (
            // 👉 Nhiều ảnh => Carousel
            <div className="md:min-h-screen w-full center-both">
              <Carousel
                className="w-full"
                setApi={setCarouselApi}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {data.siteplanImages.map((img: any, idx: number) => (
                    <CarouselItem key={idx} className="pl-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 + 0.4 }}
                        className="relative h-full w-full overflow-hidden"
                      >
                        {/* PhotoSwipe Item */}
                        <Item
                          original={img?.url || '/placeholder.svg'} // ảnh gốc
                          thumbnail={img?.url || '/placeholder.svg'} // ảnh thumbnail
                          width="1920"
                          height="1080"
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={ref as any}
                              onClick={open}
                              src={img?.url || '/placeholder.svg'}
                              alt={`Ảnh ${idx + 1}`}
                              width={1920}
                              height={1080}
                              className="h-full w-full object-cover"
                              priority
                            />
                          )}
                        </Item>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Dots */}
                <div className="z-10 absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
                  {data.siteplanImages.map((_: any, i: any) => (
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
          ) : (
            // 👉 1 ảnh => chỉ cần Item của PhotoSwipe
            <Item
              original={data.siteplanImages[0] || '/placeholder.svg'}
              thumbnail={data.siteplanImages[0] || '/placeholder.svg'}
              width="1920"
              height="1080"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref as any}
                  onClick={open}
                  src={data.siteplanImages[0]?.url || '/placeholder.svg'}
                  alt="Ảnh mặt bằng"
                  width={1920}
                  height={1080}
                  className="w-full h-auto cursor-zoom-in"
                  priority
                />
              )}
            </Item>
          )}
        </Gallery>

        <div
          className="hidden md:block absolute inset-x-0 bottom-0 h-60 md:h-80 overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`z-20 absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />

          <div
            className={`z-30 absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <button
              onClick={() => window.open(data.view360, '_blank')}
              className="group/button flex flex-col items-center space-y-2 opacity-80 text-white transition-all duration-500 hover:scale-110"
            >
              <div className="relative">
                {/* Main circle container */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 center-both transition-all duration-500 group-hover/button:bg-white/25 group-hover/button:border-white/50 group-hover/button:shadow-2xl group-hover/button:shadow-white/30 relative">
                  {/* Custom 360° SVG Icon */}
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    className="text-white transition-transform duration-700"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                      className="transition-transform duration-1000 group-hover/button:rotate-180 origin-center"
                    />
                  </svg>

                  {/* Lucide icon ở giữa */}
                  <Globe className="absolute w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-0.5 bg-white/70 transition-all duration-300 ${isHovered ? 'h-4 md:h-6 bg-white' : 'h-0'}`}
                />
                <div
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 border-r-2 border-b-2 border-white/70 rotate-45 transition-all duration-300 ${isHovered ? 'border-white translate-y-1 scale-110' : ''}`}
                />
              </div>

              {/* Text label */}
              <span className="text-xs md:text-sm font-medium text-white/90 transition-all duration-300 group-hover/button:text-white tracking-wide">
                Xem 360°
              </span>
            </button>
          </div>
        </div>
      </section>
    )
  );
});

Siteplan.displayName = 'Siteplan';
export default Siteplan;
