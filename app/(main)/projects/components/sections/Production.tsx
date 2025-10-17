'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DoorOpen, FadeIn } from '@/components/common/animations';

const Production = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const [carouselApi1, setCarouselApi1] = useState<CarouselApi>();
  const [carouselApi2, setCarouselApi2] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function rotate(arr: any, k = 2) {
    return arr.slice(k).concat(arr.slice(0, k));
  }

  useEffect(() => {
    if (!carouselApi1 || !carouselApi2) return;

    const sync1 = () => {
      if (!carouselApi1) return;
      carouselApi1.scrollTo(carouselApi2.selectedScrollSnap());
      setCurrentImageIndex(carouselApi2.selectedScrollSnap());
    };

    const sync2 = () => {
      if (!carouselApi2) return;
      carouselApi2.scrollTo(carouselApi1.selectedScrollSnap());
      setCurrentImageIndex(carouselApi1.selectedScrollSnap());
    };

    carouselApi2.on('select', sync1);
    carouselApi1.on('select', sync2);

    // Auto slide every 5 seconds, 1 is enought cause already had sync
    const interval = setInterval(() => {
      if (!carouselApi1.canScrollNext()) {
        carouselApi1.scrollTo(0); // Quay lại ảnh đầu nếu hết
      } else {
        carouselApi1.scrollNext();
      }
    }, 5000);

    // cleanup
    return () => {
      carouselApi1.off('select', sync1);
      carouselApi2.off('select', sync2);
      clearInterval(interval);
    };
  }, [carouselApi1, carouselApi2]);

  return (
    <section ref={ref} id="production">
      {/* Sub section 1 */}
      <div className="relative min-h-screen mx-auto px-4 py-12 md:py-24">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.productBackground?.url || '/placeholder.svg'}
            alt="Eco Retreat Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/50 dark:bg-transparent dark:backdrop-brightness-[40%]" />

        <div className="container mx-auto relative z-20 max-w-7xl">
          <DoorOpen className="text-3xl md:text-5xl font-bold mb-8 center-both text-orange-400 text-center">
            <Home className="w-8 h-8 md:w-10 md:h-10 mr-3" />
            Sản phẩm & Loại hình
          </DoorOpen>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {data.products.map((product: any, index: any) => (
              <FadeIn
                delay={index * 0.2}
                key={index}
                className="relative overflow-hidden rounded-lg group shadow-lg min-w-full md:min-w-[45%] md:max-w-[60%] md:max-h-[500px] flex-1"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={product.image?.url || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    priority
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
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Sub section 2 */}
      <div className="relative w-full px-4 py-12 md:p-12 flex flex-col justify-center gap-8">
        {/* Background image */}
        {data.products.map((item: any, index: any) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? 'opacity-100 blur-0'
                : 'opacity-0 blur-sm'
            }`}
          >
            <Image
              src={item.image?.url || '/placeholder.svg'}
              alt={item.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/50 dark:bg-transparent dark:backdrop-brightness-[40%]" />

        {/* Content */}
        <div className="relative z-20 flex items-end w-full gap-4 overflow-x-visible">
          {data.products.length <= 3 ? (
            <Gallery>
              <Carousel
                className="w-full"
                setApi={setCarouselApi1}
                opts={{ loop: true, slidesToScroll: 1 }}
              >
                <CarouselContent>
                  {data.products.map((item: any, idx: number) => (
                    <CarouselItem key={idx}>
                      <h4 className="font-bold text-3xl mb-4">{item.name}</h4>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 + 0.4 }}
                        className="relative h-[80vh] w-full overflow-hidden"
                      >
                        <Item
                          original={item.image?.url || '/placeholder.svg'}
                          thumbnail={item.image?.url || '/placeholder.svg'}
                          width="1600"
                          height="1200"
                          data-cropped="true"
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={ref as any}
                              onClick={open}
                              src={item.image?.url || '/placeholder.svg'}
                              alt={item.name || `Ảnh ${idx + 1}`}
                              fill
                              priority
                              className="object-cover"
                            />
                          )}
                        </Item>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </Gallery>
          ) : (
            <>
              <Gallery>
                <Carousel
                  className="w-full md:w-1/2 shrink-0"
                  setApi={setCarouselApi1}
                  opts={{ loop: true, slidesToScroll: 1 }}
                >
                  <CarouselContent>
                    {data.products.map((item: any, idx: number) => (
                      <CarouselItem key={idx}>
                        <h4 className="font-bold text-3xl mb-4">{item.name}</h4>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 + 0.4 }}
                          className="relative h-[60vh] w-full overflow-hidden"
                        >
                          <Item
                            original={item.image?.url || '/placeholder.svg'} // ảnh gốc
                            thumbnail={item.image?.url || '/placeholder.svg'} // ảnh thumbnail
                            width="1600"
                            height="1200"
                            data-cropped="true"
                          >
                            {({ ref, open }) => (
                              <Image
                                ref={ref as any}
                                onClick={open}
                                src={item.image?.url || '/placeholder.svg'}
                                alt={item.name || `Ảnh ${idx + 1}`}
                                fill
                                priority
                                className="object-cover"
                              />
                            )}
                          </Item>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Dots */}
                  <div className="z-10 absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 md:hidden">
                    {data.products.map((_: any, i: any) => (
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
              </Gallery>

              <Gallery>
                <Carousel
                  className="w-2/3 shrink-0 hidden md:block"
                  setApi={setCarouselApi2}
                  opts={{ loop: true, slidesToScroll: 1 }}
                >
                  <CarouselContent>
                    {rotate(data.products).map((item: any, idx: number) => (
                      <CarouselItem key={idx} className="pl-4 basis-[33.4%]">
                        <h4 className="font-bold text-2xl mb-2">{item.name}</h4>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 + 0.4 }}
                          className="relative h-[60vh] w-full overflow-hidden"
                        >
                          <Item
                            original={item.image?.url || '/placeholder.svg'} // ảnh gốc
                            thumbnail={item.image?.url || '/placeholder.svg'} // ảnh thumbnail
                            width="1600"
                            height="1200"
                            data-cropped="true"
                          >
                            {({ ref, open }) => (
                              <Image
                                ref={ref as any}
                                onClick={open}
                                src={item.image?.url || '/placeholder.svg'}
                                alt={`Ảnh ${idx + 1}`}
                                fill
                                priority
                                className="object-cover"
                              />
                            )}
                          </Item>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </Gallery>
            </>
          )}
        </div>

        {/* Custom nút điều khiển cả 2 */}
        <div className="relative z-20 flex items-center gap-4">
          <Button
            className="w-11 h-11 bg-muted-foreground/30 backdrop-blur-sm rounded-full center-both text-white hover:bg-muted-foreground/50 transition-colors pointer-events-auto"
            onClick={() => {
              carouselApi1?.scrollPrev();
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            className="w-11 h-11 bg-muted-foreground/30 backdrop-blur-sm rounded-full center-both text-white hover:bg-muted-foreground/50 transition-colors pointer-events-auto"
            onClick={() => {
              carouselApi1?.scrollNext();
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <h4 className="font-bold text-2xl">
            {currentImageIndex + 1}/{data.products.length}
          </h4>
        </div>
      </div>
    </section>
  );
});

Production.displayName = 'Production';
export default Production;
