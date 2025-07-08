'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Users,
  Globe,
  Award,
  TrendingUp,
  Handshake,
  Star,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PartnersPage() {
  const internationalPartners = [
    {
      id: 1,
      name: 'CapitaLand',
      country: 'Singapore',
      logo: '/placeholder-2.webp?height=80&width=120',
      description:
        'Tập đoàn bất động sản hàng đầu châu Á với hơn 30 năm kinh nghiệm',
      projects: '200+ dự án',
      countries: '30+ quốc gia',
      specialties: ['Căn hộ cao cấp', 'Trung tâm thương mại', 'Văn phòng'],
      website: 'www.capitaland.com',
    },
    {
      id: 2,
      name: 'Keppel Land',
      country: 'Singapore',
      logo: '/placeholder-2.webp?height=80&width=120',
      description:
        'Nhà phát triển bất động sản quốc tế với tiêu chuẩn chất lượng cao',
      projects: '150+ dự án',
      countries: '15+ quốc gia',
      specialties: ['Khu đô thị', 'Căn hộ sang trọng', 'Dự án hỗn hợp'],
      website: 'www.keppelland.com',
    },
    {
      id: 3,
      name: 'Novaland',
      country: 'Vietnam',
      logo: '/placeholder-2.webp?height=80&width=120',
      description:
        'Tập đoàn bất động sản hàng đầu Việt Nam với nhiều dự án iconic',
      projects: '100+ dự án',
      countries: '3 quốc gia',
      specialties: ['Resort', 'Căn hộ cao cấp', 'Khu đô thị'],
      website: 'www.novaland.com.vn',
    },
    {
      id: 4,
      name: 'Sunway Group',
      country: 'Malaysia',
      logo: '/placeholder-2.webp?height=80&width=120',
      description: 'Tập đoàn đa ngành với thế mạnh về bất động sản và du lịch',
      projects: '80+ dự án',
      countries: '10+ quốc gia',
      specialties: ['Khu nghỉ dưỡng', 'Trung tâm thương mại', 'Giáo dục'],
      website: 'www.sunway.com.my',
    },
    {
      id: 5,
      name: 'Sansiri',
      country: 'Thailand',
      logo: '/placeholder-2.webp?height=80&width=120',
      description: 'Nhà phát triển bất động sản hàng đầu Thái Lan',
      projects: '300+ dự án',
      countries: '5 quốc gia',
      specialties: ['Căn hộ', 'Biệt thự', 'Townhouse'],
      website: 'www.sansiri.com',
    },
    {
      id: 6,
      name: 'Emaar Properties',
      country: 'UAE',
      logo: '/placeholder-2.webp?height=80&width=120',
      description: 'Tập đoàn bất động sản toàn cầu với các dự án biểu tượng',
      projects: '500+ dự án',
      countries: '20+ quốc gia',
      specialties: ['Siêu dự án', 'Căn hộ luxury', 'Khách sạn'],
      website: 'www.emaar.com',
    },
  ];

  const bankingPartners = [
    {
      id: 1,
      name: 'Vietcombank',
      logo: '/placeholder-2.webp?height=60&width=120',
      type: 'Ngân hàng thương mại',
      services: ['Vay mua nhà', 'Vay đầu tư BDS', 'Tài khoản tiết kiệm'],
      loanRate: 'Từ 6.5%/năm',
      maxLoan: 'Lên đến 85%',
      website: 'www.vietcombank.com.vn',
    },
    {
      id: 2,
      name: 'BIDV',
      logo: '/placeholder-2.webp?height=60&width=120',
      type: 'Ngân hàng đầu tư và phát triển',
      services: ['Vay mua căn hộ', 'Vay xây dựng', 'Bảo lãnh'],
      loanRate: 'Từ 6.8%/năm',
      maxLoan: 'Lên đến 80%',
      website: 'www.bidv.com.vn',
    },
    {
      id: 3,
      name: 'Techcombank',
      logo: '/placeholder-2.webp?height=60&width=120',
      type: 'Ngân hàng thương mại',
      services: ['Vay mua nhà', 'Vay cầm cố', 'Thẻ tín dụng'],
      loanRate: 'Từ 6.2%/năm',
      maxLoan: 'Lên đến 90%',
      website: 'www.techcombank.com.vn',
    },
    {
      id: 4,
      name: 'VPBank',
      logo: '/placeholder-2.webp?height=60&width=120',
      type: 'Ngân hàng thương mại',
      services: ['Vay BDS', 'Vay tín chấp', 'Dịch vụ tài chính'],
      loanRate: 'Từ 6.9%/năm',
      maxLoan: 'Lên đến 85%',
      website: 'www.vpbank.com.vn',
    },
    {
      id: 5,
      name: 'MB Bank',
      logo: '/placeholder-2.webp?height=60&width=120',
      type: 'Ngân hàng quân đội',
      services: ['Vay mua nhà', 'Vay đầu tư', 'Gói tài chính'],
      loanRate: 'Từ 6.7%/năm',
      maxLoan: 'Lên đến 80%',
      website: 'www.mbbank.com.vn',
    },
    {
      id: 6,
      name: 'ACB',
      logo: '/placeholder-2.webp?height=60&width=120',
      type: 'Ngân hàng á châu',
      services: ['Vay BDS', 'Tài khoản doanh nghiệp', 'Bảo hiểm'],
      loanRate: 'Từ 6.4%/năm',
      maxLoan: 'Lên đến 85%',
      website: 'www.acb.com.vn',
    },
  ];

  const partnershipBenefits = [
    {
      icon: Globe,
      title: 'Mạng lưới toàn cầu',
      description: 'Kết nối với hơn 500 đối tác trên 30 quốc gia',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Award,
      title: 'Chất lượng đảm bảo',
      description: 'Tất cả đối tác đều được kiểm định nghiêm ngặt',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: TrendingUp,
      title: 'Lợi ích tối ưu',
      description: 'Đàm phán được mức giá và điều kiện tốt nhất',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: Handshake,
      title: 'Hỗ trợ toàn diện',
      description: 'Đồng hành từ tư vấn đến hoàn tất thủ tục',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <Users className="w-3 h-3 mr-1" />
                ĐỐI TÁC CHIẾN LƯỢC
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Đối tác của chúng tôi
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              IQI Vietnam tự hào hợp tác với những tên tuổi hàng đầu trong ngành
              bất động sản và tài chính, mang đến cho khách hàng những cơ hội
              đầu tư tốt nhất.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lợi ích từ mạng lưới đối tác
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Với mạng lưới đối tác rộng khắp, chúng tôi mang đến những giá trị
              vượt trội cho khách hàng
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${benefit.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
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

      {/* International Partners Carousel */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đối tác quốc tế
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hợp tác với các tập đoàn bất động sản hàng đầu thế giới
            </p>
          </FadeIn>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {internationalPartners.map((partner, index) => (
                  <CarouselItem
                    key={partner.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <ScaleIn delay={index * 0.1}>
                      <motion.div whileHover={{ y: -5 }}>
                        <Card className="h-full">
                          <CardHeader className="text-center">
                            <div className="w-32 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                              <Image
                                src={partner.logo || '/placeholder-2.webp'}
                                alt={partner.name}
                                width={120}
                                height={80}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <CardTitle className="text-xl">
                              {partner.name}
                            </CardTitle>
                            <div className="flex items-center justify-center space-x-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {partner.country}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm">
                              {partner.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Dự án:
                                </span>
                                <div className="font-semibold">
                                  {partner.projects}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Quốc gia:
                                </span>
                                <div className="font-semibold">
                                  {partner.countries}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-sm">
                                Chuyên môn:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {partner.specialties.map((specialty, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Website
                              </Button>
                              <Button size="sm" className="flex-1">
                                Liên hệ
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </ScaleIn>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Banking Partners Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đối tác tài chính
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kết nối với các ngân hàng uy tín để hỗ trợ tài chính tốt nhất
            </p>
          </FadeIn>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {bankingPartners.map((bank, index) => (
                  <CarouselItem
                    key={bank.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <ScaleIn delay={index * 0.1}>
                      <motion.div whileHover={{ y: -5 }}>
                        <Card className="h-full">
                          <CardHeader className="text-center">
                            <div className="w-32 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                              <Image
                                src={bank.logo || '/placeholder-2.webp'}
                                alt={bank.name}
                                width={120}
                                height={60}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <CardTitle className="text-xl">
                              {bank.name}
                            </CardTitle>
                            <p className="text-muted-foreground text-sm">
                              {bank.type}
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Lãi suất:
                                </span>
                                <div className="font-semibold text-green-600">
                                  {bank.loanRate}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Vay tối đa:
                                </span>
                                <div className="font-semibold text-blue-600">
                                  {bank.maxLoan}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-sm">
                                Dịch vụ:
                              </h4>
                              <div className="space-y-1">
                                {bank.services.map((service, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center text-xs text-muted-foreground"
                                  >
                                    <Star className="w-3 h-3 mr-1 text-yellow-500 flex-shrink-0" />
                                    {service}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Website
                              </Button>
                              <Button size="sm" className="flex-1">
                                Tư vấn vay
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </ScaleIn>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trở thành đối tác của IQI
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Gia nhập mạng lưới đối tác toàn cầu và cùng chúng tôi phát triển
              thị trường bất động sản
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Liên hệ hợp tác
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Gửi đề xuất hợp tác
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
