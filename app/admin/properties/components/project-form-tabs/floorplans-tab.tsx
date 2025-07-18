'use client';

import type * as React from 'react';
import { LayoutGrid } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DynamicArrayInput } from '../DynamicArrayInput';
import { FileUpload } from '../FileUpload';
import { Separator } from '@/components/ui/separator';

interface FloorPlansTabProps {
  project: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleFileUpload: (
    name: keyof any,
    files: (File | string)[] | File | string | null
  ) => void;
  handleDynamicArrayChange: <K extends keyof any, V extends any[K]>(
    key: K,
    index: number,
    field: string,
    value: any
  ) => void;
  handleAddDynamicItem: <K extends keyof any>(key: K, newItem: any) => void;
  handleRemoveDynamicItem: <K extends keyof any>(key: K, index: number) => void;
}

export function FloorPlansTab({
  project,
  handleChange,
  handleFileUpload,
  handleDynamicArrayChange,
  handleAddDynamicItem,
  handleRemoveDynamicItem,
}: FloorPlansTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5" /> Mặt bằng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Separator />
          <h4 className="flex items-center gap-2 text-lg font-medium">
            Mặt bằng tổng thể
          </h4>
          <FileUpload
            label="Ảnh mặt bằng tổng thể"
            multiple={false}
            value={project.overallFloorPlanImage}
            onChange={(file) => handleFileUpload('overallFloorPlanImage', file)}
          />
          <div className="space-y-2">
            <Label htmlFor="overallFloorPlanDescription">
              Mô tả mặt bằng tổng thể
            </Label>
            <Textarea
              id="overallFloorPlanDescription"
              name="overallFloorPlanDescription"
              value={project.overallFloorPlanDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        <DynamicArrayInput
          label="Mặt bằng các phân khu"
          items={project.subAreaFloorPlans}
          onAddItem={() =>
            handleAddDynamicItem('subAreaFloorPlans', {
              name: '',
              description: '',
              image: null,
            })
          }
          onRemoveItem={(idx) =>
            handleRemoveDynamicItem('subAreaFloorPlans', idx)
          }
          renderItem={(plan: any, index) => (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên phân khu</Label>
                <Input
                  value={plan.name}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'subAreaFloorPlans',
                      index,
                      'name',
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Mô tả phân khu</Label>
                <Textarea
                  value={plan.description}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'subAreaFloorPlans',
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  rows={3}
                />
              </div>
              <FileUpload
                label="Ảnh phân khu"
                multiple={false}
                value={plan.image}
                onChange={(file) =>
                  handleDynamicArrayChange(
                    'subAreaFloorPlans',
                    index,
                    'image',
                    file
                  )
                }
              />
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
