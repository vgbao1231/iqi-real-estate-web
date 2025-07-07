'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Award,
  TrendingUp,
  Users,
  Globe,
  Briefcase,
  Clock,
  MapPin,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CareersPage() {
  const jobOpenings = [
    {
      id: 1,
      title: 'Chuyên viên Tư vấn Bất động sản',
      department: 'Kinh doanh',
      location: 'TP.HCM',
      type: 'Toàn thời gian',
      salary: '15-30 triệu + Hoa hồng',
      experience: '0-2 năm',
      description:
        'Tư vấn khách hàng về các sản phẩm BDS, hỗ trợ quy trình mua bán...',
    },
    {
      id: 2,
      title: 'Trưởng nhóm Kinh doanh',
      department: 'Kinh doanh',
      location: 'Hà Nội',
      type: 'Toàn thời gian',
      salary: '25-50 triệu + Hoa hồng',
      experience: '3-5 năm',
      description:
        'Quản lý đội nhóm sales, phát triển thị trường và đào tạo nhân viên...',
    },
    {
      id: 3,
      title: 'Chuyên viên Marketing Digital',
      department: 'Marketing',
      location: 'TP.HCM',
      type: 'Toàn thời gian',
      salary: '12-20 triệu',
      experience: '1-3 năm',
      description:
        'Phát triển chiến lược marketing online, quản lý social media...',
    },
    {
      id: 4,
      title: 'Thực tập sinh Kinh doanh',
      department: 'Kinh doanh',
      location: 'TP.HCM/Hà Nội',
      type: 'Thực tập',
      salary: '5-8 triệu + Hỗ trợ',
      experience: 'Sinh viên',
      description:
        'Hỗ trợ team sales, học hỏi kinh nghiệm thực tế trong BDS...',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              Cơ HỘI NGHỀ NGHIỆP
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tham gia đội ngũ IQI Vietnam
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Khởi đầu sự nghiệp bất động sản với đội ngũ chuyên nghiệp, chương
              trình đào tạo toàn diện và cơ hội thu nhập hấp dẫn tại IQI
              Vietnam.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose IQI */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại sao chọn IQI Vietnam?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những lý do khiến IQI Vietnam trở thành lựa chọn hàng đầu cho sự
              nghiệp bất động sản của bạn
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Đào tạo chuyên nghiệp',
                desc: 'Chương trình đào tạo 6 tháng với chứng chỉ quốc tế, mentor 1-1',
                color: 'text-orange-600',
                bg: 'bg-orange-100 dark:bg-orange-900/30',
              },
              {
                icon: TrendingUp,
                title: 'Thu nhập hấp dẫn',
                desc: 'Lương cơ bản + hoa hồng cao + thưởng hiệu suất + phụ cấp',
                color: 'text-green-600',
                bg: 'bg-green-100 dark:bg-green-900/30',
              },
              {
                icon: Users,
                title: 'Môi trường năng động',
                desc: 'Đội ngũ trẻ, sáng tạo, văn hóa hỗ trợ và phát triển lẫn nhau',
                color: 'text-blue-600',
                bg: 'bg-blue-100 dark:bg-blue-900/30',
              },
              {
                icon: Globe,
                title: 'Cơ hội quốc tế',
                desc: 'Làm việc với dự án quốc tế, cơ hội du lịch và học hỏi',
                color: 'text-purple-600',
                bg: 'bg-purple-100 dark:bg-purple-900/30',
              },
            ].map((item, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vị trí đang tuyển dụng
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Khám phá các cơ hội nghề nghiệp hấp dẫn tại IQI Vietnam
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <ScaleIn key={job.id} delay={index * 0.2}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant="outline">{job.department}</Badge>
                      </div>
                      <p className="text-muted-foreground">{job.description}</p>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="font-semibold text-green-600">
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Kinh nghiệm: {job.experience}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Link href={`/careers/${job.id}`}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              Xem chi tiết
                            </Button>
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="outline">Ứng tuyển</Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Training Program */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Chương trình đào tạo toàn diện
                </h2>
                <p className="text-muted-foreground mb-6">
                  IQI Vietnam cam kết đầu tư vào sự phát triển của nhân viên
                  thông qua chương trình đào tạo chuyên nghiệp và bài bản.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Kiến thức cơ bản (Tháng 1-2)
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Luật pháp BDS, quy trình giao dịch, kỹ năng tư vấn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Kỹ năng bán hàng (Tháng 3-4)
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Kỹ thuật thuyết phục, đàm phán, chăm sóc khách hàng
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Thực hành & Chứng chỉ (Tháng 5-6)
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Dự án thực tế, mentor 1-1, thi lấy chứng chỉ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="relative">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/placeholder-2.webp?height=400&width=500"
                    alt="Training Program"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
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
              Sẵn sàng gia nhập IQI Vietnam?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Gửi CV của bạn hoặc liên hệ với chúng tôi để tìm hiểu thêm về các
              cơ hội nghề nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  Gửi CV ngay
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                >
                  Liên hệ HR
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
