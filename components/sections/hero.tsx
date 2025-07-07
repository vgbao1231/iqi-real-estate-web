import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, CountUp } from '@/components/common/animations';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { value: 10000, label: 'Bất động sản' },
    { value: 5000, label: 'Khách hàng' },
    { value: 500, label: 'Đại lý' },
    { value: 15, label: 'Năm KN' },
  ];

  // Hero carousel
  const heroSlides = [
    {
      image: '/placeholder-1.webp',
      title: 'Đối tác Bất động sản Đáng tin cậy tại Việt Nam',
      subtitle:
        'Với hơn 15 năm kinh nghiệm, IQI Vietnam là đối tác tin cậy cho mọi nhu cầu bất động sản của bạn.',
    },
    {
      image: '/placeholder-2.webp',
      title: 'Đầu tư Bất động sản Quốc tế',
      subtitle:
        'Khám phá cơ hội đầu tư bất động sản tại Singapore, Malaysia, Australia với lợi nhuận hấp dẫn.',
    },
    {
      image: '/placeholder-3.jpg',
      title: 'Tư vấn Chuyên nghiệp 24/7',
      subtitle:
        'Đội ngũ chuyên gia giàu kinh nghiệm sẵn sàng hỗ trợ bạn tìm kiếm bất động sản phù hợp nhất.',
    },
  ];

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroSlides[currentSlide].image || '/placeholder-2.webp'}
            alt={`Hero slide ${currentSlide + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r !from-black/30 !via-black/10 !to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
        <FadeIn delay={0.2}>
          <Badge className="bg-orange-100/90 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200">
            Chào mừng đến với IQI Vietnam
          </Badge>
        </FadeIn>

        {/* Animate main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl min-h-[360px] center-both flex-col"
          >
            <FadeIn delay={0.2}>
              <h1 className="text-4xl drop-shadow-md md:text-6xl font-bold py-6 bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent">
                {heroSlides[currentSlide].title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl font-medium text-shadow-soft text-gray-200 mb-8 max-w-2xl mx-auto">
                {heroSlides[currentSlide].subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/consultation">
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Tư vấn miễn phí
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="#products-content">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                    >
                      Xem dự án
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </FadeIn>
          </motion.div>
        </AnimatePresence>
        {/* Quick Stats */}
        <FadeIn delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto transition-all">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="text-center bg-background/10 backdrop-brightness-90 backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-all"
              >
                <div className="text-2xl font-bold text-orange-400">
                  <CountUp end={item.value} />+
                </div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Carousel Controls */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
