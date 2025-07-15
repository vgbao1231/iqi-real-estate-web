'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import { PropertyFormDialog } from '@/components/ui/admin/property-form-dialog';
import { PropertyFilters } from '@/components/ui/admin/property-filters';
import { PropertyCard } from '@/components/ui/admin/property-card';
import { PropertyStats } from '@/components/ui/admin/property-stats';
import {
  allProperties,
  getFilterOptions,
  statusOptions,
  amenitiesList,
} from '@/lib/property-data';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Home,
  Globe,
  Waves,
} from 'lucide-react';
import { useState, useMemo } from 'react';

export default function PropertiesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('vietnam');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const itemsPerPage = 12;

  // Filter states
  const [filters, setFilters] = useState({
    city: '',
    district: '',
    propertyType: '',
    status: '',
    bedrooms: '',
    bathrooms: '',
    priceFrom: '',
    priceTo: '',
    areaFrom: '',
    areaTo: '',
    amenities: [],
  });

  // Get current properties based on active tab
  const currentProperties = useMemo(
    () => allProperties[activeTab as keyof typeof allProperties] || [],
    [activeTab]
  );

  // Filter logic
  const filteredProperties = useMemo(() => {
    return currentProperties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCity = !filters.city || property.city === filters.city;
      const matchesDistrict =
        !filters.district || property.district.includes(filters.district);
      const matchesType =
        !filters.propertyType ||
        property.type.toLowerCase().includes(filters.propertyType);
      const matchesStatus =
        !filters.status || property.status === filters.status;
      const matchesBedrooms =
        !filters.bedrooms || property.bedrooms.toString() === filters.bedrooms;
      const matchesBathrooms =
        !filters.bathrooms ||
        property.bathrooms.toString() === filters.bathrooms;

      const matchesPrice =
        (!filters.priceFrom ||
          property.priceValue >=
            Number.parseFloat(filters.priceFrom) * 1000000000) &&
        (!filters.priceTo ||
          property.priceValue <=
            Number.parseFloat(filters.priceTo) * 1000000000);

      const matchesArea =
        (!filters.areaFrom ||
          property.area >= Number.parseFloat(filters.areaFrom)) &&
        (!filters.areaTo || property.area <= Number.parseFloat(filters.areaTo));

      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity: string) =>
          property.features.includes(amenity)
        );

      return (
        matchesSearch &&
        matchesCity &&
        matchesDistrict &&
        matchesType &&
        matchesStatus &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesPrice &&
        matchesArea &&
        matchesAmenities
      );
    });
  }, [currentProperties, searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      district: '',
      propertyType: '',
      status: '',
      bedrooms: '',
      bathrooms: '',
      priceFrom: '',
      priceTo: '',
      areaFrom: '',
      areaTo: '',
      amenities: [],
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  const handleEditProperty = (property: any) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProperty = (property: any) => {
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${property.name}"?`)) {
      // Delete logic here
      console.log('Deleting property:', property.id);
      alert('Đã xóa dự án thành công!');
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'vietnam':
        return <Home className="w-4 h-4" />;
      case 'international':
        return <Globe className="w-4 h-4" />;
      case 'resort':
        return <Waves className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quản lý dự án</h1>
            <p className="text-muted-foreground">
              Quản lý tất cả dự án bất động sản theo danh mục
            </p>
          </div>
          <Button
            onClick={() => {
              setIsAddDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm dự án mới
          </Button>
        </div>
      </FadeIn>

      {/* Category Tabs */}
      <FadeIn delay={0.1}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vietnam" className="flex items-center gap-2">
              {getTabIcon('vietnam')}
              <span>BĐS Việt Nam</span>
              <Badge variant="secondary">
                {allProperties.vietnam?.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="international"
              className="flex items-center gap-2"
            >
              {getTabIcon('international')}
              <span>BĐS Quốc tế</span>
              <Badge variant="secondary">
                {allProperties.international?.length || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resort" className="flex items-center gap-2">
              {getTabIcon('resort')}
              <span>BĐS Nghỉ dưỡng</span>
              <Badge variant="secondary">
                {allProperties.resort?.length || 0}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Stats Cards */}
          <div className="mt-6">
            <PropertyStats
              currentProperties={currentProperties}
              activeTab={activeTab}
            />
          </div>

          {/* Search and Filters */}
          <div className="mt-6">
            <PropertyFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              handleFilterChange={handleFilterChange}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              filteredPropertiesCount={filteredProperties.length}
              activeTab={activeTab}
              getFilterOptions={getFilterOptions}
              statusOptions={statusOptions}
              amenitiesList={amenitiesList}
            />
          </div>

          {/* Properties Grid */}
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProperties.map((property, index) => (
                <ScaleIn key={property.id} delay={index * 0.05}>
                  <PropertyCard
                    property={property}
                    onEdit={handleEditProperty}
                    onDelete={handleDeleteProperty}
                  />
                </ScaleIn>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <FadeIn delay={0.4}>
                <div className="flex items-center justify-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Trang {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </FadeIn>
            )}
          </TabsContent>
        </Tabs>
      </FadeIn>

      {/* Add Property Dialog */}
      <PropertyFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Thêm dự án mới"
        activeTab={activeTab}
        getFilterOptions={getFilterOptions}
      />

      {/* Edit Property Dialog */}
      <PropertyFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Chỉnh sửa dự án"
        property={selectedProperty}
        activeTab={activeTab}
        getFilterOptions={getFilterOptions}
      />
    </div>
  );
}
