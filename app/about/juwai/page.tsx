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
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Achievement from '@/components/sections/achievement';

export default function AboutJuwaiPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 md:px-12 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-600">
        <div className="container mx-auto px-4 relative z-10 text-white">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-orange-100 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100">
                TẬP ĐOÀN JUWAI IQI
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              IQI Global – Mạng lưới bất động sản quốc tế
            </h1>
            <p className="text-xl max-w-3xl">
              Khám phá sức mạnh của Juwai IQI – tập đoàn bất động sản quốc tế sở
              hữu hơn 50.000 chuyên viên tại 30 quốc gia, cùng nền tảng số IQI
              Atlas hỗ trợ toàn diện.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Juwai IQI Overview */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl font-bold mb-6">Về Juwai IQI</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Juwai IQI là tập đoàn công nghệ bất động sản hàng đầu Châu Á
                    – sở hữu mạng lưới hơn 50.000 chuyên viên bất động sản hoạt
                    động tại 30 quốc gia, với hơn 42.000 giao dịch trong năm
                    2022.
                  </p>
                  <p>
                    Là thành viên chính thức, IQI Vietnam thừa hưởng toàn bộ hệ
                    sinh thái và nguồn lực của tập đoàn để kết nối khách hàng
                    với những cơ hội đầu tư toàn cầu.
                  </p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="center-both"
                >
                  <Image
                    src="/images/juwai-iqi-network.jpg"
                    alt="Juwai IQI Network"
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
      <section className="py-16 md:px-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              IQI Atlas – Nền tảng công nghệ dẫn đầu
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              IQI Atlas là hệ sinh thái số toàn diện hỗ trợ chuyên viên bất động
              sản trong toàn bộ quy trình tư vấn, bán hàng, đào tạo và chăm sóc
              khách hàng.
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
                      Quản lý giao dịch
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Theo dõi toàn bộ tiến độ giao dịch, lịch sử khách hàng và
                      tài liệu liên quan ngay trên nền tảng.
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
                      Mạng lưới toàn cầu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Kết nối và hợp tác với hàng chục nghìn đại lý trên toàn
                      thế giới trong thời gian thực.
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
                      Phân tích dữ liệu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hệ thống báo cáo chuyên sâu giúp đánh giá thị trường và
                      hiệu quả bán hàng chính xác.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Benefits for Clients */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Khách hàng nhận được gì từ IQI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              IQI Vietnam mang lại giải pháp toàn diện cho nhà đầu tư, người mua
              và chủ sở hữu bất động sản.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <SlideIn direction="left">
              <div className="space-y-4">
                {[
                  {
                    title: 'Mạng lưới phân phối toàn cầu',
                    desc: 'Tiếp cận khách hàng tiềm năng trên toàn thế giới thông qua hơn 50.000 chuyên viên.',
                  },
                  {
                    title: 'Thông tin minh bạch & chính xác',
                    desc: 'IQI công bố đầy đủ thông tin dự án, pháp lý, hoa hồng và hỗ trợ mọi thủ tục.',
                  },
                  {
                    title: 'Đội ngũ chuyên gia đồng hành',
                    desc: 'Tư vấn chuyên sâu, hỗ trợ lựa chọn sản phẩm, chiến lược đầu tư, tài chính và pháp lý.',
                  },
                ].map((item, idx) => (
                  <div className="flex items-start space-x-3" key={idx}>
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="space-y-4">
                {[
                  {
                    title: 'Hệ thống công nghệ hiện đại',
                    desc: 'IQI Atlas giúp giao dịch nhanh chóng, minh bạch và quản lý hiệu quả.',
                  },
                  {
                    title: 'Đào tạo & cập nhật liên tục',
                    desc: 'Đại lý và khách hàng được tiếp cận thông tin thị trường mới nhất qua nhiều kênh nội bộ.',
                  },
                ].map((item, idx) => (
                  <div className="flex items-start space-x-3" key={idx}>
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Achievement */}
      <Achievement />

      {/* Contact CTA */}
      <section className="py-16 md:px-12 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cùng xây dựng tương lai bất động sản cùng IQI Vietnam
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Gia nhập mạng lưới hơn 50.000 chuyên viên toàn cầu và khám phá cơ
              hội nghề nghiệp hấp dẫn.
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
