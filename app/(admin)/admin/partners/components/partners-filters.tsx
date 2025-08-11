'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Search, X, ArrowUpDown } from 'lucide-react';

interface PartnersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    partnershipYear: string[];
    partnerType: string[];
    specialty: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  onFiltersChange: (filters: any) => void;
  activeTab: string;
}

export function PartnersFilters({
  searchTerm,
  setSearchTerm,
  filters,
  onFiltersChange,
  activeTab,
}: PartnersFiltersProps) {
  // Filter options based on active tab
  const getFilterOptions = () => {
    switch (activeTab) {
      case 'developer':
        return {
          partnerTypes: [
            'Chủ đầu tư cao cấp',
            'Tập đoàn đa ngành',
            'Tập đoàn bất động sản',
            'Tập đoàn du lịch - BĐS',
          ],
          specialties: [
            'Luxury',
            'Mixed-use',
            'Residential',
            'Smart City',
            'Eco-friendly',
            'Resort',
            'Urban',
            'Commercial',
            'Tourism',
            'Entertainment',
            'Affordable Housing',
          ],
          sortOptions: [
            { value: 'name', label: 'Tên đối tác' },
            { value: 'projects', label: 'Số dự án' },
            { value: 'revenue', label: 'Doanh thu' },
            { value: 'partnership', label: 'Năm hợp tác' },
          ],
        };
      case 'international':
        return {
          partnerTypes: [
            'Mạng lưới BĐS quốc tế',
            'Tập đoàn BĐS Singapore',
            'Công ty dịch vụ BĐS toàn cầu',
            'Công ty tư vấn BĐS quốc tế',
          ],
          specialties: [
            'Cross-border investment',
            'Global marketing',
            'International listings',
            'Commercial',
            'Retail',
            'Commercial Services',
            'Investment',
            'Property Management',
            'Luxury Properties',
            'Investment Advisory',
            'Research',
          ],
          sortOptions: [
            { value: 'name', label: 'Tên đối tác' },
            { value: 'countries', label: 'Số quốc gia' },
            { value: 'agents', label: 'Số đại lý' },
            { value: 'partnership', label: 'Năm hợp tác' },
          ],
        };
      case 'bank':
        return {
          partnerTypes: [
            'Ngân hàng TMCP Ngoại thương Việt Nam',
            'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
            'Ngân hàng TMCP Công thương Việt Nam',
            'Ngân hàng TMCP Kỹ thương Việt Nam',
            'Ngân hàng TMCP Á Châu',
            'Ngân hàng TMCP Quân đội',
          ],
          specialties: [
            'Lãi suất ưu đãi',
            'Thủ tục rõ ràng',
            'Hỗ trợ 24/7',
            'Quy trình nhanh',
            'Tư vấn chuyên nghiệp',
            'Ưu đãi khách hàng VIP',
            'Mạng lưới rộng',
            'Dịch vụ đa dạng',
            'Ưu đãi doanh nghiệp',
            'Công nghệ hiện đại',
            'Xử lý nhanh',
            'Dịch vụ online',
          ],
          sortOptions: [
            { value: 'name', label: 'Tên ngân hàng' },
            { value: 'loanRate', label: 'Lãi suất' },
            { value: 'maxLoan', label: 'Tỷ lệ vay' },
            { value: 'partnership', label: 'Năm hợp tác' },
          ],
        };
      default:
        return { partnerTypes: [], specialties: [], sortOptions: [] };
    }
  };

  const filterOptions = getFilterOptions();

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      partnershipYear: [],
      partnerType: [],
      specialty: [],
      sortBy: 'name',
      sortOrder: 'asc' as const,
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    return (
      filters.partnershipYear.length +
      filters.partnerType.length +
      filters.specialty.length +
      (filters.sortBy !== 'name' ? 1 : 0)
    );
  };

  const removeFilter = (type: string, value: string) => {
    const currentArray = filters[type as keyof typeof filters] as string[];
    const newArray = currentArray.filter((item) => item !== value);
    handleFilterChange(type, newArray);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search and Quick Actions */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm đối tác..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Sort */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange('sortBy', value)}
            >
              <SelectTrigger className="w-[180px] border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleFilterChange(
                  'sortOrder',
                  filters.sortOrder === 'asc' ? 'desc' : 'asc'
                )
              }
              className="border-gray-200 hover:bg-orange-50 hover:border-orange-300"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </Button>

            {/* Clear Filters */}
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Xóa bộ lọc
              </Button>
            )}
          </div>

          {/* Active Filters Tags */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.partnershipYear.map((year) => (
                <Badge
                  key={`year-${year}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  Năm {year}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter('partnershipYear', year)}
                  />
                </Badge>
              ))}
              {filters.partnerType.map((type) => (
                <Badge
                  key={`type-${type}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {type}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter('partnerType', type)}
                  />
                </Badge>
              ))}
              {filters.specialty.map((specialty) => (
                <Badge
                  key={`specialty-${specialty}`}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {specialty}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter('specialty', specialty)}
                  />
                </Badge>
              ))}
              {filters.sortBy !== 'name' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Sắp xếp:{' '}
                  {
                    filterOptions.sortOptions.find(
                      (opt) => opt.value === filters.sortBy
                    )?.label
                  }
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleFilterChange('sortBy', 'name')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
