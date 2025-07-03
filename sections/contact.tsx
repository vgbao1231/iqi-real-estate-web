import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"
      />

      <div className="container mx-auto px-4 text-center relative z-10">
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
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Gọi ngay: 1900 1234
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Đăng ký tư vấn
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat với chuyên gia
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
