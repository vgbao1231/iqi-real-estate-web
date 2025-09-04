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
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OtherTabProps {
  other: any;
  updateProject: (section: string, field: string, value: any) => void;
  updateNestedProject: (
    section: string,
    subsection: string,
    field: string,
    value: any
  ) => void;
  addArrayItem: (section: string, field: string, item?: string) => void;
  removeArrayItem: (section: string, field: string, index: number) => void;
  updateArrayItem: (
    section: string,
    field: string,
    index: number,
    value: string
  ) => void;
  editingPolicyIndex: number | null;
  setEditingPolicyIndex: (index: number | null) => void;
}

export function OtherTab({
  other,
  updateProject,
  updateNestedProject,
}: OtherTabProps) {
  // Preview component for policies
  const PoliciesPreview = () => {
    const { title, policyText, policyImage } = other.policy;

    return (
      <section
        id="policy"
        className="bg-background mx-auto w-full h-[60vh] center-both"
      >
        {policyText ? (
          <div className="h-full w-full max-w-7xl center-both flex-col md:flex-row py-8 gap-8">
            {/* Left content */}
            <div className="relative w-full md:w-2/5 h-[55vh] center-both">
              <Image
                src={
                  policyImage
                    ? typeof policyImage === 'string'
                      ? policyImage
                      : URL.createObjectURL(policyImage)
                    : '/placeholder.svg'
                }
                alt="Eco Retreat Policy Background"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Right content */}
            <div className="md:w-3/5 space-y-6">
              <div>
                <h3 className="text-5xl italic font-bold text-orange-300 mb-8">
                  {title}
                </h3>

                <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                  <div
                    className="text-lg text-foreground"
                    dangerouslySetInnerHTML={{ __html: policyText }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full max-w-6xl center-both flex-col md:flex-row py-8 gap-8">
            <div className="relative w-full h-[55vh] center-both">
              <Image
                src={
                  policyImage
                    ? typeof policyImage === 'string'
                      ? policyImage
                      : URL.createObjectURL(policyImage)
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
  };

  // Preview component for timeline
  const TimelinePreview = () => {
    const {
      backgroundImage,
      timelineTitle,
      timelineImage,
      progressTitle,
      progressImages,
    } = other.timeline;

    const getRandomWidth = () => {
      const desktopWidthClasses = [
        'sm:w-[20%]',
        'sm:w-[25%]',
        'sm:w-[30%]',
        'sm:w-[35%]',
        'sm:w-[40%]',
      ];
      const randomIndex = Math.floor(
        Math.random() * desktopWidthClasses.length
      );
      return desktopWidthClasses[randomIndex];
    };

    return (
      <>
        <div className="relative h-[60vh] center-both py-12">
          {/* Background image full screen */}
          <Image
            src={
              backgroundImage
                ? typeof backgroundImage === 'string'
                  ? backgroundImage
                  : URL.createObjectURL(backgroundImage)
                : '/placeholder.svg'
            }
            alt="Eco Retreat Timeline Background"
            fill
            className="object-cover object-left"
            priority
          />

          <div className="relative z-20 p-6 space-y-8 center-both flex-col">
            <div
              className="text-5xl text-center"
              dangerouslySetInnerHTML={{ __html: timelineTitle }}
            />
            <div className="relative h-[40vh] min-w-[60vw]">
              <Image
                src={
                  timelineImage
                    ? typeof timelineImage === 'string'
                      ? timelineImage
                      : URL.createObjectURL(timelineImage)
                    : '/placeholder.svg'
                }
                alt="Eco Retreat Timeline Background"
                fill
                className={cn('object-contain', !timelineImage && 'shadow-md')}
                priority
              />
            </div>
          </div>
        </div>
        <div className="relative min-h-[60vh] py-12">
          {/* Background image full screen */}
          <Image
            src={
              backgroundImage
                ? typeof backgroundImage === 'string'
                  ? backgroundImage
                  : URL.createObjectURL(backgroundImage)
                : '/placeholder.svg'
            }
            alt="Eco Retreat Timeline Background"
            fill
            className="object-cover object-left"
            priority
          />
          <div className="relative z-20 p-6 max-w-7xl w-full mx-auto">
            <h3 className="text-4xl text-lime-500 mb-8">{progressTitle}</h3>
            {/* Container chính sử dụng Flexbox */}
            <div className="flex flex-wrap justify-center gap-4">
              {progressImages.map((image: any, index: any) => {
                // Lấy một class width ngẫu nhiên cho mỗi ảnh
                const randomWidthClass = getRandomWidth();

                return (
                  // Container cho mỗi ảnh, chịu trách nhiệm về chiều rộng và aspect ratio
                  <div
                    key={index}
                    className={cn(
                      'relative w-full flex-grow sm:max-w-[500px] sm:min-w-[300px]',
                      randomWidthClass
                    )}
                  >
                    <div className="w-full h-64 relative">
                      <Image
                        src={
                          image
                            ? typeof image === 'string'
                              ? image
                              : URL.createObjectURL(image)
                            : '/placeholder.svg'
                        }
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  // Preview component for agency
  const AgencyPreview = () => {
    const { agencyImage, title, description } = other.agency;

    return (
      <section className="bg-background mx-auto w-full h-[60vh] center-both py-12">
        <div className="h-full w-full max-w-7xl center-both flex-col md:flex-row py-8 gap-8">
          {/* Left content */}
          <div className="relative w-full md:w-1/2 h-[50vh] center-both">
            <Image
              src={
                agencyImage
                  ? typeof agencyImage === 'string'
                    ? agencyImage
                    : URL.createObjectURL(agencyImage)
                  : '/placeholder.svg'
              }
              alt="Eco Retreat Experience Background"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right content */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <h3 className="text-5xl italic text-lime-500 mb-2">{title}</h3>
              <div
                className="space-y-2 text-lg text-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </section>
    );
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
          <PoliciesPreview />

          {/* Content Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              Danh sách chính sách
            </Label>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FileUpload
                label="Ảnh danh sách chính sách"
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

      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Cập nhật thông tin timeline dự án</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Preview */}
          <TimelinePreview />

          <Separator className="my-4" />

          <div className="space-y-6">
            <div className="space-y-4">
              <FileUpload
                label="Ảnh nền"
                value={other.timeline.backgroundImage}
                onChange={(file) =>
                  updateNestedProject(
                    'other',
                    'timeline',
                    'backgroundImage',
                    file
                  )
                }
              />
              <div className="space-y-2">
                <Label>Tiêu đề timeline</Label>
                <RichTextEditor
                  value={other.timeline.timelineTitle}
                  onChange={(value) =>
                    updateNestedProject(
                      'other',
                      'timeline',
                      'timelineTitle',
                      value
                    )
                  }
                  placeholder="Nhập tiêu đề timeline"
                />
              </div>
              <FileUpload
                label="Ảnh timeline"
                value={other.timeline.timelineImage}
                onChange={(file) =>
                  updateNestedProject(
                    'other',
                    'timeline',
                    'timelineImage',
                    file
                  )
                }
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="progressTitle">Tiêu đề tiến độ</Label>
                <Input
                  id="progressTitle"
                  value={other.timeline.progressTitle}
                  onChange={(e) =>
                    updateNestedProject(
                      'other',
                      'timeline',
                      'progressTitle',
                      e.target.value
                    )
                  }
                  placeholder="Nhập tiêu đề tiến độ"
                />
              </div>

              <MultiFileUpload
                label="Ảnh tiến độ"
                value={other.timeline.progressImages}
                onChange={(files) =>
                  updateNestedProject(
                    'other',
                    'timeline',
                    'progressImages',
                    files
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agency Section - NEW */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Thông tin đại lý</span>
          </CardTitle>
          <CardDescription>
            Cập nhật thông tin đại lý phân phối dự án
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview */}
          <AgencyPreview />

          <Separator />

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FileUpload
              label="Logo/Ảnh đại lý"
              value={other.agency.agencyImage}
              onChange={(file) =>
                updateNestedProject('other', 'agency', 'agencyImage', file)
              }
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agencyTitle">Tiêu đề đại lý</Label>
                <Input
                  id="agencyTitle"
                  value={other.agency.title}
                  onChange={(e) =>
                    updateNestedProject(
                      'other',
                      'agency',
                      'title',
                      e.target.value
                    )
                  }
                  placeholder="VD: Thông Tin Đại Lý"
                />
              </div>

              <div className="space-y-2">
                <Label>Mô tả đại lý</Label>
                <RichTextEditor
                  value={other.agency.description}
                  onChange={(value) =>
                    updateNestedProject('other', 'agency', 'description', value)
                  }
                  placeholder="Nhập thông tin chi tiết về đại lý: tên công ty, địa chỉ, hotline, email..."
                />
                <p className="text-xs text-gray-500">
                  Có thể bao gồm: tên công ty, địa chỉ, số điện thoại, email,
                  website, giấy phép kinh doanh...
                </p>
              </div>
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
                Ảnh sẽ được chèn giữa các section: Giới thiệu → Tổng quan → Tiện
                ích → Vị trí → Sản phẩm → Chính sách
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
              {Array.from({ length: 6 }, (_, index) => {
                const sectionNames = [
                  'Sau Giới thiệu',
                  'Sau Tổng quan',
                  'Sau Tiện ích',
                  'Sau Vị trí',
                  'Sau Sản phẩm',
                  'Sau Chính sách',
                ];

                return (
                  <div key={index} className="space-y-1">
                    <div className="text-center">
                      <Label className="text-sm font-medium text-gray-700">
                        Vị trí {index + 1}
                      </Label>
                      <p className="text-xs text-gray-500">
                        {sectionNames[index]}
                      </p>
                    </div>

                    <FileUpload
                      label={`Ảnh ngắt trang ${index + 1} (Tùy chọn)`}
                      value={other.breakImages[index]}
                      onChange={(file) => {
                        const newBreakImages = [...other.breakImages];
                        newBreakImages[index] = file;
                        updateProject('other', 'breakImages', newBreakImages);
                      }}
                      clickToDelete={true}
                    />
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Lưu ý:</strong> Bạn có thể để trống các vị trí không
                muốn chèn ảnh ngắt trang. Ảnh sẽ chỉ hiển thị ở những vị trí đã
                upload. Click vào ảnh để xóa.
              </p>
            </div>
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
    </div>
  );
}
