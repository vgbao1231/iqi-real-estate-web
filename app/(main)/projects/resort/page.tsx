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
import {
  bedroomOptions,
  bathroomOptions,
  projectTypes,
  statusOptions,
  projects as defaultProjects,
} from '@/lib/project-data';
import { ProjectCard } from '@/app/(main)/projects/components/ProjectCard';
import { ProjectIntroSection } from '@/app/(main)/projects/components/ProjectIntroSection';
import { useGetPublicProjectsQuery } from '@/features/project/projectApi';

const bannerData = [
  {
    id: 1,
    image: '/banner-australia.webp',
    title: 'ÚC (AUSTRALIA) - ĐẦU TƯ & ĐỊNH CƯ',
    subtitle:
      'Mở ra cánh cửa định cư tại một trong những quốc gia đáng sống nhất.',
  },
  {
    id: 2,
    image: '/banner-greece.webp',
    title: 'HY LẠP (GREECE) - KHÁM PHÁ & ĐẦU TƯ',
    subtitle: 'Đầu tư bất động sản và định cư tại đất nước của các vị thần.',
  },
  {
    id: 3,
    image: '/banner-malta.webp',
    title: 'MALTA - TỪ BẤT ĐỘNG SẢN TỚI ỔN ĐỊNH CƯ TRÚ',
    subtitle:
      'Nhận quyền cư trú tại trung tâm Địa Trung Hải qua đầu tư thông minh.',
  },
  {
    id: 4,
    image: '/banner-turkey.webp',
    title: 'THỔ NHĨ KỲ (TURKEY) - CƠ HỘI VÀNG',
    subtitle: 'Sở hữu bất động sản và passport tại cầu nối chiến lược Á - Âu.',
  },
];

const stats = [
  { value: '50+', label: 'Dự án' },
  { value: '111+', label: 'Quốc gia' },
  { value: '25+', label: 'Đối tác' },
];

export default function ResortProjectsPage() {
  const { data: projects = defaultProjects } = useGetPublicProjectsQuery();
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
  const filteredProjects = useMemo(() => {
    const getValue = (basicInfo: any, id: any) =>
      basicInfo.find((item: any) => item.id === id)?.value;

    return projects.filter((project) => {
      const basicInfo = project.overview.basicInfo;

      const name = getValue(basicInfo, 'project_name') || '';
      const address = getValue(basicInfo, 'address') || '';
      const developer = getValue(basicInfo, 'developer') || '';
      const city = getValue(basicInfo, 'city');
      const district = getValue(basicInfo, 'district');

      const [minPrice, maxPrice] = getValue(basicInfo, 'price') || [];
      const [minBedroom, maxBedroom] = getValue(basicInfo, 'bedrooms') || [];
      const [minBathroom, maxBathroom] = getValue(basicInfo, 'bathrooms') || [];
      const landArea = parseFloat(getValue(basicInfo, 'land_area')) || 0;
      const projectType = getValue(basicInfo, 'project_type') || '';

      const status = getValue(basicInfo, 'status') || '';

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = selectedCity === 'all' || city === selectedCity;
      const matchesDistrict =
        selectedDistrict === 'all' || district === selectedDistrict;

      const matchesPrice =
        (!priceFrom || minPrice >= parseFloat(priceFrom) * 1e9) &&
        (!priceTo || maxPrice <= parseFloat(priceTo) * 1e9);

      const matchesArea =
        (!areaFrom || landArea >= parseFloat(areaFrom)) &&
        (!areaTo || landArea <= parseFloat(areaTo));

      const matchesBedrooms =
        selectedBedrooms === 'all' ||
        (selectedBedrooms === '4+'
          ? maxBedroom >= 4
          : minBedroom <= parseInt(selectedBedrooms) &&
            maxBedroom >= parseInt(selectedBedrooms));

      const matchesBathrooms =
        selectedBathrooms === 'all' ||
        (selectedBathrooms === '4+'
          ? maxBathroom >= 4
          : minBathroom <= parseInt(selectedBathrooms) &&
            maxBathroom >= parseInt(selectedBathrooms));

      const matchesType =
        selectedType === 'all' ||
        projectType.toLowerCase().includes(selectedType.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' ||
        (() => {
          switch (selectedStatus) {
            case 'selling':
              return status === 'Đang bán';
            case 'ready':
              return status === 'Hoàn thành'; // Assuming 'Hoàn thành' means 'Ready'
            case 'upcoming':
              return status === 'Đang lên kế hoạch'; // Assuming 'Đang lên kế hoạch' means 'Upcoming'
            case 'handover':
              // There isn't a direct "Sắp bàn giao" status in your original list.
              // You might need to refine your `basicInfo` status options or logic here.
              // For now, I'll return true, but consider how to map this.
              return status === 'Đang xây dựng'; // Example, adjust based on your actual statuses
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
    projects,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ProjectIntroSection
        badge="Bất động sản Nghỉ Dưỡng"
        bannerData={bannerData}
        stats={stats}
      />

      <section className="bg-background relative z-20">
        {/* Search and Filter */}
        <div className="py-8 md:px-12">
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
                              options: projectTypes,
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
                                  <SelectValue
                                    placeholder={filter.placeholder}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {filter.options.map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
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
                          filteredProjects.length
                        )}{' '}
                        trong tổng số {filteredProjects.length} dự án
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
        </div>

        <div className="md:px-12">
          <div className="container mx-auto px-4 pb-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Results */}
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">
                    {filteredProjects.length} dự án được tìm thấy
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    Cập nhật: {new Date().toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </FadeIn>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
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
                            variant={
                              currentPage === page ? 'default' : 'outline'
                            }
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
      </section>
    </div>
  );
}
