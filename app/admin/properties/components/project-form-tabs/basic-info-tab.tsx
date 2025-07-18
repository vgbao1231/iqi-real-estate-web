'use client';

import type * as React from 'react';
import { Info } from 'lucide-react';

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
import { DateInput } from '../DateInput';
import { FileUpload } from '../FileUpload';

interface BasicInfoTabProps {
  project: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSelectChange: (name: keyof any, value: string) => void;
  handleFileUpload: (
    name: keyof any,
    files: (File | string)[] | File | string | null
  ) => void;
  categoryOptions: { value: string; label: string }[];
  commonPropertyTypes: { value: string; label: string }[];
  commonPropertyGroups: { value: string; label: string }[];
  commonTenureOptions: { value: string; label: string }[];
}

export function BasicInfoTab({
  project,
  handleChange,
  handleSelectChange,
  handleFileUpload,
  categoryOptions,
  commonPropertyTypes,
  commonPropertyGroups,
  commonTenureOptions,
}: BasicInfoTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" /> Thông tin cơ bản
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* row 1 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="name">Tên dự án</Label>
            <Input
              id="name"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="developer">Chủ đầu tư</Label>
            <Input
              id="developer"
              name="developer"
              value={project.developer}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL thân thiện)</Label>
            <Input
              id="slug"
              name="slug"
              value={project.slug}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* description */}
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            rows={5}
          />
        </div>

        {/* selects */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* category */}
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select
              value={project.category}
              onValueChange={(v) => handleSelectChange('category', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* propertyType */}
          <div className="space-y-2">
            <Label htmlFor="propertyType">Loại hình BĐS</Label>
            <Select
              value={project.propertyType}
              onValueChange={(v) => handleSelectChange('propertyType', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại hình" />
              </SelectTrigger>
              <SelectContent>
                {commonPropertyTypes.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* propertyGroup */}
          <div className="space-y-2">
            <Label htmlFor="propertyGroup">Nhóm BĐS</Label>
            <Select
              value={project.propertyGroup}
              onValueChange={(v) => handleSelectChange('propertyGroup', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhóm" />
              </SelectTrigger>
              <SelectContent>
                {commonPropertyGroups.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* phase */}
          <div className="space-y-2">
            <Label htmlFor="phase">Giai đoạn</Label>
            <Input
              id="phase"
              name="phase"
              value={project.phase}
              onChange={handleChange}
            />
          </div>

          {/* tenure */}
          <div className="space-y-2">
            <Label htmlFor="tenure">Tình trạng sở hữu</Label>
            <Select
              value={project.tenure}
              onValueChange={(v) => handleSelectChange('tenure', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tình trạng" />
              </SelectTrigger>
              <SelectContent>
                {commonTenureOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* completion */}
          <DateInput
            label="Thời gian hoàn thành"
            id="completion"
            name="completion"
            value={project.completion}
            onChange={handleChange}
          />
        </div>

        {/* images */}
        <FileUpload
          label="Ảnh dự án (nhiều ảnh)"
          multiple
          value={project.images}
          onChange={(files) => handleFileUpload('images', files)}
        />
      </CardContent>
    </Card>
  );
}
