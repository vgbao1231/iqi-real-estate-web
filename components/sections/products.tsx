import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import { ArrowRight, Building, Globe, Home, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Products() {
  return (
    <section
      id="products"
      className="py-8 md:pb-20 bg-gradient-to-r from-slate-100 via-white to-gray-200 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-lg bg-gradient-to-tr from-white/80 to-gray-300/70 dark:!from-white/10 dark:!to-white/10"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-lg bg-gradient-to-br from-gray-300/80 to-white/70 dark:!from-white/10 dark:!to-white/10"
        />
      </div>

      {/* Content */}
      <div
        id="products-content"
        className="container mx-auto px-4 relative z-10"
      >
        <FadeIn className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            DỰ ÁN ĐANG PHÂN PHỐI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold py-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
            Dự án nổi bật đang phân phối
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Khám phá các dự án bất động sản cao cấp đang được phân phối độc
            quyền bởi IQI Vietnam với cam kết chất lượng và lợi nhuận tối ưu.
          </p>
        </FadeIn>

        {/* New Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
          {/* BDS Quốc tế - Large Featured */}
          <ScaleIn delay={0.2} className="lg:col-span-6 lg:row-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 brightness-90 dark:brightness-75">
                <Image
                  src="/placeholder-3.jpg"
                  alt="Bất động sản Quốc tế"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 via-orange-500/30 to-red-500/40"></div>
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      Quốc tế
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Bất động sản Quốc tế
                  </h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Singapore, Malaysia, Australia, Thailand với cơ hội định cư
                    và ROI hấp dẫn
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur-sm backdrop-brightness-75 rounded-lg p-3">
                      <div className="text-white/70">Singapore</div>
                      <div className="font-bold text-lg">$800K+</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm backdrop-brightness-75 rounded-lg p-3">
                      <div className="text-white/70">Malaysia</div>
                      <div className="font-bold text-lg">$300K+</div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/products/international">
                      <Button className="w-full bg-white text-orange-600 hover:bg-white font-semibold">
                        Khám phá 15+ dự án
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </ScaleIn>

          {/* BDS Việt Nam - Medium */}
          <ScaleIn delay={0.3} className="lg:col-span-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 brightness-90 dark:brightness-75">
                <Image
                  src="/placeholder-2.webp"
                  alt="Bất động sản Việt Name"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-500/30 to-cyan-500/40"></div>
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      Việt Nam
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">BĐS Việt Nam</h3>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-8 text-sm">
                    <div className="bg-white/10 backdrop-blur-sm backdrop-brightness-75 rounded-lg p-2 flex justify-between items-center">
                      <div className="text-white/70">TP.HCM</div>
                      <div className="font-bold text-sm">3-25 tỷ</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm backdrop-brightness-75 rounded-lg p-2 flex justify-between items-center">
                      <div className="text-white/70">Hà Nội</div>
                      <div className="font-bold text-sm">3-12 tỷ</div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/products/vietnam">
                      <Button className="w-full bg-white text-blue-600 hover:bg-white font-semibold">
                        Xem 25+ dự án
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </ScaleIn>

          {/* BDS Nghỉ dưỡng - Medium */}
          <ScaleIn delay={0.4} className="lg:col-span-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 brightness-90 dark:brightness-75">
                <Image
                  src="/placeholder-4.jpg"
                  alt="Bất động sản Nghỉ dưỡng"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 via-emerald-500/30 to-teal-500/40"></div>
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Home className="w-5 h-5" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      Nghỉ dưỡng
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">BĐS Nghỉ dưỡng</h3>
                  <p className="text-white/90 text-sm mb-3">
                    Phú Quốc, Đà Nẵng, Bali, Phuket
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/products/resort">
                      <Button className="w-full bg-white text-green-600 hover:bg-white font-semibold text-sm">
                        Khám phá
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </ScaleIn>

          {/* Đối tác - Medium */}
          <ScaleIn delay={0.5} className="lg:col-span-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 brightness-90 dark:brightness-75">
                <Image
                  src="/placeholder-1.webp"
                  alt="Mạng lưới Đối tác"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-slate-700/40" />
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      Đối tác
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold">Mạng lưới Đối tác</h3>
                  <p className="text-white/90 text-sm mb-3">
                    50+ đối tác uy tín toàn cầu
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center text-shadow-md">
                      <div className="font-bold">30+</div>
                      <div className="text-gray-200 text-shadow-md">Chủ ĐT</div>
                    </div>
                    <div className="text-center text-shadow-md">
                      <div className="font-bold">20+</div>
                      <div className="text-gray-200 text-shadow-md">
                        Quốc gia
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/partners">
                      <Button className="w-full bg-white text-purple-600 hover:bg-white font-semibold text-sm">
                        Xem đối tác
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
