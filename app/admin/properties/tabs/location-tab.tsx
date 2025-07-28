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
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';

interface LocationTabProps {
  location: any;
  updateProject: (section: string, field: string, value: any) => void;
  updateNestedProject: (
    section: string,
    subsection: string,
    field: string,
    value: any
  ) => void;
}

export function LocationTab({
  location,
  updateProject,
  updateNestedProject,
}: LocationTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin vị trí</CardTitle>
        <CardDescription>Cập nhật thông tin vị trí dự án</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Ảnh vị trí"
            value={location.locationImage}
            onChange={(file) =>
              updateProject('location', 'locationImage', file)
            }
          />
          <FileUpload
            label="Ảnh nền"
            value={location.backgroundImage}
            onChange={(file) =>
              updateProject('location', 'backgroundImage', file)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Tiêu đề vị trí</Label>
          <RichTextEditor
            value={location.title}
            onChange={(value) => updateProject('location', 'title', value)}
            placeholder="Nhập tiêu đề vị trí với định dạng..."
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả vị trí</Label>
          <RichTextEditor
            value={location.description}
            onChange={(value) =>
              updateProject('location', 'description', value)
            }
            placeholder="Nhập mô tả chi tiết về vị trí với các điểm nổi bật..."
          />
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lat">Vĩ độ (Latitude)</Label>
            <Input
              id="lat"
              type="number"
              step="any"
              value={location.coordinates.lat}
              onChange={(e) =>
                updateNestedProject(
                  'location',
                  'coordinates',
                  'lat',
                  Number(e.target.value)
                )
              }
              placeholder="10.762622"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng">Kinh độ (Longitude)</Label>
            <Input
              id="lng"
              type="number"
              step="any"
              value={location.coordinates.lng}
              onChange={(e) =>
                updateNestedProject(
                  'location',
                  'coordinates',
                  'lng',
                  Number(e.target.value)
                )
              }
              placeholder="106.660172"
            />
          </div>
        </div>

        {/* Preview coordinates */}
        {location.coordinates.lat !== 0 && location.coordinates.lng !== 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <Label className="text-sm font-medium text-blue-900">
              Tọa độ hiện tại:
            </Label>
            <p className="text-sm text-blue-700 mt-1">
              {location.coordinates.lat}, {location.coordinates.lng}
            </p>
            <a
              href={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Xem trên Google Maps →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
