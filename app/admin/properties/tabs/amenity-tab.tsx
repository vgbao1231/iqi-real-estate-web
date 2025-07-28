'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';

interface AmenityTabProps {
  amenity: any;
  updateProject: (section: string, field: string, value: any) => void;
}

export function AmenityTab({ amenity, updateProject }: AmenityTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin tiện ích</CardTitle>
        <CardDescription>Cập nhật thông tin tiện ích dự án</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <MultiFileUpload
          label="Ảnh tiện ích"
          value={amenity.amenityImages}
          onChange={(files) => updateProject('amenity', 'amenityImages', files)}
        />

        <div className="space-y-2">
          <Label>Tiêu đề tiện ích</Label>
          <RichTextEditor
            value={amenity.title}
            onChange={(value) => updateProject('amenity', 'title', value)}
            placeholder="Nhập tiêu đề tiện ích"
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả tiện ích</Label>
          <RichTextEditor
            value={amenity.description}
            onChange={(value) => updateProject('amenity', 'description', value)}
            placeholder="Nhập mô tả tiện ích"
          />
        </div>
      </CardContent>
    </Card>
  );
}
