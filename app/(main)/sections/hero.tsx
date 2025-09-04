import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, CountUp } from '@/components/common/animations';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { value: 42000, label: 'Giao dịch thành công (2022)' },
    { value: 50000, label: 'Chuyên viên toàn cầu' },
    { value: 111, label: 'Quốc gia có dự án' },
    { value: 13.5, label: 'Triệu lượt tiếp cận/tháng', decimals: 1 }, // 👈
  ];

  // Hero carousel
  const heroSlides = [
    {
      image: '/hero-1.png',
      title: 'Tập đoàn Bất động sản Công nghệ Toàn cầu',
      subtitle:
        'IQI Vietnam là thành viên của IQI Global với hơn 50.000 chuyên viên trên 30 quốc gia.',
    },
    {
      image: '/hero-2.jpg',
      title: 'Đào tạo - Đồng hành - Phát triển',
      subtitle:
        'Chúng tôi trao quyền cho bạn xây dựng sự nghiệp bền vững trong lĩnh vực bất động sản.',
    },
    {
      image: '/placeholder-1.jpg',
      title: 'Nền tảng toàn diện cho chuyên viên BĐS',
      subtitle:
        'Từ Super App, CRM đến hệ sinh thái đào tạo - tất cả trong một tại IQI Vietnam.',
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
      {heroSlides.map((slide: any, index: any) => (
        <div
          key={index}
          className={`fixed inset-0 z-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-105 blur-sm'
          }`}
        >
          <Image
            src={slide.image || '/placeholder.svg'}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
        <FadeIn delay={0.2}>
          <Badge className="bg-orange-100/90 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200">
            Chào mừng đến với IQI Vietnam
          </Badge>
        </FadeIn>

        {/* Animate main content */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl min-h-[360px] center-both flex-col"
        >
          <FadeIn delay={0.2}>
            <h1 className="text-4xl drop-shadow-lg md:text-6xl font-bold py-6 bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl font-semibold text-shadow-lg text-white mb-8 max-w-2xl mx-auto">
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
                <Link href="#projects-content">
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
        {/* Quick Stats */}
        <FadeIn delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto transition-all">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="text-center bg-background/10 backdrop-brightness-90 backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-all"
              >
                <div className="text-2xl font-bold text-orange-400">
                  <CountUp end={item.value} decimals={item.decimals} />+
                </div>
                <div className="text-sm text-gray-200">{item.label}</div>
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
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full center-both text-white hover:bg-white/30 transition-colors pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6 -ml-0.5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full center-both text-white hover:bg-white/30 transition-colors pointer-events-auto"
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
