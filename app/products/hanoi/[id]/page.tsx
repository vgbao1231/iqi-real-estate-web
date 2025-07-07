'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  Download,
  Heart,
  Share2,
  Camera,
  Play,
  Bed,
  Square,
  Calendar,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HanoiPropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - trong thực tế sẽ fetch từ API dựa trên params.id
  const property = {
    id: params.id,
    name: 'Vinhomes Smart City',
    address: 'Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội',
    type: 'Căn hộ thông minh',
    price: 'Từ 2.8 tỷ',
    priceRange: '2.8 - 4.5 tỷ',
    pricePerSqm: '38 triệu/m²',
    bedrooms: '1-3 phòng ngủ',
    area: '45-110 m²',
    status: 'Sẵn sàng',
    completion: 'Q3/2024',
    rating: 4.7,
    reviews: 189,
    images: [
      '/placeholder-2.webp?height=400&width=600',
      '/placeholder-2.webp?height=400&width=600',
      '/placeholder-2.webp?height=400&width=600',
      '/placeholder-2.webp?height=400&width=600',
      '/placeholder-2.webp?height=400&width=600',
    ],
    description: `Vinhomes Smart City là khu đô thị thông minh đầu tiên tại Hà Nội, 
    ứng dụng công nghệ IoT hiện đại, không gian sống xanh và tiện ích đẳng cấp quốc tế.`,

    features: [
      'Hệ thống Smart Home IoT',
      'Công viên Nhật Bản 4.3ha',
      'Trường quốc tế Vinschool',
      'Bệnh viện đa khoa Vinmec',
      'Trung tâm thương mại',
      'Hồ bơi 4 mùa',
      'Khu thể thao đa năng',
      'An ninh thông minh 24/7',
    ],

    unitTypes: [
      {
        type: '1 Phòng ngủ',
        area: '45-55 m²',
        price: '2.8 - 3.2 tỷ',
        layout: '/placeholder-2.webp?height=300&width=400',
      },
      {
        type: '2 Phòng ngủ',
        area: '70-85 m²',
        price: '3.5 - 4.1 tỷ',
        layout: '/placeholder-2.webp?height=300&width=400',
      },
      {
        type: '3 Phòng ngủ',
        area: '95-110 m²',
        price: '4.2 - 4.5 tỷ',
        layout: '/placeholder-2.webp?height=300&width=400',
      },
    ],

    amenities: [
      {
        category: 'Công nghệ thông minh',
        items: ['Smart Home', 'IoT System', 'App điều khiển', 'AI Assistant'],
      },
      {
        category: 'Giáo dục & Y tế',
        items: [
          'Trường mầm non',
          'Trường quốc tế',
          'Bệnh viện Vinmec',
          'Phòng khám',
        ],
      },
      {
        category: 'Mua sắm & Giải trí',
        items: ['Vincom Plaza', 'Rạp chiếu phim', 'Khu ẩm thực', 'Karaoke'],
      },
      {
        category: 'Thể thao & Sức khỏe',
        items: ['Hồ bơi 4 mùa', 'Gym hiện đại', 'Sân tennis', 'Spa & Massage'],
      },
    ],

    location: {
      address: 'Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội',
      nearby: [
        {
          name: 'Sân bay Nội Bài',
          distance: '20 phút lái xe',
          type: 'Giao thông',
        },
        {
          name: 'Trung tâm Hà Nội',
          distance: '25 phút lái xe',
          type: 'Trung tâm',
        },
        {
          name: 'Đại học Quốc gia',
          distance: '15 phút lái xe',
          type: 'Giáo dục',
        },
        {
          name: 'Keangnam Tower',
          distance: '18 phút lái xe',
          type: 'Làm việc',
        },
      ],
    },

    developer: {
      name: 'Vingroup',
      established: '1993',
      projects: '100+ dự án',
      description: 'Tập đoàn kinh tế tư nhân đa ngành hàng đầu Việt Nam',
    },

    agent: {
      name: 'Nguyễn Thị Mai',
      title: 'Senior Property Consultant',
      phone: '0911 234 567',
      email: 'mai.nguyen@iqi.com',
      avatar: '/placeholder-2.webp?height=80&width=80',
      experience: '6 năm kinh nghiệm',
      rating: 4.8,
      deals: 142,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/products/hanoi"
              className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách Hà Nội
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {property.name}
                </h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-green-600" />
                    {property.address}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                  >
                    {property.type}
                  </Badge>
                  <Badge className="bg-green-600">{property.status}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-sm">
                      ({property.reviews} đánh giá)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Yêu thích
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <FadeIn>
              <Card className="border-green-200 dark:border-green-800 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Image
                        src={
                          property.images[currentImageIndex] ||
                          '/placeholder-2.webp'
                        }
                        alt={property.name}
                        width={800}
                        height={500}
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                    </motion.div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge className="bg-black/70 text-white">
                        <Camera className="w-3 h-3 mr-1" />
                        {property.images.length} ảnh
                      </Badge>
                      <Badge className="bg-black/70 text-white">
                        <Play className="w-3 h-3 mr-1" />
                        Video 360°
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {property.images.map((image, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          className={`flex-shrink-0 cursor-pointer border-2 rounded-lg ${
                            currentImageIndex === index
                              ? 'border-green-600'
                              : 'border-transparent'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image
                            src={image || '/placeholder-2.webp'}
                            alt={`${property.name} ${index + 1}`}
                            width={100}
                            height={60}
                            className="w-20 h-12 object-cover rounded"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Property Details Tabs */}
            <FadeIn delay={0.2}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="units">Căn hộ</TabsTrigger>
                  <TabsTrigger value="amenities">Tiện ích</TabsTrigger>
                  <TabsTrigger value="location">Vị trí</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-600">
                        Mô tả dự án
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {property.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-green-600">
                            Thông tin cơ bản
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Loại hình:</span>
                              <span className="font-medium">
                                {property.type}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Diện tích:</span>
                              <span className="font-medium">
                                {property.area}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Phòng ngủ:</span>
                              <span className="font-medium">
                                {property.bedrooms}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Hoàn thành:</span>
                              <span className="font-medium">
                                {property.completion}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Giá/m²:</span>
                              <span className="font-medium text-green-600">
                                {property.pricePerSqm}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-green-600">
                            Chủ đầu tư
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Tên:</span>
                              <span className="font-medium">
                                {property.developer.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thành lập:</span>
                              <span className="font-medium">
                                {property.developer.established}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dự án:</span>
                              <span className="font-medium">
                                {property.developer.projects}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Đánh giá:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                  {property.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-600">
                        Điểm nổi bật
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {property.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="units" className="space-y-6">
                  <div className="grid gap-6">
                    {property.unitTypes.map((unit, index) => (
                      <ScaleIn key={index} delay={index * 0.1}>
                        <Card className="border-green-200 dark:border-green-800">
                          <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-xl font-bold mb-4 text-green-600">
                                  {unit.type}
                                </h3>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <Square className="w-4 h-4 text-muted-foreground" />
                                      <span>{unit.area}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Bed className="w-4 h-4 text-muted-foreground" />
                                      <span>
                                        {unit.type.split(' ')[0]} phòng ngủ
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600">
                                    {unit.price}
                                  </div>
                                  <Button className="w-full bg-green-600 hover:bg-green-700">
                                    Xem chi tiết căn hộ
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <Image
                                  src={unit.layout || '/placeholder-2.webp'}
                                  alt={`${unit.type} Layout`}
                                  width={400}
                                  height={300}
                                  className="w-full h-48 object-cover rounded-lg"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </ScaleIn>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="space-y-6">
                  {property.amenities.map((category, index) => (
                    <ScaleIn key={index} delay={index * 0.1}>
                      <Card className="border-green-200 dark:border-green-800">
                        <CardHeader>
                          <CardTitle className="text-green-600">
                            {category.category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-3">
                            {category.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </ScaleIn>
                  ))}
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-600">Địa chỉ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start space-x-2 mb-4">
                        <MapPin className="w-5 h-5 text-green-600 mt-1" />
                        <span>{property.location.address}</span>
                      </div>
                      <div className="bg-muted/50 h-64 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">
                          Bản đồ tương tác
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-600">
                        Tiện ích xung quanh
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {property.location.nearby.map((place, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div>
                              <div className="font-semibold">{place.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {place.type}
                              </div>
                            </div>
                            <Badge variant="outline">{place.distance}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact */}
            <SlideIn direction="right">
              <Card className="sticky top-8 border-green-200 dark:border-green-800 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <div className="text-3xl font-bold">
                    {property.priceRange}
                  </div>
                  <div className="opacity-90">{property.pricePerSqm}</div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <Bed className="w-5 h-5 mx-auto mb-1 text-green-600" />
                      <div className="text-sm">{property.bedrooms}</div>
                    </div>
                    <div>
                      <Square className="w-5 h-5 mx-auto mb-1 text-green-600" />
                      <div className="text-sm">{property.area}</div>
                    </div>
                    <div>
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-green-600" />
                      <div className="text-sm">{property.completion}</div>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Image
                        src={property.agent.avatar || '/placeholder-2.webp'}
                        alt={property.agent.name}
                        width={60}
                        height={60}
                        className="w-16 h-16 object-cover rounded-full mb-2"
                      />
                      <div>
                        <h4 className="font-semibold">{property.agent.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {property.agent.title}
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{property.agent.rating}</span>
                          <span className="text-muted-foreground">
                            ({property.agent.deals} deals)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Gọi: {property.agent.phone}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Gửi email tư vấn
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Tải brochure
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Quick Info */}
            <SlideIn direction="right" delay={0.2}>
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-600">
                    Thông tin nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <Badge className="bg-green-600">{property.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hoàn thành:</span>
                    <span className="font-medium">{property.completion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chủ đầu tư:</span>
                    <span className="font-medium">
                      {property.developer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại hình:</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đánh giá:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({property.reviews})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Similar Properties */}
            <SlideIn direction="right" delay={0.4}>
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-600">
                    Dự án tương tự
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: 'Times City Hanoi',
                      price: 'Từ 3.5 tỷ',
                      location: 'Hai Bà Trưng',
                      rating: 4.5,
                    },
                    {
                      name: 'Sunshine City',
                      price: 'Từ 4.2 tỷ',
                      location: 'Tây Hồ',
                      rating: 4.6,
                    },
                    {
                      name: 'Imperia Garden',
                      price: 'Từ 3.1 tỷ',
                      location: 'Thanh Xuân',
                      rating: 4.4,
                    },
                  ].map((similar, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg cursor-pointer"
                    >
                      <Image
                        src="/placeholder-2.webp?height=60&width=80"
                        alt={similar.name}
                        width={80}
                        height={60}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">
                          {similar.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {similar.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-green-600 font-bold">
                            {similar.price}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{similar.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}
