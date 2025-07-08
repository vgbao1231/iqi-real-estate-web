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
  ChevronDown,
  Filter,
  Bath,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Combobox } from '@/components/ui/combobox';
import { useGetProvinces } from '@/hooks/use-get-provinces';
import { AreaFilter } from '@/components/ui/area-filter';
import { PriceFilter } from '@/components/ui/price-filter';

// Properties data
const properties = [
  {
    id: 1,
    name: 'Vinhomes Grand Park',
    location: 'TP.Thủ Đức, TP.HCM',
    city: 'thanh_pho_ho_chi_minh',
    district: 'thanh_pho_thu_duc',
    address: 'Nguyễn Xiển, Long Thạnh Mỹ, TP.Thủ Đức, TP.HCM',
    price: 'Từ 3.2 tỷ',
    priceValue: 3200000000,
    pricePerSqm: '45 triệu/m²',
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    type: 'Căn hộ cao cấp',
    status: 'ready',
    developer: 'Vingroup',
    rating: 4.8,
    reviews: 234,
    images: ['/placeholder-2.webp'],
    features: ['Công viên 36ha', 'Trường học liên cấp', 'Bệnh viện Vinmec'],
    description:
      'Khu đô thị sinh thái thông minh với không gian xanh rộng lớn, tiện ích đầy đủ và vị trí thuận lợi.',
    agent: {
      name: 'Nguyễn Văn An',
      phone: '0901 234 567',
      email: 'an.nguyen@iqi.com',
      avatar: '/placeholder-2.webp',
    },
  },
  {
    id: 2,
    name: 'The Empire Vinhomes Ocean Park 2',
    location: 'Gia Lâm, Hà Nội',
    city: 'thanh_pho_ha_noi',
    district: 'huyen_gia_lam',
    address: 'Lý Thánh Tông, Gia Lâm, Hà Nội',
    price: 'Từ 4.0 tỷ',
    priceValue: 4000000000,
    pricePerSqm: '50 triệu/m²',
    bedrooms: 4,
    bathrooms: 3,
    area: 120,
    type: 'Biệt thự',
    status: 'handover',
    developer: 'Vingroup',
    rating: 4.7,
    reviews: 198,
    images: ['/placeholder-2.webp'],
    features: ['Biển hồ nhân tạo', 'Công viên nước', 'Tổ hợp tiện ích'],
    description:
      'Tổ hợp đô thị biển hồ cao cấp với không gian sống xanh và chuỗi tiện ích đẳng cấp quốc tế.',
    agent: {
      name: 'Trần Thị Bình',
      phone: '0902 345 678',
      email: 'binh.tran@iqi.com',
      avatar: '/placeholder-2.webp',
    },
  },
  {
    id: 3,
    name: 'Sun Grand City An Thới',
    location: 'Phú Quốc, Kiên Giang',
    city: 'tinh_kien_giang',
    district: 'thanh_pho_phu_quoc',
    address: 'Thị trấn An Thới, Phú Quốc, Kiên Giang',
    price: 'Từ 6.5 tỷ',
    priceValue: 6500000000,
    pricePerSqm: '70 triệu/m²',
    bedrooms: 3,
    bathrooms: 3,
    area: 90,
    type: 'Shophouse',
    status: 'selling',
    developer: 'Sun Group',
    rating: 4.9,
    reviews: 145,
    images: ['/placeholder-2.webp'],
    features: ['Phố thương mại', 'Gần biển', 'Hạ tầng đồng bộ'],
    description:
      'Khu phố thương mại hiện đại, vị trí đắc địa gần biển, tiềm năng khai thác kinh doanh du lịch.',
    agent: {
      name: 'Lê Minh Châu',
      phone: '0903 456 789',
      email: 'chau.le@iqi.com',
      avatar: '/placeholder-2.webp',
    },
  },
  {
    id: 4,
    name: 'Eco Green Saigon',
    location: 'Quận 7, TP.HCM',
    city: 'thanh_pho_ho_chi_minh',
    district: 'quan_7',
    address: 'Nguyễn Văn Linh, Quận 7, TP.HCM',
    price: 'Từ 3.5 tỷ',
    priceValue: 3500000000,
    pricePerSqm: '48 triệu/m²',
    bedrooms: 2,
    bathrooms: 2,
    area: 80,
    type: 'Căn hộ cao cấp',
    status: 'ready',
    developer: 'Xuân Mai Corp',
    rating: 4.6,
    reviews: 176,
    images: ['/placeholder-2.webp'],
    features: ['Công viên nội khu', 'Trung tâm thương mại', 'Hồ bơi'],
    description:
      'Dự án cao cấp với thiết kế xanh, nằm gần trung tâm và kết nối thuận tiện đến các quận lân cận.',
    agent: {
      name: 'Phạm Văn Đức',
      phone: '0904 567 890',
      email: 'duc.pham@iqi.com',
      avatar: '/placeholder-2.webp',
    },
  },
  {
    id: 5,
    name: 'Lạc Hồng Lotus',
    location: 'TP.Bắc Ninh, Bắc Ninh',
    city: 'tinh_bac_ninh',
    district: 'thanh_pho_bac_ninh',
    address: 'Phường Võ Cường, TP.Bắc Ninh, Bắc Ninh',
    price: 'Từ 1.9 tỷ',
    priceValue: 1900000000,
    pricePerSqm: '30 triệu/m²',
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    type: 'Căn hộ',
    status: 'upcoming',
    developer: 'Lạc Hồng Group',
    rating: 4.3,
    reviews: 89,
    images: ['/placeholder-2.webp'],
    features: ['Gần khu công nghiệp', 'Trường học', 'Chợ dân sinh'],
    description:
      'Dự án hướng đến cư dân trẻ làm việc tại các khu công nghiệp Bắc Ninh với giá hợp lý và tiện ích đầy đủ.',
    agent: {
      name: 'Đào Ngọc Minh',
      phone: '0912 456 789',
      email: 'minh.dao@iqi.com',
      avatar: '/placeholder-2.webp',
    },
  },
];

export default function VietnamPropertiesPage() {
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
  const { data = [] } = useGetProvinces();

  // Provinces and districts data
  const provinces = [
    { value: 'all', label: 'Tất cả thành phố' },
    ...data.map((p: { codename: string; name: string }) => ({
      value: p.codename,
      label: p.name,
    })),
  ];

  const districts = {
    all: [{ value: 'all', label: 'Tất cả khu vực' }],
    ...Object.fromEntries(
      data.map(
        (p: {
          codename: string;
          name: string;
          districts: { codename: string; name: string }[];
        }) => [
          p.codename,
          [
            { value: 'all', label: 'Tất cả quận/huyện' },
            ...p.districts.map((d: { codename: string; name: string }) => ({
              value: d.codename,
              label: d.name,
            })),
          ],
        ]
      )
    ),
  };

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

      const matchesCity =
        selectedCity === 'all' || property.city === selectedCity;
      const matchesDistrict =
        selectedDistrict === 'all' || property.district === selectedDistrict;

      const matchesPrice =
        (!priceFrom ||
          property.priceValue >= Number.parseFloat(priceFrom) * 1000000000) &&
        (!priceTo ||
          property.priceValue <= Number.parseFloat(priceTo) * 1000000000);

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

      return (
        matchesSearch &&
        matchesCity &&
        matchesDistrict &&
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
    selectedCity,
    selectedDistrict,
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
      <section className="py-12 bg-gradient-to-r from-orange-400 to-orange-600 text-white">
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

      {/* Search and Filter */}
      <section className="py-10 px-6">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="bg-card rounded-lg shadow-sm">
              {/* Basic Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div>
                  <Combobox
                    options={provinces}
                    value={selectedCity}
                    onValueChange={handleCityChange}
                    placeholder="Chọn thành phố"
                    searchPlaceholder="Tìm thành phố..."
                    emptyText="Không tìm thấy thành phố"
                  />
                </div>
                <div>
                  <Combobox
                    options={
                      districts[selectedCity as keyof typeof districts] ||
                      districts.all
                    }
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                    placeholder="Chọn khu vực"
                    searchPlaceholder="Tìm quận/huyện..."
                    emptyText="Không tìm thấy khu vực"
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
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
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
                      <div key={filter.label} className="flex-1 min-w-[200px]">
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
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
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
