'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Heart,
  Users,
  Lightbulb,
  Zap,
  Handshake,
  Smile,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutCulturePage() {
  const cultureValues = [
    {
      icon: Handshake,
      title: 'Hợp tác và Đoàn kết',
      description:
        'Chúng tôi tin vào sức mạnh của sự hợp tác, cùng nhau xây dựng một môi trường làm việc hỗ trợ.',
      color: 'green',
    },
    {
      icon: Lightbulb,
      title: 'Sáng tạo và Đổi mới',
      description:
        'Khuyến khích tư duy đột phá, không ngừng tìm kiếm những giải pháp mới và hiệu quả.',
      color: 'purple',
    },
    {
      icon: Smile,
      title: 'Tôn trọng và Lắng nghe',
      description:
        'Mọi ý kiến đều được trân trọng, tạo nên một môi trường cởi mở và đa dạng.',
      color: 'yellow',
    },
    {
      icon: Heart,
      title: 'Tận tâm và Trách nhiệm',
      description:
        'Cam kết mang lại giá trị tốt nhất cho khách hàng và cộng đồng với tinh thần trách nhiệm cao.',
      color: 'red',
    },
  ];

  const environmentBenefits = [
    {
      icon: Briefcase,
      title: 'Cơ hội phát triển sự nghiệp',
      description:
        'Lộ trình thăng tiến rõ ràng, cơ hội học hỏi và phát triển bản thân không ngừng.',
    },
    {
      icon: Users,
      title: 'Môi trường làm việc năng động',
      description:
        'Đội ngũ trẻ, nhiệt huyết, luôn sẵn sàng chia sẻ và hỗ trợ lẫn nhau.',
    },
    {
      icon: Zap,
      title: 'Công nghệ hiện đại',
      description:
        'Ứng dụng các công cụ và nền tảng công nghệ tiên tiến nhất trong công việc.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-600">
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
                VĂN HÓA VÀ MÔI TRƯỜNG
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Văn hóa và Môi trường làm việc tại IQI Vietnam
            </h1>
            <p className="text-xl max-w-3xl">
              Chúng tôi xây dựng một môi trường làm việc nơi mỗi cá nhân đều
              được truyền cảm hứng để phát triển và cống hiến.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-16">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Giá trị văn hóa cốt lõi
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những nguyên tắc định hướng mọi hoạt động và tương tác của chúng
              tôi.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
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
                    Tại IQI Vietnam, chúng tôi tạo dựng một môi trường làm việc
                    chuyên nghiệp, năng động và đầy cảm hứng. Chúng tôi tin rằng
                    sự phát triển của mỗi cá nhân là chìa khóa cho sự thành công
                    của tổ chức.
                  </p>
                  <p>
                    Bạn sẽ được làm việc trong một không gian mở, hiện đại, với
                    các đồng nghiệp tài năng và luôn sẵn sàng hỗ trợ. Chúng tôi
                    khuyến khích sự chủ động, sáng tạo và tinh thần học hỏi
                    không ngừng.
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
