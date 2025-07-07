import { FadeIn } from '@/components/common/animations';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-muted/50 pt-12 border-t">
      <div className="grid md:grid-cols-4 gap-8 px-24">
        {/* Về IQI */}
        <FadeIn delay={0.1}>
          <div>
            <h3 className="text-lg font-bold mb-4">Về IQI</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Giới thiệu IQI Vietnam
                </Link>
              </li>
              <li>
                <Link
                  href="/about/juwai"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Juwai IQI và IQI Atlas
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Thông tin liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Sản phẩm */}
        <FadeIn delay={0.2}>
          <div>
            <h3 className="text-lg font-bold mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/international"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Bất động sản Quốc tế
                </Link>
              </li>
              <li>
                <Link
                  href="/products/hcmc"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Tp.HCM
                </Link>
              </li>
              <li>
                <Link
                  href="/products/hanoi"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Hà Nội
                </Link>
              </li>
              <li>
                <Link
                  href="/products/resort"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Bất động sản Nghỉ dưỡng
                </Link>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Tin tức */}
        <FadeIn delay={0.3}>
          <div>
            <h3 className="text-lg font-bold mb-4">Tin tức</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news/market"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Thông tin thị trường
                </Link>
              </li>
              <li>
                <Link
                  href="/news/real-estate"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Tin tức bất động sản
                </Link>
              </li>
              <li>
                <Link
                  href="/news/trends"
                  className="text-muted-foreground hover:text-orange-600 transition-colors"
                >
                  Xu hướng nhà đầu tư
                </Link>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Social media */}
        <FadeIn delay={0.4}>
          <div>
            <h3 className="text-lg font-bold mb-4">Social media</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">IQI Vietnam</span>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1.5,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Juwai IQI</span>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.2,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.7,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1.2,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1.7,
                    }}
                    className="w-2 h-2 bg-foreground rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.6}>
        <div className="border-t mt-8 py-2 text-center text-muted-foreground">
          <p>&copy; 2024 IQI Vietnam. Tất cả quyền được bảo lưu.</p>
        </div>
      </FadeIn>
    </footer>
  );
}
