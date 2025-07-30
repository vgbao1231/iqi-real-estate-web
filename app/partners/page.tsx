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
  Handshake,
  TrendingUp,
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
      name: 'Vinhomes',
      type: 'Chủ đầu tư hàng đầu',
      description:
        'Tập đoàn bất động sản lớn nhất Việt Nam với các dự án iconic như Vinhomes Central Park, Times City',
      logo: '/placeholder-2.webp?height=100&width=150',
      projects: 25,
      partnership: '2018',
      revenue: '500+ tỷ',
      specialties: ['Căn hộ cao cấp', 'Biệt thự', 'Shophouse'],
      achievements: [
        'Đối tác chiến lược',
        'Top Revenue Partner',
        'Excellence Award 2023',
      ],
    },
    {
      id: 2,
      name: 'Novaland',
      type: 'Nhà phát triển BDS',
      description:
        'Chuyên phát triển các dự án cao cấp tại TP.HCM và các tỉnh thành lớn',
      logo: '/placeholder-2.webp?height=100&width=150',
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
      id: 3,
      name: 'Masterise Homes',
      type: 'Chủ đầu tư cao cấp',
      description:
        'Chuyên phát triển các dự án bất động sản hạng sang tại trung tâm TP.HCM',
      logo: '/placeholder-2.webp?height=100&width=150',
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
      id: 4,
      name: 'CapitaLand',
      type: 'Chủ đầu tư quốc tế',
      description:
        'Tập đoàn bất động sản hàng đầu Singapore với nhiều dự án tại Việt Nam',
      logo: '/placeholder-2.webp?height=100&width=150',
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
      id: 5,
      name: 'Gamuda Land',
      type: 'Nhà phát triển Malaysia',
      description:
        'Chuyên phát triển các khu đô thị sinh thái và dự án cao cấp',
      logo: '/placeholder-2.webp?height=100&width=150',
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
      id: 6,
      name: 'Khang Điền',
      type: 'Chủ đầu tư địa phương',
      description:
        'Chuyên phát triển nhà ở xã hội và căn hộ bình dân tại TP.HCM',
      logo: '/placeholder-2.webp?height=100&width=150',
      projects: 20,
      partnership: '2019',
      revenue: '180+ tỷ',
      specialties: ['Affordable housing', 'Social housing', 'Apartments'],
      achievements: [
        'Social Impact Partner',
        'Community Developer',
        'Affordable Housing Award',
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
      type: 'Ngân hàng thương mại',
      description:
        'Ngân hàng lớn nhất Việt Nam, cung cấp các gói vay ưu đãi cho khách hàng IQI',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '6.5%/năm',
      maxLoan: '85%',
      partnership: '2017',
      benefits: ['Lãi suất ưu đãi', 'Thủ tục nhanh', 'Hỗ trợ 24/7'],
    },
    {
      id: 2,
      name: 'Techcombank',
      type: 'Ngân hàng số',
      description:
        'Ngân hàng tiên phong về công nghệ với quy trình vay online hiện đại',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '6.8%/năm',
      maxLoan: '80%',
      partnership: '2019',
      benefits: ['Vay online', 'Duyệt nhanh', 'Không phí phạt trả trước'],
    },
    {
      id: 3,
      name: 'MB Bank',
      type: 'Ngân hàng bán lẻ',
      description:
        'Chuyên cung cấp các sản phẩm tài chính cá nhân với lãi suất cạnh tranh',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '6.9%/năm',
      maxLoan: '80%',
      partnership: '2020',
      benefits: ['Lãi suất thả nổi', 'Ân hạn gốc', 'Tư vấn miễn phí'],
    },
    {
      id: 4,
      name: 'VPBank',
      type: 'Ngân hàng tư nhân',
      description:
        'Ngân hàng tư nhân hàng đầu với các sản phẩm vay mua nhà linh hoạt',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '7.2%/năm',
      maxLoan: '75%',
      partnership: '2021',
      benefits: [
        'Thủ tục đơn giản',
        'Tư vấn chuyên nghiệp',
        'Ưu đãi khách hàng VIP',
      ],
    },
    {
      id: 5,
      name: 'BIDV',
      type: 'Ngân hàng đầu tư',
      description: 'Ngân hàng đầu tư và phát triển Việt Nam với gói vay ưu đãi',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '6.7%/năm',
      maxLoan: '80%',
      partnership: '2018',
      benefits: ['Lãi suất cố định', 'Thời hạn vay dài', 'Hỗ trợ pháp lý'],
    },
    {
      id: 6,
      name: 'ACB',
      type: 'Ngân hàng thương mại',
      description:
        'Ngân hàng Á Châu với các gói vay mua nhà ưu đãi cho khách hàng trẻ',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '7.0%/năm',
      maxLoan: '85%',
      partnership: '2020',
      benefits: [
        'Ưu đãi khách hàng trẻ',
        'Vay 100% giá trị',
        'Tư vấn miễn phí',
      ],
    },
    {
      id: 7,
      name: 'Sacombank',
      type: 'Ngân hàng thương mại',
      description:
        'Ngân hàng Sài Gòn Thương Tín với chương trình vay mua nhà hấp dẫn',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '6.9%/năm',
      maxLoan: '80%',
      partnership: '2019',
      benefits: [
        'Lãi suất ưu đãi 6 tháng đầu',
        'Miễn phí thẩm định',
        'Hỗ trợ làm hồ sơ',
      ],
    },
    {
      id: 8,
      name: 'VIB',
      type: 'Ngân hàng quốc tế',
      description:
        'Ngân hàng Quốc tế Việt Nam với dịch vụ vay mua nhà chuyên nghiệp',
      logo: '/placeholder-2.webp?height=80&width=120',
      loanRate: '7.1%/năm',
      maxLoan: '75%',
      partnership: '2022',
      benefits: ['Duyệt nhanh trong 24h', 'Tư vấn 1-1', 'Ưu đãi phí dịch vụ'],
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
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-white hover:text-orange-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                ĐỐI TÁC CHIẾN LƯỢC
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Đối tác của chúng tôi
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              IQI Vietnam tự hào hợp tác với những tên tuổi hàng đầu trong ngành
              bất động sản và tài chính, mang đến cho khách hàng những cơ hội
              đầu tư tốt nhất.
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
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="h-full">
                    <CardHeader className="text-center pb-4">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={partner.logo || '/placeholder-2.webp'}
                          alt={partner.name}
                          width={120}
                          height={80}
                          className="mx-auto mb-3"
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
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="text-center h-full">
                    <CardHeader className="pb-4">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={bank.logo || '/placeholder-2.webp'}
                          alt={bank.name}
                          width={100}
                          height={60}
                          className="mx-auto mb-3"
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
