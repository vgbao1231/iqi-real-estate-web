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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { LocateFixed, Save, X } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';
import React, { memo, useRef, useState } from 'react';
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BreakImageManager } from '@/components/ui/break-image-manager';

const availableFields = [
  {
    id: 'name',
    label: 'Tên trên thiệp',
    type: 'text',
    placeholder: 'Nguyễn Văn A',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    type: 'text',
    placeholder: '0123456789',
  },
  {
    id: 'title',
    label: 'Chức danh',
    type: 'text',
    placeholder: 'Giám đốc kinh doanh',
  },
  {
    id: 'company',
    label: 'Công ty',
    type: 'text',
    placeholder: 'Công ty BDS ABC',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'example@email.com',
  },
  {
    id: 'address',
    label: 'Địa chỉ',
    type: 'text',
    placeholder: '123 Đường ABC, Quận 1',
  },
  { id: 'image', label: 'Ảnh đại diện', type: 'image' },
];

// Preview component for policies
const PoliciesPreview = memo(function PoliciesPreview({ other }: any) {
  const { title, policyText, policyImage } = other.policy;

  return (
    <section
      id="policy"
      className="bg-background mx-auto w-full min-h-[60vh] center-both"
    >
      {policyText ? (
        <div className="h-full w-full max-w-7xl center-both flex-col md:flex-row py-8 gap-8">
          {/* Left content */}
          <div className="relative w-full md:w-1/2 h-[70vh] center-both">
            <Image
              src={
                policyImage
                  ? policyImage instanceof File
                    ? URL.createObjectURL(policyImage)
                    : policyImage.url
                  : '/placeholder.svg'
              }
              alt="Eco Retreat Policy Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right content */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <h3 className="text-5xl italic font-bold text-orange-300 mb-8">
                {title}
              </h3>

              <div
                className="text-lg text-foreground"
                dangerouslySetInnerHTML={{ __html: policyText }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full max-w-6xl center-both flex-col md:flex-row py-8 gap-8">
          <div className="relative w-full h-[70vh] center-both">
            <Image
              src={
                policyImage
                  ? policyImage instanceof File
                    ? URL.createObjectURL(policyImage)
                    : policyImage.url
                  : '/placeholder.svg'
              }
              alt="Eco Retreat Policy Background"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
});

const FieldPreview = memo(function FieldPreview({ field, meta }: any) {
  const value = field.value ?? '';

  if (!meta || !value) return null;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${field.position.x}%`,
    top: `${field.position.y}%`,
    transform: 'translate(-50%, -50%)',
    ...(field.id === 'name' && { fontFamily: "'Great Vibes', cursive" }),
    fontSize: `${field.size}px`,
    color: '#2c2c2c',
    textShadow: '1px 1px 3px rgba(255,255,255,0.7)',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  };

  if (meta.type === 'image') {
    const src =
      value instanceof File
        ? URL.createObjectURL(value)
        : typeof value === 'string'
          ? value
          : value?.url || '';

    if (!src) return null;

    return (
      <div style={baseStyle}>
        <Image
          src={src}
          alt={meta.label ?? 'image'}
          width={0}
          height={0}
          sizes="100vw"
          unoptimized={src.startsWith('blob:')}
          className="object-contain block"
          style={{
            maxWidth: `${field.size}px`,
            maxHeight: `${field.size}px`,
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>
    );
  }

  return <div style={baseStyle}>{value}</div>;
});

interface OtherTabProps {
  other: any;
  updateProject: (section: string, field: string, value: any) => void;
  updateNestedProject: (
    section: string,
    subsection: string,
    field: string,
    value: any
  ) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

export function OtherTab({
  other,
  updateProject,
  updateNestedProject,
  handleSave,
}: OtherTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const previewRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState<string>('');
  const fontSizes = [16, 18, 20, 24, 28, 32, 36, 40, 44, 48];

  const fields = other.invitation.fields;

  const addField = (fieldId: string) => {
    const selected = availableFields.find((f) => f.id === fieldId);
    if (!selected) return;

    updateNestedProject('other', 'invitation', 'fields', [
      ...fields,
      {
        ...selected,
        position: { x: 52, y: 14 },
        size: selected.type === 'image' ? 100 : 20,
        value: '',
      },
    ]);
  };

  const removeField = (fieldId: string) => {
    updateNestedProject(
      'other',
      'invitation',
      'fields',
      fields.filter((f: any) => f.id !== fieldId)
    );
  };

  const handleFieldPositionClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;

    // Cập nhật đúng field trong array
    const newFields = other.invitation.fields.map((f: any) =>
      f.id === selectedElement
        ? { ...f, position: { x: relativeX, y: relativeY } }
        : f
    );

    updateNestedProject('other', 'invitation', 'fields', newFields);
  };

  return (
    <div className="space-y-6">
      {/* Policy Section */}
      <Card>
        <CardHeader>
          <CardTitle>Chính sách</CardTitle>
          <CardDescription>Cập nhật thông tin chính sách dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <PoliciesPreview other={other} />

          {/* Content Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Danh sách chính sách
            </Label>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FileUpload
                label="Ảnh chính sách"
                value={other.policy.policyImage}
                onChange={(file) =>
                  updateNestedProject('other', 'policy', 'policyImage', file)
                }
              />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="policyTitle">Tiêu đề chính sách</Label>
                  <Input
                    id="policyTitle"
                    value={other.policy.title}
                    onChange={(e) =>
                      updateNestedProject(
                        'other',
                        'policy',
                        'title',
                        e.target.value
                      )
                    }
                    placeholder="Nhập tiêu đề chính sách"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nội dung chính sách</Label>
                  <RichTextEditor
                    value={other.policy.policyText}
                    onChange={(value) =>
                      updateNestedProject(
                        'other',
                        'policy',
                        'policyText',
                        value
                      )
                    }
                    placeholder="Nhập nội dung danh sách chính sách..."
                  />
                  <p className="text-xs text-gray-500">
                    Sử dụng editor để tạo danh sách chính sách với định dạng đẹp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invitation */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        `}
      </style>

      <Card>
        <CardHeader>
          <CardTitle>Tạo Thiệp Mời</CardTitle>
          <CardDescription>
            Tải lên ảnh nền, nhập tên, và tạo thiệp mời cá nhân hóa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái: Các ô nhập liệu */}
            <div className="flex flex-col space-y-6">
              <div>
                <FileUpload
                  label="Ảnh thiệp mời"
                  value={other.invitation.invitationImage}
                  onChange={(file) =>
                    updateNestedProject(
                      'other',
                      'invitation',
                      'invitationImage',
                      file
                    )
                  }
                />
              </div>

              {fields.map((field: any) => {
                const meta = availableFields.find((af) => af.id === field.id);
                if (!meta) return null;

                return (
                  <div key={field.id}>
                    {/* Input hoặc Upload */}
                    {meta.type === 'text' && (
                      <div>
                        <Label htmlFor={`${field.id}Input`}>{meta.label}</Label>
                        <div className="center-both gap-4">
                          <Input
                            id={`${field.id}Input`}
                            className="flex-1 w-full"
                            type="text"
                            placeholder={meta.placeholder}
                            value={field.value ?? ''}
                            onChange={(e) =>
                              updateNestedProject(
                                'other',
                                'invitation',
                                'fields',
                                fields.map((f: any) =>
                                  f.id === field.id
                                    ? { ...f, value: e.target.value }
                                    : f
                                )
                              )
                            }
                          />
                          <Select
                            value={field.size.toString()}
                            onValueChange={(value) =>
                              updateNestedProject(
                                'other',
                                'invitation',
                                'fields',
                                fields.map((f: any) =>
                                  f.id === field.id
                                    ? { ...f, size: Number(value) }
                                    : f
                                )
                              )
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Chọn giá trị" />
                            </SelectTrigger>
                            <SelectContent>
                              {fontSizes.map((option) => (
                                <SelectItem
                                  key={option}
                                  value={option.toString()}
                                >
                                  {option}px
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={() => setSelectedElement(field.id)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                              selectedElement === field.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title="Chọn vị trí"
                          >
                            <LocateFixed />
                            {selectedElement === field.id
                              ? 'Đang chọn'
                              : 'Vị trí'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(field.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 z-10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {meta.type === 'image' && (
                      <div className="center-both gap-4">
                        <FileUpload
                          className="flex-1"
                          label="Ảnh đại diện"
                          value={field.value}
                          onChange={(file) => {
                            const newFields = fields.map((f: any) =>
                              f.id === field.id
                                ? { ...f, value: file || null }
                                : f
                            );

                            updateNestedProject(
                              'other',
                              'invitation',
                              'fields',
                              newFields
                            );
                          }}
                        />
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kích thước: {field.size}px
                          </label>
                          <input
                            type="range"
                            min="50"
                            max="400"
                            value={field.size}
                            onChange={(e) =>
                              updateNestedProject(
                                'other',
                                'invitation',
                                'fields',
                                fields.map((f: any) =>
                                  f.id === field.id
                                    ? { ...f, size: Number(e.target.value) }
                                    : f
                                )
                              )
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <Button
                          onClick={() => setSelectedElement(field.id)}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                            selectedElement === field.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title="Chọn vị trí"
                        >
                          <LocateFixed />
                          {selectedElement === field.id
                            ? 'Đang chọn'
                            : 'Vị trí'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeField(field.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 z-10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}

              <Select value="" onValueChange={(value) => addField(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giá trị" />
                </SelectTrigger>
                <SelectContent>
                  {availableFields.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cột phải: Vùng xem trước */}
            <div className="flex flex-col items-center justify-center">
              {other.invitation.invitationImage ? (
                <div>
                  <p className="text-md font-semibold text-gray-700 mb-2 text-center">
                    Bước 3: Nhấp vào ảnh để chọn vị trí tên
                  </p>
                  <div
                    ref={previewRef}
                    className="relative w-fit mx-auto border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-crosshair"
                    onClick={handleFieldPositionClick}
                  >
                    {/* 4. Thay thế <img> bằng <Image> */}
                    <Image
                      src={
                        other?.invitation?.invitationImage
                          ? other.invitation.invitationImage instanceof File
                            ? URL.createObjectURL(
                                other.invitation.invitationImage
                              )
                            : other.invitation.invitationImage.url
                          : '/placeholder.svg'
                      }
                      alt="Invitation background"
                      width={100}
                      height={100}
                      className="w-auto h-[80vh]"
                    />
                    {other.invitation.fields.map((field: any) => {
                      const meta = availableFields.find(
                        (af) => af.id === field.id
                      );
                      return (
                        <FieldPreview
                          key={field.id}
                          field={field}
                          meta={meta}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <p className="text-sm text-gray-500">
                    Xem trước thiệp mời sẽ hiển thị ở đây sau khi bạn tải ảnh
                    lên.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt khác</CardTitle>
          <CardDescription>Cập nhật các cài đặt khác của dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Break Images Section - Using FileUpload Component */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">
                Ảnh ngắt trang (Tối đa 6 vị trí)
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Quản lý ảnh ngắt trang hiển thị giữa các tab
              </p>
            </div>

            <BreakImageManager
              breakImages={other.breakImages}
              onChange={(newBreakImages) =>
                updateProject('other', 'breakImages', newBreakImages)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dự án nổi bật</Label>
                <p className="text-sm text-muted-foreground">
                  Hiển thị dự án trong danh sách nổi bật
                </p>
              </div>
              <Switch
                checked={other.isFeatured}
                onCheckedChange={(checked) =>
                  updateProject('other', 'isFeatured', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dự án độc quyền</Label>
                <p className="text-sm text-muted-foreground">
                  Đánh dấu là dự án độc quyền
                </p>
              </div>
              <Switch
                checked={other.isExclusive}
                onCheckedChange={(checked) =>
                  updateProject('other', 'isExclusive', checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị trên web</Label>
                <p className="text-sm text-muted-foreground">
                  Cho phép hiển thị dự án trên website
                </p>
              </div>
              <Switch
                checked={other.visibleOnWeb}
                onCheckedChange={(checked) =>
                  updateProject('other', 'visibleOnWeb', checked)
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {other.isFeatured && <Badge variant="secondary">Nổi bật</Badge>}
            {other.isExclusive && <Badge variant="secondary">Độc quyền</Badge>}
            {other.visibleOnWeb && (
              <Badge variant="secondary">Hiển thị web</Badge>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={() =>
            handleSave(updateProjectTab, uploadImage, 'other', other)
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading ? 'Đang lưu...' : 'Lưu thông tin khác'}
          </span>
        </Button>
      </div>
    </div>
  );
}
