import { Badge } from '@/components/ui/badge';

import { FadeIn } from '@/components/common/animations';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import Header from '@/app/(main)/layout/header';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ProjectIntroSection = ({ badge, bannerData, stats }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev: any) => (prev + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, bannerData.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerData.length) % bannerData.length
    );
  };

  const currentBanner = bannerData[currentSlide];
  return (
    <FadeIn>
      <Header heroId="intro" />
      <div
        id="intro"
        className="relative h-108 py-12 pt-20 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {bannerData.map((banner: any, index: any) => (
          <div
            key={banner.id}
            className={`fixed top-0 left-0 w-full z-0 h-108 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100 blur-0'
                : 'opacity-0 scale-105 blur-sm'
            }`}
          >
            <Image
              src={banner.image || '/placeholder.svg'}
              alt={banner.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-black/30" />
          </div>
        ))}

        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center text-white space-y-8">
              <div className="flex items-center justify-center">
                <Home className="w-6 h-6 mr-2 text-orange-300" />
                <Badge className="bg-orange-500/30 text-orange-100 border-orange-400/30 text-sm px-3 py-1 backdrop-blur-sm uppercase">
                  {badge}
                </Badge>
              </div>

              <div key={currentSlide} className="space-y-3">
                <FadeIn delay={0.2} y={20}>
                  <h1 className="text-xl md:text-4xl font-bold leading-tight">
                    <span
                      key={currentSlide}
                      className="text-orange-100 text-shadow-lg"
                    >
                      {currentBanner.title}
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.3} y={20}>
                  <p
                    key={`subtitle-${currentSlide}`}
                    className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
                  >
                    {currentBanner.subtitle}
                  </p>
                </FadeIn>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                {stats.map((item: any) => (
                  <div key={item.label} className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-orange-400 text-shadow-sm">
                      {item.value}
                    </div>
                    <div className="text-white/80 text-xs md:text-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-30 flex items-center justify-between px-2 md:px-4 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full center-both text-white hover:bg-white/30 transition-colors pointer-events-auto"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full center-both text-white hover:bg-white/30 transition-colors pointer-events-auto"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {bannerData.map((_: any, index: any) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide
                  ? 'bg-orange-400 scale-125'
                  : 'bg-white/50 hover:bg-orange-300/75'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  );
};
