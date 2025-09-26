'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';

interface FurnitureItem {
  id: string;
  image: string | File;
  title: string;
}

interface FurnitureItemCardProps {
  furniture: FurnitureItem;
  index: number;
  onUpdate: (index: number, field: keyof FurnitureItem, value: any) => void;
  onRemove: (index: number) => void;
}

export function FurnitureItemCard({
  furniture,
  index,
  onUpdate,
  onRemove,
}: FurnitureItemCardProps) {
  return (
    <Card className="p-4 relative group">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 h-8 w-8 p-0 text-red-500 hover:text-red-700 z-10"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="space-y-4">
        {/* Image Display */}
        <FileUpload
          label="Ảnh nội thất"
          value={furniture.image}
          onChange={(file) => onUpdate(index, 'image', file)}
        />

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor={`furniture-title-${furniture.id}`}>
            Tiêu đề nội thất
          </Label>
          <Input
            id={`furniture-title-${furniture.id}`}
            value={furniture.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            placeholder={`Nhập tiêu đề cho nội thất ${index + 1}`}
            className="text-sm"
          />
        </div>
      </div>
    </Card>
  );
}
