'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  Users,
  Award,
  Globe,
  Target,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import IntroSection from '@/app/(main)/components/intro-section';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <IntroSection
        title="Giới thiệu về IQI Vietnam"
        description="Với hơn 15 năm kinh nghiệm trong lĩnh vực bất động sản, IQI Vietnam đã khẳng định vị thế là đối tác tin cậy của hàng nghìn khách hàng trên toàn quốc."
      />

      {/* Company Story */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Câu chuyện thành lập
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    IQI Vietnam được thành lập vào năm 2009 với tầm nhìn trở
                    thành công ty bất động sản hàng đầu tại Việt Nam. Khởi đầu
                    từ một văn phòng nhỏ tại TP.HCM, chúng tôi đã không ngừng
                    phát triển và mở rộng.
                  </p>
                  <p>
                    Năm 2015, IQI Vietnam chính thức gia nhập mạng lưới Juwai
                    IQI - tập đoàn bất động sản lớn nhất Đông Nam Á, mở ra cơ
                    hội tiếp cận thị trường quốc tế cho khách hàng Việt Nam.
                  </p>
                  <p>
                    Đến nay, với hơn 500 đại lý chuyên nghiệp và 20 văn phòng
                    trên toàn quốc, chúng tôi tự hào là cầu nối tin cậy giữa
                    khách hàng và những cơ hội đầu tư bất động sản tốt nhất.
                  </p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="relative">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/placeholder-2.webp?height=400&width=600"
                    alt="IQI Vietnam Office"
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
                      className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Target className="w-10 h-10 text-orange-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">Sứ mệnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Kết nối khách hàng với những cơ hội bất động sản tốt nhất,
                      tạo ra giá trị bền vững cho cộng đồng và xã hội thông qua
                      dịch vụ chuyên nghiệp và tận tâm.
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
                      className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Zap className="w-10 h-10 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">Tầm nhìn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Trở thành công ty bất động sản hàng đầu Việt Nam, tiên
                      phong trong ứng dụng công nghệ và dịch vụ, mở rộng ra thị
                      trường khu vực và quốc tế.
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
                      className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Shield className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <CardTitle className="text-2xl">Giá trị cốt lõi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Chính trực, chuyên nghiệp, tận tâm và luôn đặt lợi ích
                      khách hàng lên hàng đầu. Chúng tôi cam kết minh bạch trong
                      mọi giao dịch.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Thành tựu đạt được
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những con số ấn tượng khẳng định vị thế của IQI Vietnam trong
              ngành bất động sản
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { number: '15+', label: 'Năm kinh nghiệm', icon: Award },
              {
                number: '10,000+',
                label: 'Bất động sản đã bán',
                icon: TrendingUp,
              },
              { number: '5,000+', label: 'Khách hàng hài lòng', icon: Users },
              { number: '20+', label: 'Văn phòng toàn quốc', icon: Globe },
            ].map((item, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <item.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {item.number}
                      </div>
                      <div className="text-muted-foreground">{item.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:px-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đội ngũ lãnh đạo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những con người tài năng và giàu kinh nghiệm dẫn dắt IQI Vietnam
              phát triển
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Văn A',
                position: 'Tổng Giám đốc',
                experience: '20+ năm kinh nghiệm BDS',
                image: '/placeholder-2.webp?height=300&width=300',
              },
              {
                name: 'Trần Thị B',
                position: 'Giám đốc Kinh doanh',
                experience: '15+ năm phát triển thị trường',
                image: '/placeholder-2.webp?height=300&width=300',
              },
              {
                name: 'Lê Văn C',
                position: 'Giám đốc Đào tạo',
                experience: '12+ năm đào tạo chuyên nghiệp',
                image: '/placeholder-2.webp?height=300&width=300',
              },
            ].map((member, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center">
                    <CardHeader>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={member.image || '/placeholder-2.webp'}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="w-40 h-40 rounded-full mx-auto mb-4"
                        />
                      </motion.div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-orange-600 font-semibold">
                        {member.position}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {member.experience}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:px-12 bg-gradient-to-r from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Muốn tìm hiểu thêm về IQI Vietnam?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ và cơ
              hội hợp tác
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  Liên hệ ngay
                </Button>
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
