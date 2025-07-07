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

export default function HCMCPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data cho dự án TP.HCM
  const properties = [
    {
      id: 1,
      name: 'Vinhomes Grand Park',
      location: 'Quận 9, TP.HCM',
      address: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9',
      price: 'Từ 3.2 tỷ',
      pricePerSqm: '45 triệu/m²',
      bedrooms: '1-4 phòng ngủ',
      area: '50-120 m²',
      type: 'Căn hộ cao cấp',
      developer: 'Vingroup',
      completion: 'Q4/2024',
      status: 'Sẵn sàng',
      rating: 4.8,
      reviews: 234,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: [
        'Công viên 36ha',
        'Trường học liên cấp',
        'Bệnh viện Vinmec',
        'Shopping mall',
      ],
      description:
        'Khu đô thị sinh thái thông minh với không gian xanh rộng lớn, tiện ích đầy đủ và vị trí thuận lợi.',
      agent: {
        name: 'Nguyễn Văn An',
        phone: '0901 234 567',
        email: 'an.nguyen@iqi.com',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
    {
      id: 2,
      name: 'Masteri Thảo Điền',
      location: 'Quận 2, TP.HCM',
      address: '159 Xa lộ Hà Nội, Thảo Điền, Quận 2',
      price: 'Từ 4.5 tỷ',
      pricePerSqm: '65 triệu/m²',
      bedrooms: '1-3 phòng ngủ',
      area: '45-95 m²',
      type: 'Căn hộ cao cấp',
      developer: 'Masteri',
      completion: 'Đã bàn giao',
      status: 'Sẵn sàng',
      rating: 4.6,
      reviews: 189,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: ['View sông Sài Gòn', 'Hồ bơi vô cực', 'Gym & Spa', 'Khu BBQ'],
      description:
        'Căn hộ cao cấp bên bờ sông Sài Gòn với tầm nhìn panorama tuyệt đẹp và tiện ích 5 sao.',
      agent: {
        name: 'Trần Thị Bình',
        phone: '0902 345 678',
        email: 'binh.tran@iqi.com',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
    {
      id: 3,
      name: 'Saigon South Residences',
      location: 'Quận 7, TP.HCM',
      address: 'Nguyễn Hữu Thọ, Tân Hưng, Quận 7',
      price: 'Từ 2.8 tỷ',
      pricePerSqm: '38 triệu/m²',
      bedrooms: '2-4 phòng ngủ',
      area: '70-150 m²',
      type: 'Căn hộ',
      developer: 'Keppel Land',
      completion: 'Q2/2024',
      status: 'Sắp bàn giao',
      rating: 4.7,
      reviews: 156,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: [
        'Khu phức hợp',
        'Trung tâm thương mại',
        'Trường quốc tế',
        'Công viên',
      ],
      description:
        'Khu căn hộ hiện đại tại trung tâm Phú Mỹ Hưng với đầy đủ tiện ích và môi trường sống lý tưởng.',
      agent: {
        name: 'Lê Minh Châu',
        phone: '0903 456 789',
        email: 'chau.le@iqi.com',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
    {
      id: 4,
      name: 'The Sun Avenue',
      location: 'Quận 2, TP.HCM',
      address: '28 Mai Chí Thọ, An Phú, Quận 2',
      price: 'Từ 3.8 tỷ',
      pricePerSqm: '55 triệu/m²',
      bedrooms: '1-3 phòng ngủ',
      area: '56-100 m²',
      type: 'Căn hộ cao cấp',
      developer: 'Novaland',
      completion: 'Đã bàn giao',
      status: 'Sẵn sàng',
      rating: 4.5,
      reviews: 203,
      images: [
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
        '/placeholder-2.webp?height=300&width=500',
      ],
      features: ['Metro An Phú', 'View sông', 'Sky garden', 'Clubhouse'],
      description:
        'Căn hộ thông minh với thiết kế hiện đại, kết nối metro và view sông tuyệt đẹp.',
      agent: {
        name: 'Phạm Văn Đức',
        phone: '0904 567 890',
        email: 'duc.pham@iqi.com',
        avatar: '/placeholder-2.webp?height=60&width=60',
      },
    },
  ];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'under-3' &&
        Number.parseFloat(property.price.replace(/[^\d.]/g, '')) < 3) ||
      (priceRange === '3-5' &&
        Number.parseFloat(property.price.replace(/[^\d.]/g, '')) >= 3 &&
        Number.parseFloat(property.price.replace(/[^\d.]/g, '')) <= 5) ||
      (priceRange === 'over-5' &&
        Number.parseFloat(property.price.replace(/[^\d.]/g, '')) > 5);

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
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bất động sản TP. Hồ Chí Minh
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Khám phá những dự án bất động sản hàng đầu tại thành phố năng
                động nhất Việt Nam
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>{properties.length} dự án</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>24 quận huyện</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Đánh giá 4.6/5</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <FadeIn>
              <Card className="border-border shadow-lg">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Tìm kiếm dự án, địa điểm..."
                          className="pl-10 border-border focus:border-orange-400"
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
                        <SelectItem value="under-3">Dưới 3 tỷ</SelectItem>
                        <SelectItem value="3-5">3 - 5 tỷ</SelectItem>
                        <SelectItem value="over-5">Trên 5 tỷ</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={propertyType}
                      onValueChange={setPropertyType}
                    >
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
                        <SelectItem value="price-low">
                          Giá thấp đến cao
                        </SelectItem>
                        <SelectItem value="price-high">
                          Giá cao đến thấp
                        </SelectItem>
                        <SelectItem value="rating">Đánh giá cao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Results */}
            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredProperties.length} dự án được tìm thấy
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
                              <Badge className="bg-orange-600 hover:bg-orange-700">
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
                                <MapPin className="w-4 h-4 mr-1 text-orange-600" />
                                {property.address}
                              </p>
                            </div>

                            <div className="text-2xl font-bold text-orange-600">
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
                                    className="text-xs border-border text-orange-700 dark:text-orange-300"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              {property.features.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-border text-orange-700 dark:text-orange-300"
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
                              <Link href={`/products/hcmc/${property.id}`}>
                                <Button className="bg-orange-600 hover:bg-orange-700">
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
                                Chuyên viên tư vấn
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
                  <CardTitle>Gửi yêu cầu tư vấn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Họ và tên" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Số điện thoại" />
                  <textarea
                    placeholder="Tôi muốn được tư vấn về..."
                    className="w-full p-3 border border-input rounded-md bg-background resize-none"
                    rows={4}
                  />
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" />
                    <p className="text-xs text-muted-foreground">
                      Tôi đồng ý chia sẻ thông tin để nhận tư vấn.
                      <a
                        href="#"
                        className="text-orange-600 hover:underline ml-1"
                      >
                        Chính sách bảo mật
                      </a>
                    </p>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Gửi yêu cầu
                  </Button>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Quick Stats */}
            <SlideIn direction="right" delay={0.2}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-orange-600">
                    Thống kê thị trường
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Giá trung bình:
                    </span>
                    <span className="font-semibold">52 triệu/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tăng trưởng:</span>
                    <span className="font-semibold text-green-600">+8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dự án mới:</span>
                    <span className="font-semibold">24 dự án</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sắp bàn giao:</span>
                    <span className="font-semibold">12 dự án</span>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Popular Areas */}
            <SlideIn direction="right" delay={0.4}>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-orange-600">
                    Khu vực phổ biến
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { area: 'Quận 2', projects: 15, avgPrice: '65 tr/m²' },
                    { area: 'Quận 7', projects: 12, avgPrice: '48 tr/m²' },
                    { area: 'Quận 9', projects: 18, avgPrice: '42 tr/m²' },
                    { area: 'Thủ Đức', projects: 21, avgPrice: '38 tr/m²' },
                  ].map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{area.area}</div>
                        <div className="text-sm text-muted-foreground">
                          {area.projects} dự án
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-orange-600">
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
