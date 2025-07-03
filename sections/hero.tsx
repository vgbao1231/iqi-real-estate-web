import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, CountUp } from '@/components/animations';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Vietnam Cityscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <FadeIn delay={0.2}>
          <Badge className="mb-6 bg-orange-100/90 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300">
            Chào mừng đến với IQI Vietnam
          </Badge>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-bold py-6 bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
            Đối tác Bất động sản
            <br />
            Đáng tin cậy tại Việt Nam
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Với hơn 15 năm kinh nghiệm, IQI Vietnam là đối tác tin cậy cho mọi
            nhu cầu bất động sản của bạn. Chúng tôi cung cấp dịch vụ toàn diện
            từ mua bán, cho thuê đến đầu tư bất động sản.
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/consultation">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Tư vấn miễn phí
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                Xem dự án
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        {/* Animated Quick Stats */}
        <FadeIn delay={1.0}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-orange-400">
                <CountUp end={10000} />+
              </div>
              <div className="text-sm text-gray-300">Bất động sản</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-orange-400">
                <CountUp end={5000} delay={0.2} />+
              </div>
              <div className="text-sm text-gray-300">Khách hàng</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-orange-400">
                <CountUp end={500} delay={0.4} />+
              </div>
              <div className="text-sm text-gray-300">Đại lý</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-orange-400">
                <CountUp end={15} delay={0.6} />+
              </div>
              <div className="text-sm text-gray-300">Năm KN</div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
