'use client';

import type * as React from 'react';
import { Star } from 'lucide-react';
import type { JSX } from 'react'; // Import JSX to fix the undeclared variable error

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DynamicArrayInput } from '../DynamicArrayInput';
import { FileUpload } from '../FileUpload';
import { IconPicker } from '../IconPicker';

interface AmenitiesTabProps {
  project: any;
  handleDynamicArrayChange: <K extends keyof any, V extends any[K]>(
    key: K,
    index: number,
    field: string,
    value: any
  ) => void;
  handleAddDynamicItem: <K extends keyof any>(key: K, newItem: any) => void;
  handleRemoveDynamicItem: <K extends keyof any>(key: K, index: number) => void;
  compactItemWrapper: (
    children: React.ReactNode,
    idx: number,
    onRemove: () => void
  ) => JSX.Element;
}

export function AmenitiesTab({
  project,
  handleDynamicArrayChange,
  handleAddDynamicItem,
  handleRemoveDynamicItem,
  compactItemWrapper,
}: AmenitiesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" /> Tiện ích
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ----------- Amenity clusters ------------ */}
        <DynamicArrayInput
          label="Cụm tiện ích"
          items={project.amenityClusters}
          onAddItem={() =>
            handleAddDynamicItem('amenityClusters', {
              name: '',
              description: '',
              image: null,
              icons: [],
            })
          }
          onRemoveItem={(idx) =>
            handleRemoveDynamicItem('amenityClusters', idx)
          }
          renderItem={(cluster: any, index) => (
            <>
              {/* cluster name & desc */}
              <div className="space-y-2">
                <Label>Tên cụm tiện ích</Label>
                <Input
                  value={cluster.name}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'amenityClusters',
                      index,
                      'name',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Mô tả cụm tiện ích</Label>
                <Textarea
                  value={cluster.description}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'amenityClusters',
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  rows={3}
                />
              </div>

              {/* image */}
              <FileUpload
                label="Ảnh cụm tiện ích"
                multiple={false}
                value={cluster.image}
                onChange={(file) =>
                  handleDynamicArrayChange(
                    'amenityClusters',
                    index,
                    'image',
                    file
                  )
                }
              />

              {/* icons inside cluster */}
              <DynamicArrayInput
                label="Icons tiện ích"
                items={cluster.icons}
                renderItemWrapper={compactItemWrapper}
                wrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
                onAddItem={() => {
                  const next = [
                    ...cluster.icons,
                    { id: Date.now().toString(), name: '', icon: '' },
                  ];
                  handleDynamicArrayChange(
                    'amenityClusters',
                    index,
                    'icons',
                    next
                  );
                }}
                onRemoveItem={(iconIdx) => {
                  const next = [...cluster.icons];
                  next.splice(iconIdx, 1);
                  handleDynamicArrayChange(
                    'amenityClusters',
                    index,
                    'icons',
                    next
                  );
                }}
                renderItem={(icon: any, iconIdx) => (
                  <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-1 items-center gap-2">
                      <Label className="text-sm">Tên</Label>
                      <Input
                        className="h-8 text-sm"
                        value={icon.name}
                        onChange={(e) => {
                          const next = [...cluster.icons];
                          next[iconIdx] = {
                            ...next[iconIdx],
                            name: e.target.value,
                          };
                          handleDynamicArrayChange(
                            'amenityClusters',
                            index,
                            'icons',
                            next
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-1 items-center gap-2">
                      <Label className="text-sm">Icon</Label>
                      <IconPicker
                        className="h-8 text-sm"
                        value={icon.icon}
                        onValueChange={(v) => {
                          const next = [...cluster.icons];
                          next[iconIdx] = { ...next[iconIdx], icon: v };
                          handleDynamicArrayChange(
                            'amenityClusters',
                            index,
                            'icons',
                            next
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            </>
          )}
        />

        {/* ----------- Features ------------ */}
        <DynamicArrayInput
          label="Đặc điểm nổi bật"
          items={project.features}
          renderItemWrapper={compactItemWrapper}
          onAddItem={() => handleAddDynamicItem('features', '')}
          onRemoveItem={(idx) => handleRemoveDynamicItem('features', idx)}
          wrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
          renderItem={(feature: any, idx) => (
            <div className="flex w-full items-center gap-2">
              <Label className="min-w-[80px] text-sm">Đặc điểm</Label>
              <Input
                className="h-8 flex-1 text-sm"
                value={feature}
                onChange={(e) => {
                  const next = [...project.features];
                  next[idx] = e.target.value;
                  handleDynamicArrayChange('features', idx, '', e.target.value);
                }}
              />
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
