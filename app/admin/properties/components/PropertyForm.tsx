'use client';

import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

import {
  Info,
  ClipboardList,
  Star,
  MapPin,
  LayoutGrid,
  Home,
  Handshake,
  Trash,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { BasicInfoTab } from './project-form-tabs/basic-info-tab';
import { AmenitiesTab } from './project-form-tabs/amenities-tab';
import { FloorPlansTab } from './project-form-tabs/floorplans-tab';
import { LocationTab } from './project-form-tabs/location-tab';
import { OtherTab } from './project-form-tabs/other-tab';
import { ProductsTab } from './project-form-tabs/products-tab';
import { TechnicalDetailsTab } from './project-form-tabs/technical-details-tab';

interface PropertyFormProps {
  initialData?: any | null;
  onCancel: () => void;
  onSubmitSuccess: (project: any) => void;
}

const defaultProject: any = {
  id: '',
  category: '',
  name: '',
  images: [],
  description: '',
  slug: '',
  phase: '',
  propertyType: '',
  propertyGroup: '',
  tenure: '',
  completion: '',
  technicalImage: null,
  technicalDescription: '',
  measurementUnit: 'm²',
  currency: 'VND',
  minPrice: '',
  maxPrice: '',
  landArea: '',
  minBuildUp: '',
  maxBuildUp: '',
  minBedroom: '',
  maxBedroom: '',
  minBathroom: '',
  maxBathroom: '',
  amenityClusters: [],
  features: [],
  locationImage: null,
  locationDescription: '',
  address: '',
  country: '',
  district: '',
  city: '',
  lat: '',
  lng: '',
  locationHighlights: [],
  overallFloorPlanImage: null,
  overallFloorPlanDescription: '',
  subAreaFloorPlans: [],
  products: [],
  developer: '',
  listedOn: '',
  lastUpdated: '',
  totalUnits: '',
  handoverDate: '',
  legalStatus: '',
  views: '',
  isFeatured: false,
  isExclusive: false,
  enableLiveSales: false,
  visibleOnWeb: false,
};

export function PropertyForm({
  initialData,
  onCancel,
  onSubmitSuccess,
}: PropertyFormProps) {
  const [project, setProject] = useState(initialData || defaultProject);
  const [activeTab, setActiveTab] = useState('basic-info');

  useEffect(() => {
    if (initialData) {
      setProject(initialData);
    } else {
      setProject(defaultProject);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProject((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prev: any) => ({
      ...prev,
      [name]: value === '' ? '' : Number(value),
    }));
  };

  const handleSelectChange = (name: keyof any, value: string) => {
    setProject((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (
    name: keyof any,
    files: (File | string)[] | File | string | null
  ) => {
    setProject((prev: any) => ({ ...prev, [name]: files }));
  };

  const handleDynamicArrayChange = <K extends keyof any>(
    key: K,
    index: number,
    field: string,
    value: any
  ) => {
    const currentArray = [...(project[key] as any[])];
    currentArray[index] = field
      ? { ...currentArray[index], [field]: value }
      : value;
    setProject((prev: any) => ({ ...prev, [key]: currentArray as any[K] }));
  };

  const handleAddDynamicItem = <K extends keyof any>(key: K, newItem: any) => {
    setProject((prev: any) => ({
      ...prev,
      [key]: [...((prev[key] ?? []) as any[]), newItem] as any[K],
    }));
  };

  const handleRemoveDynamicItem = <K extends keyof any>(
    key: K,
    index: number
  ) => {
    const currentArray = [...(project[key] as any[])];
    currentArray.splice(index, 1);
    setProject((prev: any) => ({ ...prev, [key]: currentArray as any[K] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting project:', project);
    toast({
      title: initialData ? 'Dự án đã được cập nhật!' : 'Dự án đã được tạo!',
      description: `Dự án "${project.name}" đã được lưu thành công.`,
    });
    onSubmitSuccess(project); // Call the success callback
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  useEffect(() => {
    if (!initialData && project.name) {
      setProject((prev: any) => ({ ...prev, slug: generateSlug(prev.name) }));
    }
  }, [project.name, initialData]);

  const categoryOptions = [
    { value: 'vietnam', label: 'Bất động sản Việt Nam' },
    { value: 'international', label: 'Bất động sản Quốc tế' },
    { value: 'resort', label: 'Bất động sản Nghỉ dưỡng' },
  ];

  const measurementUnitOptions = [
    { value: 'm²', label: 'm²' },
    { value: 'sqft', label: 'sqft' },
  ];

  const currencyOptions = [
    { value: 'VND', label: 'VND' },
    { value: 'USD', label: 'USD' },
    { value: 'SGD', label: 'SGD' },
    { value: 'MYR', label: 'MYR' },
  ];

  const commonPropertyTypes = [
    { value: 'Căn hộ', label: 'Căn hộ' },
    { value: 'Biệt thự', label: 'Biệt thự' },
    { value: 'Nhà phố', label: 'Nhà phố' },
    { value: 'Shophouse', label: 'Shophouse' },
    { value: 'Condotel', label: 'Condotel' },
    { value: 'Đất nền', label: 'Đất nền' },
  ];

  const commonPropertyGroups = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Resort', label: 'Resort' },
  ];

  const commonTenureOptions = [
    { value: 'Leasehold', label: 'Leasehold' },
    { value: 'Freehold', label: 'Freehold' },
  ];

  const commonLegalStatusOptions = [
    { value: 'Đã có sổ hồng', label: 'Đã có sổ hồng' },
    { value: 'Đang chờ sổ', label: 'Đang chờ sổ' },
    { value: 'Đã hoàn tất pháp lý', label: 'Đã hoàn tất pháp lý' },
  ];

  const commonCountries = [
    { value: 'Vietnam', label: 'Việt Nam' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Dubai', label: 'Dubai' },
  ];

  const commonCities = useMemo(() => {
    const citiesByCountry: {
      [key: string]: { value: string; label: string }[];
    } = {
      Vietnam: [
        { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Phú Quốc', label: 'Phú Quốc' },
      ],
      Singapore: [{ value: 'Singapore', label: 'Singapore' }],
      Malaysia: [{ value: 'Kuala Lumpur', label: 'Kuala Lumpur' }],
      Dubai: [{ value: 'Dubai', label: 'Dubai' }],
    };
    return citiesByCountry[project.country] || [];
  }, [project.country]);

  const commonDistricts = useMemo(() => {
    const districtsByCity: {
      [key: string]: { value: string; label: string }[];
    } = {
      'TP.HCM': [
        { value: 'Quận 1', label: 'Quận 1' },
        { value: 'Quận 2', label: 'Quận 2' },
        { value: 'Quận 7', label: 'Quận 7' },
        { value: 'Quận 9', label: 'Quận 9' },
        { value: 'Thủ Đức', label: 'Thủ Đức' },
      ],
      'Hà Nội': [
        { value: 'Ba Đình', label: 'Ba Đình' },
        { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm' },
        { value: 'Nam Từ Liêm', label: 'Nam Từ Liêm' },
      ],
    };
    return districtsByCity[project.city] || [];
  }, [project.city]);

  const compactItemWrapper = (
    children: React.ReactNode,
    idx: number,
    onRemove: () => void
  ) => (
    <div
      key={idx}
      className="relative flex items-center gap-2 rounded-md border p-2 pr-8"
    >
      <div className="flex-1">{children}</div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onRemove}
        className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-destructive hover:bg-destructive/10"
      >
        <Trash className="h-3 w-3" />
        <span className="sr-only">Xoá</span>
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {initialData
            ? `Chỉnh sửa dự án: ${initialData.name}`
            : 'Thêm dự án mới'}
        </h1>
        <Button variant="outline" onClick={onCancel}>
          Quay lại danh sách
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* ---------- TAB LIST ---------- */}
        <TabsList className="grid h-auto w-full flex-wrap grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="basic-info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Thông tin cơ bản
          </TabsTrigger>
          <TabsTrigger
            value="technical-details"
            className="flex items-center gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="amenities" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Tiện ích
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Vị trí
          </TabsTrigger>
          <TabsTrigger value="floorplans" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            Mặt bằng
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Sản phẩm
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            Khác
          </TabsTrigger>
        </TabsList>

        {/* ================================================================= */}
        {/* FORM                                                              */}
        {/* ================================================================= */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* -------------------------------------------------------------- */}
          {/* Tab 1: Thông tin cơ bản                                        */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="basic-info">
            <BasicInfoTab
              project={project}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleFileUpload={handleFileUpload}
              categoryOptions={categoryOptions}
              commonPropertyTypes={commonPropertyTypes}
              commonPropertyGroups={commonPropertyGroups}
              commonTenureOptions={commonTenureOptions}
            />
          </TabsContent>

          {/* -------------------------------------------------------------- */}
          {/* Tab 2: Tổng quan                                               */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="technical-details">
            <TechnicalDetailsTab
              project={project}
              handleChange={handleChange}
              handleNumberChange={handleNumberChange}
              handleSelectChange={handleSelectChange}
              handleFileUpload={handleFileUpload}
              handleDynamicArrayChange={handleDynamicArrayChange}
              handleAddDynamicItem={handleAddDynamicItem}
              handleRemoveDynamicItem={handleRemoveDynamicItem}
              measurementUnitOptions={measurementUnitOptions}
              currencyOptions={currencyOptions}
            />
          </TabsContent>

          {/* -------------------------------------------------------------- */}
          {/* Tab 3: Tiện ích                                                */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="amenities">
            <AmenitiesTab
              project={project}
              handleDynamicArrayChange={handleDynamicArrayChange}
              handleAddDynamicItem={handleAddDynamicItem}
              handleRemoveDynamicItem={handleRemoveDynamicItem}
              compactItemWrapper={compactItemWrapper}
            />
          </TabsContent>

          {/* -------------------------------------------------------------- */}
          {/* Tab 4: Vị trí                                                  */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="location">
            <LocationTab
              project={project}
              handleChange={handleChange}
              handleNumberChange={handleNumberChange}
              handleSelectChange={handleSelectChange}
              handleFileUpload={handleFileUpload}
              handleDynamicArrayChange={handleDynamicArrayChange}
              handleAddDynamicItem={handleAddDynamicItem}
              handleRemoveDynamicItem={handleRemoveDynamicItem}
              commonCountries={commonCountries}
              commonCities={commonCities}
              commonDistricts={commonDistricts}
            />
          </TabsContent>

          {/* -------------------------------------------------------------- */}
          {/* Tab 5: Mặt bằng                                                */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="floorplans">
            <FloorPlansTab
              project={project}
              handleChange={handleChange}
              handleFileUpload={handleFileUpload}
              handleDynamicArrayChange={handleDynamicArrayChange}
              handleAddDynamicItem={handleAddDynamicItem}
              handleRemoveDynamicItem={handleRemoveDynamicItem}
            />
          </TabsContent>

          {/* -------------------------------------------------------------- */}
          {/* Tab 6: Sản phẩm                                                */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="products">
            <ProductsTab
              project={project}
              handleDynamicArrayChange={handleDynamicArrayChange}
              handleAddDynamicItem={handleAddDynamicItem}
              handleRemoveDynamicItem={handleRemoveDynamicItem}
            />
          </TabsContent>

          {/* -------------------------------------------------------------- */}
          {/* Tab 7: Khác                                                    */}
          {/* -------------------------------------------------------------- */}
          <TabsContent value="other">
            <OtherTab
              project={project}
              handleChange={handleChange}
              handleNumberChange={handleNumberChange}
              handleSelectChange={handleSelectChange}
              commonLegalStatusOptions={commonLegalStatusOptions}
              setProject={setProject} // Pass setProject directly for checkboxes
            />
          </TabsContent>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit">
              {initialData ? 'Cập nhật dự án' : 'Tạo dự án'}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
