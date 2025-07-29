'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Lightbulb,
  Target,
  Zap,
  Home,
  Building2,
  MapPin,
  Users,
  Calendar,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TrendsPage() {
  const currentTrends = [
    {
      id: 1,
      title: 'Smart Home & Công nghệ IoT',
      description:
        'Căn hộ thông minh với hệ thống tự động hóa đang trở thành tiêu chuẩn mới',
      growth: 85,
      impact: 'Cao',
      timeframe: '2024-2025',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Bất động sản xanh & Bền vững',
      description:
        'Xu hướng phát triển dự án thân thiện môi trường và tiết kiệm năng lượng',
      growth: 78,
      impact: 'Cao',
      timeframe: '2024-2026',
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      title: 'Co-living & Co-working Space',
      description:
        'Mô hình sống và làm việc chung phù hợp với thế hệ millennials',
      growth: 72,
      impact: 'Trung bình',
      timeframe: '2024-2025',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 4,
      title: 'Bất động sản nghỉ dưỡng',
      description: 'Nhu cầu sở hữu BDS nghỉ dưỡng tăng cao sau đại dịch',
      growth: 68,
      impact: 'Cao',
      timeframe: '2024-2027',
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 5,
      title: 'Micro-living & Studio Apartment',
      description: 'Căn hộ nhỏ gọn, tối ưu không gian cho người trẻ thành thị',
      growth: 65,
      impact: 'Trung bình',
      timeframe: '2024-2025',
      icon: Building2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const futurePredictions = [
    {
      year: '2025',
      predictions: [
        'Giá BDS tăng 6-8% so với 2024',
        'Smart home trở thành tiêu chuẩn',
        'Tăng trưởng mạnh ở các tỉnh lân cận TP.HCM',
        'Phát triển BDS công nghiệp',
      ],
    },
    {
      year: '2026',
      predictions: [
        'Hoàn thiện hạ tầng metro TP.HCM',
        'Bùng nổ BDS khu vực Đông Sài Gòn',
        'Phổ biến mô hình build-to-rent',
        'Tích hợp AI trong quản lý BDS',
      ],
    },
    {
      year: '2027',
      predictions: [
        'Thị trường BDS nghỉ dưỡng bão hòa',
        'Phát triển đô thị vệ tinh',
        'Blockchain trong giao dịch BDS',
        'Chuẩn hóa BDS xanh toàn quốc',
      ],
    },
  ];

  const investmentOpportunities = [
    {
      title: 'Căn hộ cao cấp TP.HCM',
      roi: '12-15%',
      risk: 'Thấp',
      timeframe: '3-5 năm',
      description: 'Phân khúc ổn định với nhu cầu cao từ người nước ngoài',
      image: '/placeholder-2.webp?height=200&width=300',
    },
    {
      title: 'BDS nghỉ dưỡng Phú Quốc',
      roi: '18-22%',
      risk: 'Trung bình',
      timeframe: '5-7 năm',
      description: 'Hưởng lợi từ chính sách visa và du lịch phát triển',
      image: '/placeholder-2.webp?height=200&width=300',
    },
    {
      title: 'Nhà phố thương mại',
      roi: '10-14%',
      risk: 'Thấp',
      timeframe: '2-4 năm',
      description: 'Kết hợp kinh doanh và đầu tư, dòng tiền ổn định',
      image: '/placeholder-2.webp?height=200&width=300',
    },
    {
      title: 'Đất nền khu vực phát triển',
      roi: '20-30%',
      risk: 'Cao',
      timeframe: '5-10 năm',
      description: 'Tiềm năng tăng giá cao khi hạ tầng hoàn thiện',
      image: '/placeholder-2.webp?height=200&width=300',
    },
  ];

  const marketInsights = [
    {
      title: 'Thế hệ Z thay đổi thị trường BDS',
      content:
        'Người trẻ ưu tiên vị trí thuận tiện, công nghệ thông minh và giá cả hợp lý hơn diện tích lớn',
      impact: 'Cao',
    },
    {
      title: 'Chính sách hỗ trợ nhà ở xã hội',
      content:
        'Chính phủ đẩy mạnh phát triển nhà ở cho người thu nhập thấp và trung bình',
      impact: 'Cao',
    },
    {
      title: 'Xu hướng làm việc từ xa',
      content:
        'Remote work thúc đẩy nhu cầu BDS ở các tỉnh có chi phí sống thấp hơn',
      impact: 'Trung bình',
    },
    {
      title: 'Đầu tư nước ngoài tăng mạnh',
      content:
        'FDI vào BDS Việt Nam tăng 25% trong năm 2024, tập trung vào phân khúc cao cấp',
      impact: 'Cao',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-purple-600 hover:text-purple-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                XU HƯỚNG BẤT ĐỘNG SẢN
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Xu hướng & Dự báo thị trường
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Khám phá những xu hướng mới nhất, dự báo tương lai và cơ hội đầu
              tư tiềm năng trong thị trường bất động sản Việt Nam.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Current Trends */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Xu hướng hiện tại
            </h2>
            <p className="text-muted-foreground">
              Những xu hướng đang định hình thị trường BDS Việt Nam
            </p>
          </FadeIn>

          <div className="space-y-6">
            {currentTrends.map((trend, index) => (
              <ScaleIn key={trend.id} delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${trend.bgColor}`}>
                          <trend.icon className={`w-6 h-6 ${trend.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {trend.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  trend.impact === 'Cao'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {trend.impact}
                              </Badge>
                              <Badge variant="outline">{trend.timeframe}</Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {trend.description}
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Mức độ phát triển</span>
                                <span className="font-semibold">
                                  {trend.growth}%
                                </span>
                              </div>
                              <Progress value={trend.growth} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Future Predictions */}
      <section className="py-16 bg-muted/30 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dự báo tương lai
            </h2>
            <p className="text-muted-foreground">
              Những dự đoán về thị trường BDS trong 3 năm tới
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {futurePredictions.map((prediction, index) => (
              <ScaleIn key={prediction.year} delay={index * 0.2}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                        Năm {prediction.year}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {prediction.predictions.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <Star className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cơ hội đầu tư
            </h2>
            <p className="text-muted-foreground">
              Những phân khúc BDS tiềm năng cho nhà đầu tư
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {investmentOpportunities.map((opportunity, index) => (
              <ScaleIn key={opportunity.title} delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={opportunity.image || '/placeholder-2.webp'}
                          alt={opportunity.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600 text-white">
                          ROI: {opportunity.roi}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{opportunity.title}</span>
                        <Badge
                          variant={
                            opportunity.risk === 'Thấp'
                              ? 'secondary'
                              : opportunity.risk === 'Trung bình'
                                ? 'default'
                                : 'destructive'
                          }
                        >
                          {opportunity.risk}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {opportunity.description}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Thời gian đầu tư:
                        </span>
                        <span className="font-semibold">
                          {opportunity.timeframe}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-muted/30 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nhận định chuyên gia
            </h2>
            <p className="text-muted-foreground">
              Những phân tích sâu sắc về các yếu tố tác động đến thị trường
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {marketInsights.map((insight, index) => (
              <ScaleIn key={insight.title} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                          <span className="text-lg">{insight.title}</span>
                        </div>
                        <Badge
                          variant={
                            insight.impact === 'Cao' ? 'default' : 'secondary'
                          }
                        >
                          {insight.impact}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{insight.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <Target className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng đầu tư thông minh?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Tận dụng những xu hướng mới và cơ hội đầu tư tiềm năng với sự hỗ
              trợ từ đội ngũ chuyên gia IQI Vietnam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/consultation">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Tư vấn đầu tư
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/products/vietnam">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                  >
                    Xem dự án
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
