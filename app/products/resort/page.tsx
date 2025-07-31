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
import {
  properties,
  bedroomOptions,
  bathroomOptions,
  propertyTypes,
  statusOptions,
} from '@/lib/property-data';

export default function ResortPropertiesPage() {
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

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.overview.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.overview.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.overview.developer
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPrice =
        (!priceFrom ||
          property.overview.minPrice >=
            Number.parseFloat(priceFrom) * 1000000000) &&
        (!priceTo ||
          property.overview.maxPrice <=
            Number.parseFloat(priceTo) * 1000000000);

      const matchesArea =
        (!areaFrom ||
          property.overview.landArea >= Number.parseFloat(areaFrom)) &&
        (!areaTo || property.overview.landArea <= Number.parseFloat(areaTo));

      const matchesBedrooms =
        selectedBedrooms === 'all' ||
        (selectedBedrooms === '4+'
          ? property.overview.maxBedroom >= 4
          : property.overview.minBedroom <= Number.parseInt(selectedBedrooms) &&
            property.overview.maxBedroom >= Number.parseInt(selectedBedrooms));

      const matchesBathrooms =
        selectedBathrooms === 'all' ||
        (selectedBathrooms === '4+'
          ? property.overview.maxBathroom >= 4
          : property.overview.minBathroom <=
              Number.parseInt(selectedBathrooms) &&
            property.overview.maxBathroom >=
              Number.parseInt(selectedBathrooms));

      const matchesType =
        selectedType === 'all' ||
        property.overview.propertyType
          .toLowerCase()
          .includes(selectedType.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' ||
        (() => {
          switch (selectedStatus) {
            case 'selling':
              return property.overview.status === 'Đang bán';
            case 'ready':
              return property.overview.status === 'Sẵn sàng';
            case 'upcoming':
              return property.overview.status === 'Sắp mở bán';
            case 'handover':
              return property.overview.status === 'Sắp bàn giao';
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
      <section className="py-10 px-6 md:px-12">
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
                      className="lg:w-auto bg-background border-border hover:bg-muted-card"
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
                              <SelectTrigger className="border-border">
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
                            className="bg-background border-border hover:bg-muted-card"
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
                            className="bg-background border-border hover:bg-muted-card"
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

      <section className="py-10 px-6 md:px-12">
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
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
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
      </section>
    </div>
  );
}
