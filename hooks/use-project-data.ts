'use client';

import { useGetAdminProjectByIdQuery } from '@/features/project/projectApi';
import { compressImage } from '@/lib/utils';
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
  const { data: apiProject } = useGetAdminProjectByIdQuery(id ?? skipToken);

  useEffect(() => {
    if (apiProject) {
      setProject(apiProject);
    }
  }, [apiProject]);

  const [editingPolicyIndex, setEditingPolicyIndex] = useState<number | null>(
    null
  );

  const updateProject = useCallback(
    (section: string, field: string, value: any) => {
      setProject((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof typeof prev] as object),
            [field]: value,
          },
        };
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
    uploadFile: any, // mutation RTK Query upload
    tab: string,
    data: any
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

      console.log(jsonData);

      await updateProjectTab({
        id,
        tab,
        body: jsonData,
      }).unwrap();
    } catch (err) {
      console.error('❌ Lỗi update tab:', err);
    }
  };

  // Helper setDeep để set giá trị vào object từ path dạng "a.b[0].c"
  function setDeep(obj: any, path: string, value: any) {
    const parts = path.replace(/\]/g, '').split(/\.|\[/);
    let current = obj;
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        current[part] = value;
      } else {
        if (!(part in current))
          current[part] = /^\d+$/.test(parts[idx + 1]) ? [] : {};
        current = current[part];
      }
    });
  }

  return {
    project,
    updateProject,
    updateNestedProject,
    handleSave,
    editingPolicyIndex,
    setEditingPolicyIndex,
  };
}
