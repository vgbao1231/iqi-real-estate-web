'use client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload'; // Assuming FileUpload is in components/file-upload.tsx
import type { ProductItem } from '@/hooks/use-project-data';

interface ProductItemCardProps {
  product: ProductItem;
  index: number;
  onUpdate: (index: number, field: keyof ProductItem, value: any) => void;
  onRemove: (index: number) => void;
}

export function ProductItemCard({
  product,
  index,
  onUpdate,
  onRemove,
}: ProductItemCardProps) {
  return (
    <Card className="p-4 relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 h-8 w-8 p-0 text-red-500 hover:text-red-700 z-10"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`product-name-${product.id}`}>Tên sản phẩm</Label>
          <Input
            id={`product-name-${product.id}`}
            value={product.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <FileUpload
          label="Ảnh sản phẩm"
          value={product.image}
          onChange={(file) => onUpdate(index, 'image', file)}
        />
        <div className="space-y-2">
          <Label>Mô tả sản phẩm</Label>
          <RichTextEditor
            value={product.description}
            onChange={(value) => onUpdate(index, 'description', value)}
            placeholder="Nhập mô tả chi tiết về sản phẩm này..."
          />
        </div>
      </div>
    </Card>
  );
}
