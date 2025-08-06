'use client';

import Image from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { FadeIn } from '@/components/common/animations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function AchievementSection() {
  const achievements = Array.from({ length: 99 }, (_, i) => ({
    id: i + 1,
    image: `/awards/iqi-award-${i + 1}.webp`,
    alt: `Giải thưởng ${i + 1}`,
  }));

  // Lưu instance của plugin autoplay
  const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnMouseEnter: true }));

  return (
    <section className="py-12 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Thành tựu của chúng tôi
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Những giải thưởng và thành tựu đáng tự hào
            </p>
          </FadeIn>
        </div>

        <div
          className="relative"
          onMouseEnter={() => autoplayRef.current.stop()}
          onMouseLeave={() => autoplayRef.current.play()} // resume sau khi rời chuột
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              slidesToScroll: 3,
              dragFree: true,
            }}
            plugins={[autoplayRef.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {achievements.map((achievement) => (
                <CarouselItem
                  key={achievement.id}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/8"
                >
                  <div className="group hover:scale-105 transition-all duration-300">
                    <div className="relative w-full h-48 overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                      <Image
                        src={achievement.image || '/placeholder-2.webp'}
                        alt={achievement.alt}
                        fill
                        className="object-contain p-2 transition-all duration-300"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
