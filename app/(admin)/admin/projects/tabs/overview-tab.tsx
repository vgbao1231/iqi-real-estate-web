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
import { KeyValueTable } from '@/components/ui/key-value-table';
import { FileUpload } from '@/components/ui/file-upload';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatVnCurrencyShort } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { memo } from 'react';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface OverviewTabProps {
  overview: any;
  updateProject: (section: string, field: string, value: any) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

// Section 1: 4-Card Grid Preview Component
const FourCardGridPreview = memo(function FourCardGridPreview({
  overview,
}: {
  overview: any;
}) {
  const { overviewBackground, overviewImages } = overview;

  return (
    <div className="relative min-h-[80vh] center-both">
      {/* Background image full screen */}
      <Image
        src={
          overviewBackground
            ? overviewBackground instanceof File
              ? URL.createObjectURL(overviewBackground)
              : overviewBackground.url
            : '/placeholder.svg'
        }
        alt="Eco Retreat Overview Background"
        fill
        className="object-cover object-right"
        priority
      />
      <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 px-24">
        {overviewImages.map((item: any, idx: number) => (
          <div
            key={idx}
            className="border border-lime-500 overflow-hidden flex flex-col"
          >
            <div className="relative w-full min-w-64 aspect-square">
              <Image
                src={
                  item.image
                    ? item.image instanceof File
                      ? URL.createObjectURL(item.image)
                      : item.image.url
                    : '/placeholder.svg'
                }
                alt="Eco Retreat Overview Background"
                className="object-contain"
                fill
                priority
              />
            </div>

            <div
              className="text-white p-3 italic"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

// Section 2: Two Column Layout Preview Component
const TwoColumnLayoutPreview = memo(function TwoColumnLayoutPreview({
  overview,
}: {
  overview: any;
}) {
  const { experienceImage, basicInfo } = overview;

  const inforColumns = basicInfo
    ?.filter((item: any) => !item.hidden)
    .map((item: any) => {
      let value = item.value;

      if (item.type === 'range' && Array.isArray(value)) {
        value = `${value[0]} - ${value[1]}`;
      }

      if (item.type === 'number') {
        value = Number(value)?.toLocaleString();
      }

      // Custom logic using 'id'
      if (item.id === 'status') {
        // Use item.id === 'status'
        value = <Badge>{item.value}</Badge>;
      }

      if (item.id === 'land_area') {
        // Use item.id === 'land_area'
        value = `${item.value} ${basicInfo.find((i: any) => i.id === 'measurement_unit').value === 'sqm' ? 'm²' : 'ft²'}`;
      }

      if (item.id === 'price') {
        value = `Từ ${formatVnCurrencyShort(item.value[0])}`;
      }

      return {
        label: item.key, // Keep item.key for the display label
        value,
      };
    });

  const half = Math.ceil(inforColumns.length / 2);
  const columns = [inforColumns.slice(0, half), inforColumns.slice(half)];

  return (
    <div className="relative min-h-[70vh] center-both">
      <div className="h-full w-full center-both flex-col md:flex-row max-w-[85vw] py-8 gap-12">
        {/* Left content */}
        <div className="relative w-full md:w-2/5 h-[80vh] center-both">
          <Image
            src={
              experienceImage
                ? experienceImage instanceof File
                  ? URL.createObjectURL(experienceImage)
                  : experienceImage.url
                : '/placeholder.svg'
            }
            alt="Eco Retreat Experience Background"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right content */}
        <div className="min-h-full md:w-3/5 space-y-6">
          <div>
            <div>
              <h3 className="text-4xl font-bold italic text-orange-300 mb-8">
                Thông tin tổng quan
              </h3>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {columns.map((column, colIdx) => (
                  <div key={colIdx}>
                    {column.map(({ label, value }: any, idx: any) => (
                      <div
                        key={idx}
                        className={`flex justify-between items-center py-3 gap-4 ${
                          idx !== column.length - 1
                            ? 'border-b border-border'
                            : ''
                        }`}
                      >
                        <span className="text-muted-foreground font-medium text-nowrap">
                          {label}
                        </span>
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="font-semibold text-right truncate whitespace-nowrap max-w-[60%] cursor-pointer">
                                {value}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs break-words"
                            >
                              {value}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export function OverviewTab({
  overview,
  updateProject,
  handleSave,
}: OverviewTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  return (
    <div className="space-y-8">
      {/* Section 1: 4-Card Grid Layout */}
      <Card>
        <CardHeader>
          <CardTitle>1. Tổng quan 4 danh mục</CardTitle>
          <CardDescription>
            Ảnh và mô tả cho 4 danh mục chính: Sản phẩm, Diện tích, Tiện ích, Vị
            trí
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <FourCardGridPreview overview={overview} />
          </div>

          <Separator />

          {/* Form Fields - 4 Column Grid matching preview */}
          <FileUpload
            label="Ảnh nền trang tổng quan"
            value={overview.overviewBackground}
            onChange={(file) =>
              updateProject('overview', 'overviewBackground', file)
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overview.overviewImages.map((item: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 text-center">
                    Danh mục {index + 1}
                  </h4>
                  {/* Removed Title and Subtitle Input fields */}
                  <FileUpload
                    label={`Ảnh danh mục ${index + 1}`}
                    value={item.image || null}
                    onChange={(file) => {
                      const newOverviewImages = [...overview.overviewImages];
                      newOverviewImages[index] = {
                        ...newOverviewImages[index],
                        image: file,
                      };
                      updateProject(
                        'overview',
                        'overviewImages',
                        newOverviewImages
                      );
                    }}
                  />
                  <div className="space-y-2">
                    <Label>Mô tả danh mục {index + 1}</Label>
                    <RichTextEditor
                      value={item.description}
                      onChange={(value) => {
                        if (value === item.description) return; // không đổi thì thôi
                        const newOverviewImages = [...overview.overviewImages];
                        newOverviewImages[index] = {
                          ...newOverviewImages[index],
                          description: value,
                        };
                        updateProject(
                          'overview',
                          'overviewImages',
                          newOverviewImages
                        );
                      }}
                      placeholder={`Nhập mô tả về danh mục ${index + 1}...`}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Two Column Layout */}
      <Card>
        <CardHeader>
          <CardTitle>2. Thông tin chi tiết</CardTitle>
          <CardDescription>
            Ảnh lớn và bảng thông tin tổng quan (2 cột)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <TwoColumnLayoutPreview overview={overview} />
          </div>

          <Separator />

          {/* Form Fields arranged as requested */}
          <div className="space-y-6">
            {/* Image Uploads at the top */}
            <FileUpload
              label="Ảnh trải nghiệm (Experience Image)"
              value={overview.experienceImage}
              onChange={(file) =>
                updateProject('overview', 'experienceImage', file)
              }
            />

            {/* Basic Info KeyValueTable below images */}
            <div className="space-y-4">
              <div className="rounded-lg p-0">
                <KeyValueTable
                  title="Thông tin tổng quan"
                  data={overview.basicInfo}
                  onChange={(data) =>
                    updateProject('overview', 'basicInfo', data)
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={() =>
            handleSave(updateProjectTab, uploadImage, 'overview', overview)
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading
              ? 'Đang lưu...'
              : 'Lưu thông tin tổng quan'}
          </span>
        </Button>
      </div>
    </div>
  );
}
