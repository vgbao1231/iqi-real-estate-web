'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Star,
  Phone,
  Mail,
  ChevronDown,
  Award,
  CheckCircle,
  ChevronUp,
  Globe,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PartnersPage() {
  const [showAllDevelopers, setShowAllDevelopers] = useState(false);
  const [showAllInternational, setShowAllInternational] = useState(false);
  const [showAllBanking, setShowAllBanking] = useState(false);

  const developerPartners = [
    {
      id: 1,
      name: 'CapitaLand',
      type: 'Chủ đầu tư quốc tế',
      description:
        'Tập đoàn bất động sản hàng đầu Singapore với nhiều dự án cao cấp tại Việt Nam.',
      logo: '/developer-partner-logos/capita-land.png',
      projects: 15,
      partnership: '2017',
      revenue: '400+ tỷ',
      specialties: ['Mixed-use', 'Office', 'Retail'],
      achievements: [
        'International Partner',
        'Sustainability Award',
        'Innovation Excellence',
      ],
    },
    {
      id: 2,
      name: 'EcoPark',
      type: 'Nhà phát triển đô thị xanh',
      description:
        'Chuyên xây dựng các khu đô thị sinh thái hiện đại với không gian sống xanh.',
      logo: '/developer-partner-logos/ecopark.png',
      projects: 10,
      partnership: '2020',
      revenue: '150+ tỷ',
      specialties: ['Eco-living', 'Khu đô thị', 'Biệt thự xanh'],
      achievements: [
        'Green Living Award',
        'Eco Excellence',
        'Strategic Collaboration',
      ],
    },
    {
      id: 3,
      name: 'Gamuda Land',
      type: 'Nhà phát triển Malaysia',
      description:
        'Chuyên phát triển các khu đô thị sinh thái và dự án cao cấp.',
      logo: '/developer-partner-logos/gamoda-land.png',
      projects: 8,
      partnership: '2021',
      revenue: '200+ tỷ',
      specialties: ['Eco-city', 'Township', 'Green building'],
      achievements: [
        'Green Developer',
        'Sustainable Partner',
        'Quality Excellence',
      ],
    },
    {
      id: 4,
      name: 'Khang Điền',
      type: 'Chủ đầu tư địa phương',
      description:
        'Phát triển nhiều dự án nhà ở vừa túi tiền và căn hộ tại TP.HCM.',
      logo: '/developer-partner-logos/khang-dien.png',
      projects: 20,
      partnership: '2019',
      revenue: '180+ tỷ',
      specialties: ['Affordable housing', 'Apartments', 'Community housing'],
      achievements: [
        'Social Impact Partner',
        'Community Developer',
        'Affordable Housing Award',
      ],
    },
    {
      id: 5,
      name: 'Madison Land',
      type: 'Chủ đầu tư phát triển khu đô thị',
      description:
        'Tập trung phát triển các dự án đô thị quy mô lớn tại Việt Nam.',
      logo: '/developer-partner-logos/madison-land.png',
      projects: 6,
      partnership: '2022',
      revenue: '120+ tỷ',
      specialties: ['Urban development', 'Shophouse', 'Villas'],
      achievements: [
        'Emerging Developer',
        'Trusted Partner',
        'Urban Planning Award',
      ],
    },
    {
      id: 6,
      name: 'Masterise Homes',
      type: 'Chủ đầu tư cao cấp',
      description:
        'Chuyên phát triển bất động sản hạng sang tại các khu vực trung tâm TP.HCM.',
      logo: '/developer-partner-logos/masterise-homes.png',
      projects: 12,
      partnership: '2020',
      revenue: '250+ tỷ',
      specialties: ['Luxury apartments', 'Premium towers', 'Mixed-use'],
      achievements: [
        'Premium Partner',
        'Luxury Specialist',
        'Innovation Award',
      ],
    },
    {
      id: 7,
      name: 'Novaland',
      type: 'Nhà phát triển BDS',
      description:
        'Phát triển các dự án đô thị và nghỉ dưỡng quy mô lớn tại TP.HCM & toàn quốc.',
      logo: '/developer-partner-logos/nova-land.png',
      projects: 18,
      partnership: '2019',
      revenue: '300+ tỷ',
      specialties: ['Căn hộ', 'Khu đô thị', 'BDS nghỉ dưỡng'],
      achievements: [
        'Strategic Partner',
        'Best Collaboration',
        'Growth Partner 2023',
      ],
    },
    {
      id: 8,
      name: 'Sun Group',
      type: 'Tập đoàn phát triển du lịch & nghỉ dưỡng',
      description:
        'Dẫn đầu trong lĩnh vực bất động sản nghỉ dưỡng và du lịch cao cấp tại Việt Nam.',
      logo: '/developer-partner-logos/sun-group.png',
      projects: 20,
      partnership: '2018',
      revenue: '450+ tỷ',
      specialties: ['Resort', 'Condotel', 'Theme park'],
      achievements: [
        'Luxury Hospitality Award',
        'Tourism Excellence',
        'Strategic Partner',
      ],
    },
  ];

  const internationalPartners = [
    {
      id: 1,
      name: 'Juwai IQI',
      type: 'Mạng lưới BDS quốc tế',
      description:
        'Tập đoàn bất động sản lớn nhất Đông Nam Á với mạng lưới 20+ quốc gia',
      logo: '/placeholder-2.webp?height=100&width=150',
      countries: 20,
      agents: '40,000+',
      partnership: '2015',
      specialties: [
        'Cross-border investment',
        'International properties',
        'Global network',
      ],
      achievements: [
        'Founding Member',
        'Regional Excellence',
        'Global Recognition',
      ],
    },
    {
      id: 2,
      name: 'PropTech Asia',
      type: 'Nền tảng công nghệ BDS',
      description:
        'Nền tảng công nghệ hàng đầu cung cấp giải pháp PropTech cho thị trường châu Á',
      logo: '/placeholder-2.webp?height=100&width=150',
      countries: 8,
      agents: '15,000+',
      partnership: '2021',
      specialties: [
        'Technology solutions',
        'Digital marketing',
        'Data analytics',
      ],
      achievements: [
        'Tech Innovation Partner',
        'Digital Transformation',
        'AI Excellence',
      ],
    },
    {
      id: 3,
      name: 'Knight Frank',
      type: 'Tư vấn BDS quốc tế',
      description:
        'Công ty tư vấn bất động sản hàng đầu thế giới với hơn 125 năm kinh nghiệm',
      logo: '/placeholder-2.webp?height=100&width=150',
      countries: 60,
      agents: '20,000+',
      partnership: '2018',
      specialties: ['Luxury properties', 'Commercial', 'Investment advisory'],
      achievements: ['Global Excellence', 'Luxury Specialist', 'Market Leader'],
    },
    {
      id: 4,
      name: 'CBRE',
      type: 'Dịch vụ BDS thương mại',
      description: 'Công ty dịch vụ bất động sản thương mại lớn nhất thế giới',
      logo: '/placeholder-2.webp?height=100&width=150',
      countries: 100,
      agents: '100,000+',
      partnership: '2016',
      specialties: [
        'Commercial real estate',
        'Investment',
        'Property management',
      ],
      achievements: [
        'Global Leader',
        'Commercial Excellence',
        'Innovation Award',
      ],
    },
    {
      id: 5,
      name: 'Savills',
      type: 'Tư vấn BDS cao cấp',
      description: 'Công ty tư vấn bất động sản cao cấp với mạng lưới toàn cầu',
      logo: '/placeholder-2.webp?height=100&width=150',
      countries: 70,
      agents: '35,000+',
      partnership: '2019',
      specialties: ['Prime properties', 'Investment', 'Development consulting'],
      achievements: [
        'Premium Brand',
        'Global Network',
        'Excellence in Service',
      ],
    },
  ];

  const bankingPartners = [
    {
      id: 1,
      name: 'Vietcombank',
      type: 'Ngân hàng TMCP Ngoại thương Việt Nam',
      description:
        'Một trong những ngân hàng lớn nhất Việt Nam, hỗ trợ gói vay mua nhà linh hoạt và bảo mật cao.',
      logo: '/bank-logos/vietcombank.png',
      loanRate: '6.5%/năm',
      maxLoan: '85%',
      partnership: '2017',
      benefits: ['Lãi suất ưu đãi', 'Thủ tục rõ ràng', 'Hỗ trợ 24/7'],
    },
    {
      id: 2,
      name: 'Techcombank',
      type: 'Ngân hàng TMCP Kỹ thương Việt Nam',
      description:
        'Tiên phong chuyển đổi số với hệ sinh thái vay mua nhà và thanh toán thông minh.',
      logo: '/bank-logos/techcombank.png',
      loanRate: '6.8%/năm',
      maxLoan: '80%',
      partnership: '2019',
      benefits: ['Vay online 100%', 'Xét duyệt nhanh', 'Không phí trả trước'],
    },
    {
      id: 3,
      name: 'MB Bank',
      type: 'Ngân hàng TMCP Quân đội',
      description:
        'Cung cấp các giải pháp tài chính linh hoạt, hỗ trợ vay mua nhà lãi suất cạnh tranh.',
      logo: '/bank-logos/mbbank.png',
      loanRate: '6.9%/năm',
      maxLoan: '80%',
      partnership: '2020',
      benefits: ['Ân hạn gốc 12 tháng', 'Tư vấn miễn phí', 'Giao dịch bảo mật'],
    },
    {
      id: 4,
      name: 'VPBank',
      type: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
      description:
        'Chuyên cung cấp sản phẩm vay tiêu dùng và vay thế chấp nhanh chóng, linh hoạt.',
      logo: '/bank-logos/vpbank.png',
      loanRate: '7.2%/năm',
      maxLoan: '75%',
      partnership: '2021',
      benefits: [
        'Xét duyệt nhanh',
        'Ưu đãi khách VIP',
        'Không cần chứng minh thu nhập',
      ],
    },
    {
      id: 5,
      name: 'BIDV',
      type: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
      description:
        'Đơn vị tài chính uy tín lâu năm, cung cấp gói vay mua nhà lãi suất cố định dài hạn.',
      logo: '/bank-logos/bidv.png',
      loanRate: '6.7%/năm',
      maxLoan: '80%',
      partnership: '2018',
      benefits: ['Lãi suất ổn định', 'Vay đến 25 năm', 'Miễn phí định giá'],
    },
    {
      id: 6,
      name: 'ACB',
      type: 'Ngân hàng TMCP Á Châu',
      description:
        'Ngân hàng uy tín tại khu vực phía Nam với các sản phẩm vay thế chấp linh hoạt.',
      logo: '/bank-logos/acb.png',
      loanRate: '7.0%/năm',
      maxLoan: '85%',
      partnership: '2020',
      benefits: ['Duyệt hồ sơ trong ngày', 'Tỷ lệ vay cao', 'Chăm sóc tận tâm'],
    },
    {
      id: 7,
      name: 'Sacombank',
      type: 'Ngân hàng TMCP Sài Gòn Thương Tín',
      description:
        'Hỗ trợ gói vay mua nhà hấp dẫn và linh hoạt phù hợp với nhiều đối tượng khách hàng.',
      logo: '/bank-logos/sacombank.png',
      loanRate: '6.9%/năm',
      maxLoan: '80%',
      partnership: '2019',
      benefits: ['Miễn phí hồ sơ', 'Hạn mức cao', 'Giải ngân nhanh'],
    },
    {
      id: 8,
      name: 'VIB',
      type: 'Ngân hàng TMCP Quốc tế Việt Nam',
      description:
        'Ngân hàng dẫn đầu về trải nghiệm số, cung cấp các gói vay nhà đơn giản và minh bạch.',
      logo: '/bank-logos/vib.png',
      loanRate: '7.1%/năm',
      maxLoan: '75%',
      partnership: '2022',
      benefits: ['Ký hồ sơ online', 'Tư vấn 1:1', 'Ưu đãi phí dịch vụ'],
    },
  ];

  const partnershipBenefits = [
    {
      icon: Globe,
      title: 'Tiếp cận thị trường toàn cầu',
      description:
        'Hợp tác với hơn 111 quốc gia, mở rộng cơ hội đầu tư và phân phối dự án quốc tế.',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Landmark,
      title: 'Nguồn dự án đa dạng',
      description:
        'Danh mục hơn 10.000 bất động sản tại Việt Nam và quốc tế với pháp lý rõ ràng.',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: Users,
      title: 'Hệ sinh thái chuyên viên toàn cầu',
      description:
        'Kết nối với 50.000+ chuyên viên IQI trên toàn thế giới để phát triển mạng lưới.',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: ShieldCheck,
      title: 'Đối tác tin cậy & minh bạch',
      description:
        'Tất cả dự án và giao dịch đều được kiểm duyệt chặt chẽ, hỗ trợ pháp lý đầy đủ.',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
  ];

  const displayedDevelopers = showAllDevelopers
    ? developerPartners
    : developerPartners.slice(0, 4);
  const displayedInternational = showAllInternational
    ? internationalPartners
    : internationalPartners.slice(0, 4);
  const displayedBanking = showAllBanking
    ? bankingPartners
    : bankingPartners.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-600">
        <div className="container mx-auto px-4 md:px-12 text-white">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-white hover:text-orange-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100">
                ĐỐI TÁC CHIẾN LƯỢC
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
              Đối tác quốc tế của IQI Vietnam
            </h1>
            <p className="text-xl max-w-3xl">
              IQI Vietnam là thành viên của IQI Global, hợp tác cùng hơn 50.000
              chuyên viên tại 30+ quốc gia, mang đến danh mục dự án đa dạng từ
              Việt Nam đến quốc tế.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lợi ích từ mạng lưới đối tác
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              IQI Vietnam mang đến lợi thế cạnh tranh thông qua mạng lưới đối
              tác rộng khắp, dự án chất lượng và nền tảng công nghệ hiện đại.
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

      {/* Developer Partners - 4 Column Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Chủ đầu tư uy tín
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hợp tác với những chủ đầu tư hàng đầu Việt Nam
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedDevelopers.map((partner, index) => (
              <ScaleIn key={partner.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative h-40 w-full"
                      >
                        <Image
                          src={partner.logo || '/placeholder-2.webp'}
                          alt={partner.name}
                          fill
                          className="object-contain px-4"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {partner.type}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {partner.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                        <div>
                          <div className="text-sm font-bold text-blue-600">
                            {partner.projects}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Dự án
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-green-600">
                            {partner.revenue}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Doanh số
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-orange-600">
                            {partner.partnership}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Từ năm
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {partner.specialties
                          .slice(0, 2)
                          .map((specialty, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                      </div>

                      <div className="space-y-1">
                        {partner.achievements
                          .slice(0, 1)
                          .map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs text-muted-foreground"
                            >
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {achievement}
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {developerPartners.length > 4 && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setShowAllDevelopers(!showAllDevelopers)}
                variant="outline"
                className="gap-2"
              >
                {showAllDevelopers ? (
                  <>
                    Thu gọn <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Xem thêm ({developerPartners.length - 4} đối tác){' '}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* International Partners - 4 Column Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đối tác quốc tế
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mạng lưới toàn cầu với 20+ quốc gia
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedInternational.map((partner, index) => (
              <ScaleIn key={partner.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={partner.logo || '/placeholder-2.webp'}
                          alt={partner.name}
                          width={120}
                          height={80}
                          className="mx-auto mb-4"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {partner.type}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                        {partner.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {partner.countries}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Quốc gia
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {partner.agents}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Đại lý
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {partner.achievements
                          .slice(0, 1)
                          .map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-center text-sm text-muted-foreground"
                            >
                              <Award className="w-4 h-4 mr-2 text-orange-500" />
                              {achievement}
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {internationalPartners.length > 4 && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setShowAllInternational(!showAllInternational)}
                variant="outline"
                className="gap-2"
              >
                {showAllInternational ? (
                  <>
                    Thu gọn <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Xem thêm ({internationalPartners.length - 4} đối tác){' '}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Banking Partners - 4 Column Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đối tác tài chính
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Lãi suất ưu đãi từ các ngân hàng hàng đầu
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedBanking.map((bank, index) => (
              <ScaleIn key={bank.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="h-full">
                  <Card className="text-center h-full">
                    <CardHeader className="pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative h-32 w-full"
                      >
                        <Image
                          src={bank.logo || '/placeholder-2.webp'}
                          alt={bank.name}
                          fill
                          className="object-contain px-16"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{bank.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {bank.type}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Lãi suất:
                          </span>
                          <span className="font-bold text-green-600 text-sm">
                            {bank.loanRate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Vay tối đa:
                          </span>
                          <span className="font-bold text-blue-600 text-sm">
                            {bank.maxLoan}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {bank.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-600 flex-shrink-0" />
                            <span className="text-left">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {bankingPartners.length > 4 && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setShowAllBanking(!showAllBanking)}
                variant="outline"
                className="gap-2"
              >
                {showAllBanking ? (
                  <>
                    Thu gọn <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Xem thêm ({bankingPartners.length - 4} đối tác){' '}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-16 bg-gradient-to-br from-[#fbf4e6]/60 to-orange-300 dark:from-orange-400 dark:to-orange-600">
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
                  className="bg-orange-600 text-white hover:bg-orange-700"
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
                  className="border border-orange-600 bg-white text-orange-600 hover:bg-orange-100"
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
