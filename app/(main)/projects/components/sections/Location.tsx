'use client';

import { FadeIn, SlideIn } from '@/components/common/animations';
import Image from 'next/image';
import { forwardRef } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';

const Location = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const srcMatch = data.embedCode.match(/src="([^"]*)"/);
  return (
    <section ref={ref} id="location">
      {/* Section 1 */}
      <div className="relative center-both bg-gradient-to-r from-orange-50 via-white to-green-50 py-12 px-8 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl gap-8">
          {/* Left content */}
          <FadeIn className="md:w-1/2 w-full leading-relaxed text-center md:text-left space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold italic mb-4 text-foreground">
              Vị Trí <span className="text-orange-300">Đắc Địa</span>
            </h2>
            <div
              className="space-y-2 text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </FadeIn>

          {/* Right hero image */}
          <SlideIn
            direction="right"
            className="relative w-full md:w-1/2 center-both"
          >
            <Image
              src={data.locationImage?.url || '/placeholder.svg'}
              alt="Eco Retreat Hero"
              width="800"
              height="800"
              className="w-full h-auto shadow-lg rounded-sm"
              priority
            />
          </SlideIn>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative py-16 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-accent/30" />
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-accent/20"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="relative max-w-7xl w-fit mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-muted dark:bg-muted/50 transition-all duration-500 hover:shadow-3xl w-fit">
              <Gallery>
                <Item
                  original={data.routeMapImage?.url || '/placeholder.svg'}
                  thumbnail={data.routeMapImage?.url || '/placeholder.svg'}
                  width="1600"
                  height="1600"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref as any}
                      onClick={open}
                      src={data.routeMapImage?.url || '/placeholder.svg'}
                      alt="Ảnh Vị Trí"
                      width="1920"
                      height="1080"
                      priority
                      className="max-h-[90vh] w-auto"
                    />
                  )}
                </Item>
              </Gallery>
              {/* Overlay label */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-background/95 dark:bg-background/90 backdrop-blur-sm rounded-lg shadow-lg border border-border">
                <p className="text-sm font-semibold text-foreground">
                  Bản Đồ Vị Trí
                </p>
              </div>
            </div>
            <div className="absolute top-0 -right-8 z-30 hidden lg:block w-1 h-40 bg-gradient-to-b from-primary to-transparent rounded-full" />

            {srcMatch && srcMatch[1] && (
              <div
                className={`md:absolute transition-all duration-500 ease-out bottom-0 -right-16 w-full md:w-[20vw] lg:w-[30vw] translate-y-8 md:translate-y-12 lg:translate-y-16`}
              >
                <div
                  className={`relative overflow-hidden bg-background dark:bg-background/95 shadow-2xl border-4 border-background dark:border-background/80 transition-all duration-500 rounded-2xl hover:shadow-3xl hover:scale-[1.02]`}
                >
                  <div className={`relative aspect-video`}>
                    <iframe
                      src={srcMatch[1]}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title="Bản đồ Google Maps"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

Location.displayName = 'Location';
export default Location;
