'use client';
import { useCallback, useState } from 'react';

export interface ProductItem {
  id: string;
  name: string;
  image: string | File | null; // Updated type
  description: string; // HTML string for RichTextEditor
}

export interface KeyValuePair {
  id: string; // Added for DND
  key: string;
  value: string | number | [number | string, number | string]; // Updated to support array for range
  type?: 'text' | 'number' | 'select' | 'range'; // Added "range" type
  options?: string[];
}

const defaultProject = {
  id: 1,
  introduction: {
    logoImages: [] as (string | File)[], // Updated type
    coverImage: null as string | File | null, // Updated type
    coverTitle: '',

    headerLogoIndex: 0,
    coverLogoIndex: 0,
    titleImage: null as string | File | null, // Updated type
    introductionImage: null as string | File | null, // Updated type
    introductionVideo: '',
    introductionBackground: null as string | File | null, // Updated type
    introductionTitle: '',
    introductionDescription: '',

    launchImages: [] as (string | File)[], // Updated type
    launchTitle: '',
    launchDescription: '',
  },
  overview: {
    overviewImages: [
      { image: null as string | File | null, description: '' }, // Product
      { image: null as string | File | null, description: '' }, // Area
      { image: null as string | File | null, description: '' }, // Amenity
      { image: null as string | File | null, description: '' }, // Location
    ],
    overviewBackground: null as string | File | null, // Updated type

    basicInfo: [
      { id: 'project_name', key: 'Tên dự án', value: '', type: 'text' },
      { id: 'bathrooms', key: 'Phòng tắm', value: ['', ''], type: 'range' },
      { id: 'developer', key: 'Chủ đầu tư', value: '', type: 'text' },
      { id: 'category', key: 'Danh mục', value: '', type: 'text' },
      {
        id: 'ownership_status',
        key: 'Tình trạng sở hữu',
        value: '',
        type: 'text',
      },
      {
        id: 'property_type',
        key: 'Loại hình',
        value: '',
        type: 'select',
        options: [
          'Căn hộ',
          'Biệt thự',
          'Nhà phố',
          'Văn phòng',
          'Khu đô thị sinh thái',
        ],
      },
      {
        id: 'legal_status',
        key: 'Tình trạng pháp lý',
        value: '',
        type: 'text',
      },
      { id: 'product_group', key: 'Nhóm sản phẩm', value: '', type: 'text' },
      {
        id: 'handover_time',
        key: 'Thời gian bàn giao',
        value: '',
        type: 'text',
      },
      {
        id: 'landscape_designer',
        key: 'Đơn vị thiết kế cảnh quan',
        value: '',
        type: 'text',
      },
      { id: 'phase', key: 'Giai đoạn', value: '', type: 'text' },
      {
        id: 'construction_unit',
        key: 'Đơn vị thi công',
        value: '',
        type: 'text',
      },
      {
        id: 'currency_unit',
        key: 'Đơn vị tiền tệ',
        value: 'VND',
        type: 'select',
        options: ['VND', 'USD', 'EUR'],
      },
      {
        id: 'measurement_unit',
        key: 'Đơn vị đo lường',
        value: 'sqrt',
        type: 'select',
        options: ['sqm', 'sqrt'],
      },
      {
        id: 'architectural_designer',
        key: 'Đơn vị thiết kế kiến trúc',
        value: '',
        type: 'text',
      },
      { id: 'address', key: 'Địa chỉ', value: '', type: 'text' },
      {
        id: 'total_units',
        key: 'Tổng số căn/sản phẩm',
        value: 0,
        type: 'number',
      },
      { id: 'city', key: 'Thành phố', value: '', type: 'text' },
      { id: 'land_area', key: 'Diện tích đất', value: '', type: 'text' },
      { id: 'district', key: 'Quận/Huyện', value: '', type: 'text' },
      { id: 'bedrooms', key: 'Phòng ngủ', value: ['', ''], type: 'range' },
      {
        id: 'status',
        key: 'Trạng thái',
        value: '',
        type: 'select',
        options: [
          'Đang lên kế hoạch',
          'Đang xây dựng',
          'Đang bán',
          'Đang mở bán',
          'Hoàn thành',
        ],
      },
      { id: 'slug', key: 'Slug', value: '', type: 'text', hidden: true },
      { id: 'country', key: 'Quốc gia', value: 'Vietnam', type: 'text' },
      { id: 'price', key: 'Giá', value: ['', ''], type: 'range' },
    ],
    experienceImage: null as string | File | null, // Updated type
  },
  location: {
    title: '',
    description: '',
    locationImage: null as string | File | null, // Updated type
    mapInputType: 'embed' as 'embed' | 'coordinates', // New field
    embedCode: '', // New field
    coordinates: { lat: 10.75, lng: 106.4 },
    locationBackground: null as string | File | null, // Updated type
  },
  production: {
    products: [] as any[],
    furnitureImages: [] as (string | File)[], // Updated type
  },
  amenity: {
    title: '',
    description: '',
    amenityImages: [] as (string | File)[], // Updated type
  },
  contact: {
    layoutId: 'layout-1', // Add this field
    logoImage: null as string | File | null,
    contactBackground: null as string | File | null,
  },
  other: {
    //Chính sách
    policy: {
      title: '',
      policyImage: null as string | File | null, // Updated type
      policyText: '',
    },
    // Timeline
    timeline: {
      timelineTitle: '',
      timelineImage: null as string | File | null, // Updated type
      progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
      progressImages: [] as (string | File)[], // Updated type
      backgroundImage: null as string | File | null, // Updated type
    },
    agency: {
      title: '', // Tiêu đề đại lý
      agencyImage: null as string | File | null, // Logo/ảnh đại lý
      description: '',
    },
    isFeatured: true,
    isExclusive: false,
    enableLiveSales: true,
    visibleOnWeb: true,
    breakImages: Array(6).fill(null) as (string | File | null)[],
  },
};

export function useProjectData() {
  const [project, setProject] = useState(defaultProject);
  const [editingPolicyIndex, setEditingPolicyIndex] = useState<number | null>(
    null
  );

  const updateProject = useCallback(
    (section: string, field: string, value: any) => {
      setProject((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as object),
          [field]: value,
        },
      }));
    },
    []
  );

  const updateNestedProject = useCallback(
    (section: string, subsection: string, field: string, value: any) => {
      setProject((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as object),
          [subsection]: {
            ...(prev[section as keyof typeof prev] as any)[subsection],
            [field]: value,
          },
        },
      }));
    },
    []
  );

  const addArrayItem = useCallback(
    (section: string, field: string, item = '') => {
      setProject((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as object),
          [field]: [
            ...(prev[section as keyof typeof prev] as any)[field],
            item,
          ],
        },
      }));
    },
    []
  );

  const removeArrayItem = useCallback(
    (section: string, field: string, index: number) => {
      setProject((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as object),
          [field]: (prev[section as keyof typeof prev] as any)[field].filter(
            (_: any, i: number) => i !== index
          ),
        },
      }));
    },
    []
  );

  const updateArrayItem = useCallback(
    (section: string, field: string, index: number, value: string) => {
      setProject((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as object),
          [field]: (prev[section as keyof typeof prev] as any)[field].map(
            (item: any, i: number) => (i === index ? value : item)
          ),
        },
      }));
    },
    []
  );

  const addProduct = useCallback(() => {
    setProject((prev) => ({
      ...prev,
      production: {
        ...prev.production,
        products: [
          ...prev.production.products,
          { id: Date.now().toString(), name: '', image: null, description: '' },
        ],
      },
    }));
  }, []);

  const updateProductField = useCallback(
    (index: number, field: keyof ProductItem, value: any) => {
      setProject((prev) => ({
        ...prev,
        production: {
          ...prev.production,
          products: prev.production.products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
          ),
        },
      }));
    },
    []
  );

  const removeProduct = useCallback((index: number) => {
    setProject((prev) => ({
      ...prev,
      production: {
        ...prev.production,
        products: prev.production.products.filter((_, i) => i !== index),
      },
    }));
  }, []);

  return {
    project,
    updateProject,
    updateNestedProject,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    addProduct,
    updateProductField,
    removeProduct,
    editingPolicyIndex,
    setEditingPolicyIndex,
  };
}
