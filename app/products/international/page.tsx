'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import {
  Search,
  MapPin,
  Bed,
  Square,
  Phone,
  Mail,
  Heart,
  Share2,
  Star,
  Calendar,
  Building,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/layout/header';

export default function InternationalPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const properties = [
    {
      id: 1,
      name: 'Marina One Residences',
      location: 'Downtown Core, Singapore',
      address: '21 Marina Way, Singapore 018978',
      price: 'Từ 1.6 triệu SGD',
      pricePerSqm: '28,000 SGD/m²',
      bedrooms: '1-4 phòng ngủ',
      area: '60-180 m²',
      type: 'Căn hộ cao cấp',
      developer: 'M+S Pte Ltd',
      completion: 'Q3/2023',
      status: 'Sẵn sàng',
      rating: 4.9,
      reviews: 320,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: [
        'Khu vườn nhiệt đới trung tâm',
        'Gym & Spa cao cấp',
        'Bể bơi vô cực',
        'Kết nối MRT 3 tuyến',
      ],
      description:
        'Khu phức hợp sang trọng tại trung tâm tài chính Singapore với thiết kế xanh độc đáo và tiện ích đẳng cấp quốc tế.',
      agent: {
        name: 'David Tan',
        phone: '+65 9123 4567',
        email: 'david.tan@globalrealty.sg',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
    {
      id: 2,
      name: 'Azabudai Hills Residence',
      location: 'Minato, Tokyo, Nhật Bản',
      address: '1-2-1 Azabudai, Minato-ku, Tokyo',
      price: 'Từ 300 triệu Yên',
      pricePerSqm: '1.5 triệu Yên/m²',
      bedrooms: '1-4 phòng ngủ',
      area: '50-200 m²',
      type: 'Căn hộ siêu sang',
      developer: 'Mori Building',
      completion: 'Q4/2024',
      status: 'Sắp bàn giao',
      rating: 4.8,
      reviews: 290,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: [
        'Sky lounge',
        'Vườn Nhật',
        'Bảo tàng nghệ thuật',
        'Trường quốc tế',
      ],
      description:
        'Một biểu tượng sống mới tại Tokyo – kết hợp giữa văn hoá Nhật và thiết kế hiện đại, kiến tạo cộng đồng tinh hoa.',
      agent: {
        name: 'Sakura Watanabe',
        phone: '+81 80 1234 5678',
        email: 'sakura@tokyoreal.jp',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
    {
      id: 3,
      name: 'Emaar Beachfront – Marina Vista',
      location: 'Dubai Marina, UAE',
      address: 'Dubai Harbour, Emaar Beachfront',
      price: 'Từ 2.1 triệu AED',
      pricePerSqm: '25,000 AED/m²',
      bedrooms: '1-3 phòng ngủ',
      area: '70-150 m²',
      type: 'Căn hộ nghỉ dưỡng',
      developer: 'Emaar Properties',
      completion: 'Q2/2025',
      status: 'Đang xây dựng',
      rating: 4.7,
      reviews: 175,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: [
        'Bãi biển riêng',
        'Hồ bơi vô cực hướng biển',
        'Fitness center hiện đại',
        'Kết nối Dubai Marina',
      ],
      description:
        'Trải nghiệm sống nghỉ dưỡng cao cấp bên bờ biển nhân tạo tuyệt đẹp, với đầy đủ tiện ích 5 sao giữa lòng Dubai.',
      agent: {
        name: 'Fatima Al Farsi',
        phone: '+971 50 987 6543',
        email: 'fatima@emaaragents.ae',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
    {
      id: 4,
      name: 'Central Park Tower',
      location: 'Midtown Manhattan, New York, USA',
      address: '217 W 57th St, New York, NY 10019',
      price: 'Từ 7.5 triệu USD',
      pricePerSqm: '70,000 USD/m²',
      bedrooms: '2-5 phòng ngủ',
      area: '100-350 m²',
      type: 'Căn hộ siêu sang',
      developer: 'Extell Development',
      completion: 'Đã bàn giao',
      status: 'Sẵn sàng',
      rating: 5.0,
      reviews: 412,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: [
        'View toàn cảnh Central Park',
        'Hồ bơi trong nhà',
        'Private dining lounge',
        'Fitness & Spa Club',
      ],
      description:
        'Toà nhà căn hộ cao nhất thế giới tại New York – nơi đẳng cấp sống thượng lưu giao hòa với kiến trúc vượt thời gian.',
      agent: {
        name: 'Emily Johnson',
        phone: '+1 (212) 345-6789',
        email: 'emily.j@luxnyc.com',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
  ];

  // Sắp xếp danh sách dự án theo lựa chọn
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id - a.id;
    }
    if (sortBy === 'price-low') {
      // Ưu tiên số đầu tiên trong chuỗi giá, fallback nếu không parse được
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, '')) || 0;
      return priceB - priceA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Lọc danh sách dự án quốc tế
  const filteredProperties = sortedProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Lọc theo mức giá (áp dụng cho các đơn vị quốc tế)
    const priceValue = parseFloat(property.price.replace(/[^\d.]/g, '')) || 0;
    let matchesPrice = true;
    if (priceRange !== 'all') {
      if (property.price.includes('USD')) {
        if (priceRange === 'under-3') matchesPrice = priceValue < 3;
        else if (priceRange === '3-5')
          matchesPrice = priceValue >= 3 && priceValue <= 5;
        else if (priceRange === 'over-5') matchesPrice = priceValue > 5;
      } else if (property.price.includes('SGD')) {
        if (priceRange === 'under-3') matchesPrice = priceValue < 3;
        else if (priceRange === '3-5')
          matchesPrice = priceValue >= 3 && priceValue <= 5;
        else if (priceRange === 'over-5') matchesPrice = priceValue > 5;
      } else if (property.price.includes('Yên')) {
        if (priceRange === 'under-3') matchesPrice = priceValue < 300;
        else if (priceRange === '3-5')
          matchesPrice = priceValue >= 300 && priceValue <= 500;
        else if (priceRange === 'over-5') matchesPrice = priceValue > 500;
      } else if (property.price.includes('AED')) {
        if (priceRange === 'under-3') matchesPrice = priceValue < 3;
        else if (priceRange === '3-5')
          matchesPrice = priceValue >= 3 && priceValue <= 5;
        else if (priceRange === 'over-5') matchesPrice = priceValue > 5;
      }
    }

    const matchesType =
      propertyType === 'all' ||
      property.type.toLowerCase().includes(propertyType);
    const matchesBedrooms =
      bedrooms === 'all' || property.bedrooms.includes(bedrooms);

    return matchesSearch && matchesPrice && matchesType && matchesBedrooms;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bất động sản Quốc tế
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Khám phá các dự án bất động sản cao cấp tại các thành phố lớn
                trên thế giới
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>{properties.length} dự án quốc tế</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>4 quốc gia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Đánh giá trung bình 4.8/5</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <FadeIn>
          <Card className="border-border shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm dự án, thành phố, quốc gia..."
                      className="pl-10 border-border focus:border-blue-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Mức giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả mức giá</SelectItem>
                    <SelectItem value="under-3">
                      Dưới 3 triệu (USD/SGD/AED/100tr Yên)
                    </SelectItem>
                    <SelectItem value="3-5">
                      3 - 5 triệu (USD/SGD/AED/100tr Yên)
                    </SelectItem>
                    <SelectItem value="over-5">
                      Trên 5 triệu (USD/SGD/AED/100tr Yên)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Loại hình" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại hình</SelectItem>
                    <SelectItem value="căn hộ">Căn hộ</SelectItem>
                    <SelectItem value="biệt thự">Biệt thự</SelectItem>
                    <SelectItem value="nhà phố">Nhà phố</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                    <SelectItem value="rating">Đánh giá cao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results */}
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredProperties.length} dự án quốc tế được tìm thấy
                </h2>
                <div className="text-sm text-muted-foreground">
                  Cập nhật: {new Date().toLocaleDateString('vi-VN')}
                </div>
              </div>
            </FadeIn>

            {/* Properties List */}
            <div className="space-y-6">
              {filteredProperties.map((property, index) => (
                <ScaleIn key={property.id} delay={index * 0.1}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-5 gap-0">
                        {/* Image */}
                        <div className="md:col-span-2 relative">
                          <div className="relative h-64 md:h-full">
                            <Image
                              src={property.images[0] || '/placeholder-2.webp'}
                              alt={property.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-4 left-4 flex space-x-2">
                              <Badge className="bg-blue-500 hover:bg-blue-600">
                                {property.status}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="bg-white/90 text-gray-900"
                              >
                                {property.type}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <Badge
                                variant="outline"
                                className="bg-black/70 text-white border-white/20"
                              >
                                {property.images.length} ảnh
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2 p-6">
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold line-clamp-1">
                                  {property.name}
                                </h3>
                                <div className="flex items-center space-x-1 ml-2">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">
                                    {property.rating}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    ({property.reviews})
                                  </span>
                                </div>
                              </div>
                              <p className="text-muted-foreground flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                                {property.address}
                              </p>
                            </div>

                            <div className="text-2xl font-bold text-blue-500">
                              {property.price}
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                ({property.pricePerSqm})
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Bed className="w-4 h-4 text-muted-foreground" />
                                <span>{property.bedrooms}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Square className="w-4 h-4 text-muted-foreground" />
                                <span>{property.area}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>{property.completion}</span>
                              </div>
                            </div>

                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {property.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {property.features
                                .slice(0, 3)
                                .map((feature, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs border-border text-blue-600 dark:text-blue-300"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              {property.features.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-border text-blue-600 dark:text-blue-300"
                                >
                                  +{property.features.length - 3} tiện ích
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="text-sm text-muted-foreground">
                                <span className="font-medium">
                                  {property.developer}
                                </span>
                              </div>
                              <Link
                                href={`/products/international/${property.id}`}
                              >
                                <Button className="bg-blue-500 hover:bg-blue-600">
                                  Xem chi tiết
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Agent Info */}
                        <div className="md:col-span-1 bg-muted/50 p-6 flex flex-col justify-center">
                          <div className="text-center space-y-4">
                            <div>
                              <Image
                                src={
                                  property.agent.avatar || '/placeholder-2.webp'
                                }
                                alt={property.agent.name}
                                width={60}
                                height={60}
                                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                              />
                              <h4 className="font-semibold text-sm">
                                {property.agent.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Chuyên viên quốc tế
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs bg-transparent"
                              >
                                <Phone className="w-3 h-3 mr-2" />
                                {property.agent.phone}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs bg-transparent"
                              >
                                <Mail className="w-3 h-3 mr-2" />
                                Email
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <SlideIn direction="right">
              <Card className="bg-card border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Nhận tư vấn quốc tế</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Họ và tên" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Số điện thoại" />
                  <textarea
                    placeholder="Tôi quan tâm dự án quốc tế nào..."
                    className="w-full p-3 border border-input rounded-md bg-background resize-none"
                    rows={4}
                  />
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" />
                    <p className="text-xs text-muted-foreground">
                      Tôi đồng ý chia sẻ thông tin để nhận tư vấn.
                      <a
                        href="#"
                        className="text-blue-500 hover:underline ml-1"
                      >
                        Chính sách bảo mật
                      </a>
                    </p>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Gửi yêu cầu
                  </Button>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Quick Stats */}
            <SlideIn direction="right" delay={0.2}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Thống kê thị trường quốc tế
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Giá trung bình:
                    </span>
                    <span className="font-semibold">Tùy quốc gia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tăng trưởng:</span>
                    <span className="font-semibold text-green-600">
                      +10%/năm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dự án mới:</span>
                    <span className="font-semibold">4 dự án</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sắp bàn giao:</span>
                    <span className="font-semibold">2 dự án</span>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Popular Areas */}
            <SlideIn direction="right" delay={0.4}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Thành phố nổi bật
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      area: 'Singapore',
                      projects: 1,
                      avgPrice: '28,000 SGD/m²',
                    },
                    {
                      area: 'Tokyo',
                      projects: 1,
                      avgPrice: '1.5 triệu Yên/m²',
                    },
                    { area: 'Dubai', projects: 1, avgPrice: '25,000 AED/m²' },
                    {
                      area: 'New York',
                      projects: 1,
                      avgPrice: '70,000 USD/m²',
                    },
                  ].map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{area.area}</div>
                        <div className="text-sm text-muted-foreground">
                          {area.projects} dự án
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-500">
                          {area.avgPrice}
                        </div>
                      </div>
                    </div>
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
