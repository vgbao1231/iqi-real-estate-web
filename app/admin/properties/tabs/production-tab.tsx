'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { ProductItemCard } from '@/components/ui/product-item-card';
import { Button } from '@/components/ui/button';
import type { ProductItem } from '@/hooks/use-project-data';

interface ProductionTabProps {
  production: any;
  updateProject: (section: string, field: string, value: any) => void;
  addProduct: () => void;
  updateProductField: (
    index: number,
    field: keyof ProductItem,
    value: any
  ) => void;
  removeProduct: (index: number) => void;
}

export function ProductionTab({
  production,
  updateProject,
  addProduct,
  updateProductField,
  removeProduct,
}: ProductionTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin sản phẩm</CardTitle>
        <CardDescription>
          Cập nhật thông tin sản phẩm và nội thất
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="productionTitle">Tiêu đề sản phẩm</Label>
          <Input
            id="productionTitle"
            value={production.title}
            onChange={(e) =>
              updateProject('production', 'title', e.target.value)
            }
            placeholder="Nhập tiêu đề sản phẩm"
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả sản phẩm</Label>
          <RichTextEditor
            value={production.description}
            onChange={(value) =>
              updateProject('production', 'description', value)
            }
            placeholder="Nhập mô tả tổng quan về các sản phẩm..."
          />
        </div>

        <Separator />

        {/* Products List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">
              Danh sách sản phẩm
            </Label>
            <Button variant="outline" size="sm" onClick={addProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </div>
          {production.products.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm border rounded-lg">
              {`Chưa có sản phẩm nào. Nhấn "Thêm sản phẩm" để bắt đầu.`}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {production.products.map(
                (product: ProductItem, index: number) => (
                  <ProductItemCard
                    key={product.id}
                    product={product}
                    index={index}
                    onUpdate={updateProductField}
                    onRemove={removeProduct}
                  />
                )
              )}
            </div>
          )}
        </div>

        <Separator />

        {/* Furnitures List */}
        <MultiFileUpload
          label="Ảnh nội thất (Không giới hạn số lượng)"
          value={production.furnitures}
          onChange={(files) => updateProject('production', 'furnitures', files)}
        />
      </CardContent>
    </Card>
  );
}
