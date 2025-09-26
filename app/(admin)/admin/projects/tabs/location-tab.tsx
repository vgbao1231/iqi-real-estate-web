'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import Image from 'next/image';

import { memo, ReactNode } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface LocationTabProps {
  location: any;
  updateProject: (section: string, field: string, value: any) => void;
  updateNestedProject: (
    section: string,
    subsection: string,
    field: string,
    value: any
  ) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

const LocationPreview = memo(function LocationPreview({
  location,
}: {
  location: any;
}) {
  const { locationImage, locationBackground, title, description } = location;

  return (
    <div className="relative min-h-[70vh] center-both py-16">
      {/* Background image full screen */}
      <Image
        src={
          locationBackground
            ? locationBackground instanceof File
              ? URL.createObjectURL(locationBackground)
              : locationBackground.url
            : '/placeholder.svg'
        }
        alt="Eco Retreat Background"
        fill
        className="object-cover object-right"
        priority
      />

      {/* Content */}
      <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 gap-6">
        {/* Left content */}
        <div className="md:w-1/2 space-y-4 leading-relaxed text-white">
          <div dangerouslySetInnerHTML={{ __html: title }} />
          <div
            className="space-y-4 text-lg text-white/90"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Right hero image */}
        <Image
          src={
            locationImage
              ? locationImage instanceof File
                ? URL.createObjectURL(locationImage)
                : locationImage.url
              : '/placeholder.svg'
          }
          alt="Logo"
          width={500}
          height={400}
          className="object-contain w-auto h-[60vh] shadow-lg rounded-sm"
          priority
        />
      </div>
    </div>
  );
});

const GoogleMapPreview = memo(function GoogleMapPreview({
  lat,
  lng,
  mapInputType,
  embedCode,
}: {
  lat: number;
  lng: number;
  mapInputType: 'coordinates' | 'embed';
  embedCode: string;
}) {
  let mapSrc = '';
  let previewContent: ReactNode = null;

  if (mapInputType === 'coordinates') {
    if (lat !== 0 || lng !== 0) {
      mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      previewContent = (
        <div className="p-4 bg-blue-50 rounded-lg">
          <Label className="text-sm font-medium text-blue-900">
            Tọa độ hiện tại:
          </Label>
          <p className="text-sm text-blue-700 mt-1">
            {lat}, {lng}
          </p>
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Xem trên Google Maps →
          </a>
        </div>
      );
    } else {
      previewContent = (
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
          Vui lòng nhập tọa độ để xem trước bản đồ.
        </div>
      );
    }
  } else if (mapInputType === 'embed') {
    if (embedCode) {
      // Extract src from embed code
      const srcMatch = embedCode.match(/src="([^"]*)"/);
      if (srcMatch && srcMatch[1]) {
        mapSrc = srcMatch[1];
      } else {
        previewContent = (
          <div className="p-4 bg-red-50 rounded-lg text-center text-red-700">
            Mã nhúng không hợp lệ. Vui lòng kiểm tra lại.
          </div>
        );
      }
    } else {
      previewContent = (
        <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
          Vui lòng dán mã nhúng Google Maps để xem trước bản đồ.
        </div>
      );
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">
        Xem trước bản đồ:
      </Label>
      {mapSrc ? (
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <iframe
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            src={mapSrc}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      ) : (
        previewContent
      )}
      <p className="text-sm text-gray-500">
        Bản đồ hiển thị vị trí dựa trên dữ liệu đã nhập.
      </p>
    </div>
  );
});

export function LocationTab({
  location,
  updateProject,
  updateNestedProject,
  handleSave,
}: LocationTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const handleMapInputTypeChange = (value: 'coordinates' | 'embed') => {
    updateProject('location', 'mapInputType', value);
    // Clear the other input when switching types to avoid conflicting data
    if (value === 'coordinates') {
      updateProject('location', 'embedCode', '');
    } else {
      updateNestedProject('location', 'coordinates', 'lat', 0);
      updateNestedProject('location', 'coordinates', 'lng', 0);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>1. Thông tin vị trí</CardTitle>
          <CardDescription>Cập nhật thông tin vị trí dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <LocationPreview location={location} />
          </div>

          <Separator />

          {/* Form Fields arranged as requested */}
          <FileUpload
            label="Ảnh nền vị trí"
            value={location.locationBackground}
            onChange={(file) =>
              updateProject('location', 'locationBackground', file)
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tiêu đề vị trí</Label>
                <RichTextEditor
                  value={location.title}
                  onChange={(value) =>
                    updateProject('location', 'title', value)
                  }
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
            </div>
            <FileUpload
              label="Ảnh vị trí"
              value={location.locationImage}
              onChange={(file) =>
                updateProject('location', 'locationImage', file)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Bản đồ</CardTitle>
          <CardDescription>
            Cập nhật vị trí dự án trên Google Map
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mapInputType">Chọn phương thức nhập bản đồ</Label>
              <Select
                value={location.mapInputType}
                onValueChange={handleMapInputTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn phương thức nhập" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coordinates">
                    Nhập tọa độ (Latitude, Longitude)
                  </SelectItem>
                  <SelectItem value="embed">Mã nhúng (Embed Code)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {location.mapInputType === 'coordinates' && (
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
            )}

            {location.mapInputType === 'embed' && (
              <div className="space-y-2">
                <Label htmlFor="embedCode">Mã nhúng Google Maps</Label>
                <Input
                  id="embedCode"
                  value={location.embedCode}
                  onChange={(e) =>
                    updateProject('location', 'embedCode', e.target.value)
                  }
                  placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                />
                <p className="text-sm text-gray-500">
                  Dán toàn bộ mã nhúng từ Google Maps.
                </p>
              </div>
            )}
          </div>

          {/* Google Map Preview */}
          <GoogleMapPreview
            lat={location.coordinates.lat}
            lng={location.coordinates.lng}
            mapInputType={location.mapInputType}
            embedCode={location.embedCode}
          />
        </CardContent>
      </Card>
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={() =>
            handleSave(updateProjectTab, uploadImage, 'location', location)
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading ? 'Đang lưu...' : 'Lưu thông tin vị trí'}
          </span>
        </Button>
      </div>
    </div>
  );
}
