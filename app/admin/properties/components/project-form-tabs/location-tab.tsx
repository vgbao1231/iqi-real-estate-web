'use client';

import type * as React from 'react';
import { MapPin } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DynamicArrayInput } from '../DynamicArrayInput';
import { FileUpload } from '../FileUpload';
import { IconPicker } from '../IconPicker';

interface LocationTabProps {
  project: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: keyof any, value: string) => void;
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
  commonCountries: { value: string; label: string }[];
  commonCities: { value: string; label: string }[];
  commonDistricts: { value: string; label: string }[];
}

export function LocationTab({
  project,
  handleChange,
  handleNumberChange,
  handleSelectChange,
  handleFileUpload,
  handleDynamicArrayChange,
  handleAddDynamicItem,
  handleRemoveDynamicItem,
  commonCountries,
  commonCities,
  commonDistricts,
}: LocationTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Vị trí
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUpload
          label="Ảnh vị trí"
          multiple={false}
          value={project.locationImage}
          onChange={(file) => handleFileUpload('locationImage', file)}
        />
        <div className="space-y-2">
          <Label htmlFor="locationDescription">Mô tả vị trí</Label>
          <Textarea
            id="locationDescription"
            name="locationDescription"
            value={project.locationDescription}
            onChange={handleChange}
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            name="address"
            value={project.address}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">Quốc gia</Label>
            <Select
              value={project.country}
              onValueChange={(v) => handleSelectChange('country', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quốc gia" />
              </SelectTrigger>
              <SelectContent>
                {commonCountries.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Thành phố</Label>
            <Select
              value={project.city}
              onValueChange={(v) => handleSelectChange('city', v)}
              disabled={!project.country}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                {commonCities.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">Quận/Huyện</Label>
            <Select
              value={project.district}
              onValueChange={(v) => handleSelectChange('district', v)}
              disabled={!project.city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {commonDistricts.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lat">Vĩ độ (Latitude)</Label>
            <Input
              id="lat"
              name="lat"
              type="number"
              step="any"
              value={project.lat}
              onChange={handleNumberChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng">Kinh độ (Longitude)</Label>
            <Input
              id="lng"
              name="lng"
              type="number"
              step="any"
              value={project.lng}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <DynamicArrayInput
          label="Điểm nổi bật vị trí"
          items={project.locationHighlights}
          onAddItem={() =>
            handleAddDynamicItem('locationHighlights', {
              name: '',
              description: '',
              icon: '',
            })
          }
          onRemoveItem={(idx) =>
            handleRemoveDynamicItem('locationHighlights', idx)
          }
          renderItem={(highlight: any, index) => (
            <div className="space-y-4">
              <div className="center-both gap-4">
                <div className="space-y-2 flex-1">
                  <Label>Chọn icon</Label>
                  <IconPicker
                    value={highlight.icon}
                    onValueChange={(v) =>
                      handleDynamicArrayChange(
                        'locationHighlights',
                        index,
                        'icon',
                        v
                      )
                    }
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Tên điểm nổi bật</Label>
                  <Input
                    value={highlight.name}
                    onChange={(e) =>
                      handleDynamicArrayChange(
                        'locationHighlights',
                        index,
                        'name',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mô tả điểm nổi bật</Label>
                <Textarea
                  value={highlight.description}
                  onChange={(e) =>
                    handleDynamicArrayChange(
                      'locationHighlights',
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  rows={2}
                />
              </div>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
