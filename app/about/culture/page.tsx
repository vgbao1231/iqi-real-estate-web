'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  Users,
  Briefcase,
  ArrowRight,
  Globe,
  Layers,
  Megaphone,
  Sparkles,
  BarChart,
  Cpu,
  GraduationCap,
  Network,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Achievement from '@/components/sections/achievement';
import IntroSection from '@/components/common/intro-section';
import OutroSection from '@/components/common/outro-section';

export default function AboutCulturePage() {
  const cultureValues = [
    {
      title: 'Đam mê và sáng tạo',
      description:
        'Luôn đổi mới và đầu tư công nghệ để dẫn đầu, nâng cao trải nghiệm cho khách hàng và cộng đồng.',
      icon: Sparkles,
      color: 'orange',
    },
    {
      title: 'Tổng hoà nguồn lực',
      description:
        'Xây dựng mô hình doanh nghiệp trong doanh nghiệp, phát huy thế mạnh đa chiều.',
      icon: Layers,
      color: 'green',
    },
    {
      title: 'Môi trường chuyên nghiệp',
      description:
        'IQI Vietnam là nơi giao thoa giữa thế hệ trẻ năng động và đội ngũ dày kinh nghiệm.',
      icon: Briefcase,
      color: 'blue',
    },
    {
      title: 'Tư duy toàn cầu',
      description:
        'Chiến lược phát triển gắn liền với tầm nhìn quốc tế, hướng đến dẫn đầu toàn cầu.',
      icon: Globe,
      color: 'purple',
    },
    {
      title: 'Hiệu ứng truyền thông',
      description:
        'Phát triển thương hiệu thông qua đào tạo và đội ngũ KOLs chất lượng ngành BĐS.',
      icon: Megaphone,
      color: 'red',
    },
  ];

  const environmentBenefits = [
    {
      title: 'Đào tạo chuyên sâu',
      description:
        'Học viện IQI và nền tảng online giúp bạn phát triển liên tục về chuyên môn và kỹ năng.',
      icon: GraduationCap,
    },
    {
      title: 'Nền tảng công nghệ hiện đại',
      description:
        'Super App, hệ sinh thái kỹ thuật số hỗ trợ toàn diện từ đăng tin đến phân tích dữ liệu.',
      icon: Cpu,
    },
    {
      title: 'Mạng lưới toàn cầu',
      description:
        'Kết nối hơn 50,000 chuyên viên từ 111 quốc gia, mở rộng cơ hội quốc tế.',
      icon: Network,
    },
    {
      title: 'Cơ hội thăng tiến rõ ràng',
      description:
        'Lộ trình phát triển minh bạch, bạn có thể trở thành Team Leader, Director chỉ trong vài năm.',
      icon: TrendingUp,
    },
    {
      title: 'Thị trường lớn và tiềm năng',
      description:
        'Phân phối hàng trăm dự án cao cấp trên toàn Việt Nam với doanh số hàng trăm triệu USD.',
      icon: BarChart,
    },
    {
      title: 'Văn hóa gắn kết',
      description:
        'Các hoạt động gắn kết đội ngũ, truyền cảm hứng và xây dựng thương hiệu cá nhân.',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <IntroSection
        title="IQI Vietnam - Nơi truyền cảm hứng và phát triển"
        description="Chúng tôi không ngừng tạo ra giá trị, trao quyền cho từng cá nhân
              phát triển vượt bậc trong môi trường đầy năng lượng, công nghệ và
              cơ hội toàn cầu."
      />

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Giá trị văn hóa cốt lõi
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những nguyên tắc định hướng mọi hoạt động và tương tác của chúng
              tôi.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-8">
            {cultureValues.map((value, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full lg:w-[24vw]">
                    <CardHeader>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-20 h-20 bg-${value.color}-100 dark:bg-${value.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <value.icon
                          className={`w-10 h-10 text-${value.color}-600`}
                        />
                      </motion.div>
                      <CardTitle className="text-2xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Work Environment */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Môi trường làm việc lý tưởng
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Với hơn 670 đại diện kinh doanh tại TP.HCM, Hà Nội và Đà
                    Nẵng, IQI Vietnam xây dựng môi trường làm việc chuyên
                    nghiệp, sáng tạo và đáng tin cậy.
                  </p>
                  <p>
                    Chúng tôi luôn khuyến khích sự chủ động, học hỏi không ngừng
                    và tinh thần hợp tác trong không gian hiện đại, đầy cảm
                    hứng.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
                  <Link href="/careers">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Xem cơ hội nghề nghiệp
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="relative">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/placeholder-2.webp?height=400&width=600"
                    alt="IQI Vietnam Work Environment"
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

      {/* Benefits and Growth */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-16">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lợi ích khi gia nhập IQI Vietnam
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến những điều kiện tốt nhất để bạn phát
              triển sự nghiệp.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {environmentBenefits.map((benefit, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <benefit.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement */}
      <Achievement />

      {/* Contact CTA */}

      <OutroSection
        title="Sẵn sàng gia nhập đội ngũ hơn 670 chiến binh tại IQI Vietnam?"
        subtitle="Hãy là một phần của tập đoàn bất động sản quốc tế, tiên phong về công nghệ và đào tạo!"
        primary={{
          label: 'Gia nhập đội ngũ',
          href: '/careers',
        }}
      />
    </div>
  );
}
