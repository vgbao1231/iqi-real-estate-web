'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Star,
  ChevronDown,
  Award,
  CheckCircle,
  ChevronUp,
  Globe,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import OutroSection from '@/app/(main)/components/outro-section';
import IntroSection from '@/app/(main)/components/intro-section';
import { useGetAllPartnersQuery } from '@/features/partner/partnerApi';
import { partners as defaultPartner } from '@/lib/partner-data';

export default function PartnersPage() {
  const [showAllDevelopers, setShowAllDevelopers] = useState(false);
  const [showAllInternational, setShowAllInternational] = useState(false);
  const [showAllBanking, setShowAllBanking] = useState(false);
  const { data: partners } = useGetAllPartnersQuery();

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

  const developer = partners
    ? partners.filter((p) => p.category === 'DEVELOPER')
    : defaultPartner.developer;

  const international = partners
    ? partners.filter((p) => p.category === 'INTERNATIONAL')
    : defaultPartner.international;

  const bank = partners
    ? partners.filter((p) => p.category === 'BANK')
    : defaultPartner.bank;

  const displayedDevelopers = showAllDevelopers
    ? developer
    : developer.slice(0, 4);
  const displayedInternational = showAllInternational
    ? international
    : international.slice(0, 4);
  const displayedBanking = showAllBanking ? bank : bank.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <IntroSection
        title="Đối tác quốc tế của IQI Vietnam"
        description="IQI Vietnam là thành viên của IQI Global, hợp tác cùng hơn 50.000 chuyên viên tại 30+ quốc gia, mang đến danh mục dự án đa dạng từ Việt Nam đến quốc tế."
      />

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
                        className={`w-16 h-16 ${benefit.bg} rounded-full center-both mx-auto mb-4`}
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
              <ScaleIn key={partner.id} delay={index * 0.05}>
                <motion.div whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative h-40 w-full"
                      >
                        <Image
                          src={partner.image?.url || '/placeholder-2.webp'}
                          alt={partner.name}
                          fill
                          className="object-contain px-4"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {partner.shortDescription}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                        {partner.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                        <div>
                          <div className="text-sm font-bold text-blue-600">
                            {Number(partner.projectCount) === 0
                              ? 'Đang cập nhật'
                              : partner.projectCount}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Dự án
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-green-600">
                            {Number(partner.revenue) === 0
                              ? 'Đang cập nhật'
                              : partner.revenue}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Doanh số
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-orange-600">
                            {partner.partnershipYear}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Từ năm
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {partner.specialties.map((specialty: any, idx: any) => (
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
                        {partner.achievements.map(
                          (achievement: any, idx: any) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs text-muted-foreground"
                            >
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {achievement}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {developer.length > 4 && (
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
                    Xem thêm ({developer.length - 4} đối tác){' '}
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
                <motion.div whileHover={{ y: -5 }} className="h-full">
                  <Card className="h-full">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative h-40 w-full"
                      >
                        <Image
                          src={partner.image?.url || '/placeholder-2.webp'}
                          alt={partner.name}
                          fill
                          className="object-contain px-4"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {partner.shortDescription}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-1">
                        {partner.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 mb-4 items-center text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {partner.countryCount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Quốc gia
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {partner.agentCount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Đại lý
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-orange-600">
                            {partner.partnershipYear}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Từ năm
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {partner.achievements.map(
                          (achievement: any, idx: any) => (
                            <div
                              key={idx}
                              className="flex items-center justify-center text-sm text-muted-foreground"
                            >
                              <Award className="w-4 h-4 mr-2 text-orange-500" />
                              {achievement}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {international.length > 4 && (
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
                    Xem thêm ({international.length - 4} đối tác){' '}
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
            {displayedBanking.map((partner, index) => (
              <ScaleIn key={partner.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="h-full">
                  <Card className="text-center h-full">
                    <CardHeader className="pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative h-32 w-full"
                      >
                        <Image
                          src={partner.image?.url || '/placeholder-2.webp'}
                          alt={partner.name}
                          fill
                          className="object-contain px-16"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {partner.shortDescription}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Lãi suất:
                          </span>
                          <span className="font-bold text-green-600 text-sm">
                            {partner.loanRate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Vay tối đa:
                          </span>
                          <span className="font-bold text-blue-600 text-sm">
                            {partner.maxLoan}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {partner.benefits.map((benefit: any, idx: any) => (
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

          {bank.length > 4 && (
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
                    Xem thêm ({bank.length - 4} đối tác){' '}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Partnership CTA */}
      <OutroSection
        title="Trở thành đối tác của IQI"
        subtitle="Gia nhập mạng lưới đối tác toàn cầu và cùng chúng tôi phát triển thị trường bất động sản"
        primary={{
          label: 'Liên hệ hợp tác',
          href: '#', // ← nếu có link cụ thể, bạn thay vào đây
        }}
        secondary={{
          label: 'Gửi đề xuất hợp tác',
          href: '#', // ← nếu có link cụ thể, bạn thay vào đây
        }}
      />
    </div>
  );
}
