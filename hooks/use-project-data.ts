'use client';

import {
  useGetAdminProjectByIdQuery,
  useUpdateProjectScalarDataMutation,
} from '@/features/project/projectApi';
import { compressImage, setDeep } from '@/lib/utils';
import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';

export interface ProductItem {
  id: string;
  name: string;
  image: { url: string; publicId: string } | File | null;
  description: string; // HTML string for RichTextEditor
}

export interface KeyValuePair {
  id: string; // Added for DND
  key: string;
  value: string | number | [number | string, number | string]; // Updated to support array for range
  type?: 'text' | 'number' | 'select' | 'range'; // Added "range" type
  options?: string[];
}

type Project = {
  [key: string]: Record<string, any>;
};

export function useProjectData(id: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const shouldSkip = id === null || id === 'new';
  const { data: apiProject } = useGetAdminProjectByIdQuery(
    shouldSkip ? skipToken : id
  );
  const [updateProjectScalarData] = useUpdateProjectScalarDataMutation();

  useEffect(() => {
    if (apiProject) {
      setProject(apiProject);
    }
  }, [apiProject]);

  const [editingPolicyIndex, setEditingPolicyIndex] = useState<number | null>(
    null
  );

  const updateProject = useCallback(
    // Nhận số lượng khóa tùy ý (tối thiểu 2: [key, value])
    (...args: (string | any)[]) => {
      // 1. Tách Giá trị mới và Đường dẫn Khóa
      const value = args.pop(); // Giá trị mới
      const pathParts: string[] = args.map(String); // Các khóa (ví dụ: ['overview', 'contact', 'phone'])

      if (pathParts.length === 0) return; // Không có khóa nào để cập nhật

      setProject((prev) => {
        if (!prev) return prev;

        // 2. Clone và Cập nhật Bất biến
        let newProject = { ...prev }; // Clone cấp độ đầu tiên (bất biến)
        let current = newProject; // Con trỏ để di chuyển sâu hơn

        for (let i = 0; i < pathParts.length; i++) {
          const part = pathParts[i];

          if (i === pathParts.length - 1) {
            // Nếu là khóa cuối cùng (mục tiêu), gán giá trị
            current[part] = value;
            break;
          }

          // Nếu chưa phải khóa cuối cùng: Đảm bảo tính bất biến cho cấp độ tiếp theo
          if (!current[part] || typeof current[part] !== 'object') {
            // Nếu khóa không tồn tại hoặc không phải object, tạo object mới
            current[part] = {};
          } else {
            // Nếu đã là object, tạo bản sao (clone) bất biến
            current[part] = { ...current[part] };
          }

          // Di chuyển con trỏ xuống cấp độ tiếp theo
          current = current[part];
        }

        return newProject;
      });
    },
    []
  );

  const updateNestedProject = useCallback(
    (section: string, subsection: string, field: string, value: any) => {
      setProject((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof typeof prev] as object),
            [subsection]: {
              ...(prev[section as keyof typeof prev] as any)[subsection],
              [field]: value,
            },
          },
        };
      });
    },
    []
  );

  const handleSave = async (
    updateProjectTab: any,
    uploadFile: any,
    tab: string,
    data: any,
    scalarData?: any
  ) => {
    console.log('Saving data...', data);
    // Đệ quy tách file và data
    function extractValue(
      target: any,
      key: string,
      value: any,
      parentPath = ''
    ) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key; // path đầy đủ

      if (value instanceof File) {
        files.push({ key: currentPath, file: value }); // ✅ lưu path đầy đủ
        target[key] = null;
        return;
      }

      if (Array.isArray(value)) {
        target[key] = [];
        value.forEach((item, idx) => {
          const arrayPath = `${currentPath}[${idx}]`;
          if (item instanceof File) {
            files.push({ key: arrayPath, file: item });
            target[key][idx] = null;
          } else if (typeof item === 'object' && item !== null) {
            target[key][idx] = {};
            Object.entries(item).forEach(([subKey, subVal]) => {
              extractValue(target[key][idx], subKey, subVal, arrayPath);
            });
          } else {
            target[key][idx] = item;
          }
        });
        return;
      }

      if (typeof value === 'object' && value !== null) {
        target[key] = {};
        Object.entries(value).forEach(([subKey, subVal]) => {
          extractValue(target[key], subKey, subVal, currentPath);
        });
        return;
      }

      target[key] = value;
    }

    const files: { key: string; file: File }[] = [];
    const jsonData: any = {};

    Object.entries(data).forEach(([key, value]) => {
      extractValue(jsonData, key, value);
    });

    try {
      // 1. Loop upload từng file, gắn URL vào jsonData
      if (files.length > 0) {
        const results = await Promise.all(
          files.map(async ({ key, file }) => {
            const compressedFile = await compressImage(file);
            const res = await uploadFile({
              file: compressedFile,
              // file,
              folder: 'projects',
            }).unwrap();
            return { key, url: res.url, publicId: res.publicId };
          })
        );

        results.forEach(({ key, url, publicId }) => {
          setDeep(jsonData, key, { url, publicId });
        });
      }

      // 2. Sau khi có hết URL → gọi updateProjectTab
      if (id === null) throw new Error('Project ID is required for update.');

      // 3. GỌI API CẬP NHẬT SCALAR FIELDS (updateProject)
      if (scalarData) {
        console.log('Sending Scalar Data:', scalarData);
        await updateProjectScalarData({
          id,
          body: scalarData, // Gửi các trường cấp cao (isFeatured, isExclusive,...)
        }).unwrap();
      }

      // 4. GỌI API CẬP NHẬT TAB (updateProjectTab)
      const hasTabData = Object.keys(jsonData).length > 0;
      if (hasTabData) {
        console.log(`Sending Tab Data (${tab}):`, jsonData);
        await updateProjectTab({
          id,
          tab,
          body: jsonData, // Gửi dữ liệu tab đã sạch
        }).unwrap();
      }
    } catch (err) {
      console.error('❌ Lỗi update tab:', err);
    }
  };

  return {
    project,
    updateProject,
    updateNestedProject,
    handleSave,
    editingPolicyIndex,
    setEditingPolicyIndex,
  };
}
