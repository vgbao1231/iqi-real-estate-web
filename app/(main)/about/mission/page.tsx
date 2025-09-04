'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import { Target, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import IntroSection from '@/app/(main)/components/intro-section';
import OutroSection from '@/app/(main)/components/outro-section';
import AchievementSection from '@/app/(main)/components/achievement-section';

export default function AboutMissionPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <IntroSection
        title="Đối tác bất động sản toàn cầu đến từ Châu Á"
        description="Tìm hiểu hành trình phát triển, tầm nhìn toàn cầu và các giá trị cốt lõi định hình IQI Vietnam - thành viên của IQI Global."
      />

      {/* Company Story */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Tập đoàn công nghệ bất động sản hàng đầu
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    IQI Global là tập đoàn công nghệ bất động sản quốc tế, sở
                    hữu mạng lưới hơn 50.000 chuyên viên tại 30 quốc gia, thực
                    hiện hơn 42.000 giao dịch trong năm 2022.
                  </p>
                  <p>
                    IQI Vietnam - chi nhánh tại Việt Nam - mang sứ mệnh kết nối
                    khách hàng với các cơ hội đầu tư bất động sản chất lượng
                    trên toàn cầu.
                  </p>
                  <p>
                    Với hệ sinh thái số hiện đại và đội ngũ chuyên nghiệp, IQI
                    Vietnam không ngừng tạo ra giá trị bền vững cho cộng đồng
                    thông qua đổi mới và chuyên môn sâu rộng.
                  </p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center relative w-full h-96"
                >
                  <Image
                    src="/iqi-vietnam-office.jpg"
                    alt="IQI Vietnam Office"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    priority
                  />
                </motion.div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:px-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sứ mệnh - Tầm nhìn - Giá trị
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <ScaleIn delay={0.2}>
              <motion.div whileHover={{ y: -10 }}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full center-both mx-auto mb-4"
                    >
                      <Target className="w-10 h-10 text-orange-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">Sứ mệnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Trao quyền phát triển cho cá nhân và doanh nghiệp; trở
                      thành tập đoàn tư vấn và tiếp thị bất động sản hàng đầu
                      toàn cầu.
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
                      className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full center-both mx-auto mb-4"
                    >
                      <Zap className="w-10 h-10 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">Tầm nhìn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Thay đổi cuộc sống và hiện thực hóa ước mơ cho cộng đồng,
                      khách hàng và đội ngũ thông qua đổi mới và công nghệ.
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
                      className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full center-both mx-auto mb-4"
                    >
                      <Shield className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">Giá trị cốt lõi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Đam mê - Sáng tạo - Trung thực - Cộng hưởng - Khát vọng
                      lớn. IQI không chỉ hướng đến kết quả mà còn hướng đến sự
                      phát triển bền vững.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Achievement */}
      <AchievementSection />

      {/* Contact CTA */}
      <OutroSection
        title="Bạn có câu hỏi về IQI Vietnam?"
        subtitle="Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ và cơ hội hợp tác"
        primary={{
          label: 'Liên hệ ngay',
          href: '/contact',
        }}
      />
    </div>
  );
}
