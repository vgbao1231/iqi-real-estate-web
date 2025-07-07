'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  Building,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

// Properties data organized by city
type CityKey = 'hcmc' | 'hanoi' | 'danang' | 'nhatrang' | 'cantho';

type Property = {
  id: number;
  name: string;
  location: string;
  type: string;
  price: string;
  priceValue: number;
  bedrooms: string;
  area: string;
  features: string[];
  image: string;
  status: string;
  completion: string;
  developer: string;
};

const propertiesByCity: Record<CityKey, Property[]> = {
  hcmc: [
    {
      id: 1,
      name: 'Vinhomes Grand Park',
      location: 'Quận 9, TP.HCM',
      type: 'Căn hộ cao cấp',
      price: 'Từ 3.2 tỷ',
      priceValue: 3200000000,
      bedrooms: '1-4 phòng ngủ',
      area: '50-120 m²',
      features: [
        'Công viên 36ha',
        'Trường học liên cấp',
        'Bệnh viện',
        'Shopping mall',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q4/2024',
      developer: 'Vingroup',
    },
    {
      id: 2,
      name: 'Masteri Thảo Điền',
      location: 'Quận 2, TP.HCM',
      type: 'Căn hộ view sông',
      price: 'Từ 4.5 tỷ',
      priceValue: 4500000000,
      bedrooms: '1-3 phòng ngủ',
      area: '45-95 m²',
      features: ['View sông Sài Gòn', 'Sky bar', 'Hồ bơi tầng 5', 'Gym & Spa'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Sắp bàn giao',
      completion: 'Q1/2025',
      developer: 'Masterise Homes',
    },
    {
      id: 3,
      name: 'The Metropole Thủ Thiêm',
      location: 'Quận 2, TP.HCM',
      type: 'Căn hộ hạng sang',
      price: 'Từ 8.5 tỷ',
      priceValue: 8500000000,
      bedrooms: '2-4 phòng ngủ',
      area: '80-180 m²',
      features: [
        'Tầm nhìn 360°',
        'Concierge 24/7',
        'Wine cellar',
        'Private elevator',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q2/2025',
      developer: 'SonKim Land',
    },
    {
      id: 13,
      name: 'Saigon Royal',
      location: 'Quận 4, TP.HCM',
      type: 'Căn hộ cao cấp',
      price: 'Từ 5.8 tỷ',
      priceValue: 5800000000,
      bedrooms: '2-3 phòng ngủ',
      area: '70-110 m²',
      features: [
        'View sông Sài Gòn',
        'Rooftop garden',
        'Business center',
        'Valet parking',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q3/2024',
      developer: 'Novaland',
    },
  ],
  hanoi: [
    {
      id: 4,
      name: 'Vinhomes Smart City',
      location: 'Nam Từ Liêm, Hà Nội',
      type: 'Căn hộ thông minh',
      price: 'Từ 2.8 tỷ',
      priceValue: 2800000000,
      bedrooms: '1-3 phòng ngủ',
      area: '45-110 m²',
      features: [
        'Smart home',
        'Công viên Nhật Bản',
        'Trường quốc tế',
        'Bệnh viện Vinmec',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q3/2024',
      developer: 'Vingroup',
    },
    {
      id: 5,
      name: 'The Manor Central Park',
      location: 'Hoàng Mai, Hà Nội',
      type: 'Căn hộ cao cấp',
      price: 'Từ 3.5 tỷ',
      priceValue: 3500000000,
      bedrooms: '2-4 phòng ngủ',
      area: '70-150 m²',
      features: ['Công viên trung tâm', 'Clubhouse', 'Hồ bơi 4 mùa', 'Khu BBQ'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Sắp mở bán',
      completion: 'Q4/2025',
      developer: 'Bitexco Group',
    },
    {
      id: 6,
      name: 'Sunshine Diamond River',
      location: 'Ciputra, Hà Nội',
      type: 'Căn hộ view sông',
      price: 'Từ 4.2 tỷ',
      priceValue: 4200000000,
      bedrooms: '2-3 phòng ngủ',
      area: '65-120 m²',
      features: [
        'View sông Hồng',
        'Marina',
        'Golf course',
        'International school',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q1/2025',
      developer: 'Sunshine Group',
    },
  ],
  danang: [
    {
      id: 7,
      name: 'Monarchy Đà Nẵng',
      location: 'Ngũ Hành Sơn, Đà Nẵng',
      type: 'Căn hộ biển',
      price: 'Từ 2.9 tỷ',
      priceValue: 2900000000,
      bedrooms: '1-3 phòng ngủ',
      area: '50-100 m²',
      features: [
        'View biển',
        'Bãi biển riêng',
        'Resort facilities',
        'Golf course',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q2/2024',
      developer: 'Alphanam Group',
    },
    {
      id: 8,
      name: 'Premier Sky Residences',
      location: 'Hải Châu, Đà Nẵng',
      type: 'Căn hộ cao cấp',
      price: 'Từ 3.8 tỷ',
      priceValue: 3800000000,
      bedrooms: '2-4 phòng ngủ',
      area: '75-150 m²',
      features: ['Sky bar', 'Infinity pool', 'Gym & Spa', 'Shopping center'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Sắp mở bán',
      completion: 'Q3/2025',
      developer: 'Premier Group',
    },
  ],
  nhatrang: [
    {
      id: 9,
      name: 'Scenia Bay Nha Trang',
      location: 'Vĩnh Nguyên, Nha Trang',
      type: 'Condotel',
      price: 'Từ 1.8 tỷ',
      priceValue: 1800000000,
      bedrooms: 'Studio-2 phòng ngủ',
      area: '35-80 m²',
      features: [
        'Bãi biển Nha Trang',
        'Water park',
        'Casino',
        'Convention center',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q1/2024',
      developer: 'Danh Khôi Group',
    },
    {
      id: 10,
      name: 'Vinpearl Condotel Nha Trang',
      location: 'Vĩnh Hải, Nha Trang',
      type: 'Condotel nghỉ dưỡng',
      price: 'Từ 2.5 tỷ',
      priceValue: 2500000000,
      bedrooms: '1-2 phòng ngủ',
      area: '45-90 m²',
      features: ['Vinpearl Land', 'Aquarium', 'Cable car', 'Beach club'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Đã bàn giao',
      developer: 'Vingroup',
    },
  ],
  cantho: [
    {
      id: 11,
      name: 'Ecopark Cần Thơ',
      location: 'Ninh Kiều, Cần Thơ',
      type: 'Căn hộ sinh thái',
      price: 'Từ 1.5 tỷ',
      priceValue: 1500000000,
      bedrooms: '2-3 phòng ngủ',
      area: '60-100 m²',
      features: [
        'Công viên sinh thái',
        'Sông Hậu',
        'Chợ nổi',
        'Trung tâm thương mại',
      ],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Sắp mở bán',
      completion: 'Q4/2024',
      developer: 'Ecopark Group',
    },
    {
      id: 12,
      name: 'Vincom Plaza Cần Thơ',
      location: 'Xuân Khánh, Cần Thơ',
      type: 'Căn hộ thương mại',
      price: 'Từ 2.2 tỷ',
      priceValue: 2200000000,
      bedrooms: '1-3 phòng ngủ',
      area: '50-120 m²',
      features: ['Vincom Mega Mall', 'Cinema', 'Food court', 'Gym & Spa'],
      image: '/placeholder-2.webp?height=300&width=400',
      status: 'Đang bán',
      completion: 'Q2/2025',
      developer: 'Vingroup',
    },
  ],
};

const cities = [
  {
    value: 'hcmc',
    label: 'TP. Hồ Chí Minh',
    count: propertiesByCity.hcmc.length,
  },
  { value: 'hanoi', label: 'Hà Nội', count: propertiesByCity.hanoi.length },
  {
    value: 'danang',
    label: 'Đà Nẵng',
    count: propertiesByCity.danang.length,
  },
  {
    value: 'nhatrang',
    label: 'Nha Trang',
    count: propertiesByCity.nhatrang.length,
  },
  {
    value: 'cantho',
    label: 'Cần Thơ',
    count: propertiesByCity.cantho.length,
  },
];

const priceRanges = [
  { value: 'all', label: 'Tất cả mức giá' },
  { value: 'under2', label: 'Dưới 2 tỷ' },
  { value: '2to4', label: '2 - 4 tỷ' },
  { value: '4to6', label: '4 - 6 tỷ' },
  { value: 'above6', label: 'Trên 6 tỷ' },
];

const propertyTypes = [
  { value: 'all', label: 'Tất cả loại hình' },
  { value: 'apartment', label: 'Căn hộ' },
  { value: 'villa', label: 'Biệt thự' },
  { value: 'condotel', label: 'Condotel' },
];

export default function VietnamPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setPriceRange] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<CityKey>('hcmc');
  const itemsPerPage = 6;

  // Get current city properties
  const currentProperties = useMemo(
    () => propertiesByCity[activeTab] || [],
    [activeTab]
  );

  // Filter logic
  const filteredProperties = useMemo(() => {
    return currentProperties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        selectedPriceRange === 'all' ||
        (() => {
          switch (selectedPriceRange) {
            case 'under2':
              return property.priceValue < 2000000000;
            case '2to4':
              return (
                property.priceValue >= 2000000000 &&
                property.priceValue < 4000000000
              );
            case '4to6':
              return (
                property.priceValue >= 4000000000 &&
                property.priceValue < 6000000000
              );
            case 'above6':
              return property.priceValue >= 6000000000;
            default:
              return true;
          }
        })();

      const matchesType =
        selectedType === 'all' ||
        (() => {
          switch (selectedType) {
            case 'apartment':
              return property.type.toLowerCase().includes('căn hộ');
            case 'villa':
              return property.type.toLowerCase().includes('biệt thự');
            case 'condotel':
              return property.type.toLowerCase().includes('condotel');
            default:
              return true;
          }
        })();

      return matchesSearch && matchesPrice && matchesType;
    });
  }, [currentProperties, searchTerm, selectedPriceRange, selectedType]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const marketInsights = [
    {
      city: 'TP. Hồ Chí Minh',
      growth: '+8.5%',
      avgPrice: '65 triệu/m²',
      hotDistricts: ['Quận 1', 'Quận 2', 'Quận 7', 'Quận 9'],
      trend: 'Tăng',
      projects: propertiesByCity.hcmc.length,
    },
    {
      city: 'Hà Nội',
      growth: '+6.2%',
      avgPrice: '45 triệu/m²',
      hotDistricts: ['Ba Đình', 'Hoàn Kiếm', 'Cầu Giấy', 'Nam Từ Liêm'],
      trend: 'Ổn định',
      projects: propertiesByCity.hanoi.length,
    },
    {
      city: 'Đà Nẵng',
      growth: '+7.8%',
      avgPrice: '35 triệu/m²',
      hotDistricts: ['Hải Châu', 'Thanh Khê', 'Ngũ Hành Sơn', 'Sơn Trà'],
      trend: 'Tăng',
      projects: propertiesByCity.danang.length,
    },
    {
      city: 'Nha Trang',
      growth: '+9.2%',
      avgPrice: '28 triệu/m²',
      hotDistricts: ['Vĩnh Hải', 'Vĩnh Nguyên', 'Phước Long', 'Lộc Thọ'],
      trend: 'Tăng mạnh',
      projects: propertiesByCity.nhatrang.length,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              BẤT ĐỘNG SẢN VIỆT NAM
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bất động sản Việt Nam
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Khám phá những dự án bất động sản cao cấp tại các thành phố lớn
              của Việt Nam với vị trí đắc địa, tiện ích hoàn hảo và chất lượng
              vượt trội.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
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
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  />
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-2 gap-4 pt-4 border-t"
                >
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Mức giá
                    </label>
                    <Select
                      value={selectedPriceRange}
                      onValueChange={setPriceRange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Loại hình
                    </label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  selectedPriceRange !== 'all' ||
                  selectedType !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setPriceRange('all');
                      setSelectedType('all');
                      setCurrentPage(1);
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Properties by City - Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dự án theo thành phố
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những dự án bất động sản được lựa chọn kỹ lưỡng tại các thành phố
              lớn
            </p>
          </FadeIn>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as CityKey)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 max-w-4xl mx-auto mb-8">
              {cities.map((city) => (
                <TabsTrigger
                  key={city.value}
                  value={city.value}
                  className="flex flex-col gap-1"
                >
                  <span>{city.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {city.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {cities.map((city) => (
              <TabsContent key={city.value} value={city.value}>
                {paginatedProperties.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                      {paginatedProperties.map((property, index) => (
                        <ScaleIn key={property.id} delay={index * 0.1}>
                          <motion.div whileHover={{ y: -10 }}>
                            <Card className="overflow-hidden h-full">
                              <div className="relative">
                                <motion.div whileHover={{ scale: 1.1 }}>
                                  <Image
                                    src={
                                      property.image || '/placeholder-2.webp'
                                    }
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
                                    <div className="text-xl font-bold text-blue-600">
                                      {property.price}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {property.completion}
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>

                              <CardContent>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">
                                        Loại hình:
                                      </span>
                                      <div className="font-semibold">
                                        {property.type}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">
                                        Phòng ngủ:
                                      </span>
                                      <div className="font-semibold">
                                        {property.bedrooms}
                                      </div>
                                    </div>
                                    <div className="col-span-2">
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
                                      Tiện ích nổi bật:
                                    </h4>
                                    <div className="grid grid-cols-1 gap-1">
                                      {property.features
                                        .slice(0, 4)
                                        .map((feature, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-center text-xs text-muted-foreground"
                                          >
                                            <CheckCircle className="w-3 h-3 mr-1 text-green-600 flex-shrink-0" />
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
                                      <Link
                                        href={`/products/vietnam/${property.id}`}
                                      >
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <FadeIn>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Trước
                          </Button>

                          <div className="flex space-x-1">
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? 'default' : 'outline'
                                }
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-10"
                              >
                                {page}
                              </Button>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Sau
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </FadeIn>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Không tìm thấy dự án
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setPriceRange('all');
                        setSelectedType('all');
                        setCurrentPage(1);
                      }}
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tìm hiểu thêm về dự án
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Liên hệ với chuyên gia của chúng tôi để được tư vấn chi tiết về
              các dự án phù hợp nhất
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Tư vấn miễn phí ngay
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
