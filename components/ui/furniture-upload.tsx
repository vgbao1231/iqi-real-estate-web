'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Plus } from 'lucide-react';
import { FurnitureItemCard } from '@/components/ui/furniture-item-card';

interface FurnitureItem {
  id: string;
  image: string | File;
  title: string;
}

interface FurnitureUploadProps {
  label: string;
  value: FurnitureItem[];
  onChange: (furnitures: FurnitureItem[]) => void;
  accept?: string;
}

export function FurnitureUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
}: FurnitureUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFurnitures = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        image: file,
        title: '',
      }));
      onChange([...value, ...newFurnitures]);
    }
  };

  const updateFurniture = (
    index: number,
    field: keyof FurnitureItem,
    newValue: any
  ) => {
    const updatedFurnitures = value.map((furniture, i) =>
      i === index ? { ...furniture, [field]: newValue } : furniture
    );
    onChange(updatedFurnitures);
  };

  const removeFurniture = (index: number) => {
    const updatedFurnitures = value.filter((_, i) => i !== index);
    onChange(updatedFurnitures);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{label}</Label>
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple
            onChange={handleFileChange}
          />
          <Button variant="outline" size="sm" asChild>
            <span>
              <Plus className="h-4 w-4 mr-2" />
              Thêm ảnh nội thất
            </span>
          </Button>
        </label>
      </div>

      {value.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <label className="cursor-pointer block">
            <input
              type="file"
              className="hidden"
              accept={accept}
              multiple
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                Chưa có ảnh nội thất nào
              </span>
              <span className="text-xs text-gray-400">
                Nhấn vào đây để thêm ảnh nội thất
              </span>
            </div>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((furniture, index) => (
            <FurnitureItemCard
              key={furniture.id}
              furniture={furniture}
              index={index}
              onUpdate={updateFurniture}
              onRemove={removeFurniture}
            />
          ))}
        </div>
      )}
    </div>
  );
}
