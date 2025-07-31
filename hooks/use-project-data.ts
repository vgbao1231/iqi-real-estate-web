'use client';
import { useCallback, useState } from 'react';

export interface ProductItem {
  id: string;
  name: string;
  image: string | File | null; // Updated type
  description: string; // HTML string for RichTextEditor
}

export interface KeyValuePair {
  key: string;
  value: string | number;
  type?: 'text' | 'number' | 'select';
  options?: string[];
}

const defaultProject = {
  id: 1,
  introduction: {
    coverImage: null as string | File | null, // Updated type
    titleImage: null as string | File | null, // Updated type
    introductionImage: null as string | File | null, // Updated type
    logoImages: [] as (string | File)[], // Updated type
    launchImages: [] as (string | File)[], // Updated type
    introductionVideo: '',
    backgroundImage: null as string | File | null, // Updated type
    title: '',
    description: '',
    launchTitle: '',
    launchSubtitle: '',
    launchDescription: '',
  },
  overview: {
    overviewImages: [
      { image: null as string | File | null, description: '' }, // Product
      { image: null as string | File | null, description: '' }, // Area
      { image: null as string | File | null, description: '' }, // Amenity
      { image: null as string | File | null, description: '' }, // Location
    ],
    basicInfo: [
      { key: 'Tên dự án', value: '', type: 'text' },
      { key: 'Slug', value: '', type: 'text' },
      { key: 'Chủ đầu tư', value: '', type: 'text' },
      { key: 'Thiết kế cảnh quan', value: '', type: 'text' },
      { key: 'Diện tích (m²)', value: 0, type: 'number' },
      { key: 'Tổng số sản phẩm', value: 0, type: 'number' },
      { key: 'Bàn giao', value: '', type: 'text' },
      { key: 'Địa chỉ', value: '', type: 'text' },
      { key: 'Thành phố', value: '', type: 'text' },
      { key: 'Quận/Huyện', value: '', type: 'text' },
      { key: 'Quốc gia', value: 'Vietnam', type: 'text' },
      { key: 'Nhóm sản phẩm', value: '', type: 'text' },
      { key: 'Phòng ngủ tối thiểu', value: 0, type: 'number' },
      { key: 'Phòng ngủ tối đa', value: 0, type: 'number' },
      { key: 'Phòng tắm tối thiểu', value: 0, type: 'number' },
      { key: 'Phòng tắm tối đa', value: 0, type: 'number' },
      {
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
      { key: 'Pháp lý', value: '', type: 'text' },
      { key: 'Tình trạng sở hữu', value: '', type: 'text' },
      {
        key: 'Đơn vị tiền tệ',
        value: 'VND',
        type: 'select',
        options: ['VND', 'USD', 'EUR'],
      },
      { key: 'Giai đoạn', value: '', type: 'text' },
    ],
    contractors: [],
    architects: [],
    backgroundImage: null as string | File | null, // Updated type
    experienceImage: null as string | File | null, // Updated type
  },
  location: {
    title: '',
    description: '',
    locationImage: null as string | File | null, // Updated type
    coordinates: { lat: 10.75, lng: 106.4 },
    backgroundImage: null as string | File | null, // Updated type
  },
  production: {
    title: 'Sản phẩm',
    description: '',
    products: [] as any[],
    furnitures: [] as (string | File)[], // Updated type
  },
  amenity: {
    title: '',
    description: '',
    amenityImages: [] as (string | File)[], // Updated type
  },
  contact: {
    agencyImage: null as string | File | null, // Updated type
    title: '',
    subtitle: '',
    description: '',
    hotline: '',
    logoImage: null as string | File | null, // Updated type
    backgroundImage: null as string | File | null, // Updated type
  },
  other: {
    //Chính sách
    policy: {
      title: 'Chính Sách Bán Hàng Eco Retreat',
      policyImage: null as string | File | null, // Updated type
      policies: [],
    },
    // Timeline
    timeline: {
      timelineTitle: '',
      timelineImage: null as string | File | null, // Updated type
      progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
      progressImages: [] as (string | File)[], // Updated type
      backgroundImage: null as string | File | null, // Updated type
    },
    isFeatured: true,
    isExclusive: false,
    enableLiveSales: true,
    visibleOnWeb: true,
    breakImages: [] as (string | File)[], // Updated type
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
