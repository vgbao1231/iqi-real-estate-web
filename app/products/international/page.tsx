'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FadeIn } from '@/components/common/animations';
import { Search, ChevronDown, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaFilter } from '@/components/ui/area-filter';
import { PriceFilter } from '@/components/ui/price-filter';
import { PropertyCard } from './components/PropertyCard';
import { Header } from './components/Header';

const properties = [
  {
    id: 1,
    name: 'The Beverly Hills Residences',
    slug: 'beverly-hills-residences',
    country: 'USA',
    address: '123 Rodeo Drive, Beverly Hills, CA 90210',
    city: 'Los Angeles',
    district: 'Beverly Hills',
    price: 4500000,
    pricePerSqm: 12000,
    currency: 'USD',
    minPrice: 4500000,
    maxPrice: 9800000,
    landArea: 250,
    minBuildUp: 15,
    maxBuildUp: 30,
    minBedroom: 3,
    maxBedroom: 6,
    minBathroom: 3,
    maxBathroom: 5,
    propertyType: 'villa',
    propertyGroup: 'international',
    status: 'Available',
    occupancyStatus: 'Ready',
    tenure: 'Freehold',
    phase: 'Phase 1',
    isFeatured: true,
    isExclusive: false,
    enableLiveSales: true,
    visibleOnWeb: true,
    image: '/placeholder-2.webp?height=300&width=400',
    images: [
      '/placeholder-2.webp?height=300&width=400',
      '/placeholder-2.webp?height=300&width=400',
      '/placeholder-2.webp?height=300&width=400',
    ],
    developer: 'Sunset Global Properties',
    completion: 'Q1/2025',
    listedOn: '2024-01-15',
    amenities: [
      'Infinity pool',
      'Private cinema',
      'Home gym',
      'Wine cellar',
      '24/7 security',
    ],
    features: [
      'Panoramic city views',
      'Smart home automation',
      'Luxury interior design',
    ],
    description:
      'A prestigious villa project in the heart of Beverly Hills, offering unmatched luxury and privacy.',
    views: 2341,
    coordinates: { lat: 34.0736, lng: -118.4004 },
    measurementUnit: 'sqm',
    createdAt: '12/01/2025',
    updatedAt: '12/07/2025',
    createdBy: 'admin',
  },
  {
    id: 2,
    name: 'Marina Bay Residences',
    slug: 'marina-bay-residences',
    country: 'Singapore',
    address: '8 Marina Boulevard, Singapore 018981',
    city: 'Singapore',
    district: 'Marina Bay',
    price: 3000000,
    pricePerSqm: 15000,
    currency: 'USD',
    minPrice: 3000000,
    maxPrice: 7200000,
    landArea: 150,
    minBuildUp: 10,
    maxBuildUp: 40,
    minBedroom: 2,
    maxBedroom: 4,
    minBathroom: 2,
    maxBathroom: 3,
    propertyType: 'apartment',
    propertyGroup: 'international',
    status: 'Available',
    occupancyStatus: 'Ready',
    tenure: 'Leasehold (99 years)',
    phase: 'Phase 2',
    isFeatured: true,
    isExclusive: true,
    enableLiveSales: true,
    visibleOnWeb: true,
    image: '/placeholder-2.webp?height=300&width=400',
    images: [
      '/placeholder-2.webp?height=300&width=400',
      '/placeholder-2.webp?height=300&width=400',
    ],
    developer: 'CapitaLand',
    completion: 'Q3/2024',
    listedOn: '2024-02-10',
    amenities: [
      'Sky garden',
      'Infinity pool',
      'Jacuzzi',
      'Gym & Yoga studio',
      'Concierge service',
    ],
    features: [
      'Iconic Marina Bay view',
      'Integrated smart home',
      'Direct MRT access',
    ],
    description:
      'Luxury high-rise apartments overlooking Marina Bay, with state-of-the-art facilities and central location.',
    views: 1876,
    coordinates: { lat: 1.2801, lng: 103.8545 },
    measurementUnit: 'sqm',
    createdAt: '12/01/2025',
    updatedAt: '12/07/2025',
    createdBy: 'admin',
  },
  {
    id: 3,
    name: 'Canary Wharf Riverside',
    slug: 'canary-wharf-riverside',
    country: 'USA',
    address: '20 Water Street, London E14 5GX, United Kingdom',
    city: 'London',
    district: 'Canary Wharf',
    price: 3900000,
    pricePerSqm: 11000,
    currency: 'USD',
    minPrice: 3900000,
    maxPrice: 12000000,
    landArea: 180,
    minBuildUp: 12,
    maxBuildUp: 35,
    minBedroom: 2,
    maxBedroom: 5,
    minBathroom: 2,
    maxBathroom: 4,
    propertyType: 'penthouse',
    propertyGroup: 'international',
    status: 'On Sale',
    occupancyStatus: 'Under Construction',
    tenure: 'Leasehold (999 years)',
    phase: 'Phase 3',
    isFeatured: false,
    isExclusive: true,
    enableLiveSales: false,
    visibleOnWeb: true,
    image: '/placeholder-2.webp?height=300&width=400',
    images: ['/placeholder-2.webp?height=300&width=400'],
    developer: 'Berkeley Group',
    completion: 'Q2/2025',
    listedOn: '2024-03-05',
    amenities: [
      'Riverfront promenade',
      'Sky lounge',
      'Underground parking',
      'Business center',
      'Private cinema',
    ],
    features: [
      'Thames river view',
      'Smart access system',
      '5-star concierge service',
    ],
    description:
      'Exclusive penthouses along the River Thames, blending elegant British design with modern conveniences.',
    views: 3421,
    coordinates: { lat: 51.5054, lng: -0.0235 },
    measurementUnit: 'sqm',
    createdAt: '12/01/2025',
    updatedAt: '12/07/2025',
    createdBy: 'admin',
  },
];

export default function InternationalPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
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
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        (!priceFrom ||
          property.minPrice >= Number.parseFloat(priceFrom) * 1000000000) &&
        (!priceTo ||
          property.maxPrice <= Number.parseFloat(priceTo) * 1000000000);

      const matchesArea =
        (!areaFrom || property.landArea >= Number.parseFloat(areaFrom)) &&
        (!areaTo || property.landArea <= Number.parseFloat(areaTo));

      const matchesBedrooms =
        selectedBedrooms === 'all' ||
        (selectedBedrooms === '4+'
          ? property.maxBedroom >= 4
          : property.minBedroom <= Number.parseInt(selectedBedrooms) &&
            property.maxBedroom >= Number.parseInt(selectedBedrooms));

      const matchesBathrooms =
        selectedBathrooms === 'all' ||
        (selectedBathrooms === '4+'
          ? property.maxBathroom >= 4
          : property.minBathroom <= Number.parseInt(selectedBathrooms) &&
            property.maxBathroom >= Number.parseInt(selectedBathrooms));

      const matchesType =
        selectedType === 'all' ||
        property.propertyType
          .toLowerCase()
          .includes(selectedType.toLowerCase());

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
    priceFrom,
    priceTo,
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

  // Reset district when city changes
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict('all');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header filteredProperties={filteredProperties} />

      {/* Search and Filter */}
      <section className="py-10 px-6">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Card className="border-border shadow-lg mb-6">
              <CardContent className="p-6">
                <div className="bg-card rounded-lg shadow-sm">
                  {/* Basic Filters */}
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
                        <div className="flex-1 min-w-[200px]">
                          <label className="text-sm font-medium mb-2 block">
                            Khoảng giá
                          </label>
                          <PriceFilter
                            fromValue={priceFrom}
                            toValue={priceTo}
                            onFromChange={setPriceFrom}
                            onToChange={setPriceTo}
                            unit="tỷ VNĐ"
                          />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                          <label className="text-sm font-medium mb-2 block">
                            Khoảng diện tích
                          </label>
                          <AreaFilter
                            fromValue={areaFrom}
                            toValue={areaTo}
                            onFromChange={setAreaFrom}
                            onToChange={setAreaTo}
                            unit="m²"
                          />
                        </div>
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
                      priceFrom ||
                      priceTo ||
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
                          setPriceFrom('');
                          setPriceTo('');
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

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn delay={0.3}>
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-12 px-6"
                  >
                    Trước
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className="h-12 w-12"
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="h-12 px-6"
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
