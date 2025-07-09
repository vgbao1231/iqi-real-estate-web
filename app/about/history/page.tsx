'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Globe,
  Building,
  Handshake,
  Target,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function HistoryPage() {
  const milestones = [
    {
      year: '2009',
      title: 'Thành lập IQI Vietnam',
      description:
        'Công ty được thành lập với văn phòng đầu tiên tại TP.HCM, bắt đầu hành trình phát triển trong lĩnh vực bất động sản.',
      icon: Building,
      color: 'blue',
    },
    {
      year: '2011',
      title: 'Mở rộng ra Hà Nội',
      description:
        'Khai trương văn phòng thứ hai tại Hà Nội, đánh dấu sự mở rộng ra thị trường miền Bắc.',
      icon: Globe,
      color: 'green',
    },
    {
      year: '2013',
      title: 'Đạt 1000+ giao dịch',
      description:
        'Cột mốc quan trọng với hơn 1000 giao dịch bất động sản thành công, khẳng định uy tín trên thị trường.',
      icon: TrendingUp,
      color: 'orange',
    },
    {
      year: '2015',
      title: 'Gia nhập Juwai IQI',
      description:
        'Chính thức trở thành thành viên của mạng lưới Juwai IQI - tập đoàn bất động sản lớn nhất Đông Nam Á.',
      icon: Handshake,
      color: 'purple',
    },
    {
      year: '2017',
      title: 'Mở rộng quốc tế',
      description:
        'Bắt đầu cung cấp dịch vụ bất động sản quốc tế, kết nối khách hàng Việt với thị trường toàn cầu.',
      icon: Globe,
      color: 'blue',
    },
    {
      year: '2019',
      title: 'Đạt 5000+ khách hàng',
      description:
        'Phục vụ thành công hơn 5000 khách hàng với tỷ lệ hài lòng trên 95%.',
      icon: Users,
      color: 'green',
    },
    {
      year: '2021',
      title: 'Chuyển đổi số',
      description:
        'Triển khai hệ thống công nghệ hiện đại, ứng dụng AI và Big Data trong tư vấn bất động sản.',
      icon: Zap,
      color: 'orange',
    },
    {
      year: '2023',
      title: '20 văn phòng toàn quốc',
      description:
        'Mở rộng mạng lưới với 20 văn phòng trên toàn quốc và hơn 500 chuyên viên tư vấn.',
      icon: Target,
      color: 'purple',
    },
  ];

  const achievements = [
    {
      title: 'Top 3 Công ty BDS uy tín',
      year: '2022',
      organization: 'Hiệp hội BDS Việt Nam',
      description:
        'Được vinh danh trong top 3 công ty bất động sản uy tín nhất Việt Nam',
    },
    {
      title: 'Giải thưởng Dịch vụ xuất sắc',
      year: '2021',
      organization: 'Vietnam Property Awards',
      description:
        'Nhận giải thưởng cho dịch vụ khách hàng xuất sắc trong lĩnh vực BDS',
    },
    {
      title: 'Đối tác chiến lược của năm',
      year: '2020',
      organization: 'Juwai IQI Group',
      description:
        'Được Juwai IQI Group vinh danh là đối tác chiến lược xuất sắc nhất',
    },
    {
      title: 'Thương hiệu tin cậy',
      year: '2019',
      organization: 'Vietnam Brand Awards',
      description:
        'Được công nhận là thương hiệu đáng tin cậy trong lĩnh vực BDS',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex gap-2 mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-orange-600 hover:text-orange-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Link>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                LỊCH SỬ PHÁT TRIỂN
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hành trình 15 năm phát triển
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Từ một văn phòng nhỏ đến mạng lưới 20 văn phòng toàn quốc, IQI
              Vietnam đã không ngừng phát triển và khẳng định vị thế trong ngành
              bất động sản.
            </p>
          </FadeIn>
        </div>
      </section>
      {/* Timeline */}
      <section className="px-6 py-12">
        <div className="container mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Các cột mốc quan trọng
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những dấu mốc đáng nhớ trong hành trình phát triển của IQI Vietnam
            </p>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-200 via-orange-300 to-orange-400 dark:from-orange-800 dark:via-orange-700 dark:to-orange-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <SlideIn key={index} direction="up" delay={index * 0.1}>
                  <div
                    className={clsx(
                      'flex flex-col items-center md:items-stretch',
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    )}
                  >
                    {/* Nội dung bên */}
                    <div
                      className={clsx(
                        'w-full md:w-1/2 text-center md:text-inherit order-2 md:order-1',
                        index % 2 === 0
                          ? 'md:pr-8 md:text-right'
                          : 'md:pl-8 md:text-left'
                      )}
                    >
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader>
                            <div
                              className={clsx(
                                'flex items-center mb-2 justify-center md:flex-row',
                                index % 2 === 0
                                  ? 'md:justify-end'
                                  : 'md:justify-start'
                              )}
                            >
                              <Badge
                                className={clsx(
                                  milestone.color === 'blue' &&
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
                                  milestone.color === 'green' &&
                                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
                                  milestone.color === 'orange' &&
                                    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
                                  milestone.color === 'purple' &&
                                    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                )}
                              >
                                {milestone.year}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl">
                              {milestone.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {Array.isArray(milestone.description) ? (
                              <ul className="text-muted-foreground list-none pl-0 space-y-1">
                                {milestone.description.map((desc, i) => (
                                  <li key={i}>– {desc}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground">
                                {milestone.description}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10 order-1 md:order-2 center-both">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={clsx(
                          'w-16 h-16 rounded-full flex items-center justify-center shadow-lg mx-auto',
                          milestone.color === 'blue' &&
                            'bg-gradient-to-r from-blue-400 to-blue-500',
                          milestone.color === 'green' &&
                            'bg-gradient-to-r from-green-400 to-green-500',
                          milestone.color === 'orange' &&
                            'bg-gradient-to-r from-orange-400 to-orange-500',
                          milestone.color === 'purple' &&
                            'bg-gradient-to-r from-purple-400 to-purple-500'
                        )}
                      >
                        <milestone.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Cột phụ bên phải (ẩn trên mobile) */}
                    <div className="w-full md:w-1/2 hidden md:block order-3"></div>
                  </div>
                </SlideIn>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Achievements */}
      <section className="p-2 py-6 md:p-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Giải thưởng & Thành tựu
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Những giải thưởng và sự công nhận từ các tổ chức uy tín trong và
              ngoài nước
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                          {achievement.year}
                        </Badge>
                        <Award className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg md:text-xl">
                        {achievement.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">
                        {achievement.organization}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vision for Future */}
      <section className="p-2 py-6 md:p-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                  TƯƠNG LAI
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Tầm nhìn 2030
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Đến năm 2030, IQI Vietnam phấn đấu trở thành công ty bất
                    động sản số 1 Việt Nam với mạng lưới 50 văn phòng trên toàn
                    quốc và khu vực.
                  </p>
                  <p>
                    Chúng tôi sẽ tiên phong trong việc ứng dụng công nghệ AI,
                    VR/AR và Blockchain để mang đến trải nghiệm tốt nhất cho
                    khách hàng.
                  </p>
                  <p>
                    Mục tiêu phục vụ 100,000 khách hàng và tạo ra hệ sinh thái
                    bất động sản toàn diện từ tư vấn, giao dịch đến quản lý tài
                    sản.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/about">
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                      Tìm hiểu thêm về IQI Vietnam
                    </Button>
                  </Link>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="relative center-both">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Image
                    src="/placeholder-2.webp?height=500&width=600"
                    alt="IQI Vietnam Future Vision"
                    width={600}
                    height={500}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-r from-orange-200 to-orange-300 dark:from-orange-800 dark:to-orange-700 rounded-lg -z-10"></div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
      {/* Stats Evolution */}
      <section className="p-2 py-6 md:p-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sự phát triển qua các con số
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những con số ấn tượng thể hiện sự phát triển không ngừng của IQI
              Vietnam
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '15+',
                label: 'Năm kinh nghiệm',
                icon: Calendar,
                description: 'Từ 2009 đến nay',
              },
              {
                number: '20+',
                label: 'Văn phòng',
                icon: Building,
                description: 'Trên toàn quốc',
              },
              {
                number: '500+',
                label: 'Chuyên viên',
                icon: Users,
                description: 'Đội ngũ chuyên nghiệp',
              },
              {
                number: '10,000+',
                label: 'Giao dịch',
                icon: TrendingUp,
                description: 'Thành công',
              },
            ].map((item, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <item.icon className="w-8 h-8 text-orange-600" />
                      </motion.div>
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {item.number}
                      </div>
                      <div className="font-medium mb-1">{item.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>
      {/* Contact CTA */}
      <section className="p-2 py-6 md:p-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cùng IQI Vietnam viết tiếp câu chuyện thành công
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Hãy trở thành một phần trong hành trình phát triển của chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/careers">
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100"
                  >
                    Gia nhập đội ngũ
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                  >
                    Liên hệ hợp tác
                  </Button>
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
