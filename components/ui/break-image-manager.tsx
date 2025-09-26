'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Plus, ImageIcon } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';

interface BreakImage {
  image: { url: string; publicId: string } | File | null;
  position: string;
}

interface BreakImageManagerProps {
  breakImages: BreakImage[];
  onChange: (breakImages: BreakImage[]) => void;
}

const TAB_POSITIONS = [
  { value: 'introduction', label: 'Sau tab Giới thiệu' },
  { value: 'overview', label: 'Sau tab Tổng quan' },
  { value: 'location', label: 'Sau tab Vị trí' },
  { value: 'production', label: 'Sau tab Sản phẩm' },
  { value: 'amenity', label: 'Sau tab Tiện ích' },
  { value: 'contact', label: 'Sau tab Liên hệ' },
];

export function BreakImageManager({
  breakImages,
  onChange,
}: BreakImageManagerProps) {
  const addBreakImage = () => {
    const newBreakImage: BreakImage = {
      image: null,
      position: 'introduction',
    };
    onChange([...breakImages, newBreakImage]);
  };

  const updateBreakImage = (
    index: number,
    field: keyof BreakImage,
    value: any
  ) => {
    const updatedBreakImages = breakImages.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updatedBreakImages);
  };

  const removeBreakImage = (index: number) => {
    const updatedBreakImages = breakImages.filter((_, i) => i !== index);
    onChange(updatedBreakImages);
  };

  return (
    <div className="space-y-4">
      {breakImages.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-gray-300 rounded-lg">
          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm mb-3">
            Chưa có ảnh ngắt trang nào
          </p>
          <Button variant="outline" size="sm" onClick={addBreakImage}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm ảnh ngắt trang
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Ảnh ngắt trang</Label>
            <Button variant="outline" size="sm" onClick={addBreakImage}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm ảnh
            </Button>
          </div>

          <div className="space-y-3">
            {breakImages.map((breakImage, index) => (
              <Card key={index} className="p-4 relative">
                {/* Nút xóa ở góc phải của card */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeBreakImage(index)}
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 z-10 bg-white border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 hover:text-red-600 shadow-md rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                  {/* Image Upload */}
                  <div>
                    <FileUpload
                      label=""
                      value={breakImage.image}
                      onChange={(file) =>
                        updateBreakImage(index, 'image', file)
                      }
                    />
                  </div>

                  {/* Position Select */}
                  <div className="space-y-2">
                    <Label className="text-sm">Vị trí chèn</Label>
                    <Select
                      value={breakImage.position}
                      onValueChange={(value) =>
                        updateBreakImage(index, 'position', value)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TAB_POSITIONS.map((position) => (
                          <SelectItem
                            key={position.value}
                            value={position.value}
                          >
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
