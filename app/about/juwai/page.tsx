'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Network,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutJuwaiPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section
        className="py-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url('/images/abstract-blue-bg.png')` }}
      >
        <div className="absolute inset-0 bg-blue-950/30 dark:bg-blue-950/50" />
        <div className="container mx-auto px-4 relative z-10 text-white md:px-8">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/about"
                className="inline-flex items-center text-blue-200 hover:text-blue-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang Giới thiệu
              </Link>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                JUWAI IQI VÀ IQI ATLAS
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mạng lưới toàn cầu và Công nghệ tiên tiến
            </h1>
            <p className="text-xl max-w-3xl">
              Khám phá sức mạnh của Juwai IQI, tập đoàn bất động sản hàng đầu
              Đông Nam Á, và nền tảng công nghệ IQI Atlas đột phá.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Juwai IQI Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Juwai IQI: Sức mạnh toàn cầu
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Juwai IQI là một trong những tập đoàn bất động sản lớn nhất
                    và phát triển nhanh nhất tại Đông Nam Á, với sự hiện diện
                    tại hơn 20 quốc gia và vùng lãnh thổ. Chúng tôi kết nối
                    người mua và người bán trên toàn thế giới, mang đến những cơ
                    hội đầu tư đa dạng.
                  </p>
                  <p>
                    Là thành viên của Juwai IQI, IQI Vietnam được thừa hưởng
                    mạng lưới rộng lớn, nguồn lực dồi dào và kinh nghiệm quốc
                    tế, giúp chúng tôi phục vụ khách hàng một cách toàn diện
                    hơn.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Tìm hiểu thêm về Juwai IQI
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="relative">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/placeholder-2.webp?height=400&width=600"
                    alt="Juwai IQI Global Network"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* IQI Atlas Platform */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              IQI Atlas: Nền tảng công nghệ đột phá
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              IQI Atlas là hệ sinh thái công nghệ độc quyền, hỗ trợ đại lý và
              khách hàng trong mọi giao dịch bất động sản.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <ScaleIn delay={0.2}>
              <motion.div whileHover={{ y: -10 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Lightbulb className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">
                      Quản lý dự án thông minh
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Truy cập thông tin chi tiết về hàng nghìn dự án, cập nhật
                      trạng thái theo thời gian thực.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>

            <ScaleIn delay={0.4}>
              <motion.div whileHover={{ y: -10 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Network className="w-10 h-10 text-purple-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">
                      Kết nối đại lý toàn cầu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hơn 30.000 đại lý trên toàn thế giới cùng nhau chia sẻ
                      thông tin và cơ hội.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>

            <ScaleIn delay={0.6}>
              <motion.div whileHover={{ y: -10 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <TrendingUp className="w-10 h-10 text-orange-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">
                      Phân tích thị trường chuyên sâu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cung cấp dữ liệu và báo cáo thị trường chính xác, hỗ trợ
                      quyết định đầu tư.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Benefits for Clients */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-24">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lợi ích cho khách hàng
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Với Juwai IQI và IQI Atlas, khách hàng của chúng tôi được hưởng
              những lợi ích vượt trội:
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <SlideIn direction="left">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Tiếp cận dự án toàn cầu
                    </h4>
                    <p className="text-muted-foreground">
                      Dễ dàng tìm kiếm và đầu tư vào các dự án bất động sản tại
                      nhiều quốc gia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Thông tin minh bạch
                    </h4>
                    <p className="text-muted-foreground">
                      Mọi thông tin về dự án, pháp lý, giá cả đều được công khai
                      và cập nhật liên tục.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Tư vấn chuyên sâu</h4>
                    <p className="text-muted-foreground">
                      Đội ngũ chuyên gia giàu kinh nghiệm hỗ trợ từ A-Z, đảm bảo
                      quyết định đầu tư hiệu quả.
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Hỗ trợ 24/7</h4>
                    <p className="text-muted-foreground">
                      Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ khách hàng mọi lúc
                      mọi nơi.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Tiện ích đa dạng</h4>
                    <p className="text-muted-foreground">
                      Cung cấp nhiều tiện ích hỗ trợ khách hàng trong quá trình
                      đầu tư.
                    </p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng trở thành một phần của IQI Vietnam?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Khám phá các vị trí tuyển dụng hiện có và gửi hồ sơ của bạn ngay
              hôm nay!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/careers">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Gia nhập đội ngũ
                </Button>
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
