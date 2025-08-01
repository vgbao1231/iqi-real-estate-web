import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn } from '@/components/common/animations';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { contact } from '@/lib/contact-data';

export default function Contact() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        className="absolute -top-16 right-1/3 w-56 h-56 bg-white/20 dark:bg-white/10 rounded-full blur-md"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        className="absolute -bottom-16 left-10 w-48 h-48 bg-white/20 dark:bg-white/10 rounded-full blur-md"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#fbf4e6]/60 to-orange-300 dark:from-gray-800/40 dark:via-gray-850/60 dark:to-gray-900/40"></div>
      <SlideIn direction="right" className="absolute inset-0 z-10">
        <Image
          src="https://iqiglobal-web-revamp.s3.ap-southeast-1.amazonaws.com/laravel/img/home/house-with-vector-background.webp"
          alt="Nền bất động sản"
          fill
          className="object-contain object-right-bottom top-5 pt-24"
          priority
        />
      </SlideIn>

      <div className="container mx-auto px-4 text-center relative z-30 my-14">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình bất động sản?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí từ các
            chuyên gia hàng đầu
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="tel:0764155155">
                <Button
                  size="lg"
                  className="bg-orange-600 text-white hover:bg-orange-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Hotline: {contact.hotlineDisplay}
                </Button>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/consultation">
                <Button
                  size="lg"
                  className="border border-orange-600 text-orange-600 hover:bg-white hover:text-orange-600 bg-white/95"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Đăng ký tư vấn
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="border border-orange-600 text-orange-600 hover:bg-white hover:text-orange-600 bg-white/95"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Liên hệ ngay
                </Button>
              </Link>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
