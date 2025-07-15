'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PropertyFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  getFilterOptions: (category: string) => any;
  activeTab: string;
}

export function PropertyFilters({
  filters,
  onFiltersChange,
  getFilterOptions,
  activeTab,
}: PropertyFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      city: '',
      district: '',
      type: '',
      status: '',
      priceRange: '',
      areaRange: '',
      bedrooms: '',
      developer: '',
      completion: '',
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => value && value !== '')
      .length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Bộ lọc</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </div>
          {getActiveFiltersCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Xóa bộ lọc
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm dự án..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Basic Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <Select
              value={filters.city || 'all'}
              onValueChange={(value) => handleFilterChange('city', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {getFilterOptions(activeTab).cities.map((city: any) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.type || 'all'}
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Loại hình" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {getFilterOptions(activeTab).propertyTypes.map((type: any) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="archived">Đã lưu trữ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={filters.bedrooms || 'all'}
              onValueChange={(value) => handleFilterChange('bedrooms', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Phòng ngủ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="1">1 phòng</SelectItem>
                <SelectItem value="2">2 phòng</SelectItem>
                <SelectItem value="3">3 phòng</SelectItem>
                <SelectItem value="4+">4+ phòng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              Bộ lọc nâng cao
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <Select
                  value={filters.district || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('district', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Quận/Huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {getFilterOptions(activeTab)
                      .districts.filter(
                        (district: any) =>
                          !filters.city || district.city === filters.city
                      )
                      .map((district: any) => (
                        <SelectItem key={district.value} value={district.value}>
                          {district.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={filters.priceRange || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('priceRange', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Khoảng giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="under-2">Dưới 2 tỷ</SelectItem>
                    <SelectItem value="2-5">2-5 tỷ</SelectItem>
                    <SelectItem value="5-10">5-10 tỷ</SelectItem>
                    <SelectItem value="over-10">Trên 10 tỷ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select
                  value={filters.areaRange || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('areaRange', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Diện tích" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="under-50">Dưới 50m²</SelectItem>
                    <SelectItem value="50-80">50-80m²</SelectItem>
                    <SelectItem value="80-120">80-120m²</SelectItem>
                    <SelectItem value="over-120">Trên 120m²</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  placeholder="Chủ đầu tư"
                  value={filters.developer}
                  onChange={(e) =>
                    handleFilterChange('developer', e.target.value)
                  }
                />
              </div>

              <div>
                <Select
                  value={filters.completion || 'all'}
                  onValueChange={(value) =>
                    handleFilterChange('completion', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bàn giao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || value === '') return null;
              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <span className="capitalize">
                    {key}: {value}
                  </span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={() => handleFilterChange(key, '')}
                  />
                </Badge>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
