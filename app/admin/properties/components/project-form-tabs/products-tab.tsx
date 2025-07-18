'use client';
import { Home } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DynamicArrayInput } from '../DynamicArrayInput';
import { FileUpload } from '../FileUpload';
import { IconPicker } from '../IconPicker';

interface ProductsTabProps {
  project: any;
  handleDynamicArrayChange: <K extends keyof any, V extends any[K]>(
    key: K,
    index: number,
    field: string,
    value: any
  ) => void;
  handleAddDynamicItem: <K extends keyof any>(key: K, newItem: any) => void;
  handleRemoveDynamicItem: <K extends keyof any>(key: K, index: number) => void;
}

export function ProductsTab({
  project,
  handleDynamicArrayChange,
  handleAddDynamicItem,
  handleRemoveDynamicItem,
}: ProductsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" /> Sản phẩm
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DynamicArrayInput
          label="Các loại sản phẩm"
          items={project.products}
          onAddItem={() =>
            handleAddDynamicItem('products', {
              name: '',
              description: '',
              image: null,
              price: '',
              details: [],
            })
          }
          onRemoveItem={(idx) => handleRemoveDynamicItem('products', idx)}
          renderItem={(productItem: any, index) => (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên sản phẩm</Label>
                <Input
                  value={productItem.name}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'products',
                      index,
                      'name',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{`Giá sản phẩm (ví dụ: "1.8 - 2.5 tỷ")`}</Label>
                <Input
                  value={productItem.price}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'products',
                      index,
                      'price',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Mô tả sản phẩm</Label>
                <Textarea
                  value={productItem.description}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'products',
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  rows={3}
                />
              </div>
              <FileUpload
                label="Ảnh sản phẩm"
                multiple={false}
                value={productItem.image}
                onChange={(file) =>
                  handleDynamicArrayChange('products', index, 'image', file)
                }
              />
              <DynamicArrayInput
                label="Chi tiết sản phẩm"
                items={productItem.details}
                onAddItem={() => {
                  const next = [
                    ...productItem.details,
                    {
                      id: Date.now().toString(),
                      label: '',
                      value: '',
                      icon: '',
                    },
                  ];
                  handleDynamicArrayChange('products', index, 'details', next);
                }}
                onRemoveItem={(detailIdx) => {
                  const next = [...productItem.details];
                  next.splice(detailIdx, 1);
                  handleDynamicArrayChange('products', index, 'details', next);
                }}
                renderItem={(detail: any, detailIdx) => (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Nhãn</Label>
                      <Input
                        value={detail.label}
                        onChange={(e) => {
                          const next = [...productItem.details];
                          next[detailIdx] = {
                            ...next[detailIdx],
                            label: e.target.value,
                          };
                          handleDynamicArrayChange(
                            'products',
                            index,
                            'details',
                            next
                          );
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Giá trị</Label>
                      <Input
                        value={detail.value}
                        onChange={(e) => {
                          const next = [...productItem.details];
                          next[detailIdx] = {
                            ...next[detailIdx],
                            value: e.target.value,
                          };
                          handleDynamicArrayChange(
                            'products',
                            index,
                            'details',
                            next
                          );
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <IconPicker
                        value={detail.icon}
                        onValueChange={(v) => {
                          const next = [...productItem.details];
                          next[detailIdx] = { ...next[detailIdx], icon: v };
                          handleDynamicArrayChange(
                            'products',
                            index,
                            'details',
                            next
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
