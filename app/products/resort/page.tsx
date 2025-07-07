'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  MapPin,
  Home,
  Users,
  Star,
  Waves,
  Palmtree,
  TrendingUp,
  Plane,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ResortPropertiesPage() {
  const vietnamResorts = [
    {
      id: 1,
      name: 'InterContinental Phu Quoc',
      location: 'Phú Quốc, Kiên Giang',
      type: 'Resort Villa',
      price: 'Từ 8.5 tỷ',
      bedrooms: '2-4 phòng ngủ',
      area: '120-300 m²',
      features: ['Bãi biển riêng', 'Golf course', 'Spa cao cấp', 'Marina'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      roi: '8-12%/năm',
      developer: 'Sun Group',
    },
    {
      id: 2,
      name: 'Fusion Resort Cam Ranh',
      location: 'Cam Ranh, Khánh Hòa',
      type: 'Beachfront Villa',
      price: 'Từ 6.2 tỷ',
      bedrooms: '1-3 phòng ngủ',
      area: '80-200 m²',
      features: [
        'All-inclusive',
        'Spa trị liệu',
        'Nhà hàng 5 sao',
        'Kids club',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Sắp mở bán',
      roi: '10-14%/năm',
      developer: 'Fusion Group',
    },
    {
      id: 3,
      name: 'JW Marriott Phu Quoc',
      location: 'Phú Quốc, Kiên Giang',
      type: 'Luxury Condotel',
      price: 'Từ 4.8 tỷ',
      bedrooms: 'Studio-2 phòng ngủ',
      area: '45-120 m²',
      features: ['Quản lý Marriott', 'Hồ bơi vô cực', 'Spa JW', 'Beach club'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      roi: '9-13%/năm',
      developer: 'BIM Group',
    },
  ];

  const internationalResorts = [
    {
      id: 4,
      name: 'Bali Mandira Beach Resort',
      location: 'Legian, Bali',
      type: 'Beachfront Suite',
      price: 'Từ $450,000',
      bedrooms: '1-2 phòng ngủ',
      area: '60-140 m²',
      features: [
        'Bãi biển Legian',
        'Tropical garden',
        'Balinese spa',
        'Rooftop bar',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      roi: '7-10%/năm',
      developer: 'Mandira Group',
    },
    {
      id: 5,
      name: 'Phuket Oceanfront Villas',
      location: 'Patong, Phuket',
      type: 'Sea View Villa',
      price: 'Từ $680,000',
      bedrooms: '2-4 phòng ngủ',
      area: '150-350 m²',
      features: ['Private pool', 'Sea view', 'Thai spa', 'Concierge'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Sắp bàn giao',
      roi: '6-9%/năm',
      developer: 'Oceanfront Development',
    },
    {
      id: 6,
      name: 'Langkawi Luxury Resort',
      location: 'Langkawi, Malaysia',
      type: 'Rainforest Villa',
      price: 'Từ $380,000',
      bedrooms: '1-3 phòng ngủ',
      area: '80-200 m²',
      features: [
        'Rainforest view',
        'Cable car',
        'Duty-free shopping',
        'Marina',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      roi: '8-11%/năm',
      developer: 'Langkawi Development',
    },
  ];

  const resortBenefits = [
    {
      icon: TrendingUp,
      title: 'Lợi nhuận cao',
      desc: 'ROI 6-14%/năm từ cho thuê và tăng giá',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Home,
      title: 'Sử dụng cá nhân',
      desc: 'Nghỉ dưỡng miễn phí 30-60 ngày/năm',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Users,
      title: 'Quản lý chuyên nghiệp',
      desc: 'Vận hành bởi thương hiệu quốc tế',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Star,
      title: 'Tiện ích 5 sao',
      desc: 'Spa, golf, marina, nhà hàng cao cấp',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              BẤT ĐỘNG SẢN NGHỈ DƯỠNG
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bất động sản Nghỉ dưỡng
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Đầu tư vào những resort và villa nghỉ dưỡng cao cấp tại các điểm
              đến hàng đầu Việt Nam và Đông Nam Á, kết hợp hoàn hảo giữa nghỉ
              dưỡng và đầu tư sinh lời.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Resort Properties */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dự án nghỉ dưỡng nổi bật
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Khám phá những resort và villa cao cấp tại các điểm đến hàng đầu
            </p>
          </FadeIn>

          <Tabs defaultValue="vietnam" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="vietnam" className="flex items-center gap-2">
                <Palmtree className="w-4 h-4" />
                Việt Nam
              </TabsTrigger>
              <TabsTrigger
                value="international"
                className="flex items-center gap-2"
              >
                <Plane className="w-4 h-4" />
                Quốc tế
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vietnam">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vietnamResorts.map((property, index) => (
                  <ScaleIn key={property.id} delay={index * 0.2}>
                    <motion.div whileHover={{ y: -10 }}>
                      <Card className="overflow-hidden h-full">
                        <div className="relative">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Image
                              src={property.image || '/placeholder-2.webp'}
                              alt={property.name}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover"
                            />
                          </motion.div>
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 text-gray-900">
                              {property.developer}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge
                              variant={
                                property.status === 'Đang bán'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className={
                                property.status === 'Đang bán'
                                  ? 'bg-green-600'
                                  : ''
                              }
                            >
                              {property.status}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              ROI: {property.roi}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg mb-2">
                                {property.name}
                              </CardTitle>
                              <p className="text-muted-foreground flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-green-600">
                                {property.price}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {property.type}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Phòng ngủ:
                                </span>
                                <div className="font-semibold">
                                  {property.bedrooms}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Diện tích:
                                </span>
                                <div className="font-semibold">
                                  {property.area}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-sm">
                                Tiện ích resort:
                              </h4>
                              <div className="grid grid-cols-1 gap-1">
                                {property.features.map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center text-xs text-muted-foreground"
                                  >
                                    <Waves className="w-3 h-3 mr-1 text-blue-600 flex-shrink-0" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Link href={`/products/resort/${property.id}`}>
                                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
                                    Xem chi tiết
                                  </Button>
                                </Link>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button variant="outline" size="sm">
                                  Liên hệ
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </ScaleIn>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="international">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {internationalResorts.map((property, index) => (
                  <ScaleIn key={property.id} delay={index * 0.2}>
                    <motion.div whileHover={{ y: -10 }}>
                      <Card className="overflow-hidden h-full">
                        <div className="relative">
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Image
                              src={property.image || '/placeholder-2.webp'}
                              alt={property.name}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover"
                            />
                          </motion.div>
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 text-gray-900">
                              {property.developer}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge
                              variant={
                                property.status === 'Đang bán'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className={
                                property.status === 'Đang bán'
                                  ? 'bg-green-600'
                                  : ''
                              }
                            >
                              {property.status}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <Badge className="bg-green-600 text-white">
                              ROI: {property.roi}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg mb-2">
                                {property.name}
                              </CardTitle>
                              <p className="text-muted-foreground flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-green-600">
                                {property.price}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {property.type}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Phòng ngủ:
                                </span>
                                <div className="font-semibold">
                                  {property.bedrooms}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Diện tích:
                                </span>
                                <div className="font-semibold">
                                  {property.area}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 text-sm">
                                Tiện ích resort:
                              </h4>
                              <div className="grid grid-cols-1 gap-1">
                                {property.features.map((feature, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center text-xs text-muted-foreground"
                                  >
                                    <Waves className="w-3 h-3 mr-1 text-blue-600 flex-shrink-0" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Link href={`/products/resort/${property.id}`}>
                                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
                                    Xem chi tiết
                                  </Button>
                                </Link>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button variant="outline" size="sm">
                                  Liên hệ
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </ScaleIn>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quy trình đầu tư resort
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hướng dẫn chi tiết từ A-Z để đầu tư bất động sản nghỉ dưỡng thành
              công
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Khảo sát & Lựa chọn',
                desc: 'Phân tích vị trí, tiềm năng và pháp lý dự án',
              },
              {
                step: '02',
                title: 'Tài chính & Pháp lý',
                desc: 'Hỗ trợ vay vốn và hoàn thiện thủ tục',
              },
              {
                step: '03',
                title: 'Ký kết & Thanh toán',
                desc: 'Ký hợp đồng và lịch thanh toán linh hoạt',
              },
              {
                step: '04',
                title: 'Vận hành & Quản lý',
                desc: 'Cho thuê và quản lý chuyên nghiệp',
              },
            ].map((item, index) => (
              <SlideIn key={index} direction="up" delay={index * 0.2}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng đầu tư BDS Nghỉ dưỡng?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Liên hệ với chuyên gia để được tư vấn chi tiết về các dự án resort
              hàng đầu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  Tư vấn miễn phí ngay
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                >
                  Tải brochure dự án
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
