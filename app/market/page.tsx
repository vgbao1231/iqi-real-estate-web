'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Home,
  Building,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MarketPage() {
  const marketStats = [
    {
      title: 'Tổng giao dịch Q4/2024',
      value: '15,847',
      change: '+12.5%',
      trend: 'up',
      description: 'So với Q3/2024',
    },
    {
      title: 'Giá trung bình/m²',
      value: '45.2 triệu',
      change: '+8.3%',
      trend: 'up',
      description: 'Tăng so với cùng kỳ',
    },
    {
      title: 'Tỷ lệ hấp thụ',
      value: '78%',
      change: '-2.1%',
      trend: 'down',
      description: 'Giảm nhẹ so với Q3',
    },
    {
      title: 'Nguồn cung mới',
      value: '8,234',
      change: '+15.7%',
      trend: 'up',
      description: 'Căn hộ ra thị trường',
    },
  ];

  const regionData = [
    {
      region: 'TP. Hồ Chí Minh',
      avgPrice: '52.8 triệu/m²',
      change: '+9.2%',
      transactions: '6,847',
      hotspots: ['Quận 1', 'Quận 3', 'Quận 7', 'Thủ Đức'],
    },
    {
      region: 'Hà Nội',
      avgPrice: '48.5 triệu/m²',
      change: '+7.8%',
      transactions: '5,234',
      hotspots: ['Ba Đình', 'Hoàn Kiếm', 'Cầu Giấy', 'Nam Từ Liêm'],
    },
    {
      region: 'Đà Nẵng',
      avgPrice: '35.2 triệu/m²',
      change: '+6.5%',
      transactions: '2,156',
      hotspots: ['Hải Châu', 'Thanh Khê', 'Ngũ Hành Sơn'],
    },
    {
      region: 'Bình Dương',
      avgPrice: '28.7 triệu/m²',
      change: '+11.3%',
      transactions: '1,610',
      hotspots: ['Thủ Dầu Một', 'Dĩ An', 'Thuận An'],
    },
  ];

  const propertyTypes = [
    {
      type: 'Căn hộ chung cư',
      marketShare: '65%',
      avgPrice: '3.2 tỷ',
      change: '+8.5%',
      icon: Building,
    },
    {
      type: 'Nhà phố/Biệt thự',
      marketShare: '25%',
      avgPrice: '8.7 tỷ',
      change: '+6.2%',
      icon: Home,
    },
    {
      type: 'Đất nền',
      marketShare: '10%',
      avgPrice: '2.1 tỷ',
      change: '+12.8%',
      icon: MapPin,
    },
  ];

  const priceHistory = [
    { period: 'Q1/2024', price: 41.2 },
    { period: 'Q2/2024', price: 42.8 },
    { period: 'Q3/2024', price: 43.9 },
    { period: 'Q4/2024', price: 45.2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                PHÂN TÍCH THỊ TRƯỜNG
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Báo cáo thị trường BDS
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Phân tích chuyên sâu về thị trường bất động sản Việt Nam với dữ
              liệu cập nhật theo thời gian thực và dự báo xu hướng từ đội ngũ
              chuyên gia IQI Vietnam.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Market Overview Stats */}
      <section className="py-12 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tổng quan thị trường
            </h2>
            <p className="text-muted-foreground">
              Các chỉ số quan trọng của thị trường BDS Việt Nam
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <ScaleIn key={stat.title} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div
                            className={`flex items-center text-sm ${
                              stat.trend === 'up'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {stat.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 mr-1" />
                            )}
                            {stat.change}
                          </div>
                        </div>
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types Analysis */}
      <section className="py-12 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Phân tích theo loại hình
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {propertyTypes.map((type, index) => (
              <ScaleIn key={type.type} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <type.icon className="w-8 h-8 text-blue-600" />
                        <Badge variant="secondary">{type.marketShare}</Badge>
                      </div>
                      <CardTitle className="text-lg">{type.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Giá trung bình:
                          </span>
                          <span className="font-semibold">{type.avgPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Biến động:
                          </span>
                          <span className="text-green-600 font-semibold">
                            {type.change}
                          </span>
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

      {/* Regional Analysis */}
      <section className="py-12 bg-muted/30 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Phân tích theo khu vực
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {regionData.map((region, index) => (
              <ScaleIn key={region.region} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{region.region}</span>
                        <Badge
                          className={`${
                            Number.parseFloat(
                              region.change.replace('%', '').replace('+', '')
                            ) > 8
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {region.change}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Giá trung bình
                            </p>
                            <p className="text-lg font-semibold">
                              {region.avgPrice}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Giao dịch
                            </p>
                            <p className="text-lg font-semibold">
                              {region.transactions}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Khu vực hot:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {region.hotspots.map((spot) => (
                              <Badge
                                key={spot}
                                variant="outline"
                                className="text-xs"
                              >
                                {spot}
                              </Badge>
                            ))}
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

      {/* Market Insights */}
      <section className="py-12 md:px-12">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nhận định thị trường
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <ScaleIn>
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">
                    Điểm tích cực
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <span>Nguồn cung mới tăng 15.7% so với quý trước</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <span>
                        Lãi suất vay mua nhà giảm xuống mức thấp nhất 2 năm
                      </span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <span>Hạ tầng giao thông được cải thiện đáng kể</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <span>Nhu cầu từ người mua thực tế vẫn cao</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">Thách thức</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <TrendingDown className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Tỷ lệ hấp thụ giảm nhẹ do giá tăng cao</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingDown className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Thủ tục pháp lý vẫn còn phức tạp</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingDown className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Nguồn cung phân khúc bình dân còn hạn chế</span>
                    </li>
                    <li className="flex items-start">
                      <TrendingDown className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                      <span>Áp lực lạm phát ảnh hưởng sức mua</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cần tư vấn chuyên sâu?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Liên hệ với đội ngũ chuyên gia của chúng tôi để nhận phân tích thị
              trường chi tiết và lời khuyên đầu tư phù hợp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/consultation">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Đặt lịch tư vấn
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
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    Liên hệ ngay
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
