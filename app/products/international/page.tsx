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
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  MapPin,
  Building,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Plane,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';

// International Properties Data
const properties = [
  {
    id: 1,
    name: 'Marina Bay Residences',
    location: 'Singapore',
    country: 'singapore',
    type: 'Luxury Apartment',
    price: 'From $2.8M',
    priceValue: 2800000,
    bedrooms: '2-4 bedrooms',
    area: '120-250 sqm',
    features: [
      'Marina view',
      'Infinity pool',
      'Concierge',
      'Sky garden',
      'Private lift',
      'Wine cellar',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q2/2025',
    developer: 'CapitaLand',
    description:
      "Luxury waterfront living in the heart of Singapore's financial district with stunning marina views.",
    highlights: [
      'Prime Marina Bay location',
      '5-star hotel amenities',
      'Investment visa eligible',
    ],
  },
  {
    id: 2,
    name: 'The Ritz-Carlton Residences',
    location: 'Kuala Lumpur, Malaysia',
    country: 'malaysia',
    type: 'Serviced Residence',
    price: 'From $680K',
    priceValue: 680000,
    bedrooms: '1-3 bedrooms',
    area: '80-180 sqm',
    features: [
      'Ritz-Carlton service',
      'KLCC view',
      'Hotel amenities',
      'Butler service',
      'Spa access',
      'Fine dining',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q4/2024',
    developer: 'Ritz-Carlton',
    description:
      "Experience the pinnacle of luxury living with Ritz-Carlton's legendary service and amenities.",
    highlights: [
      'Ritz-Carlton brand',
      'KLCC Twin Towers view',
      'Guaranteed rental returns',
    ],
  },
  {
    id: 3,
    name: 'Sunshine Empire',
    location: 'Ho Chi Minh City, Vietnam',
    country: 'vietnam',
    type: 'Mixed Development',
    price: 'From $450K',
    priceValue: 450000,
    bedrooms: '1-4 bedrooms',
    area: '60-150 sqm',
    features: [
      'City center',
      'Shopping mall',
      'Office tower',
      'Hotel',
      'Rooftop pool',
      'Gym & spa',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q1/2025',
    developer: 'Sunshine Group',
    description:
      "Premier mixed-use development in the heart of Ho Chi Minh City's business district.",
    highlights: [
      'District 1 location',
      'Integrated lifestyle',
      'High rental yield',
    ],
  },
  {
    id: 4,
    name: 'Atlantis The Royal',
    location: 'Dubai, UAE',
    country: 'uae',
    type: 'Ultra-luxury Resort',
    price: 'From $3.5M',
    priceValue: 3500000,
    bedrooms: '2-5 bedrooms',
    area: '150-400 sqm',
    features: [
      'Private beach',
      'Atlantis amenities',
      'Michelin dining',
      'Aquaventure',
      'Dolphin Bay',
      'ShuiQi Spa',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Completed',
    developer: 'Atlantis',
    description:
      "Ultra-luxury resort residences on Dubai's iconic Palm Jumeirah with world-class amenities.",
    highlights: [
      'Palm Jumeirah location',
      'Resort lifestyle',
      'Tax-free investment',
    ],
  },
  {
    id: 5,
    name: 'One Bangkok',
    location: 'Bangkok, Thailand',
    country: 'thailand',
    type: 'Mixed-use Development',
    price: 'From $520K',
    priceValue: 520000,
    bedrooms: '1-3 bedrooms',
    area: '45-120 sqm',
    features: [
      'BTS connected',
      'Shopping district',
      'Office towers',
      'Hotels',
      'Parks',
      'Cultural center',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q3/2025',
    developer: 'TCC Group',
    description:
      "Bangkok's largest mixed-use development connecting to BTS with world-class amenities.",
    highlights: [
      'BTS connectivity',
      'Largest mixed-use in Bangkok',
      'Cultural hub',
    ],
  },
  {
    id: 6,
    name: 'Raffles Residences',
    location: 'Jakarta, Indonesia',
    country: 'indonesia',
    type: 'Luxury Residence',
    price: 'From $380K',
    priceValue: 380000,
    bedrooms: '2-4 bedrooms',
    area: '90-200 sqm',
    features: [
      'Raffles service',
      'City skyline',
      'Butler service',
      'Spa',
      'Fine dining',
      'Business center',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q2/2024',
    developer: 'Raffles',
    description:
      'Legendary Raffles hospitality in luxury residences with panoramic Jakarta city views.',
    highlights: [
      'Raffles brand heritage',
      'Central Jakarta location',
      'Hotel-style services',
    ],
  },
  {
    id: 7,
    name: 'Mandarin Oriental Residences',
    location: 'Manila, Philippines',
    country: 'philippines',
    type: 'Luxury Condominium',
    price: 'From $420K',
    priceValue: 420000,
    bedrooms: '1-3 bedrooms',
    area: '70-160 sqm',
    features: [
      'Makati CBD',
      'Mandarin service',
      'Spa access',
      'Fine dining',
      'Concierge',
      'Valet parking',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q1/2025',
    developer: 'Mandarin Oriental',
    description:
      "Sophisticated urban living in Manila's premier business district with Mandarin Oriental service.",
    highlights: [
      'Makati CBD location',
      'Mandarin Oriental brand',
      'Business district access',
    ],
  },
  {
    id: 8,
    name: 'The St. Regis Residences',
    location: 'Bangkok, Thailand',
    country: 'thailand',
    type: 'Ultra-luxury Residence',
    price: 'From $1.2M',
    priceValue: 1200000,
    bedrooms: '2-4 bedrooms',
    area: '100-250 sqm',
    features: [
      'St. Regis service',
      'Chao Phraya view',
      'Butler service',
      'Spa',
      'Rooftop bar',
      'Private dining',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q4/2024',
    developer: 'St. Regis',
    description:
      "Unparalleled luxury on the Chao Phraya River with St. Regis's legendary butler service.",
    highlights: [
      'Chao Phraya riverfront',
      'St. Regis butler service',
      'Ultra-luxury amenities',
    ],
  },
  {
    id: 9,
    name: 'Four Seasons Private Residences',
    location: 'Kuala Lumpur, Malaysia',
    country: 'malaysia',
    type: 'Private Residence',
    price: 'From $950K',
    priceValue: 950000,
    bedrooms: '2-5 bedrooms',
    area: '120-300 sqm',
    features: [
      'Four Seasons service',
      'KLCC proximity',
      'Private amenities',
      'Concierge',
      'Spa',
      'Fine dining',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q3/2025',
    developer: 'Four Seasons',
    description:
      "Exclusive private residences with Four Seasons' world-renowned hospitality and service.",
    highlights: [
      'Four Seasons brand',
      'Private residence exclusivity',
      'KLCC vicinity',
    ],
  },
  {
    id: 10,
    name: 'Shangri-La Residences',
    location: 'Singapore',
    country: 'singapore',
    type: 'Luxury Apartment',
    price: 'From $2.2M',
    priceValue: 2200000,
    bedrooms: '2-4 bedrooms',
    area: '110-220 sqm',
    features: [
      'Shangri-La service',
      'Garden city view',
      'Spa access',
      'Fine dining',
      'Concierge',
      'Pool deck',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q1/2025',
    developer: 'Shangri-La',
    description:
      "Luxury living with Shangri-La's Asian hospitality in Singapore's garden city environment.",
    highlights: [
      'Shangri-La hospitality',
      'Garden city setting',
      'Premium location',
    ],
  },
  {
    id: 11,
    name: 'Park Hyatt Residences',
    location: 'Ho Chi Minh City, Vietnam',
    country: 'vietnam',
    type: 'Luxury Residence',
    price: 'From $580K',
    priceValue: 580000,
    bedrooms: '1-3 bedrooms',
    area: '80-150 sqm',
    features: [
      'Park Hyatt service',
      'Saigon River view',
      'Spa access',
      'Fine dining',
      'Butler service',
      'Valet',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q2/2025',
    developer: 'Park Hyatt',
    description:
      "Sophisticated residences with Park Hyatt's understated luxury overlooking the Saigon River.",
    highlights: [
      'Park Hyatt elegance',
      'Saigon River views',
      'District 1 location',
    ],
  },
  {
    id: 12,
    name: 'W Residences',
    location: 'Dubai, UAE',
    country: 'uae',
    type: 'Contemporary Residence',
    price: 'From $1.8M',
    priceValue: 1800000,
    bedrooms: '1-4 bedrooms',
    area: '90-200 sqm',
    features: [
      'W lifestyle',
      'Dubai Marina',
      'Beach access',
      'Nightlife',
      'Spa',
      'Rooftop pool',
    ],
    image: '/placeholder-2.webp?height=300&width=400',
    status: 'Selling',
    completion: 'Q4/2024',
    developer: 'W Hotels',
    description:
      "Bold contemporary living with W's signature style and energy in Dubai Marina.",
    highlights: [
      'W brand lifestyle',
      'Dubai Marina location',
      'Beach and nightlife access',
    ],
  },
];

const countries = [
  { value: 'all', label: 'All Countries' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'vietnam', label: 'Vietnam' },
  { value: 'uae', label: 'UAE' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'philippines', label: 'Philippines' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'under500k', label: 'Under $500K' },
  { value: '500kto1m', label: '$500K - $1M' },
  { value: '1mto3m', label: '$1M - $3M' },
  { value: 'above3m', label: 'Above $3M' },
];

const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'residence', label: 'Residence' },
  { value: 'resort', label: 'Resort' },
  { value: 'mixed', label: 'Mixed-use' },
];

export default function InternationalPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedPriceRange, setPriceRange] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 9;

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry =
        selectedCountry === 'all' || property.country === selectedCountry;

      const matchesPrice =
        selectedPriceRange === 'all' ||
        (() => {
          switch (selectedPriceRange) {
            case 'under500k':
              return property.priceValue < 500000;
            case '500kto1m':
              return (
                property.priceValue >= 500000 && property.priceValue < 1000000
              );
            case '1mto3m':
              return (
                property.priceValue >= 1000000 && property.priceValue < 3000000
              );
            case 'above3m':
              return property.priceValue >= 3000000;
            default:
              return true;
          }
        })();

      const matchesType =
        selectedType === 'all' ||
        (() => {
          switch (selectedType) {
            case 'apartment':
              return property.type.toLowerCase().includes('apartment');
            case 'residence':
              return property.type.toLowerCase().includes('residence');
            case 'resort':
              return property.type.toLowerCase().includes('resort');
            case 'mixed':
              return property.type.toLowerCase().includes('mixed');
            default:
              return true;
          }
        })();

      return matchesSearch && matchesCountry && matchesPrice && matchesType;
    });
  }, [searchTerm, selectedCountry, selectedPriceRange, selectedType]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay về trang chủ
              </Link>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <Globe className="w-3 h-3 mr-1" />
                BẤT ĐỘNG SẢN QUỐC TẾ
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bất Động Sản Quốc Tế
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Khám phá các cơ hội đầu tư bất động sản cao cấp tại khu vực Châu Á
              - Thái Bình Dương với tiện ích đẳng cấp, vị trí đắc địa và tiềm
              năng sinh lời vượt trội.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="bg-white dark:bg-card rounded-lg p-6 shadow-sm">
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
                  className="grid md:grid-cols-3 gap-4 pt-4 border-t"
                >
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Quốc gia
                    </label>
                    <Select
                      value={selectedCountry}
                      onValueChange={setSelectedCountry}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label === 'All Countries'
                              ? 'Tất cả quốc gia'
                              : country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                            {range.label === 'All Prices'
                              ? 'Tất cả mức giá'
                              : range.label === 'Under $500K'
                                ? 'Dưới $500K'
                                : range.label === '$500K - $1M'
                                  ? '$500K - $1M'
                                  : range.label === '$1M - $3M'
                                    ? '$1M - $3M'
                                    : range.label === 'Above $3M'
                                      ? 'Trên $3M'
                                      : range.label}
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
                            {type.label === 'All Types'
                              ? 'Tất cả loại hình'
                              : type.label === 'Apartment'
                                ? 'Căn hộ'
                                : type.label === 'Residence'
                                  ? 'Nhà ở'
                                  : type.label === 'Resort'
                                    ? 'Khu nghỉ dưỡng'
                                    : type.label === 'Mixed-use'
                                      ? 'Phức hợp'
                                      : type.label}
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
                  trên tổng số {filteredProperties.length} bất động sản
                </span>
                {(searchTerm ||
                  selectedCountry !== 'all' ||
                  selectedPriceRange !== 'all' ||
                  selectedType !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCountry('all');
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

      {/* Properties Grid - 3 Columns */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {paginatedProperties.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedProperties.map((property, index) => (
                  <ScaleIn key={property.id} delay={index * 0.1}>
                    <motion.div whileHover={{ y: -10 }} className="h-full">
                      <Card className="overflow-hidden h-full flex flex-col">
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
                            <Badge className="bg-white/90 text-gray-900 flex items-center">
                              <Globe className="w-3 h-3 mr-1" />
                              {property.location.split(', ')[1] ||
                                property.location}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge
                              variant={
                                property.status === 'Selling'
                                  ? 'default'
                                  : 'secondary'
                              }
                              className={
                                property.status === 'Selling'
                                  ? 'bg-green-600'
                                  : ''
                              }
                            >
                              {property.status === 'Selling'
                                ? 'Đang mở bán'
                                : property.status}
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

                        <CardContent className="flex-1">
                          <div className="space-y-4 flex flex-col h-full">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {property.description}
                            </p>

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
                                  Số phòng ngủ:
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
                                Điểm nổi bật:
                              </h4>
                              <div className="grid grid-cols-1 gap-1">
                                {property.highlights
                                  .slice(0, 3)
                                  .map((highlight, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center text-xs text-muted-foreground"
                                    >
                                      <Award className="w-3 h-3 mr-1 text-blue-600 flex-shrink-0" />
                                      {highlight}
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <div className="flex-1">
                              <h4 className="font-semibold mb-2 text-sm">
                                Tiện ích nổi bật:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {property.features
                                  .slice(0, 4)
                                  .map((feature, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Link
                                  href={`/products/international/${property.id}`}
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
                                  <Plane className="w-3 h-3 mr-1" />
                                  Tư vấn
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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={clsx(
                              'w-10 transition-colors duration-200',
                              currentPage === page
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-800/50'
                            )}
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Tiếp
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
                Không tìm thấy bất động sản nào
              </h3>
              <p className="text-muted-foreground mb-4">
                Vui lòng thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('all');
                  setPriceRange('all');
                  setSelectedType('all');
                  setCurrentPage(1);
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng đầu tư quốc tế?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Liên hệ chuyên gia bất động sản quốc tế của chúng tôi để được tư
              vấn và hỗ trợ tận tâm về các cơ hội đầu tư nước ngoài.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Plane className="w-4 h-4 mr-2" />
                Đặt lịch tư vấn quốc tế
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
