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
  Building,
  Bath,
  Filter,
  ChevronDown,
  Waves,
  Palmtree,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaFilter } from '@/components/ui/area-filter';

// Mock data cho dự án resort
const properties = [
  {
    id: 1,
    name: 'Fusion Resort Phu Quoc',
    location: 'Phú Quốc, Kiên Giang',
    address: 'Bãi Dài, Gành Dầu, Phú Quốc',
    price: 'Từ 8.5 tỷ',
    priceValue: 8500000000,
    pricePerSqm: '85 triệu/m²',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    type: 'Resort Villa',
    developer: 'Fusion Group',
    completion: 'Q2/2025',
    status: 'Sắp mở bán',
    rating: 4.9,
    reviews: 145,
    images: [
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
    ],
    features: ['Beachfront', 'Private pool', 'Spa services', 'Golf course'],
    description:
      'Luxury beachfront resort villa with stunning ocean views and world-class amenities.',
    agent: {
      name: 'Nguyễn Thị Hương',
      phone: '0901 234 567',
      email: 'huong.nguyen@iqi.com',
      avatar: '/placeholder-2.webp?height=60&width=60',
    },
  },
  {
    id: 2,
    name: 'InterContinental Danang',
    location: 'Đà Nẵng',
    address: 'Bãi Bắc, Sơn Trà, Đà Nẵng',
    price: 'Từ 12.8 tỷ',
    priceValue: 12800000000,
    pricePerSqm: '95 triệu/m²',
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    type: 'Beach Resort',
    developer: 'IHG Group',
    completion: 'Q4/2024',
    status: 'Đang bán',
    rating: 4.8,
    reviews: 267,
    images: [
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
    ],
    features: ['Ocean view', 'Infinity pool', 'Fine dining', 'Spa & wellness'],
    description:
      'Premium beachfront resort with panoramic ocean views and luxury amenities.',
    agent: {
      name: 'Trần Văn Đức',
      phone: '0902 345 678',
      email: 'duc.tran@iqi.com',
      avatar: '/placeholder-2.webp?height=60&width=60',
    },
  },
  {
    id: 3,
    name: 'Vinpearl Resort Nha Trang',
    location: 'Nha Trang, Khánh Hòa',
    address: 'Hòn Tre, Vĩnh Nguyên, Nha Trang',
    price: 'Từ 6.2 tỷ',
    priceValue: 6200000000,
    pricePerSqm: '72 triệu/m²',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    type: 'Island Resort',
    developer: 'Vingroup',
    completion: 'Đã bàn giao',
    status: 'Sẵn sàng',
    rating: 4.7,
    reviews: 189,
    images: [
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
    ],
    features: [
      'Island location',
      'Cable car access',
      'Water park',
      'Theme park',
    ],
    description:
      'Unique island resort experience with exclusive access via cable car system.',
    agent: {
      name: 'Lê Thị Mai',
      phone: '0903 456 789',
      email: 'mai.le@iqi.com',
      avatar: '/placeholder-2.webp?height=60&width=60',
    },
  },
  {
    id: 4,
    name: 'JW Marriott Phu Quoc',
    location: 'Phú Quốc, Kiên Giang',
    address: 'Mũi Ông Đội, Phú Quốc',
    price: 'Từ 15.5 tỷ',
    priceValue: 15500000000,
    pricePerSqm: '125 triệu/m²',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    type: 'Luxury Resort',
    developer: 'Marriott International',
    completion: 'Q1/2025',
    status: 'Pre-launch',
    rating: 4.9,
    reviews: 98,
    images: [
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
      '/placeholder-2.webp?height=300&width=500',
    ],
    features: [
      'Sunset beach',
      'Private butler',
      'Michelin dining',
      'Yacht club',
    ],
    description:
      'Ultra-luxury resort with exclusive sunset beach location and premium services.',
    agent: {
      name: 'Phạm Minh Châu',
      phone: '0904 567 890',
      email: 'chau.pham@iqi.com',
      avatar: '/placeholder-2.webp?height=60&width=60',
    },
  },
];

export default function ResortPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [selectedBathrooms, setSelectedBathrooms] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const itemsPerPage = 6;

  const bedroomOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: '1', label: '1 phòng' },
    { value: '2', label: '2 phòng' },
    { value: '3', label: '3 phòng' },
    { value: '4+', label: '4+ phòng' },
  ];

  const bathroomOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: '1', label: '1 phòng' },
    { value: '2', label: '2 phòng' },
    { value: '3', label: '3 phòng' },
    { value: '4+', label: '4+ phòng' },
  ];

  const propertyTypes = [
    { value: 'all', label: 'Tất cả loại hình' },
    { value: 'apartment', label: 'Căn hộ' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Nhà phố' },
    { value: 'office', label: 'Văn phòng' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'selling', label: 'Đang bán' },
    { value: 'ready', label: 'Sẵn sàng' },
    { value: 'upcoming', label: 'Sắp mở bán' },
    { value: 'handover', label: 'Sắp bàn giao' },
  ];

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        priceRange === 'all' ||
        (priceRange === 'under-8' &&
          Number.parseFloat(property.price.replace(/[^\d.]/g, '')) < 8) ||
        (priceRange === '8-15' &&
          Number.parseFloat(property.price.replace(/[^\d.]/g, '')) >= 8 &&
          Number.parseFloat(property.price.replace(/[^\d.]/g, '')) <= 15) ||
        (priceRange === 'over-15' &&
          Number.parseFloat(property.price.replace(/[^\d.]/g, '')) > 15);

      const matchesArea =
        (!areaFrom || property.area >= Number.parseFloat(areaFrom)) &&
        (!areaTo || property.area <= Number.parseFloat(areaTo));

      const matchesBedrooms =
        selectedBedrooms === 'all' ||
        (selectedBedrooms === '4+'
          ? property.bedrooms >= 4
          : property.bedrooms === Number.parseInt(selectedBedrooms));

      const matchesBathrooms =
        selectedBathrooms === 'all' ||
        (selectedBathrooms === '4+'
          ? property.bathrooms >= 4
          : property.bathrooms === Number.parseInt(selectedBathrooms));

      const matchesType =
        selectedType === 'all' ||
        property.type.toLowerCase().includes(selectedType.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' ||
        (() => {
          switch (selectedStatus) {
            case 'selling':
              return property.status === 'Đang bán';
            case 'ready':
              return property.status === 'Sẵn sàng';
            case 'upcoming':
              return property.status === 'Sắp mở bán';
            case 'handover':
              return property.status === 'Sắp bàn giao';
            default:
              return true;
          }
        })();

      console.log(
        matchesSearch,
        matchesPrice,
        matchesArea,
        matchesBedrooms,
        matchesBathrooms,
        matchesType,
        matchesStatus
      );

      return (
        matchesSearch &&
        matchesPrice &&
        matchesArea &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    priceRange,
    areaFrom,
    areaTo,
    selectedBedrooms,
    selectedBathrooms,
    selectedType,
    selectedStatus,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bất động sản Nghỉ dưỡng
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Khám phá những resort và condotel hàng đầu tại các điểm đến du
                lịch tuyệt vời
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>{properties.length} dự án</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Palmtree className="w-5 h-5" />
                  <span>3 điểm đến</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Đánh giá 4.8/5</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-10 px-6">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Card className="border-border shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="bg-card rounded-lg shadow-sm">
                  {/* Basic Filters */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <div className="min-w-[150px]">
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className="border-teal-200 dark:border-teal-800">
                          <SelectValue placeholder="Khoảng giá" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả mức giá</SelectItem>
                          <SelectItem value="under-8">Dưới 8 tỷ</SelectItem>
                          <SelectItem value="8-15">8 - 15 tỷ</SelectItem>
                          <SelectItem value="over-15">Trên 15 tỷ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="min-w-[150px]">
                      <AreaFilter
                        fromValue={areaFrom}
                        toValue={areaTo}
                        onFromChange={setAreaFrom}
                        onToChange={setAreaTo}
                        unit="m²"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Tìm kiếm theo tên dự án, vị trí, chủ đầu tư..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setShowAdvancedFilters(!showAdvancedFilters)
                      }
                      className="lg:w-auto"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Lọc nâng cao
                      <ChevronDown
                        className={`w-4 h-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
                      />
                    </Button>
                  </div>

                  {/* Advanced Filters */}
                  {showAdvancedFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t"
                    >
                      <div className="flex flex-wrap gap-4 mb-4">
                        {[
                          {
                            label: 'Số phòng ngủ',
                            value: selectedBedrooms,
                            onChange: setSelectedBedrooms,
                            options: bedroomOptions,
                            placeholder: 'Chọn số phòng ngủ',
                          },
                          {
                            label: 'Số phòng tắm',
                            value: selectedBathrooms,
                            onChange: setSelectedBathrooms,
                            options: bathroomOptions,
                            placeholder: 'Chọn số phòng tắm',
                          },
                          {
                            label: 'Loại hình',
                            value: selectedType,
                            onChange: setSelectedType,
                            options: propertyTypes,
                            placeholder: 'Chọn loại hình',
                          },
                          {
                            label: 'Trạng thái',
                            value: selectedStatus,
                            onChange: setSelectedStatus,
                            options: statusOptions,
                            placeholder: 'Chọn trạng thái',
                          },
                        ].map((filter) => (
                          <div
                            key={filter.label}
                            className="flex-1 min-w-[200px]"
                          >
                            <label className="text-sm font-medium mb-2 block">
                              {filter.label}
                            </label>
                            <Select
                              value={filter.value}
                              onValueChange={filter.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={filter.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {filter.options.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Results Summary */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <span>
                      Hiển thị {startIndex + 1}-
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredProperties.length
                      )}{' '}
                      trong tổng số {filteredProperties.length} dự án
                    </span>
                    {(searchTerm ||
                      selectedCity !== 'all' ||
                      selectedDistrict !== 'all' ||
                      priceRange ||
                      areaFrom ||
                      areaTo ||
                      selectedBedrooms !== 'all' ||
                      selectedBathrooms !== 'all' ||
                      selectedType !== 'all' ||
                      selectedStatus !== 'all') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCity('all');
                          setSelectedDistrict('all');
                          setPriceRange('');
                          setAreaFrom('');
                          setAreaTo('');
                          setSelectedBedrooms('all');
                          setSelectedBathrooms('all');
                          setSelectedType('all');
                          setSelectedStatus('all');
                          setCurrentPage(1);
                        }}
                      >
                        Xóa bộ lọc
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
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
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-teal-200 dark:border-teal-800">
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
                              <Badge className="bg-teal-600 hover:bg-teal-700">
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
                                <MapPin className="w-4 h-4 mr-1 text-teal-600" />
                                {property.address}
                              </p>
                            </div>

                            <div className="text-2xl font-bold text-teal-600">
                              {property.price}
                              <span className="text-sm font-normal text-muted-foreground ml-2">
                                ({property.pricePerSqm})
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <Bed className="w-4 h-4 text-muted-foreground" />
                                <span>{property.bedrooms} PN</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Bath className="w-4 h-4 text-muted-foreground" />
                                <span>{property.bathrooms} PT</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Square className="w-4 h-4 text-muted-foreground" />
                                <span>{property.area}m²</span>
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
                                    className="text-xs border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                              {property.features.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300"
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
                              <Link href={`/products/resort/${property.id}`}>
                                <Button className="bg-teal-600 hover:bg-teal-700">
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
                                className="rounded-full mx-auto mb-2"
                              />
                              <h4 className="font-semibold text-sm">
                                {property.agent.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Ch. gia tư vấn
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Button
                                size="sm"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-xs"
                                onClick={() =>
                                  window.open(`tel:${property.agent.phone}`)
                                }
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                Gọi ngay
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-xs border-teal-200 dark:border-teal-800 bg-transparent"
                                onClick={() =>
                                  window.open(`mailto:${property.agent.email}`)
                                }
                              >
                                <Mail className="w-3 h-3 mr-1" />
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
          <div className="lg:col-span-1 space-y-6">
            {/* Popular Destinations */}
            <SlideIn direction="right">
              <Card className="border-teal-200 dark:border-teal-800">
                <CardHeader>
                  <CardTitle className="text-lg text-teal-600">
                    Điểm đến phổ biến
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Phú Quốc', projects: 8, trend: 'Tăng 15%' },
                    { name: 'Đà Nẵng', projects: 6, trend: 'Tăng 12%' },
                    { name: 'Nha Trang', projects: 5, trend: 'Tăng 8%' },
                    { name: 'Hội An', projects: 3, trend: 'Tăng 10%' },
                  ].map((destination, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <div className="font-medium">{destination.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {destination.projects} dự án
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm text-green-600">
                          {destination.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </SlideIn>

            {/* Investment Benefits */}
            <SlideIn direction="right" delay={0.1}>
              <Card className="border-teal-200 dark:border-teal-800">
                <CardHeader>
                  <CardTitle className="text-lg text-teal-600">
                    Lợi ích đầu tư
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <Waves className="w-4 h-4 mr-2 text-teal-600" />
                      Cho thuê du lịch
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Lợi nhuận 8-12%/năm từ cho thuê
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <Palmtree className="w-4 h-4 mr-2 text-teal-600" />
                      Tăng giá tài sản
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Tăng trưởng 10-15%/năm
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-teal-600" />
                      Nghỉ dưỡng cá nhân
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Sử dụng riêng khi cần
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Contact CTA */}
            <SlideIn direction="right" delay={0.2}>
              <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2">Tư vấn đầu tư resort</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Liên hệ chuyên gia để được tư vấn chi tiết
                  </p>
                  <Button className="w-full bg-white text-teal-600 hover:bg-gray-100">
                    <Phone className="w-4 h-4 mr-2" />
                    Hotline: 1900 1234
                  </Button>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}
